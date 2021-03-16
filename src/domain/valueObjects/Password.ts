import {SHA512} from 'crypto-js';

export class Password {

    public readonly retPwd: string;

    constructor(pwd: string) {
        if(!this.validatePassword(pwd)) {
            throw new Error("Ivalid password.");
        }
        
        this.retPwd = this.encryptPwd(pwd);
    }

    private validatePassword(pwd: string): boolean {
        if((pwd.length < 5 || pwd.length > 20)) {
            return false;
        }

        if(!/[a-z]+[0-9]+[A-Z]+[!\@\#\$\%\^\&\*()_-+=;:\'\"\\<>/?,.|]+/.test(pwd)) {
            return false;
        }

        return true;
    }

    private encryptPwd(inPwd: string): string {
        return SHA512(inPwd).toString();
    }
}
