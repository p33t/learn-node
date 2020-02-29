'use strict';

let terminateReceived = false;

function shutdown() {
    process.stdout.write('x');
    terminateReceived = true;
}

console.log(`Setting SIGINT on process ${process.pid}`);
// Hmmm.... I thought this should be SIGTERM ?!
process.on('SIGINT', shutdown);

async function main() {
    console.log('Press Ctrl-C to terminate gracefully ' + process.pid);
    while (!terminateReceived) {
        await new Promise((resolve) => {
            setTimeout(resolve, 1000);
        });
        process.stdout.write(`.`);
    }
    process.stdout.write('!');
}

main()
    .then(() => {
        console.log('done');
        // process.exit();
    })
    .catch(err => {
        process.stderr.write(`${err}\n${err.stack}`);
        process.exit(-1);
    });
