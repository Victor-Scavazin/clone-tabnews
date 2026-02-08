import { InternalServerError, MethodNotAllowedError } from "infra/errors";

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
  const publicErrorObject = new InternalServerError({
    statusCode: error.statusCode,
    cause: error,
  });
  console.log("\nError inside next-connect catch");
  response.status(500).json(publicErrorObject);

  response.status(publicErrorObject.statusCode).json(publicErrorObject);
}

export default controller;
