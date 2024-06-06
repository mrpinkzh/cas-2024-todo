import { FILTER_CRITERIAS } from "../utils.js"

class State { }

export class TodosFiltered extends State {
    constructor(criteria = FILTER_CRITERIAS.NONE){
        super()
        this.criteria = criteria
    }
}


export class TodosFiltering extends State {
    constructor(currentCriteria){
        super()
        this.criteria = currentCriteria
        this.criterias = FILTER_CRITERIAS.all()
    }
}