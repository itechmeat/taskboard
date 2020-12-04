export default [
  {
    name: "Create a layout and design all the required components",
    description: "No need to make the connection to the <b>data store</b>.",
    status: "Done",
    progress: 0,
    tasks: [
      {
        name: "Create the main Layout",
        progress: 100,
        isDone: true,
      },
      {
        name: "Add UiMenu component",
        progress: 100,
        isDone: true,
      },
      {
        name: "Add UiButton component",
        progress: 100,
        isDone: true,
      },
      {
        name: "Add custom icon for UiMenu",
        progress: 100,
        isDone: true,
      },
      {
        name: "Add progress to cards",
        progress: 100,
        isDone: true,
      },
      {
        name: "Add UiModal component",
        progress: 100,
        isDone: true,
      },
      {
        name: "Add Issue component",
        progress: 100,
        isDone: true,
      },
      {
        name: "Add Task component",
        progress: 100,
        isDone: true,
      },
    ],
  },
  {
    name: "Implement CRUD for all entities",
    description: "At the first stage, it is permissible to use an IndexedDB",
    status: "Done",
    progress: 0,
    tasks: [
      {
        name: "Implement CRUD for statuses (columns)",
        progress: 100,
        isDone: true,
      },
      {
        name: "Implement CRUD for Issues",
        progress: 100,
        isDone: true,
      },
      {
        name: "Implement CRUD for Tasks",
        progress: 100,
        isDone: true,
      },
    ],
  },
  {
    name: "Improve interface behavior when deleting entities",
    description: "",
    status: "To Do",
    progress: 0,
    tasks: [
      {
        name: "Delete all tasks if the Issue is deleted",
        progress: 90,
        isDone: false,
      },
      {
        name: "Make the default status for placing unsorted Issues",
        progress: 0,
        isDone: false,
      },
      {
        name:
          "Set first status as default, change the default status when delete it",
        progress: 0,
        isDone: false,
      },
      {
        name: "Move all issues from deleted status to default status",
        progress: 0,
        isDone: false,
      },
      {
        name: "Add the ability to remove all tasks from the column",
        progress: 0,
        isDone: false,
      },
    ],
  },
  {
    name: "Create a progress calculator",
    description: "",
    status: "To Do",
    progress: 0,
    tasks: [
      {
        name: "Recalculate progress when adding or removing a task",
        progress: 100,
        isDone: true,
      },
      {
        name: "Add a global progress for the project",
        progress: 90,
        isDone: false,
      },
    ],
  },
  {
    name: "Add Drag&Drop for entities",
    description: "",
    status: "To Do",
    progress: 0,
    tasks: [
      {
        name: "Add Drag&Drop for Tasks",
        progress: 100,
        isDone: true,
      },
      {
        name: "Add Drag&Drop for Issues",
        progress: 10,
        isDone: false,
      },
      {
        name: "Add Drag&Drop for Statuses",
        progress: 100,
        isDone: true,
      },
    ],
  },
  {
    name: "Create the Demo of the project",
    description: "",
    status: "Done",
    progress: 0,
    tasks: [
      {
        name: "Create generator of demo-content",
        progress: 100,
        isDone: true,
      },
      {
        name: "Add cleaning of DB",
        progress: 100,
        isDone: true,
      },
    ],
  },
  {
    name: "Add more Data to an Issue",
    description: "",
    status: "In Progress",
    progress: 0,
    tasks: [
      {
        name: "Add a Deadline",
        progress: 70,
        isDone: false,
      },
      {
        name: "Output the date of creation and update of an Issue",
        progress: 40,
        isDone: false,
      },
    ],
  },
  {
    name: "Make refactoring",
    description: "",
    status: "Backlog",
    progress: 0,
    tasks: [
      {
        name: "Add more styles for mobile devices",
        progress: 0,
        isDone: false,
      },
    ],
  },
  {
    name: "Make the design improvement",
    description: "",
    status: "Backlog",
    progress: 0,
    tasks: [
      {
        name: "Add placeholders for empty parts of a content",
        progress: 20,
        isDone: false,
      },
      {
        name: "Add a vertical scroll to columns",
        progress: 0,
        isDone: false,
      },
      {
        name: "Remake the Dropdown menu",
        progress: 0,
        isDone: false,
      },
      {
        name: "Create custom dialogs",
        progress: 0,
        isDone: false,
      },
      {
        name: "Add visual loaders of the async data",
        progress: 0,
        isDone: false,
      },
    ],
  },
  {
    name: "Add product testing",
    description: "",
    status: "Backlog",
    progress: 0,
    tasks: [
      {
        name: "Write tests for Jest",
        progress: 0,
        isDone: false,
      },
      {
        name: "Write tests for Cypress",
        progress: 0,
        isDone: false,
      },
    ],
  },
  {
    name: "Make integration with AWS or Firebase",
    description: "",
    status: "Backlog",
    progress: 0,
    tasks: [
      {
        name: "Make connection with cloud service",
        progress: 0,
        isDone: false,
      },
      {
        name: "Use RealTime connection for store all entities",
        progress: 0,
        isDone: false,
      },
    ],
  },
  {
    name: "Add system messages",
    description: "",
    status: "Backlog",
    progress: 0,
    tasks: [
      {
        name: "Add Page 404",
        progress: 0,
        isDone: false,
      },
      {
        name: "Add notifications",
        progress: 70,
        isDone: false,
      },
      {
        name: "Add validation messages",
        progress: 0,
        isDone: false,
      },
      {
        name: "Add messages for API",
        progress: 0,
        isDone: false,
      },
    ],
  },
  {
    name: "Change Vue2 to Vue3",
    description: "",
    status: "Backlog",
    progress: 0,
    tasks: [
      {
        name: "Change Vue version",
        progress: 0,
        isDone: false,
      },
      {
        name: "Update components to Composition API",
        progress: 0,
        isDone: false,
      },
    ],
  },
];
