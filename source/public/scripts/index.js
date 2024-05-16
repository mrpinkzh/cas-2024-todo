let model = { state: `INIT`, todos: [] }
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
    model = updated;
    render();
}

const App = () => {
    return ({
        events: [
            { selector: 'button#btnNew', ev: 'click', handler: (e) => updateModel({...model, state: 'CREATE'}) },
            { selector: 'button#btnCreate', ev: 'click', handler : (e) => {
                    const form = e.target.closest('form');
                    const title = form.querySelector('input[name="title"]').value
                    const importance = form.querySelector('input[name="importance"]').value
                    updateModel({...model, state: 'INIT', todos: [...model.todos, {title, importance}]})
                }
            }],
        template: (model) => `
            <div>
                ${model.state === 'INIT'
                    ? `<button class="button" id="btnNew">New</button>`
                    : `
                    <form>
                        <label for="title">title: </label>
                        <input type="text" name="title"/>
                        <label for="importance">importance: </label>
                        <input type="text" name="importance" />
                        <button class="button" id="btnCreate">Create</button>
                    </form>`
                }
                <div class="todolist">
                    ${model.todos.map(todo => `
                        <div class="todolist__todo">
                            <div>${todo.title}</div>
                            <div>${todo.importance}</div>
                        </div>`)}
                <div>
            </div>`
        })
}

render()