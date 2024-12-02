export const borrowersSwaggerDocs = {
  openapi: "3.0.0",
  info: {
    title: "Library Management System - Borrowers API",
    version: "1.0.0",
    description: "API endpoints for managing library borrowers",
  },
  servers: [
    {
      url: "/api",
    },
  ],
  paths: {
    "/borrowers": {
      get: {
        summary: "List borrowers",
        description: "Retrieve a paginated list of borrowers",
        tags: ["Borrowers"],
        parameters: [
          {
            name: "limit",
            in: "query",
            schema: {
              type: "integer",
              minimum: 5,
              maximum: 10,
              default: 5,
            },
            description: "Number of records to return",
          },
          {
            name: "offset",
            in: "query",
            schema: {
              type: "integer",
              minimum: 0,
              default: 0,
            },
            description: "Number of records to skip",
          },
          {
            name: "sortBy",
            in: "query",
            schema: {
              type: "string",
              enum: ["registerAt", "email", "name"],
              default: "registerAt",
            },
            description: "Field to sort by",
          },
          {
            name: "sortOrder",
            in: "query",
            schema: {
              type: "string",
              enum: ["ASC", "DESC"],
              default: "ASC",
            },
            description: "Sort direction",
          },
        ],
        responses: {
          200: {
            description: "Successfully retrieved borrowers",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string" },
                    count: { type: "integer" },
                    borrowers: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          id: { type: "integer" },
                          name: { type: "string" },
                          email: { type: "string" },
                          registerAt: { type: "string", format: "date-time" },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/borrowers/register": {
      post: {
        summary: "Register a new borrower",
        description: "Create a new borrower account",
        tags: ["Borrowers"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["name", "email", "password"],
                properties: {
                  name: {
                    type: "string",
                    minLength: 3,
                    maxLength: 30,
                    pattern: "^[a-zA-Z\\s'-]{3,30}$",
                  },
                  email: {
                    type: "string",
                    minLength: 8,
                    maxLength: 50,
                    pattern: "^[a-z0-9]+@[a-z]+\\.[a-z]{2,}$",
                  },
                  password: {
                    type: "string",
                    minLength: 8,
                    maxLength: 50,
                    pattern:
                      '^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d!@#$%^&*(),.?":{}|<>]{5,}$',
                  },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: "Borrower registered successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string" },
                    token: { type: "string" },
                    borrower: {
                      type: "object",
                      properties: {
                        id: { type: "integer" },
                        name: { type: "string" },
                        email: { type: "string" },
                        registerAt: { type: "string", format: "date-time" },
                      },
                    },
                  },
                },
              },
            },
          },
          409: {
            description: "Borrower already exists",
          },
        },
      },
    },
    "/borrowers/login": {
      post: {
        summary: "Login a borrower",
        description: "Authenticate a borrower and generate a JWT token",
        tags: ["Borrowers"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["email", "password"],
                properties: {
                  email: { type: "string" },
                  password: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: "Borrower logged in successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string" },
                    token: { type: "string" },
                    borrower: {
                      type: "object",
                      properties: {
                        id: { type: "integer" },
                        name: { type: "string" },
                        email: { type: "string" },
                      },
                    },
                  },
                },
              },
            },
          },
          401: {
            description: "Invalid email or password",
          },
        },
      },
    },
    "/borrowers/{id}": {
      patch: {
        summary: "Update borrower details",
        description: "Update details for an existing borrower",
        tags: ["Borrowers"],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer", minimum: 1 },
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                    minLength: 3,
                    maxLength: 30,
                    pattern: "^[a-zA-Z\\s'-]{3,30}$",
                  },
                  email: {
                    type: "string",
                    minLength: 8,
                    maxLength: 50,
                    pattern: "^[a-z0-9]+@[a-z]+\\.[a-z]{2,}$",
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Borrower updated successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string" },
                    Borrower: {
                      type: "object",
                      properties: {
                        id: { type: "integer" },
                        name: { type: "string" },
                        email: { type: "string" },
                      },
                    },
                  },
                },
              },
            },
          },
          404: {
            description: "Borrower not found",
          },
        },
      },
      delete: {
        summary: "Delete a borrower",
        description: "Remove a borrower from the system",
        tags: ["Borrowers"],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer", minimum: 1 },
          },
        ],
        responses: {
          200: {
            description: "Borrower deleted successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string" },
                  },
                },
              },
            },
          },
          404: {
            description: "Borrower not found",
          },
        },
      },
    },
    "/borrowers/{id}/active-borrows": {
      get: {
        summary: "List active borrowed books",
        description:
          "Retrieve a list of currently borrowed books for a specific borrower",
        tags: ["Borrowers"],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer", minimum: 1 },
          },
        ],
        responses: {
          200: {
            description: "Successfully retrieved active borrowed books",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string" },
                    count: { type: "integer" },
                    books: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          bookId: { type: "integer" },
                          bookTitle: { type: "string" },
                          bookAuthor: { type: "string" },
                          returnDate: { type: "string", format: "date" },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/borrowers/{id}/books/{bookId}/borrow": {
      post: {
        summary: "Borrow a book",
        description: "Create a borrowing process for a specific book",
        tags: ["Borrowers"],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer", minimum: 1 },
          },
          {
            name: "bookId",
            in: "path",
            required: true,
            schema: { type: "integer", minimum: 1 },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["returnDate"],
                properties: {
                  returnDate: {
                    type: "string",
                    format: "date",
                    pattern: "\\d{4}-\\d{2}-\\d{2}",
                  },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: "Book borrowed successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string" },
                    borrowerId: { type: "integer" },
                    bookId: { type: "integer" },
                    returnDate: { type: "string", format: "date" },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/borrowers/{id}/books/{bookId}/return": {
      post: {
        summary: "Return a book",
        description: "Process the return of a borrowed book",
        tags: ["Borrowers"],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer", minimum: 1 },
          },
          {
            name: "bookId",
            in: "path",
            required: true,
            schema: { type: "integer", minimum: 1 },
          },
        ],
        responses: {
          200: {
            description: "Book returned successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string" },
                    borrowerId: { type: "integer" },
                    bookId: { type: "integer" },
                    confirmedReturnDate: {
                      type: "string",
                      format: "date-time",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
};
