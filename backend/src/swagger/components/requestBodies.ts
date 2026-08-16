export const requestBodies = {
  executeCodeBody: {
    description: 'Execute code request Body',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            language: {
              type: 'string',
              description: 'The programming language of the code snippet.',
              enum: ['javascript', 'cpp', 'java', 'python'],
              example: 'javascript',
            },
            code: {
              type: 'string',
              description: 'The code snippet to execute.',
              example: "console.log('Hello World');",
            },
          },
          required: ['language', 'code'],
        },
      },  
    },
  },
};
