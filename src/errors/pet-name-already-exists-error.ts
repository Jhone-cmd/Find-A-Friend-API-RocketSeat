export class PetNameAlreadyExistsError extends Error {
    constructor() {
        super('Pet name already exists');
    }
}