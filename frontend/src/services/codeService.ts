import axiosInstance from "./apiService";

export class CodeService {
  static async executeCode(language: string, code: string): Promise<string> {
    const response = await axiosInstance.post("/code/execute", {
      language,
      code,
    });
    return response.data?.data?.output ?? "";
  }
}
