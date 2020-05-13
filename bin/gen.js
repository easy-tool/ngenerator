#!/usr/bin/env node

const { program } = require("commander");
const chalk = require("chalk");
const ora = require("ora");
const spinnerstyle = require("../lib/spinners.json");

const currentPath = process.cwd();
const packageJSON = require(`${currentPath}/package.json`);

program
  .version(packageJSON.version, "-v, --version")
  .description("code generator by nodejs")
  .usage("<command> [filename]");

program.on("--help", function () {
  console.log("");
  console.log("  Examples:");
  console.log("");
  console.log("    $ gen --help");
  console.log("    $ gen -h");
  console.log("");
  console.log(chalk.gray("    # create a new vue filey"));
  console.log("    $ gen vue <file_name>");
  console.log(chalk.gray("    # create a new react file"));
  console.log("    $ gen react <file_name>");
  console.log(chalk.gray("    # create a new file by custom template"));
  console.log("    $ gen <template_name> <file_name>");
  console.log("");
});

program.parse(process.argv);

(function help() {
  if (program.args.length < 1) return program.help();
})();

const spinner = ora({
  text: chalk.blue("generate template begin"),
  spinner: spinnerstyle.dots,
});
