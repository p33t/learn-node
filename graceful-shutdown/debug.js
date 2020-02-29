'use strict';

async function main()
{
    await new Promise((resolve) => {
        // setTimeout(resolve, 100000).unref(); // does NOT keep process alive
        setTimeout(resolve, 100000);
    });
}

main();
