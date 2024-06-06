import TodosModel from "../viewmodels/todos-model";

export interface TodoApplicationEvent {
    selector: string;
    ev: string;
    handler(event);
}

export interface TodoApplicationView {
    events:  TodoApplicationEvent[],
    template(model: TodosModel) :string;
}