import { SORT_CRITERIAS } from "../utils.js"

export abstract class SortingState {
    constructor(public criteria: string) { }
}

export class TodosSorted extends SortingState {
    constructor(criteria = SORT_CRITERIAS.TITLE_ASC) {
        super(criteria);
    }
}

export class TodosSorting extends SortingState {
    criterias: string[];
    constructor(currentCriteria: string) {
        super(currentCriteria)
        this.criterias = SORT_CRITERIAS.all()
    }
}