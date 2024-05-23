import { Command } from 'commander';
import { VERSION, removeSpaces } from './helper';
import chalk from 'chalk';
import inquirer from 'inquirer';
import fs from 'fs-extra';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const program = new Command();
const cwd = process.cwd();

enum TemplateEnum {
  MICRO = '微应用',
  NORMAL = '普通应用',
  MAIN = '基座应用',
  H5 = 'H5应用'
}

const getTemplateName = (template: TemplateEnum, language: string) => {
  if (template === TemplateEnum.MICRO) return `template-micro-${language}`;
  if (template === TemplateEnum.NORMAL) return `template-normal-${language}`;
  if (template === TemplateEnum.MAIN) return `template-main-${language}`;
  if (template === TemplateEnum.H5) return `template-h5-${language}`;
};

const createTemplate = (template: TemplateEnum, language: string, projectName: string) => {
  const templateName = getTemplateName(template, language);
  const templateDir = path.resolve(fileURLToPath(import.meta.url), `../../${templateName}`);
  const root = path.join(cwd, projectName);
  const files = fs.readdirSync(templateDir);
  for (const file of files) {
    if (
      file === '.DS_Store' ||
      file === '.git' ||
      file === '.turbo' ||
      file === 'node_modules' ||
      file === 'yarn.lock'
    ) {
      continue;
    }
    fs.copySync(path.join(templateDir, file), path.resolve(root, file));
  }
  const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf-8'));
  pkg.name = projectName;
  fs.writeFileSync(path.join(root, 'package.json'), JSON.stringify(pkg, null, 2));
  let readmeName = 'README_MAIN';
  if (template === TemplateEnum.MICRO) {
    readmeName = 'README_MICRO';
  }
  fs.copySync(path.resolve(fileURLToPath(import.meta.url), `../../${readmeName}.md`), path.join(root, 'README.md'));

  console.log('\t');
  console.log(chalk.green('创建成功!'));
  console.log(chalk.green(`cd ${projectName}`));
  console.log(chalk.green('yarn'));
  console.log(chalk.green('yarn dev'));
};

const initCreateCommand = () => {
  program
    .command('create')
    .description('create one project!')
    .action(async () => {
      const nameAnswers = await inquirer.prompt([
        {
          type: 'input',
          name: 'name',
          message: '请输入项目名称:'
        }
      ]);
      if (!nameAnswers.name) {
        console.log(chalk.red('项目名称不能为空!'));
        process.exit();
      }
      if (fs.existsSync(nameAnswers.name)) {
        console.log(chalk.red('项目名称已经存在!'));
        process.exit();
      }

      const typeAnswers = await inquirer.prompt([
        {
          type: 'list',
          name: 'template',
          message: '选择工程类型：',
          choices: [TemplateEnum.MICRO, TemplateEnum.NORMAL, TemplateEnum.MAIN, TemplateEnum.H5]
        }
      ]);
      const languageAnswers = await inquirer.prompt([
        {
          type: 'list',
          name: 'language',
          message: '选择使用开发语言：',
          choices: ['javascript', 'typescript']
        }
      ]);

      createTemplate(typeAnswers.template, languageAnswers.language, removeSpaces(nameAnswers.name));
    });
};

initCreateCommand();

program.version(chalk.green(`v${VERSION}`), '-v --version');

program.parse(process.argv);
