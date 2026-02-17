import {
  InternalServerError,
  MethodNotAllowedError,
  ValidationError,
  NotFoundError,
} from "infra/errors";

const controller = {
  errorHandlers: {
    onNoMatch: onNoMatchHanlder,
    onError: onErrorHanlder,
  },
};

function onNoMatchHanlder(request, response) {
  const publicErrorObject = new MethodNotAllowedError();
  response.status(publicErrorObject.statusCode).json(publicErrorObject);
}

function onErrorHanlder(error, request, response) {
  if (error instanceof ValidationError || error instanceof NotFoundError) {
    return response.status(error.statusCode).json(error);
  }

  const publicErrorObject = new InternalServerError({
    statusCode: error.statusCode,
    cause: error,
  });
  console.log(publicErrorObject);

  response.status(publicErrorObject.statusCode).json(publicErrorObject);
}

export default controller;
