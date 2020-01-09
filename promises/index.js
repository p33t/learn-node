'use strict';

function listPropsAsync(obj) {
    const props = [];
    for (const prop in obj) {
        if (obj.hasOwnProperty(prop)) props.push(prop);
    }
    return Promise.resolve(props);
}

/**
 * Recursively navigate the given object and output a paths (made up of string arrays) corresponding to leaves (non objects).
 * E.g: {a:'a', b: {c: 'c'}} => [['a'], ['b', 'c']]
 */
async function pathsAsync(obj, prefix = []) {
    const ps = await listPropsAsync(obj);
    const deep = await Promise.all(ps.map(async name => {
        const value = obj[name];
        const path = [...prefix, name];
        if (typeof value === "object") return await pathsAsync(value, path);
        else return [path];
    }));
    return deep.reduce((soFar, next) => soFar.concat(next), []);
    // not available....flat(1);
}

/**
 * Same as {@link pathsAsync} but using promises.
 */
function pathsPromise(obj, prefix = []) {
    return listPropsAsync(obj)
        .then(props => {
            return Promise.all(props.map(name => {
                const value = obj[name];
                const path = [...prefix, name];
                if (typeof value === "object") return pathsPromise(value, path);
                else return Promise.resolve([path]);
            }));
        })
        .then(deep => {
            const flat = deep.reduce((soFar, next) => soFar.concat(next), []);
            return Promise.resolve(flat);
        });
}

module.exports = {
    manualPromise: (arg0) => {
        return Promise.resolve(arg0);
    },
    promiseLoggingPromise: (entry) => {
        return async (log) => {
            log.push(entry);
            return log;
        };
    },
    microtaskLoggingPromise: (entry) => {
        return async (log) => queueMicrotask(() => log.push(entry));
    },
    pathsAsync,
    pathsPromise,
};