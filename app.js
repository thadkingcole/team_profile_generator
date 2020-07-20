const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

/* 
  Write code to use inquirer to gather information about the development team members,
  and to create objects for each team member (using the correct classes as blueprints!)
*/

// array to save team members
const teamMembers = [];

// create questions arrays for inquirer
const newMember = [
  // recursive question
  {
    type: "confirm",
    name: "continue",
    message: "Add a new team member?",
  },
];

const memberInfo = [
  // name
  {
    type: "input",
    name: "name",
    message:
      "Enter the following information about the new team member:\nName:",
  },

  // id
  {
    // type: "number" results in NaN that can't be deleted if validation is false
    // quickfix: use type: "input" instead
    // see inquirer issue #866: https://github.com/SBoudrias/Inquirer.js/issues/866
    type: "input",
    name: "id",
    message: "id:",
    validate: (value) =>
      isNaN(value) ? "Please enter a valid id number" : true,
  },

  // email
  {
    type: "input",
    name: "email",
    message: "email:",
    // regex email validation: https://www.w3resource.com/javascript/form/email-validation.php
    validate: (input) =>
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input)
        ? true
        : "Please enter a valid email",
  },
];

// recursively ask if user wants to add another member
function askNewMember() {
  inquirer.prompt(newMember).then((answer) => {
    // if user wants to add a new member...
    if (answer.continue) {
      // ...get info for new member desired by user
      inquirer.prompt(memberInfo).then((answers) => {
        teamMembers.push(answers); // add new member info to teamMembers array
        askNewMember(); // recursive loop
      });
    } else {
      // stop recursion
      console.log(teamMembers); // print info for all teamMembers added
    }
  });
}

askNewMember();

/* 
  After the user has input all employees desired, call the `render` function (required
  above) and pass in an array containing all employee objects; the `render` function will
  generate and return a block of HTML including templated divs for each employee!
*/

/*
  After you have your html, you're now ready to create an HTML file using the HTML
  returned from the `render` function. Now write it to a file named `team.html` in the
  `output` folder. You can use the variable `outputPath` above target this location.
  Hint: you may need to check if the `output` folder exists and create it if it
  does not.
*/

/*
  HINT: each employee type (manager, engineer, or intern) has slightly different
  information; write your code to ask different questions via inquirer depending on
  employee type.
*/

/*
  HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
  and Intern classes should all extend from a class named Employee; see the directions
  for further information. Be sure to test out each class and verify it generates an
  object with the correct structure and methods. This structure will be crucial in order
  for the provided `render` function to work! ```
*/
