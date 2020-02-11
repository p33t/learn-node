'use strict';
const myObj = require('./index');

// Doesn't work; exports is not called repeatedly...
// Object.assign(module, {
//     get exports() {
//         return {
//             my: 'object',
//         }
//     }
// });
//
//const myObj = require('./index');
// describe('read-only module export object', () => {
//     test('new obj each time', () => {
//         expect(myObj).toEqual({my: 'object'});
//         myObj.extra='property';
//         expect(myObj).toEqual({my: 'object'});
//     });
//});