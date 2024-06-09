import { TodosLoaded } from "../viewmodels/todos-loading-states.js";
import { TodoApplicationContext } from "./TodoApplicationContext.js";

const todolistSoringController = ({ model, render }: TodoApplicationContext) => ({
    showSortCriteria() {
        if (model.todoList instanceof TodosLoaded) {
            model.todoList.showSortCriterias();
            render();
        }
    },
    sortWith(criteria: string) {
        if (model.todoList instanceof TodosLoaded) {
            model.todoList.sortWith(criteria);
            render();
        }
    },
    showFilterCriteria() {
        if (model.todoList instanceof TodosLoaded) {
            model.todoList.showFilterCriterias();
            render();
        }
    },
    filterWith(criteria: string) {
        if (model.todoList instanceof TodosLoaded) {
            model.todoList.filterWith(criteria);
            render();
        }
    }
})

export default todolistSoringController;