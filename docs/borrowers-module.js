export const borrowersSwaggerDocs = {
  "/api/borrowers": {
    get: {
      tags: ["Borrowers"],
      summary: "List borrowers",
      description: "Retrieve a paginated list of borrowers",
      parameters: [
        {
          in: "query",
          name: "limit",
          schema: {
            type: "integer",
            minimum: 5,
            maximum: 10,
            default: 5,
          },
          description: "Number of borrowers to return per page",
        },
        {
          in: "query",
          name: "offset",
          schema: {
            type: "integer",
            minimum: 0,
            default: 0,
          },
          description: "Number of borrowers to skip (for pagination)",
        },
        {
          in: "query",
          name: "sortBy",
          schema: {
            type: "string",
            enum: ["registerAt", "email", "name"],
            default: "registerAt",
          },
          description: "Field to sort the borrowers by",
        },
        {
          in: "query",
          name: "sortOrder",
          schema: {
            type: "string",
            enum: ["ASC", "DESC"],
            default: "ASC",
          },
          description: "Sort order (ascending or descending)",
        },
      ],
      responses: {
        200: {
          description: "Successful borrower retrieval",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Success",
                  },
                  count: {
                    type: "integer",
                    description: "Total number of borrowers",
                  },
                  borrowers: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: {
                          type: "integer",
                        },
                        name: {
                          type: "string",
                        },
                        email: {
                          type: "string",
                        },
                        registerAt: {
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
    },
  },
  "/api/borrowers/register": {
    post: {
      tags: ["Borrowers"],
      summary: "Register a new borrower",
      description: "Create a new borrower account",
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
                  example: "Amr",
                },
                email: {
                  type: "string",
                  minLength: 8,
                  maxLength: 50,
                  example: "amr@example.com",
                },
                password: {
                  type: "string",
                  minLength: 8,
                  maxLength: 50,
                  description: "Must include uppercase, lowercase, number",
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
                  message: {
                    type: "string",
                    example: "Borrower registered successfully",
                  },
                  borrower: {
                    type: "object",
                    properties: {
                      id: {
                        type: "integer",
                      },
                      name: {
                        type: "string",
                      },
                      email: {
                        type: "string",
                      },
                      registerAt: {
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
  },
  "/api/borrowers/{id}": {
    patch: {
      tags: ["Borrowers"],
      summary: "Update borrower details",
      description: "Update information for an existing borrower",
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "integer",
            minimum: 1,
          },
          description: "ID of the borrower to update",
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
                },
                email: {
                  type: "string",
                  minLength: 8,
                  maxLength: 50,
                },
                password: {
                  type: "string",
                  minLength: 8,
                  maxLength: 50,
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
                  message: {
                    type: "string",
                    example: "Borrower updated successfully",
                  },
                  Borrower: {
                    type: "object",
                    properties: {
                      id: {
                        type: "integer",
                      },
                      name: {
                        type: "string",
                      },
                      email: {
                        type: "string",
                      },
                      registerAt: {
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
    delete: {
      tags: ["Borrowers"],
      summary: "Delete a borrower",
      description: "Remove a borrower from the system",
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "integer",
            minimum: 1,
          },
          description: "ID of the borrower to delete",
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
                  message: {
                    type: "string",
                    example: "Borrower deleted successfully",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  "/api/borrowers/{id}/active-borrows": {
    get: {
      tags: ["Borrowers"],
      summary: "List active borrowed books",
      description:
        "Retrieve a list of books currently borrowed by a specific borrower",
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "integer",
            minimum: 1,
          },
          description: "ID of the borrower",
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
                  message: {
                    type: "string",
                    example: "success",
                  },
                  count: {
                    type: "integer",
                    description: "Number of active borrowed books",
                  },
                  books: {
                    type: "array",
                    items: {
                      type: "object",
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
  "/api/borrowers/{id}/books/{bookId}/borrow": {
    post: {
      tags: ["Borrowers"],
      summary: "Borrow a book",
      description: "Process a book borrowing for a specific borrower",
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "integer",
            minimum: 1,
          },
          description: "ID of the borrower",
        },
        {
          in: "path",
          name: "bookId",
          required: true,
          schema: {
            type: "integer",
            minimum: 1,
          },
          description: "ID of the book to borrow",
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
                  description: "Expected return date for the book",
                  example: "2024-12-31",
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
                  message: {
                    type: "string",
                    example: "the borrowing process is done successfully",
                  },
                  borrowerId: {
                    type: "integer",
                  },
                  bookId: {
                    type: "integer",
                  },
                  returnDate: {
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
  "/api/borrowers/{id}/books/{bookId}/return": {
    post: {
      tags: ["Borrowers"],
      summary: "Return a book",
      description: "Process returning a book for a specific borrower",
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "integer",
            minimum: 1,
          },
          description: "ID of the borrower",
        },
        {
          in: "path",
          name: "bookId",
          required: true,
          schema: {
            type: "integer",
            minimum: 1,
          },
          description: "ID of the book to return",
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
                  message: {
                    type: "string",
                    example: "returning the book is done successfully",
                  },
                  borrowerId: {
                    type: "integer",
                  },
                  bookId: {
                    type: "integer",
                  },
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
};
