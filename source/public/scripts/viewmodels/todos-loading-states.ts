import { SortingState, TodosSorted, TodosSorting } from "./todos-sorting-states.js";
import { FilteringState, TodosFiltered, TodosFiltering } from "./todos-filtering-states.js";

export abstract class LoadingState {
    sortBy: SortingState;
    filter: FilteringState;

    constructor(sortBy: SortingState, filter: FilteringState) {
        this.sortBy = sortBy;
        this.filter = filter;
    }
 }

export class TodosNotLoaded extends LoadingState {
    constructor(sortBy = new TodosSorted(), filter = new TodosFiltered()) {
        super(sortBy, filter)
    }
 }

export class TodosLoaded extends LoadingState {
    todos: any[];
    constructor(todos = [], sortingState = new TodosSorted(), filteringState = new TodosFiltered()) {
        super(sortingState, filteringState)
        this.todos = todos;
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