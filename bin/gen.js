#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { program } = require("commander");
const chalk = require("chalk");
const ora = require("ora");
const spinnerstyle = require("../lib/spinners.json");
const nunjucks = require("nunjucks");

const spinner = ora({
  text: chalk.blue("generate template begin"),
  spinner: spinnerstyle.dots,
});

const currentPath = process.cwd();
const pkgPath = path.resolve(__dirname, "../");
const packageJSON = require(`${pkgPath}/package.json`);

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
    let tpls = fs.readdirSync(`${pkgPath}/template`);
    tpls = tpls.map((item) => item.split(".")[0]);
    if (tpls.indexOf(templateFile) === -1) {
      console.log(chalk.red("no matched template file!"));
      return;
    }

    spinner.start("Generating, please wait......");
    const tpl = fs
      .readFileSync(`${pkgPath}/template/${templateFile}.tpl`)
      .toString();

    if (destFiles.length < 1) {
      destFiles.push("Example");
    }
    let outputPath = `${pkgPath}/output`;
    if (currentPath !== pkgPath) {
      outputPath = currentPath;
    }

    let data = { name: "" };
    destFiles.forEach((item, index) => {
      data.name = item;
      const compiledData = nunjucks.renderString(tpl, data);
      fs.writeFileSync(`${outputPath}/${item}.${templateFile}`, compiledData);
      if (index === destFiles.length - 1) {
        spinner.succeed(`Generated successfully!`);
      }
    });
  });

program.parse(process.argv);

(function help() {
  if (program.args.length < 1) return program.help();
})();
