import Docker from 'dockerode';
import { promises as fs } from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { ExecutionResult, LanguageConfig } from '../types/docker';

/**
 * @class DockerService
 * Handles docker service logic
 */
export class DockerService {
  private static instance: DockerService;
  private docker: Docker;
  private supportedLanguages: Record<string, LanguageConfig>;

  private constructor() {
    this.docker = new Docker({ socketPath: '/var/run/docker.sock' });
    this.supportedLanguages = this.getSupportedLanguages();
  }

  public static getInstance(): DockerService {
    if (!DockerService.instance) {
      DockerService.instance = new DockerService();
    }
    return DockerService.instance;
  }

  /**
   * Defines supported languages and their configurations.
   */
  public getSupportedLanguages(): Record<string, LanguageConfig> {
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
        fileName: 'main',
        runCommand: (filename) => {
          const dir = this.removeMainSuffix(filename);
          console.log(dir);
          return ['bash', '-c', `javac ${filename} && java -cp ${dir} Main`];
        },
      },
      cpp: {
        image: 'gcc:latest',
        fileExt: '.cpp',
        fileName: 'source',
        runCommand: (filename) => {
          const execName = this.removeFileExtension(filename);
          return ['bash', '-c', `g++ ${filename} -o ${execName} && ./${execName}`];
        },
      },
    };
  }

  /**
   * Removes the file extension from a filename.
   */
  public removeFileExtension(filename: string): string {
    return filename.slice(0, filename.lastIndexOf('.')) || filename;
  }

  public removeMainSuffix(path: string): string {
    return path.replace(/\/main.java$/, '');
  }

  /**
   * Executes code in a Docker container for a specified language.
   */
  public async executeCode(language: string, code: string): Promise<ExecutionResult> {
    const langConfig = this.supportedLanguages[language];
    if (!langConfig) {
      throw new Error(`Unsupported language: ${language}`);
    }

    const executionId = uuidv4();
    const hostPath = `/app/code/code-executor-${executionId}`;
    const filePath = `${hostPath}/${langConfig.fileName}${langConfig.fileExt}`;

    try {
      await this.prepareHostDirectory(hostPath, filePath, code);
      await this.pullDockerImage(langConfig.image);

      const container = await this.createAndStartContainer(
        langConfig.image,
        langConfig.runCommand(filePath)
      );

      const result = await this.waitForContainer(container);

      await container.remove({ force: true });
      await fs.rm(hostPath, { recursive: true, force: true });

      return {
        success: !result.error,
        output: result.output || result.error || '',
        error: !!result.error,
      };
    } catch (err: any) {
      console.error('Execution error:', err);
      throw new Error(`Code execution failed: ${err.message}`);
    }
  }

  /**
   * Prepares the host directory and writes the code to a file.
   */
  public async prepareHostDirectory(
    hostPath: string,
    filePath: string,
    code: string
  ): Promise<void> {
    await fs.mkdir(hostPath, { recursive: true });
    await fs.writeFile(filePath, code.trim());
  }

  /**
   * Pulls the Docker image if it doesn't exist locally.
   */
  public async pullDockerImage(imageName: string): Promise<void> {
    const image = this.docker.getImage(imageName);
    const imageExists = await image.inspect().catch(() => false);

    if (!imageExists) {
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
  }

  /**
   * Creates and starts a Docker container.
   */
  public async createAndStartContainer(
    image: string,
    command: string[]
  ): Promise<Docker.Container> {
    const container = await this.docker.createContainer({
      Image: image,
      Cmd: command,
      HostConfig: {
        Binds: [`code_volume:/app/code`],
        Memory: 512 * 1024 * 1024,
        MemorySwap: 512 * 1024 * 1024,
        CpuPeriod: 1000000,
        CpuQuota: 50000,
        NetworkMode: 'none',
      },
    });
    await container.start();
    return container;
  }

  /**
   * Waits for a Docker container to complete and captures logs.
   */
  public async waitForContainer(
    container: Docker.Container
  ): Promise<{ output: string; error: string | null }> {
    try {
      const logs = await container.logs({
        follow: true,
        stdout: true,
        stderr: true,
      });

      let output = '';
      logs.on('data', (chunk: Buffer) => {
        output += chunk.toString('utf8').replace(/[^ -~\n]/g, '');
      });

      await new Promise<void>((resolve, reject) => {
        logs.on('end', resolve);
        logs.on('error', reject);
      });

      return { output: output.trim(), error: null };
    } catch (err: any) {
      return { output: '', error: err.message };
    }
  }
}
