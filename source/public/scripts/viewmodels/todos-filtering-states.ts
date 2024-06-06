import { FILTER_CRITERIAS } from "../utils.js"

export abstract class FilteringState {
    criteria: string;
    constructor(criteria: string){
        this.criteria = criteria;
    }
 }

export class TodosFiltered extends FilteringState {
    constructor(criteria = FILTER_CRITERIAS.NONE){
        super(criteria);
    }
}


export class TodosFiltering extends FilteringState {
    criterias: string[];
    constructor(currentCriteria) {
        super(currentCriteria);
        this.criterias = FILTER_CRITERIAS.all()
    }
}