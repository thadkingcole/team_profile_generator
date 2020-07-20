// required modules
const Employee = require("./Employee");

// Create Engineer class
class Engineer extends Employee {
  // set Engineer properties based on constructor input args
  constructor(name, id, email, github) {
    // create Employee from properties shared with Engineer
    super(name, id, email);
    this.github = github;
  }

  // methods that return various Engineer properties
  getGithub() {
    return this.github;
  }

  getRole() {
    // overrides employee.getRole to return "engineer"
    return "Engineer";
  }
}

// export module
module.exports = Engineer;
