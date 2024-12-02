export const borrowingProcessesSwaggerDoc = {
  "/api/borrowing-processes/overdue": {
    get: {
      summary: "List Overdue Books",
      description:
        "Retrieves a list of all books that are currently overdue and not yet returned",
      tags: ["Borrowing Processes"],
      responses: {
        200: {
          description: "Successfully retrieved overdue books",
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
                    description: "Number of overdue books",
                  },
                  data: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: {
                          type: "integer",
                          description: "Borrowing process ID",
                        },
                        borrowerId: {
                          type: "integer",
                          description: "ID of the borrower",
                        },
                        bookId: {
                          type: "integer",
                          description: "ID of the borrowed book",
                        },
                        returnDate: {
                          type: "string",
                          format: "date",
                          description: "Original expected return date",
                        },
                        borrower: {
                          type: "object",
                          properties: {
                            id: { type: "integer" },
                            name: { type: "string" },
                            email: { type: "string" },
                          },
                        },
                        book: {
                          type: "object",
                          properties: {
                            id: { type: "integer" },
                            title: { type: "string" },
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
        500: {
          description: "Internal server error",
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
  "/api/borrowing-processes/last-month-borrows": {
    get: {
      summary: "List Borrowing Processes from Last Month",
      description:
        "Retrieves borrowing processes from the previous month, with optional filtering for overdue books",
      tags: ["Borrowing Processes"],
      parameters: [
        {
          name: "onlyOverdue",
          in: "query",
          required: false,
          schema: {
            type: "boolean",
            default: false,
          },
          description: "Filter to show only overdue borrowing processes",
        },
      ],
      responses: {
        200: {
          description: "Successfully retrieved borrowing processes",
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
                    description: "Number of borrowing processes",
                  },
                  data: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: {
                          type: "integer",
                          description: "Borrowing process ID",
                        },
                        borrowerId: {
                          type: "integer",
                          description: "ID of the borrower",
                        },
                        bookId: {
                          type: "integer",
                          description: "ID of the borrowed book",
                        },
                        returnDate: {
                          type: "string",
                          format: "date",
                          description: "Expected return date",
                        },
                        confirmedReturnDate: {
                          type: "string",
                          format: "date",
                          description: "Actual return date (if returned)",
                        },
                        borrower: {
                          type: "object",
                          properties: {
                            name: { type: "string" },
                            email: { type: "string" },
                          },
                        },
                        book: {
                          type: "object",
                          properties: {
                            title: { type: "string" },
                            author: { type: "string" },
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
        500: {
          description: "Internal server error",
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
};
