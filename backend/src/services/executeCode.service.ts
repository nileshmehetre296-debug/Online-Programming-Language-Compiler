import { DockerService } from './docker.service';

/**
 * @class ExecuteCodeService
 * Handles execute code service logic
 */
export class ExecuteCodeService {
  private static instance: ExecuteCodeService;
  private dockerService: DockerService;

  private constructor() {
    this.dockerService = DockerService.getInstance();
  }

  public static getInstance(): ExecuteCodeService {
    if (!ExecuteCodeService.instance) {
      ExecuteCodeService.instance = new ExecuteCodeService();
    }
    return ExecuteCodeService.instance;
  }

  /**
   * @method executeCode
   * @param {string} lang - lang of code
   * @param {string} code - code to be execute
   * @description - execute the code of specific langauge
   */
  public executeCode = async (lang: string, code: string) => {
    // Execute code
    const result = await this.dockerService.executeCode(lang, code);

    return {
      success: result.success,
      output: result.output,
    };
  };
}
