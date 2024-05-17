let model = { todoCreation: { state:'INIT' }, todos: [] }
const root = document.querySelector('#main');
const registeredEvents = [];
const render = () => {
    const { events, template } = App();
    registeredEvents.forEach(({selector, ev, handler}) => {
        const target = root.querySelector(selector);
        if (target)
            target.removeEventListener(ev, handler);
    })
    root.innerHTML = template(model);
    events.forEach(({selector, ev, handler}) => {
        const target = root.querySelector(selector);
        if (target){
            target.addEventListener(ev, handler);
            registeredEvents.push({selector, ev, handler});
        }
    })
}
const updateModel = (updated) => {
    model = {...model, ...updated};
    render();
}

const TodoCreation = () => ({
    events: [
        { selector: 'button#btnNew', ev: 'click', handler: () => updateModel({todoCreation: {state: 'CREATE'}}) },
        { selector: 'button#btnCreate', ev: 'click', handler : (e) => {
                const form = e.target.closest('form');
                const title = form.querySelector('input[name="title"]').value
                const importance = form.querySelector('input[name="importance"]').value
                const dueDate = form.querySelector('input[name="dueDate"]').value
                const description = form.querySelector('textarea[name="description"]').value
                updateModel({ todoCreation: { state: 'INIT' }, todos: [...model.todos, {title, importance, dueDate, description}] })
            }
        }],
    template: (model) => `
        <div class="todocreation">
            ${model.todoCreation.state === 'INIT'
                ? ` <div class="todocreation__init">
                        <button class="button" id="btnNew">New</button>
                    </div>`
                : ` <form>
                        <div class="todocreation__create">
                            <div class="form-input">
                                <label for="title">title </label>
                                <input class="form-input__textbox" type="text" name="title" maxlength="30"/>
                            </div>
                            <div class="form-input">
                                <label for="importance">importance </label>
                                <input class="form-input__textbox" type="number" name="importance"/>
                            </div>
                            <div class="form-input">
                                <label for="dueDate">due date </label>
                                <input class="form-input__textbox" type="date" name="dueDate" />
                            </div>
                            <div class="form-input">
                                <label for="description">description </label>
                                <textarea class="form-input__textbox" name="description"></textarea>
                            </div>
                            <div class="form-input">
                                <button class="button" id="btnCreate">Create</button>
                            </div>
                        </div>
                    </form>`
            }
        </div>`
    })

const App = () => {
    return ({
        events: [...TodoCreation().events],
        template: (model) => `
            <div class="main">
                ${TodoCreation().template(model)}
                <div class="todolist">
                    ${model.todos.map(todo => `
                        <div class="todolist__todo">
                            <div>${todo.title}</div>
                            <div>${todo.importance}</div>
                            <div>${todo.dueDate}</div>
                            <div>${todo.description}</div>
                        </div>`)}
                <div>
            </div>`
        })
}

render()