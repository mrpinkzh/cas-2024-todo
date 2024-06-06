import { SORT_CRITERIAS } from "../utils.js"

class State {
}

export class TodosSorted extends State {
    constructor(criteria = SORT_CRITERIAS.TITLE_ASC) {
        super()
        this.criteria = criteria
    }
}

export class TodosSorting extends State {
    constructor(currentCriteria) {
        super()
        this.criteria = currentCriteria
        this.criterias = SORT_CRITERIAS.all()
    }
}