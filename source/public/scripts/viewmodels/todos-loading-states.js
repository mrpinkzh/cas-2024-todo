import { TodosSorted, TodosSorting } from "./todos-sorting-states.js";
import { TodosFiltered, TodosFiltering } from "./todos-filtering-states.js";

class State { }

export class TodosNotLoaded extends State {
    constructor(sortBy = new TodosSorted(), filter = new TodosFiltered()){
        super();
        this.sortBy = sortBy;
        this.filter = filter;
    }
 }

export class TodosLoaded extends State {
    constructor(
        todos = [], 
        sortingState = new TodosSorted(), 
        filteringState = new TodosFiltered()) {
        super();
        this.todos = todos;
        this.sortBy = sortingState;
        this.filter = filteringState;
    }

    showSortCriterias() {
        if (this.sortBy instanceof TodosSorted)
            this.sortBy = new TodosSorting(this.sortBy.criteria)
    }

    sortWith(criteria) {
        if (this.sortBy instanceof TodosSorting)
            this.sortBy = new TodosSorted(criteria)
    }

    showFilterCriterias() {
        if (this.filter instanceof TodosFiltered)
            this.filter = new TodosFiltering(this.filter.criteria)
    }

    filterWith(criteria) {
        if (this.filter instanceof TodosFiltering)
            this.filter = new TodosFiltered(criteria)
    }
}