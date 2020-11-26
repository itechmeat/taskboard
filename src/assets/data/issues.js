export default [
  {
    name: "Issue 1",
    description: "Some description of Issue",
    status: "Backlog",
    progress: 0,
    tasks: [
      {
        name: "Create tasks",
        progress: 0,
        isDone: false,
      },
      {
        name: "Delete tasks",
        progress: 80,
        isDone: false,
      },
    ],
  },
  {
    name: "Issue 2",
    description: "Some description of Issue",
    status: "Backlog",
    progress: 0,
    tasks: [
      {
        name: "Create tasks 2",
        progress: 90,
        isDone: false,
      },
      {
        name: "Delete tasks 2",
        progress: 55,
        isDone: true,
      },
    ],
  },
  {
    name: "Issue 3",
    description: "Some description of Issue",
    status: "In Progress",
    progress: 0,
    tasks: [
      {
        name: "Create tasks 3",
        progress: 100,
        isDone: true,
      },
      {
        name: "Delete tasks 3",
        progress: 0,
        isDone: false,
      },
    ],
  },
];
