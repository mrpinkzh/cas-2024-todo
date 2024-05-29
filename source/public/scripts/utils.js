export const sortTodos = (todos, criteria) => {
    switch (criteria) {
      case "title asc":
        return todos.sort((todoA, todoB) =>
          todoA.title.localeCompare(todoB.title)
        );
      case "title desc":
        return todos.sort((todoA, todoB) =>
          todoB.title.localeCompare(todoA.title)
        );
      case "most important":
        return todos.sort((todoA, todoB) => todoA.importance - todoB.importance);
      case "least important":
        return todos.sort((todoA, todoB) => todoB.importance - todoA.importance);
      case "next due":
        return todos.sort((todoA, todoB) => Date.parse(todoA.dueDate) - Date.parse(todoB.dueDate));
      case "last due":
        return todos.sort((todoA, todoB) => Date.parse(todoB.dueDate) - Date.parse(todoA.dueDate));
      default:
        return todos.sort((todoA, todoB) =>
          todoA.title.localeCompare(todoB.title)
        );
    }
  };
  
  export const now = () => {
    const date = new Date();
    const year = date.getFullYear().toString().padStart(4, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  