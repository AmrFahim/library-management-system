export const borrowingProcessesSwaggerDoc = {
  openapi: "3.0.0",
  info: {
    title: "Library Management System - Borrowing Processes API",
    version: "1.0.0",
    description:
      "API endpoints for managing borrowing processes in the library",
  },
  servers: [
    {
      url: "/api",
    },
  ],
  paths: {
    "/borrowing-processes/overdue": {
      get: {
        summary: "List Overdue Books",
        description: "Retrieves a list of books that are currently overdue",
        tags: ["Borrowing Processes"],
        responses: {
          200: {
            description: "Successfully retrieved overdue books",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string", example: "success" },
                    count: { type: "integer", example: 5 },
                    data: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          id: { type: "integer" },
                          borrowerId: { type: "integer" },
                          bookId: { type: "integer" },
                          returnDate: { type: "string", format: "date" },
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
            description: "Internal Server Error",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: { type: "string" },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/borrowing-processes/last-month-borrows": {
      get: {
        summary: "List Last Month's Borrowing Processes",
        description:
          "Retrieves borrowing processes from the previous month, with optional overdue filter",
        tags: ["Borrowing Processes"],
        parameters: [
          {
            name: "onlyOverdue",
            in: "query",
            description: "Filter to show only overdue borrowing processes",
            required: false,
            schema: {
              type: "boolean",
              default: false,
            },
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
                    message: { type: "string", example: "success" },
                    count: { type: "integer", example: 5 },
                    data: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          id: { type: "integer" },
                          borrowerId: { type: "integer" },
                          bookId: { type: "integer" },
                          returnDate: { type: "string", format: "date" },
                          confirmedReturnDate: {
                            type: "string",
                            format: "date",
                            nullable: true,
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
            description: "Internal Server Error",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: { type: "string" },
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
