import { Router } from 'express';
import { Route } from '../../types';
import ExecuteCodeRoutes from './codeRunner.routest';

class V1Routes implements Route {
  public router = Router();
  public path = '/';
  private executeCode: ExecuteCodeRoutes;

  constructor() {
    this.executeCode = new ExecuteCodeRoutes();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.use(this.executeCode.path, this.executeCode.router);
  }
}

export default V1Routes;
