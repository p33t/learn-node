'use strict';

// from https://stackoverflow.com/a/35586247/358006

const { spawnSync } = require( 'child_process' );

// Synchronous
const nodeV = spawnSync( 'node', [ '-v' ] );
console.log("Result of 'node -v':");
console.log( `stderr: ${nodeV.stderr.toString()}` );
console.log( `stdout: ${nodeV.stdout.toString()}` );
console.log( `status: ${nodeV.status}` );
console.log( `error: ${nodeV.error}` );
console.log();

const nodeBad= spawnSync( 'node', [ 'bad', 'args' ] );
console.log("Result of 'node bad args':");
console.log( `stderr: ${nodeBad.stderr.toString()}` );
console.log( `stdout: ${nodeBad.stdout.toString()}` );
// status 1
console.log( `status: ${nodeBad.status}` );
// is 'undefined'
console.log( `error: ${nodeBad.error}` );
console.log();

const garbage= spawnSync( 'fsddvc', [ 'bad', 'args' ] );
console.log("Result of 'fsddvc bad args':");
// is 'null'
console.log( `stderr: ${garbage.stderr}` );
// is 'null'
console.log( `stdout: ${garbage.stdout}` );
// is 'null'
console.log( `status: ${garbage.status}` );
// contains: Error: spawnSync fsddvc ENOENT
console.log( `error: ${garbage.error}` );
console.log();

