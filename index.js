const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);
//dont need type becasue input in assumed
function promptUser() {
    return inquirer.prompt([
        {
            message: "What would you like your project title to be?",
            name: "projectName"
        },
        {
            message: "What is your projects decription?",
            name: "descriptionName",
        },
        {

            message: "How do you install this project?",
            name: "installName"
        },
        {

            message: "What is your projects used for?",
            name: "usageName",
        },
        {

            message: "Enter your GitHub Username",
            name: "github",
        },
        {
            message: "Who contributed to this project?",
            name: "contributerName",
        },
        {

            message: "What tests have been preformed on this project?",
            name: "testName",
        },
        {
            message: "What is your email?",
            name: "emailName",
        },
        {
            type: 'list',
            name: 'licenseName',
            message: 'Please select a license for this application',
            choices: ['MIT License', 'GNU AGPLv3', 'GNU GPLv3', 'GNU LGPLv3', 'Mozilla Public License 2.0'
                , 'Apache License 2.0', 'The Unlicense'],
        },
       {

            message: "What is your Email address?",
            name: "emailName",
        },
    ]);
}
function generateMd(answers) {
    return `
# Title 
${answers.projectName}

# License
${answers.licenseName}

# Description
${answers.descriptionName}

## Installation
${answers.installName}

## Usage
${answers.usageName}

## Contributions
${answers.contributerName}

## Tests
${answers.testName}

## Questions
  If you have any questions please contact me at my email: ${answers.emailName}

  To find me on github my username is ${answers.github}
    `;
}

async function init() {
    console.log("hi")
    try {
        const answers = await promptUser();

        const Readme = generateMd(answers);

        await writeFileAsync("readme.md", Readme);

        console.log("Successfully created readme.md");
    } catch (err) {
        console.log(err);
    }
}

init();

