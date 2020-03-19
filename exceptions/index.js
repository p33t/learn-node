'use strict'; // this makes previously bad syntax / practices illegal

try {
    process.chdir("bruce");
} catch (e) {
    const alt = new Error('Failed to change to dir "bruce" because: ' + e.message);
    alt.stack += '\nCaused by: '+ e.stack;
    throw alt;
}

// This doesn't print.... I guess errors don't 'resume' by default
console.log("Still going");
