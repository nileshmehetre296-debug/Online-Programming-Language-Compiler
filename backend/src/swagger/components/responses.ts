import { errosArrayObject } from '../utils';

export const responses = {
  codeExecutionRes: {
    required: true,
    description: 'Execution result',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              description: 'Indicates if the code execution was successful.',
              example: true,
            },
            output: {
              type: 'string',
              description: 'The result or output of the code execution.',
              example: 'Hello World',
            },
          },
        },
      },
    },
  },

  codeExecutionErrorRes: {
    content: {
      'application/json': {
        schema: {
          type: 'string',
        },
        example: errosArrayObject([{ code: 500, msg: 'Something went wrong!' }]),
      },
    },
  },
};
