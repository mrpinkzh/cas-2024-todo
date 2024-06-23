import { TodoApplicationContext } from "../controllers/TodoApplicationContext.js"
import todolistSoringController from "../controllers/todolist-sorting-controller.js";
import { TodosFiltered, TodosFiltering } from "../viewmodels/todos-filtering-states.js"
import { TodosSorted, TodosSorting } from "../viewmodels/todos-sorting-states.js"
import { TodoApplicationView } from "./TodoApplicationView.js";

const TodoListSorting = (context: TodoApplicationContext): TodoApplicationView => ({
    events: [{
        selector: 'button#btnSort',
        ev: 'click',
        handler: todolistSoringController(context).showSortCriteria
    },
    {
        selector: '#sortButtonList',
        ev: 'click',
        handler: (e) => {
            const criteria = e.target.dataset.sorting
            todolistSoringController(context).sortWith(criteria)
        }
    },
    {
        selector: 'button#btnFilter',
        ev: 'click',
        handler: todolistSoringController(context).showFilterCriteria
    },
    {
        selector: '#filterButtonList',
        ev: 'click',
        handler: (e) => {
            const criteria = e.target.dataset.filtering
            todolistSoringController(context).filterWith(criteria)
        }
    },],
    template: (model) => `
      <div class="todolist-sorting">
        ${model.todoList.sortBy instanceof TodosSorted
            ? ` <div>
                  <button class="button" id="btnSort">Sort by: ${model.todoList.sortBy.criteria}</button>
                </div>`
            : model.todoList.sortBy instanceof TodosSorting
                ? ` <div class="todolist-sorting-expanded">
                      <label for="sortButtonList">Sort by:</label>
                      <div id="sortButtonList" class="button-list">
                        ${model.todoList.sortBy.criterias.map(criteria => `
                            <button data-sorting="${criteria}" class="button">${criteria}</button>`).join('')}
                      </div>
                    </div>`
                : ``}
        ${model.todoList.filter instanceof TodosFiltered
            ? ` <div>
                  <button class="button" id="btnFilter">Filter: ${model.todoList.filter.criteria}</button>
                </div>`
            : model.todoList.filter instanceof TodosFiltering
                ? ` <div class="todolist-sorting-expanded">
                      <label for="filterButtonList">Filter: </label>
                      <div id="filterButtonList" class="button-list">
                      ${model.todoList.filter.criterias.map(criteria => `
                          <button data-filtering="${criteria}" class="button">${criteria}</button>`).join('')}
                      </div>
                    </div>`
                : ``}
      </div>`
})

export default TodoListSorting