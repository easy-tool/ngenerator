#!/usr/bin/env node

const { program } = require("commander");
const chalk = require("chalk");
const ora = require("ora");
const spinnerstyle = require("../lib/spinners.json");
const fs = require("fs");
const nunjucks = require("nunjucks");

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
    // console.log("create command called templateFile: ", templateFile);
    // console.log("create command called destFiles: ", destFiles);

    let tpls = fs.readdirSync(`${currentPath}/template`);
    tpls = tpls.map((item) => item.split(".")[0]);
    // template is not exist
    if (tpls.indexOf(templateFile) === -1) {
      console.log(chalk.red("no matched template file!"));
      return;
    }

    // console.log(chalk.green("matched template file"));
    // read tpl
    const tpl = fs
      .readFileSync(`${currentPath}/template/${templateFile}.tpl`)
      .toString();

    // console.log("tpl: ", tpl);
    if (destFiles.length < 1) {
      destFiles.push("Example");
    }
    let data = { name: "" };
    destFiles.forEach((item) => {
      data.name = item;
      // tpl compile
      const compiledData = nunjucks.renderString(tpl, data);
      // console.log("compiledData: ", compiledData);
      // write file
      fs.writeFileSync(
        `${currentPath}/output/${item}.${templateFile}`,
        compiledData
      );
    });
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
