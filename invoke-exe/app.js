'use strict';

// Output messages /////////////////////////////
function out(msg, writeStream = process.stdout) {
    writeStream.write(msg, 'utf-8');
}

function err(msg) {
    out(msg, process.stderr);
}

let msgReceived;
// process.on('message', msg => {
//     msgReceived = msg;
// });

// Prevents clean exit
// process.stdin.setEncoding('utf-8');
// process.stdin.on('data', data => {
//     msgReceived = data;
// });
// process.stdin.on('end', data => {
//    console.log('stdin end');
// });

// Shutdown signal ////////////////////////////
// let intReceived = false;
// process.on('SIGINT', () => {
//     intReceived = true;
//     out('ack.');
// });

// No effect...
// process.on('close', (code, signal) => {
//     out(`child process terminated due to receipt of signal ${signal}\n`);
// });

// process.on('SIGTERM', () => {
//     process.exit(process.exitCode);
// });

// process.on('SIGKILL', () => {
//     process.exit(-99);
// });

const desiredSecs = Math.max(parseInt(process.argv[2] || '10'), 1);
const desiredExitCode = parseInt(process.argv[3] || 0);
err(`Will run for ${desiredSecs}s and exit with code ${desiredExitCode}\n`);

async function run() {
    process.exitCode = desiredExitCode;
    for (let i = 1; i <= desiredSecs; i++) {
        // if (msgReceived) {
        //     process.exitCode = desiredExitCode;
            // process.stdin.write('\cd', 'utf-8'); // conclude std-in
            // process.stdin.write('\u0017', 'utf-8'); // conclude std-in
            // process.stdin.pause();
            // process.stdin.end();
            // break;
        // }
        out(`#${i}.`);

        // sleep
        await new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, 1000);
        });
    }
    // console.log('run finished with exit code ' + process.exitCode);

    // nope...
    // process.stdin.on('data', null);
}

run().then(() => out('finished'));
