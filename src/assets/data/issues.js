export default [
  {
    name: "Create a layout and design all the required components",
    description: "No need to make the connection to the <b>data store</b>.",
    track: "Done",
    progress: 0,
    tasks: [
      {
        name: "Create the main Layout",
        estimate: 30,
        isDone: true,
      },
      {
        name: "Add UiMenu component",
        estimate: 45,
        isDone: true,
      },
      {
        name: "Add UiButton component",
        estimate: 30,
        isDone: true,
      },
      {
        name: "Add custom icon for UiMenu",
        estimate: 45,
        isDone: true,
      },
      {
        name: "Add progress to cards",
        estimate: 60,
        isDone: true,
      },
      {
        name: "Add UiModal component",
        estimate: 45,
        isDone: true,
      },
      {
        name: "Add Issue component",
        estimate: 90,
        isDone: true,
      },
      {
        name: "Add Task component",
        estimate: 60,
        isDone: true,
      },
    ],
  },
  {
    name: "Implement CRUD for all entities",
    description: "At the first stage, it is permissible to use an IndexedDB",
    track: "Done",
    progress: 0,
    tasks: [
      {
        name: "Implement CRUD for tracks (columns)",
        estimate: 120,
        isDone: true,
      },
      {
        name: "Implement CRUD for Issues",
        estimate: 90,
        isDone: true,
      },
      {
        name: "Implement CRUD for Tasks",
        estimate: 60,
        isDone: true,
      },
    ],
  },
  {
    name: "Improve interface behavior when deleting entities",
    description: "",
    track: "To Do",
    progress: 0,
    tasks: [
      {
        name: "Delete all tasks if the Issue is deleted",
        estimate: 15,
        isDone: false,
      },
      {
        name: "Make the default track for placing unsorted Issues",
        estimate: 15,
        isDone: false,
      },
      {
        name:
          "Set first track as default, change the default track when delete it",
        estimate: 15,
        isDone: false,
      },
      {
        name: "Move all issues from deleted track to default track",
        estimate: 15,
        isDone: false,
      },
      {
        name: "Add the ability to remove all tasks from the column",
        estimate: 30,
        isDone: false,
      },
    ],
  },
  {
    name: "Create a progress calculator",
    description: "",
    track: "To Do",
    progress: 0,
    tasks: [
      {
        name: "Recalculate progress when adding or removing a task",
        estimate: 30,
        isDone: true,
      },
      {
        name: "Add a global progress for the project",
        estimate: 150,
        isDone: false,
      },
    ],
  },
  {
    name: "Add Drag&Drop for entities",
    description: "",
    track: "In Progress",
    estimate: 0,
    progress: 0,
    tasks: [
      {
        name: "Add Drag&Drop for Tasks",
        estimate: 90,
        isDone: true,
      },
      {
        name: "Add Drag&Drop for Issues",
        estimate: 200,
        isDone: true,
      },
      {
        name: "Add Drag&Drop for Tracks",
        estimate: 150,
        isDone: true,
      },
      {
        name: "Make refactoring of Drag&Drop",
        estimate: 120,
        isDone: false,
      },
    ],
  },
  {
    name: "Create the Demo of the project",
    description: "",
    track: "Done",
    estimate: 0,
    progress: 0,
    tasks: [
      {
        name: "Create generator of demo-content",
        estimate: 120,
        isDone: true,
      },
      {
        name: "Add cleaning of DB",
        estimate: 15,
        isDone: true,
      },
    ],
  },
  {
    name: "Add more Data to an Issue",
    description: "",
    track: "To Do",
    estimate: 0,
    progress: 0,
    tasks: [
      {
        name: "Add a Deadline",
        estimate: 30,
        isDone: false,
      },
      {
        name: "Output the date of creation and update of an Issue",
        estimate: 30,
        isDone: false,
      },
    ],
  },
  {
    name: "Make refactoring",
    description: "",
    track: "Backlog",
    estimate: 0,
    progress: 0,
    tasks: [
      {
        name: "Add more styles for mobile devices",
        estimate: 120,
        isDone: false,
      },
    ],
  },
  {
    name: "Make the design improvement",
    description: "",
    track: "Backlog",
    estimate: 0,
    progress: 0,
    tasks: [
      {
        name: "Add placeholders for empty parts of a content",
        estimate: 60,
        isDone: false,
      },
      {
        name: "Add a vertical scroll to columns",
        estimate: 30,
        isDone: false,
      },
      {
        name: "Remake the Dropdown menu",
        estimate: 45,
        isDone: false,
      },
      {
        name: "Create custom dialogs",
        estimate: 120,
        isDone: false,
      },
      {
        name: "Add visual loaders of the async data",
        estimate: 60,
        isDone: false,
      },
    ],
  },
  {
    name: "Add product testing",
    description: "",
    track: "Backlog",
    estimate: 0,
    progress: 0,
    tasks: [
      {
        name: "Write tests for Jest",
        estimate: 230,
        isDone: false,
      },
      {
        name: "Write tests for Cypress",
        estimate: 160,
        isDone: false,
      },
    ],
  },
  {
    name: "Make integration with AWS or Firebase",
    description: "",
    track: "Backlog",
    estimate: 0,
    progress: 0,
    tasks: [
      {
        name: "Make connection with cloud service",
        estimate: 250,
        isDone: false,
      },
      {
        name: "Use RealTime connection for store all entities",
        estimate: 300,
        isDone: false,
      },
    ],
  },
  {
    name: "Add system messages",
    description: "",
    track: "Backlog",
    estimate: 0,
    progress: 0,
    tasks: [
      {
        name: "Add Page 404",
        estimate: 45,
        isDone: false,
      },
      {
        name: "Add notifications",
        estimate: 30,
        isDone: true,
      },
      {
        name: "Add validation messages",
        estimate: 30,
        isDone: false,
      },
      {
        name: "Add messages for API",
        estimate: 30,
        isDone: false,
      },
    ],
  },
  {
    name: "Change Vue2 to Vue3",
    description: "",
    track: "Backlog",
    estimate: 0,
    progress: 0,
    tasks: [
      {
        name: "Change Vue version",
        estimate: 60,
        isDone: false,
      },
      {
        name: "Update components to Composition API",
        estimate: 300,
        isDone: false,
      },
    ],
  },
];
