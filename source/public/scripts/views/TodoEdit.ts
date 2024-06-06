const TodoEdit = (todo:any) => (`
    <form>
        <div class="todo-create-panel">
            <div class="form-input">
                <label for="title">title </label>
                <input class="textbox" type="text" name="title" value="${todo.title}" required/>
            </div>
            <div class="form-input">
                <label for="importance">importance </label>
                <input class="textbox" type="number" name="importance" value="${todo.importance}" min="1" max="10" value="1" required/>
            </div>
            <div class="form-input">
                <label for="dueDate">due date </label>
                <input class="textbox" type="date" name="dueDate" value="${todo.dueDate}" />
            </div>
            <div class="todo-create-panel-area form-input">
                <label for="description">description </label>
                <textarea class="textbox" name="description" rows="4">
                    ${todo.description}
                </textarea>
            </div>
            <div class="todo-create-panel-buttons form-input">
                <button class="button button-secondary" id="btnCancelUpdate">Cancel</button>
                <button class="button" id="btnUpate">Update</button>
            </div>
        </div>
    </form>`); 

export default TodoEdit;