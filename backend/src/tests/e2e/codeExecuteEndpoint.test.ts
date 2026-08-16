import request from 'supertest';
import { App } from '../../app'; // Import your Express app

const app: App = new App();

describe('POST /api/v1/code/execute', () => {
  it('should return 200 with the expected response when code execution is successful', async () => {
    const requestBody = {
      language: 'nodejs',
      code: "console.log('hello world')",
    };

    const response = await request(app.app).post('/api/v1/code/execute').send(requestBody);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      statusCode: 200,
      hasError: false,
      data: {
        success: true,
        output: 'hello world',
      },
      message: 'success',
    });
  });

  it('should return an error response for invalid code or language', async () => {
    const requestBody = {
      language: 'invalidLang',
      code: 'invalidCode',
    };

    const response = await request(app.app).post('/api/v1/code/execute').send(requestBody);

    expect(response.status).not.toBe(200);
    expect(response.body).toHaveProperty('hasError', true);
  });
});
