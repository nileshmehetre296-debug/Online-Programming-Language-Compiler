export const codeRunnerPaths = {
  '/code/execute': {
    post: {
      summary: 'Execute Code',
      description: 'Accepts a programming language and code snippet to execute.',
      tags: ['Code-Runner'],
      requestBody: {
        $ref: '#/components/requestBodies/executeCodeBody',
      },
      responses: {
        200: {
          $ref: '#/components/responses/codeExecutionRes',
        },
        default: {
          $ref: '#/components/responses/codeExecutionErrorRes',
        },
      },
    },
  },
};
