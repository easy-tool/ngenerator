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
  .name("ngenerator")
  .usage("<command> <template_file> [file_name]");

program.on("--help", function () {
  console.log("");
  console.log("  Examples:");
  console.log("");
  console.log("    $ gen --help");
  console.log("    $ gen -h");
  console.log("");
  console.log(chalk.gray("    # create a new vue filey"));
  console.log("    $ gen create vue <file_name>");
  console.log(chalk.gray("    # create a new react file"));
  console.log("    $ gen create react <file_name>");
  console.log(chalk.gray("    # create a new file by custom template"));
  console.log("    $ gen create <template_name> <file_name>");
  console.log("");
});

program
  .command("create <template_file> [file_name...]")
  .description("create code file with template file")
  .action((templateFile, destFiles) => {
    console.log("create command called templateFile: ", templateFile);
    console.log("create command called destFiles: ", destFiles);
  });

program.parse(process.argv);

(function help() {
  // console.log("program args: ", program.args);
  if (program.args.length < 1) return program.help();
})();

const spinner = ora({
  text: chalk.blue("generate template begin"),
  spinner: spinnerstyle.dots,
});
