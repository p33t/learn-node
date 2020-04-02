'use strict';

describe('iterator', () => {
    test('basic', () => {
        class BasicIterator {
            constructor() {
                this.ixNext = 0;
            }
            [Symbol.iterator]() {
                return this;
            }

            next() {
                if (this.ixNext > 10) return {done: true};
                return {done: false, value: this.ixNext++};
            }
        }

        let exp = 0;
        for (const ix of new BasicIterator()) {
            expect(ix).toBeLessThanOrEqual(10);
            expect(ix).toBe(exp);
            exp++;
        }
    });

    test('async', async () => {
        class AsyncIterator {
            constructor() {
                this.ixNext = 0;
            }
            [Symbol.asyncIterator]() {
                return this;
            }

            async next() {
                await new Promise(resolve => setTimeout(resolve, 20));
                if (this.ixNext > 10) return {done: true};
                return {done: false, value: this.ixNext++};
            }
        }

        let exp = 0;
        for await (const ix of new AsyncIterator()) {
            expect(ix).toBeLessThanOrEqual(10);
            expect(ix).toBe(exp);
            exp++;
        }

        // manual call
        const ai = new AsyncIterator();
        expect(await ai.next()).toEqual({done: false, value: 0});
        expect(await ai.next()).toEqual({done: false, value: 1});

        // parallel call
        const allValues = await Promise.all([ai.next(), ai.next()]);
        expect(allValues).toEqual([
            {done: false, value: 2},
            {done: false, value: 3},
        ]);
    });
});