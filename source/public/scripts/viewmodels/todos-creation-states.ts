export interface TodoCreationState { };

export class ShowNewButton implements TodoCreationState { }

export class ShowCreationForm implements TodoCreationState {
    buttonState: CreationButtonState;
    constructor(buttonState = new ShowCreateButton()){
        this.buttonState = buttonState;
    }

    creatingTodo(title) {
        this.buttonState = new CreatingTodo(title)
    }
 }

export interface CreationButtonState {}

export class ShowCreateButton implements CreationButtonState { }

export class CreatingTodo implements CreationButtonState {
    title: string
    constructor(title){
        this.title = title;
    }
 }

export class TodoCreated implements TodoCreationState { }