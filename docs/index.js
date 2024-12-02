import { booksSwaggerDocs } from "./books-module.js";
import { borrowersSwaggerDocs } from "./borrowers-module.js";
import { borrowingProcessesSwaggerDoc } from "./borrowing-processes.js";

export const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Library Management API",
    version: "1.0.0",
    description: "API documentation for Library Management System",
  },
  servers: [
    {
      url: "/api",
    },
  ],
  paths: {
    ...booksSwaggerDocs.paths,
    ...borrowersSwaggerDocs.paths,
    ...borrowingProcessesSwaggerDoc.paths,
  },
  components: {
    ...(borrowersSwaggerDocs.components || {}),
  },
};

export const swaggerOptions = {
  definition: swaggerDefinition,
  apis: [],
};
