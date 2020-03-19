'use strict';
const {spawn} = require('child_process');
const path = require('path');

/*
Use this powershell...

$LASTEXITCODE=$null; node .\scratch.js; echo ''; $?; $LASTEXITCODE;

 */

//process.stdout.write("hello", 'utf-8');
process.stderr.write("grrr\n", 'utf-8');
// process.exitCode = 99;
// throw new Error('Exit now');


function sleepAsync() {
    return new Promise(resolve => {
        setTimeout(resolve, 3000);
    });
}

async function main() {
    // process.stdout.write('in main()\n');
    // process.exitCode = 22;

    let child = spawn('node', [path.resolve(__dirname, 'app.js'), '3', '99']);
    child.stdout.on('data', data => {
        process.stdout.write(data);
    });
    // this pertains to stdio streams
    child.on('close', (code) => {
        console.log('closed with code ' + code);
    });
    // this is actual process conclusion
    child.on('exit', (code) => {
        console.log('exit with code ' + code);
    });

    await sleepAsync();

    let success;

    // this results in exit code 'null'
    success = child.kill('SIGINT');
    console.log('killed ' + success);

    // not what you think
    // success = child.send('99');
    // console.log('sent 99: ' + success);

    // success = child.stdin.write('99\u0017', 'utf-8');
    // console.log('wrote 99: ' + success);

    await sleepAsync();
}

main().then(() => process.stdout.write("scratch-done\n"));
