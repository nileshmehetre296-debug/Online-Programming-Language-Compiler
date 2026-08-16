/**
 * Language configuration interface.
 */
export interface LanguageConfig {
  image: string;
  fileExt: string;
  fileName: string;
  runCommand: (filename: string) => string[];
}

/**
 * Execution result interface.
 */
export interface ExecutionResult {
  success: boolean;
  output: string;
  error: boolean;
}