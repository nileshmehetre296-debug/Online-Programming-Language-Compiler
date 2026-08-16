export const schemas = {
  BaseResponse: {
    type: 'object',
    properties: {
      statusCode: {
        type: 'integer',
        example: 200,
      },
      hasError: {
        type: 'boolean',
        example: false,
      },
      message: {
        type: 'string',
        example: 'success',
      },
      data: {
        type: 'any',
      },
    },
    required: ['statusCode', 'hasError', 'message'],
  },
};
