export class EmailAlreadyExistsError extends Error {
    constructor() {
        super('email already exists');
    }
}