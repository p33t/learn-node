Want to learn command-line but keep within a subfolder (?)
From https://developer.okta.com/blog/2019/06/18/command-line-app-with-nodejs

Can have triggering name that differs from project name.
  E.g. learn-command-line vs pwl-learn-node
  See package.json
  Use commands:
    npm install -g .
    learn-command-line
    npm uninstall -g pwl-learn-node

Will try 'minimist' instead of 'yargs': https://www.npmjs.com/package/minimist
  Has no dependencies (vs 11)
