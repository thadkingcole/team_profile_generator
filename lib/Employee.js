// Create Employee Class
class Employee {
  // set Employee properties based on constructor input args
  constructor(name, id, email) {
    this.name = name;
    this.id = id;
    this.email = email;
  }

  // methods that return various Employee properties
  getName() {
    return this.name;
  }

  getId() {
    return this.id;
  }

  getEmail() {
    return this.email;
  }

  getRole() {
    return "Employee";
  }
}

// export module
module.exports = Employee;
