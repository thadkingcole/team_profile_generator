// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.

// required modules
const Employee = require("./Employee");

// Create Manager class
class Manager extends Employee {
  // Manager is an Employee with the unique property "officeNumber"
  constructor(name, id, email, officeNumber) {
    // create Employee from properties shared with Manager
    super(name, id, email);
    this.officeNumber = officeNumber;
  }

  // methods that return various Manager properties
  getOfficeNumber() {
    return this.officeNumber;
  }

  getRole() {
    // overrides Employee.getRole() to return "Manager"
    return "Manager";
  }
}

// export module
module.exports = Manager;
