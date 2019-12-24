function sum(a, b) {
    if (typeof(a) === 'string') throw new Error("Strings not allowed");
    return a + b;
}
module.exports = sum;