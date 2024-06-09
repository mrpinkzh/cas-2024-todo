import { SortingState, TodosSorted, TodosSorting } from "./todos-sorting-states.js";
import { FilteringState, TodosFiltered, TodosFiltering } from "./todos-filtering-states.js";
import { Show, TodoState, ShowEditing, ShowDeleting } from "./todo-model.js";

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
    constructor(
        public todos = [],
        sortingState: SortingState = new TodosSorted(),
        filteringState: FilteringState = new TodosFiltered(),
        public itemAction: ItemActionState = new NoItemAction()) {

        super(sortingState, filteringState)
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

    showEditMode(todoId: string): void {
        if (this.itemAction instanceof NoItemAction)
            this.itemAction = new Editing(todoId);
    }

    showReadOnlyMode(): void {
        if (this.itemAction instanceof Editing)
            this.itemAction = new NoItemAction();
    }

    deletingTodo(todoId): void {
        this.itemAction = new Deleting(todoId);
    }
}

export abstract class ItemActionState {
    abstract evaluateTodoStateFor(tododId: string): TodoState;
}

export class NoItemAction extends ItemActionState {
    evaluateTodoStateFor(tododId: string) {
        return new Show(true);
    }
}

export abstract class ItemActionWithTodoId extends ItemActionState {
    constructor(public todoId: string) { super() }

    abstract evaluateTodoStateFor(tododId: string): TodoState;
}

export class Editing extends ItemActionWithTodoId {
    evaluateTodoStateFor(tododId: string): TodoState {
        if (this.todoId === tododId)
            return new ShowEditing();
        return new Show(false);
    }
}

export class Deleting extends ItemActionWithTodoId {
    evaluateTodoStateFor(tododId: string): TodoState {
        if (this.todoId === tododId)
            return new ShowDeleting();
        return new Show(false);
    }
}