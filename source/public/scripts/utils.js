export const sortTodos = (todos, criteria) => {
    switch (criteria) {
        case 'title asc': 
            return todos.sort((todoA, todoB) => todoA.title.localeCompare(todoB.title))
        case 'title desc': 
            return todos.sort((todoA, todoB) => todoB.title.localeCompare(todoA.title))
        case 'most important': 
            return todos.sort((todoA, todoB) => todoA.importance - todoB.importance);
        case 'least important': 
            return todos.sort((todoA, todoB) => todoB.importance - todoA.importance);
    }
}