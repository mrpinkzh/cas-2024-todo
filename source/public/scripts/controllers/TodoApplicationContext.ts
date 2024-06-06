import TodosModel from "../viewmodels/todos-model";

export interface TodoApplicationContext {
    model: TodosModel;
    render() : void;
}