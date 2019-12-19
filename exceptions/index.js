'use strict'; // this makes previously bad syntax / practices illegal

process.chdir("bruce");

// This doesn't print.... I guess errors don't 'resume' by default
console.log("Still going");
