export const booksSwaggerDocs = {
  "/api/books": {
    get: {
      tags: ["Books"],
      summary: "List books",
      description:
        "Retrieve a paginated list of books with optional sorting and searching",
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
          description: "Number of books to return per page",
        },
        {
          in: "query",
          name: "offset",
          schema: {
            type: "integer",
            minimum: 0,
            default: 0,
          },
          description: "Number of books to skip (for pagination)",
        },
        {
          in: "query",
          name: "sortBy",
          schema: {
            type: "string",
            enum: ["title", "author", "isbn"],
            default: "title",
          },
          description: "Field to sort the books by",
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
        {
          in: "query",
          name: "searchTerm",
          schema: {
            type: "string",
            nullable: true,
          },
          description: "Search term to filter books by title, author, or ISBN",
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
                    description: "Total number of books matching the query",
                  },
                  books: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        title: {
                          type: "string",
                        },
                        author: {
                          type: "string",
                        },
                        isbn: {
                          type: "string",
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
    post: {
      tags: ["Books"],
      summary: "Add a new book",
      description: "Create a new book entry in the library",
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
                  example: "Test title",
                },
                author: {
                  type: "string",
                  minLength: 1,
                  maxLength: 255,
                  example: "Test Author",
                },
                isbn: {
                  type: "string",
                  pattern: "^(97[89])-d{3}-d{5}-d{3}-d{1}$",
                  example: "978-373-27671-223-2",
                },
                totalCount: {
                  type: "integer",
                  minimum: 1,
                  example: 5,
                },
                shelfLocation: {
                  type: "string",
                  minLength: 1,
                  maxLength: 255,
                  example: "A3",
                },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: "Book successfully added",
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
                      id: {
                        type: "integer",
                      },
                      title: {
                        type: "string",
                      },
                      author: {
                        type: "string",
                      },
                      isbn: {
                        type: "string",
                      },
                      totalCount: {
                        type: "integer",
                      },
                      availableCount: {
                        type: "integer",
                      },
                      shelfLocation: {
                        type: "string",
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
  "/api/books/{id}": {
    patch: {
      tags: ["Books"],
      summary: "Update a book",
      description: "Update details of an existing book",
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "integer",
            minimum: 1,
          },
          description: "ID of the book to update",
        },
      ],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                title: {
                  type: "string",
                  minLength: 1,
                  maxLength: 255,
                },
                author: {
                  type: "string",
                  minLength: 1,
                  maxLength: 255,
                },
                isbn: {
                  type: "string",
                  pattern: "^(97[89])-d{3}-d{5}-d{3}-d{1}$",
                },
                totalCount: {
                  type: "integer",
                  minimum: 1,
                },
                availableCount: {
                  type: "integer",
                  minimum: 0,
                },
                shelfLocation: {
                  type: "string",
                  minLength: 1,
                  maxLength: 255,
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Book successfully updated",
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
                      id: {
                        type: "integer",
                      },
                      title: {
                        type: "string",
                      },
                      author: {
                        type: "string",
                      },
                      isbn: {
                        type: "string",
                      },
                      totalCount: {
                        type: "integer",
                      },
                      availableCount: {
                        type: "integer",
                      },
                      shelfLocation: {
                        type: "string",
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
      tags: ["Books"],
      summary: "Delete a book",
      description: "Remove a book from the library by its ID",
      parameters: [
        {
          in: "path",
          name: "id",
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
          description: "Book successfully deleted",
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
      },
    },
  },
};
