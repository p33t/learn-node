'use strict';
const fs = require('fs');

function restoreCwd(fn) {
  const orig = process.cwd();
  try {
      return fn();
  }
  finally {
      // Not sure how this affects windows and multiple drives
      process.chdir(orig);
  }
}

module.exports = {
    restoreCwd,
};
