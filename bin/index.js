#!/usr/bin/env node

require = require('esm')(module /*, options*/);
const yargs = require("yargs");
require('../src/cli').cli(yargs);