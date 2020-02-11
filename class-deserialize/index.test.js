'use strict';

class C1 {
    static get F3() {
        return 'f3-value';
    }

    constructor(f1) {
        this.f1 = f1;
    }

    get f2() {
        return 'f2-value';
    }
}

describe('Class serialize/deserialize', () => {
    test('Deserialize a class with Object.setPrototypeOf()', () => {
        const c1 = new C1('f1-value');
        const c1Alt = JSON.parse(JSON.stringify(c1));
        const p = C1.prototype;
        Object.setPrototypeOf(c1Alt, p);
        expect(c1Alt instanceof C1).toBe(true);
        expect(c1Alt.f1).toBe('f1-value');
        expect(c1Alt.f2).toBe('f2-value');
        expect(C1.F3).toBe('f3-value');
        // NOPE... expect(p.F3).toBe('f3-value');
    });
});
