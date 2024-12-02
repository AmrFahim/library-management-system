export const booksSwaggerDocs = {
  openapi: "3.0.0",
  info: {
    title: "Library Books API",
    version: "1.0.0",
    description: "API for managing library books",
  },
  servers: [
    {
      url: "/api",
      description: "Base API endpoint",
    },
  ],
  paths: {
    "/books": {
      get: {
        summary: "List books",
        description:
          "Retrieve a paginated list of books with optional sorting and search",
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
            description: "Number of books to return (5-10, default: 5)",
          },
          {
            name: "offset",
            in: "query",
            schema: {
              type: "integer",
              minimum: 0,
              default: 0,
            },
            description: "Number of books to skip for pagination",
          },
          {
            name: "sortBy",
            in: "query",
            schema: {
              type: "string",
              enum: ["title", "author", "isbn"],
              default: "title",
            },
            description: "Field to sort books by",
          },
          {
            name: "sortOrder",
            in: "query",
            schema: {
              type: "string",
              enum: ["ASC", "DESC"],
              default: "ASC",
            },
            description: "Sort order (ascending or descending)",
          },
          {
            name: "searchTerm",
            in: "query",
            schema: {
              type: "string",
              nullable: true,
            },
            description:
              "Search term to filter books by title, author, or ISBN",
          },
        ],
        responses: {
          200: {
            description: "Successful book retrieval",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "success",
                    },
                    count: {
                      type: "integer",
                      description: "Total number of books",
                    },
                    books: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          title: { type: "string" },
                          author: { type: "string" },
                          isbn: { type: "string" },
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
      post: {
        summary: "Add a new book",
        description: "Add a new book to the library",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: [
                  "title",
                  "author",
                  "isbn",
                  "totalCount",
                  "shelfLocation",
                ],
                properties: {
                  title: {
                    type: "string",
                    minLength: 1,
                    maxLength: 255,
                    description: "Book title",
                  },
                  author: {
                    type: "string",
                    minLength: 1,
                    maxLength: 255,
                    description: "Book author",
                  },
                  isbn: {
                    type: "string",
                    pattern: "^(97[89])-\\d{3}-\\d{5}-\\d{3}-\\d{1}$",
                    description:
                      "ISBN number (format: 979-xxx-xxxxx-xxx-x or 978-xxx-xxxxx-xxx-x)",
                  },
                  totalCount: {
                    type: "integer",
                    minimum: 1,
                    description: "Total number of book copies",
                  },
                  shelfLocation: {
                    type: "string",
                    minLength: 1,
                    maxLength: 255,
                    description: "Location of the book in the library",
                  },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: "Book added successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "Book is added successfully",
                    },
                    book: {
                      type: "object",
                      properties: {
                        id: { type: "integer" },
                        title: { type: "string" },
                        author: { type: "string" },
                        isbn: { type: "string" },
                        totalCount: { type: "integer" },
                        availableCount: { type: "integer" },
                        shelfLocation: { type: "string" },
                      },
                    },
                  },
                },
              },
            },
          },
          422: {
            description: "Unprocessable Entity",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      description: "Error message",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/books/{id}": {
      patch: {
        summary: "Update a book",
        description: "Update details of an existing book",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "integer",
              minimum: 1,
            },
            description: "ID of the book to update",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  title: {
                    type: "string",
                    minLength: 1,
                    maxLength: 255,
                    description: "Book title",
                  },
                  author: {
                    type: "string",
                    minLength: 1,
                    maxLength: 255,
                    description: "Book author",
                  },
                  isbn: {
                    type: "string",
                    pattern: "^(97[89])-\\d{3}-\\d{5}-\\d{3}-\\d{1}$",
                    description: "ISBN number",
                  },
                  totalCount: {
                    type: "integer",
                    minimum: 1,
                    description: "Total number of book copies",
                  },
                  availableCount: {
                    type: "integer",
                    minimum: 0,
                    description: "Number of available book copies",
                  },
                  shelfLocation: {
                    type: "string",
                    minLength: 1,
                    maxLength: 255,
                    description: "Location of the book in the library",
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Book updated successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "Book is updated successfully",
                    },
                    book: {
                      type: "object",
                      properties: {
                        id: { type: "integer" },
                        title: { type: "string" },
                        author: { type: "string" },
                        isbn: { type: "string" },
                        totalCount: { type: "integer" },
                        availableCount: { type: "integer" },
                        shelfLocation: { type: "string" },
                      },
                    },
                  },
                },
              },
            },
          },
          404: {
            description: "Book not found",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "Book not found",
                    },
                  },
                },
              },
            },
          },
        },
      },
      delete: {
        summary: "Delete a book",
        description: "Remove a book from the library",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "integer",
              minimum: 1,
            },
            description: "ID of the book to delete",
          },
        ],
        responses: {
          200: {
            description: "Book deleted successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "Book is deleted successfully",
                    },
                  },
                },
              },
            },
          },
          404: {
            description: "Book not found",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "Book not found",
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
    schemas: {
      Book: {
        type: "object",
        required: ["title", "author", "isbn", "totalCount", "shelfLocation"],
        properties: {
          id: {
            type: "integer",
            description: "Unique identifier for the book",
          },
          title: {
            type: "string",
            minLength: 1,
            maxLength: 255,
            description: "Title of the book",
          },
          author: {
            type: "string",
            minLength: 1,
            maxLength: 255,
            description: "Author of the book",
          },
          isbn: {
            type: "string",
            pattern: "^(97[89])-\\d{3}-\\d{5}-\\d{3}-\\d{1}$",
            description: "ISBN number of the book",
          },
          totalCount: {
            type: "integer",
            minimum: 1,
            description: "Total number of book copies",
          },
          availableCount: {
            type: "integer",
            minimum: 0,
            description: "Number of available book copies",
          },
          shelfLocation: {
            type: "string",
            minLength: 1,
            maxLength: 255,
            description: "Physical location of the book in the library",
          },
        },
      },
    },
  },
};
