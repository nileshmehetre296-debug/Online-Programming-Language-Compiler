import Docker from 'dockerode';
import { promises as fs } from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { ExecutionResult, LanguageConfig } from '../types/docker';

/**
 * @class DockerService
 * Handles Docker container initialization and code execution.
 */
export class DockerService {
  private static instance: DockerService;
  private docker: Docker;
  private containers: Record<string, Docker.Container>;
  private supportedLanguages: Record<string, LanguageConfig>;
  private initialization: Promise<void>;

  private constructor() {
    this.docker = new Docker({ socketPath: '/var/run/docker.sock' });
    this.containers = {};
    this.supportedLanguages = this.defineSupportedLanguages();
    this.initialization = this.initializeContainers();
  }

  public static getInstance(): DockerService {
    if (!DockerService.instance) {
      DockerService.instance = new DockerService();
    }
    return DockerService.instance;
  }

  private defineSupportedLanguages(): Record<string, LanguageConfig> {
    return {
      python: {
        image: 'python:3.9-slim',
        fileExt: '.py',
        fileName: 'source',
        runCommand: (filename) => ['python', filename],
      },
      javascript: {
        image: 'node:14-alpine',
        fileExt: '.js',
        fileName: 'source',
        runCommand: (filename) => ['node', filename],
      },
      java: {
        image: 'openjdk:11-jdk-slim',
        fileExt: '.java',
        fileName: 'Main',
        runCommand: (filename) => [
          'bash',
          '-c',
          `javac ${filename} && java -cp ${this.getClassPath(filename)} Main`,
        ],
      },
      cpp: {
        image: 'gcc:latest',
        fileExt: '.cpp',
        fileName: 'source',
        runCommand: (filename) => {
          const execName = this.removeFileExtension(filename);
          return ['bash', '-c', `g++ -O2 ${filename} -o ${execName} && ./${execName}`];
        },
      },
    };
  }

  private async initializeContainers(): Promise<void> {
    for (const [language, config] of Object.entries(this.supportedLanguages)) {
      const container = await this.getOrCreateContainer(config.image, language);
      this.containers[language] = container;
    }
  }

  private async getOrCreateContainer(image: string, containerName: string): Promise<Docker.Container> {
    await this.ensureImageExists(image);

    const existingContainer = await this.findContainerByName(containerName);
    if (existingContainer) {
      return this.docker.getContainer(existingContainer.Id);
    }

    const container = await this.createContainer(image, containerName);
    return container;
  }

  private async ensureImageExists(image: string): Promise<void> {
    const imageExists = await this.checkImageExists(image);
    if (!imageExists) {
      await this.pullImage(image);
    }
  }

  private async checkImageExists(image: string): Promise<boolean> {
    try {
      const images = await this.docker.listImages({
        filters: { reference: [image] },
      });
      return images.length > 0;
    } catch (error) {
      return false;
    }
  }

  private async pullImage(imageName: string): Promise<void> {
    await new Promise<void>((resolve, reject) => {
      this.docker.pull(imageName, (_err: any, stream: any) =>
        this.docker.modem.followProgress(stream, (error: any) => {
          if (error) {
            reject(new Error(`Error pulling image: ${error.message}`));
          }
          resolve();
        })
      );
    });
  }

  private async findContainerByName(name: string): Promise<Docker.ContainerInfo | undefined> {
    try {
      const containers = await this.docker.listContainers({ all: true });
      return containers.find((container) => container.Names.includes(`/${name}`));
    } catch (error) {
      return undefined;
    }
  }

  private async createContainer(image: string, name: string): Promise<Docker.Container> {
    const container = await this.docker.createContainer({
      Image: image,
      Entrypoint: ['tail', '-f', '/dev/null'], // Keep the container running.
      HostConfig: {
        Binds: [`code_volume:/app/code`],
        Memory: 512 * 1024 * 1024,
        MemorySwap: 512 * 1024 * 1024,
        CpuPeriod: 100000,
        CpuQuota: 50000,
        NetworkMode: 'none',
      },
      name,
    });
    await container.start();
    return container;
  }

  public async executeCode(language: string, code: string): Promise<ExecutionResult> {
    await this.ensureInitialized();

    const langConfig = this.supportedLanguages[language];
    if (!langConfig) {
      throw new Error(`Unsupported language: ${language}`);
    }

    const container = this.containers[language];
    const executionId = uuidv4();
    const hostPath = `/app/code/code-executor-${executionId}`;
    const filePath = `${hostPath}/${langConfig.fileName}${langConfig.fileExt}`;

    try {
      await this.setupCodeExecutionEnvironment(hostPath, filePath, code);
      const result = await this.runCodeInContainer(container, langConfig.runCommand(filePath));
      await this.cleanupHostDirectory(hostPath);
      return result;
    } catch (error: any) {
      return { success: false, output: error.message, error: true };
    }
  }

  private async setupCodeExecutionEnvironment(
    hostPath: string,
    filePath: string,
    code: string
  ): Promise<void> {
    await fs.mkdir(hostPath, { recursive: true });
    await fs.writeFile(filePath, code.trim());
  }

  private async runCodeInContainer(
    container: Docker.Container,
    cmd: string[]
  ): Promise<ExecutionResult> {
    const exec = await container.exec({
      Cmd: cmd,
      AttachStdout: true,
      AttachStderr: true,
    });

    const stream = await exec.start({ hijack: true, stdin: true });
    let output = '';

    await new Promise<void>((resolve, reject) => {
      stream.on('data', (chunk: Buffer) => {
        output += chunk.toString('utf8').replace(/[^ -~\n]/g, '');
      });
      stream.on('end', resolve);
      stream.on('error', reject);
    });

    return { success: true, output: output.trim(), error: false };
  }

  private async cleanupHostDirectory(hostPath: string): Promise<void> {
    await fs.rm(hostPath, { recursive: true, force: true });
  }

  private removeFileExtension(filename: string): string {
    return filename.slice(0, filename.lastIndexOf('.')) || filename;
  }

  private getClassPath(filename: string): string {
    return filename.replace(/\/Main.java$/, '');
  }

  public async cleanup(): Promise<void> {
    for (const container of Object.values(this.containers)) {
      await container.stop();
      await container.remove({ force: true });
    }
  }

  private async ensureInitialized(): Promise<void> {
    await this.initialization;
  }
}
