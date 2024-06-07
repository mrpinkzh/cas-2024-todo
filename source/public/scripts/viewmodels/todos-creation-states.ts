export interface TodoCreationPanelState { };

export class ShowNewButton implements TodoCreationPanelState { }

export class ShowCreationForm implements TodoCreationPanelState {
    buttonState: TodoCreationState;
    constructor(buttonState = new ShowCreateButton()){
        this.buttonState = buttonState;
    }

    creatingTodo(title) {
        this.buttonState = new CreatingTodo(title)
    }

    todoCreated(title) {
        this.buttonState = new TodoCreated(title)
    }
 }

interface TodoCreationState {}

export class ShowCreateButton implements TodoCreationState { }

export class CreatingTodo implements TodoCreationState {
    title: string
    constructor(title){
        this.title = title;
    }
 }

export class TodoCreated implements TodoCreationPanelState {
    title: string
    constructor(title){
        this.title = title;
    }
 }