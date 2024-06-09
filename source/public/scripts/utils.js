export const SORT_CRITERIAS = {
  TITLE_ASC: 'title asc',
  TITLE_DESC: 'title desc',
  MOST_IMPORTANT: 'most important',
  LEAST_IMPORTANT: 'least important',
  NEXT_DUE: 'next due',
  LAST_DUE: 'last due',
  NEWEST: 'newest',
  OLDEST: 'oldest',
  all() { 
    return [ 
      this.TITLE_ASC, 
      this.TITLE_DESC,
      this.MOST_IMPORTANT,
      this.LEAST_IMPORTANT,
      this.NEXT_DUE,
      this.LAST_DUE,
      this.NEWEST,
      this.OLDEST 
    ];
  }
}

export const sortFunction = (criteria) => {
  switch (criteria) {
    case SORT_CRITERIAS.TITLE_ASC:
      return (todoA, todoB) => todoA.title.localeCompare(todoB.title)
    case SORT_CRITERIAS.TITLE_DESC:
      return (todoA, todoB) => todoB.title.localeCompare(todoA.title)
    case SORT_CRITERIAS.MOST_IMPORTANT:
      return (todoA, todoB) => todoA.importance - todoB.importance;
    case SORT_CRITERIAS.LEAST_IMPORTANT:
      return (todoA, todoB) => todoB.importance - todoA.importance;
    case SORT_CRITERIAS.NEXT_DUE:
      return (todoA, todoB) => Date.parse(todoA.dueDate) - Date.parse(todoB.dueDate);
    case SORT_CRITERIAS.LAST_DUE:
      return (todoA, todoB) => Date.parse(todoB.dueDate) - Date.parse(todoA.dueDate);
    case SORT_CRITERIAS.NEWEST:
      return (todoA, todoB) => Date.parse(todoA.creationDate) - Date.parse(todoB.creationDate);
    case SORT_CRITERIAS.OLDEST:
        return (todoA, todoB) => Date.parse(todoB.creationDate) - Date.parse(todoA.creationDate);
    default:
      return sortFunction(SORT_CRITERIAS.TITLE_ASC);
  }
}

export const sortTodos = (todos, criteria) => todos.sort(sortFunction(criteria))

export const FILTER_CRITERIAS = {
  ONLY_PENDING: "only pending",
  ONLY_DONE: "only done",
  NONE: "none",
  all() {
    return [
      this.ONLY_PENDING,
      this.ONLY_DONE,
      this.NONE
    ]
  }
}

export const filterPredicate = (criteria) => {
  switch (criteria) {
    case FILTER_CRITERIAS.ONLY_PENDING: return (todo) => !todo.done;
    case FILTER_CRITERIAS.ONLY_DONE: return (todo) => todo.done;
    default: return () => true;
  }
}

  export const filterTodos = (todos, criteria) => todos.filter(filterPredicate(criteria))
  
  export const now = () => {
    const date = new Date();
    const year = date.getFullYear().toString().padStart(4, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  