import { NextFunction, Request, Response } from 'express';
import { responseHandler } from '../utils/response.util';
import { ExecuteCodeService } from '../services/executeCode.service';

/**
 * @class AuthController
 * @description Handles HTTP requests and responses
 */
export class ExecuteCodeController {
  private static instance: ExecuteCodeController;
  private executeCodeService: ExecuteCodeService;

  private constructor() {
    this.executeCodeService = ExecuteCodeService.getInstance();
  }

  /**
   * @method getInstance
   * @descriptionHandle Get AuthController instance
   */
  public static getInstance(): ExecuteCodeController {
    if (!ExecuteCodeController.instance) {
      ExecuteCodeController.instance = new ExecuteCodeController();
    }
    return ExecuteCodeController.instance;
  }

  /**
   * @method googleLogin
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   * @param {NextFunction} next - Next middleware function
   * @descriptionHandle Api to excute the code
   */
  public executeCode = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { language, code } = req.body;

      const executeOutput = await this.executeCodeService.executeCode(language, code);
      console.log(executeOutput)
      res.status(200).json(responseHandler(executeOutput));
    } catch (error) {
      next(error);
    }
  };
}
