import initMyApplication from "./my-application.js";
import TodoCreation from "./TodoCreation.js";
import TodoList from "./TodoList.js";

const initialModel = {
  todoCreation: { state: "INIT" },
  todoList: {
    sortBy: {
      state: "SORTED",
      criteria: "title asc",
      criterias: [
        "title asc",
        "title desc",
        "most important",
        "least important",
        "next due",
        "last due",
      ],
    },
    filter: {
      state: "FILTERED",
      criteria: "none",
      criterias: [ "only pending", "only done", "none" ]
    },
    todos: [
      {
        id: 1,
        title: "first todo",
        importance: 1,
        description: "this is the first one",
        dueDate: '2024-04-29'
      },
    ],
  },
};

const App = (applicationContext) => ({
  events: [
    ...TodoCreation(applicationContext).events,
    ...TodoList(applicationContext).events,
  ],
  template: (model) => `
        <div class="main">
            <h1>Note App</h1>
            ${TodoCreation(applicationContext).template(model)}
            ${TodoList(applicationContext).template(model)}
        </div>`,
});

const { render } = initMyApplication(initialModel, '#todo', App);
render();
