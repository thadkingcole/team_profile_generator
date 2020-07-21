// required modules
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// array to save team members
const team = [];

// create questions arrays for inquirer
// recursive question
const anotherMember = {
  name: "continue",
  type: "confirm",
  message: "Add another team member?",
};

const employeeQuestions = [
  // name
  {
    name: "name",
    type: "input",
    message:
      "Enter the following information about the new team member:\n? Name:",
  },

  // id
  {
    // type: "number" results in NaN that can't be deleted if validation is false
    // quickfix: use type: "input" instead
    // see inquirer issue #866: https://github.com/SBoudrias/Inquirer.js/issues/866
    name: "id",
    type: "input",
    message: "id:",
    validate: (value) =>
      isNaN(value) ? "Please enter a valid id number" : true,
  },

  // email
  {
    name: "email",
    type: "input",
    message: "email:",
    // regex email validation: https://www.w3resource.com/javascript/form/email-validation.php
    validate: (input) =>
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input)
        ? true
        : "Please enter a valid email",
  },

  // role
  {
    name: "role",
    type: "expand",
    message: "role:",
    choices: [
      {
        key: "m",
        name: "Manager",
        value: "manager",
      },
      {
        key: "e",
        name: "Engineer",
        value: "engineer",
      },
      {
        key: "i",
        name: "Intern",
        value: "intern",
      },
    ],
  },

  // Manager only - office number
  {
    name: "officeNumber",
    type: "input",
    message: "Office Number:",
    when: (member) => member.role === "manager",
  },

  // Engineer only - github username
  {
    name: "github",
    type: "input",
    message: "Github Username:",
    when: (member) => member.role === "engineer",
  },

  // Intern only - school name
  {
    name: "school",
    type: "input",
    message: "School:",
    when: (member) => member.role === "intern",
  },
];

// recursively ask if user wants to add another member
function getEmployeeInfo() {
  // get info about the first employee
  inquirer.prompt(employeeQuestions).then((employeeInfo) => {
    switch (employeeInfo.role) {
      case "manager":
        // create new manager with answers from inquirer
        const man = new Manager(
          employeeInfo.name,
          employeeInfo.id,
          employeeInfo.email,
          employeeInfo.officeNumber
        );
        team.push(man); // add new manger to team
        break;
      case "engineer":
        // create new engineer with answers from inquirer
        const eng = new Engineer(
          employeeInfo.name,
          employeeInfo.id,
          employeeInfo.email,
          employeeInfo.github
        );
        team.push(eng); // add new engineer to team
        break;
      case "intern":
        // create new intern with answers from inquirer
        const int = new Intern(
          employeeInfo.name,
          employeeInfo.id,
          employeeInfo.email,
          employeeInfo.school
        );
        team.push(int); // add new intern to team
        break;
      default:
        break;
    }

    // ask if user wants to add another team memmber
    inquirer.prompt(anotherMember).then((answer) => {
      // if yes...
      if (answer.continue) {
        // ...then recursive call
        getEmployeeInfo();
      } else {
        // print team info to console
        console.log(team);
        const html = render(team);
        fs.writeFile(outputPath, html, (err) =>
          err
            ? console.log(err)
            : console.log(`${outputPath} written successfully!`)
        );
      }
    });
  });
}

// main function call
getEmployeeInfo();

/* DONE
  Write code to use inquirer to gather information about the development team members,
  and to create objects for each team member (using the correct classes as blueprints!)
*/

/* DONE
  After the user has input all employees desired, call the `render` function (required
  above) and pass in an array containing all employee objects; the `render` function will
  generate and return a block of HTML including templated divs for each employee!
*/

/* DONE
  After you have your html, you're now ready to create an HTML file using the HTML
  returned from the `render` function. Now write it to a file named `team.html` in the
  `output` folder. You can use the variable `outputPath` above target this location.
  Hint: you may need to check if the `output` folder exists and create it if it
  does not.
*/

/* HINT
  Each employee type (manager, engineer, or intern) has slightly different
  information; write your code to ask different questions via inquirer depending on
  employee type.
*/

/* HINT
  Make sure to build out your classes first! Remember that your Manager, Engineer,
  and Intern classes should all extend from a class named Employee; see the directions
  for further information. Be sure to test out each class and verify it generates an
  object with the correct structure and methods. This structure will be crucial in order
  for the provided `render` function to work! ```
*/
