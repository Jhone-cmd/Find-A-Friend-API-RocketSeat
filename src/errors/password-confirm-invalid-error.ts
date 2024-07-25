export class PasswordConfirmInvalidError extends Error {
    constructor() {
        super("passwords doesn't match");
    }
}