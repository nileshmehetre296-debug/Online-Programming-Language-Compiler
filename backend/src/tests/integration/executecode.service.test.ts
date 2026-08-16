import { ExecuteCodeService } from '../../services/executeCode.service';

describe('ExecuteCodeService', () => {
  let executeCodeService: ExecuteCodeService;

  beforeEach(() => {
    executeCodeService = ExecuteCodeService.getInstance();
  });

  describe('executeCode', () => {
    it('should execute code and return the result', async () => {
      const language = 'nodejs';
      const code = 'console.log("hello world")';

      const result = await executeCodeService.executeCode(language, code);

      expect(result.output).toEqual('hello world');
    });
  });
});
