const connection = require("./connection");

class DB {
  constructor(connection) {
    this.connection = connection;
  }

  // "viewDepartments" function to view all departments
  viewDepartments() {
    return this.connection.promise().query(
      "SELECT * FROM department;"
    );
  }

  // "viewRoles" function to view all roles
  viewRoles() {
    return this.connection.promise().query(
      "SELECT role.id, role.title, role.salary, department.name AS department FROM role JOIN department ON role.department_id = department.id;"
    );
  }

  // "viewEmployees" function to view all employees
  viewEmployees() {
    return this.connection.promise().query(
      "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id ORDER BY department.id;"
    );
  }

  // "addDepartment" function to add to "department" table
  addDepartment(department) {
    return this.connection.promise().query(
      "INSERT INTO department (name) VALUE (?)", department
    );
  }

  // "addRole" function to add to "role" table
  addRole(role) {
    return this.connection.promise().query(
      "INSERT INTO role SET ?", role
    );
  }

  // "addEmployee" function to add to "employee" table
  addEmployee(employee) {
    return this.connection.promise().query(
      "INSERT INTO employee SET ?", employee
    );
  }

  // "updateEmployee" function to update "employee" table
  updateEmployee(employeeId, update) {
    return this.connection.promise().query(
      "UPDATE employee SET ? WHERE ?", [update, employeeId]
    );
  }
}

module.exports = new DB(connection);