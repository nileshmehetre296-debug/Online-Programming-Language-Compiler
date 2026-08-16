import { Router } from 'express';
import { Route } from '../../types';
import { ExecuteCodeController } from '../../controllers/ExecuteCode.controller';
import { validate } from '../../middlewares/validation.middleware';
import { CodeExecutionSchema } from '../../validations/executeCode.validation';

class ExecuteCodeRoutes implements Route {
  public router = Router();
  public path = '/code';
  private executeCodeController: ExecuteCodeController;

  constructor() {
    this.executeCodeController = ExecuteCodeController.getInstance();

    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      '/execute',
      validate({
        body: CodeExecutionSchema,
      }),
      this.executeCodeController.executeCode
    );
  }
}

export default ExecuteCodeRoutes;
