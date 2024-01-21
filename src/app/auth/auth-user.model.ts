export class AuthUser {
    constructor(
        public email: string,
        private _token: string,
       // public role:string,
    ) { }

    get token() {
        return this._token;
    }
}