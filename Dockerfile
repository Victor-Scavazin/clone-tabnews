FROM amazoncorretto:21-alpine

WORKDIR /app


EXPOSE 3000

ENTRYPOINT [ "npm ", "run", "dev"]
