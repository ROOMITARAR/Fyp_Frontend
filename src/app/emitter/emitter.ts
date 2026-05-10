// emitter.ts

import { EventEmitter } from '@angular/core';

export class Emitters {
    static authEmitter = new EventEmitter<boolean>();
    private static _authenticated = false;

    static set authenticated(value: boolean) {
        this._authenticated = value;
        this.authEmitter.emit(value);
    }

    static get authenticated(): boolean {
        return this._authenticated;
    }
}
