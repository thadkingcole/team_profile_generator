// required modules
const Employee = require("./Employee");

// Create Intern class
class Intern extends Employee {
  // Intern is an Employee with the unique property "school"
  constructor(name, id, email, school) {
    // create Employee from properties shared with Intern
    super(name, id, email);
    this.school = school;
  }

  // methods that return various Intern properties
  getSchool() {
    return this.school;
  }

  getRole() {
    // overrides Employee.getRole() to return "Intern"
    return "Intern";
  }
}

// export module
module.exports = Intern;
