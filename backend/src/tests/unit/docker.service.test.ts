import { DockerService } from '../../services/docker.service';

describe('DockerService', () => {
  let dockerService: DockerService;

  beforeEach(() => {
    dockerService = DockerService.getInstance();
  });

  describe('executeCode', () => {
    it('should execute code and return the result', async () => {
      const language = 'nodejs';
      const code = 'console.log("hello world")';

      const result = await dockerService.executeCode(language, code);

      expect(result.output).toEqual('hello world');
    });
  });
});
