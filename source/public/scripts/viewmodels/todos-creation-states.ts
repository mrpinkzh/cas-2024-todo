export interface TodoCreationState { };

export class ShowNewButton implements TodoCreationState { }

export class ShowCreationForm implements TodoCreationState { }

export class CreatingTodo implements TodoCreationState { }

export class TodoCreated implements TodoCreationState { }