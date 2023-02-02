const inq = require("inquirer");
const db = require("./db");
const consoleTable = require("console.table");
const logo = require("asciiart-logo");
const config = require("./package.json");

// Initialize app
init();

// "init" function to initialize app (render logo, load prompts)
function init() {
  console.log(logo(config).render());

  loadPrompts();
}

// "loadPrompts" function to load prompts
function loadPrompts() {
  inq
    .prompt([
      {
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: [
          {
            name: "View all departments",
            value: "View departments"
          },
          {
            name: "View all roles",
            value: "View roles"
          },
          {
            name: "View all employees",
            value: "View employees"
          },
          {
            name: "Add a department",
            value: "Add department"
          },
          {
            name: "Add a role",
            value: "Add role"
          },
          {
            name: "Add an employee",
            value: "Add employee"
          },
          {
            name: "Update an employee",
            value: "Update employee"
          },
          {
            name: "Quit",
            value: "Quit"
          }
        ]
      }
    ])
    .then((choice) => {
      switch (choice.action) {
        case "View departments":
          viewDepartments();
          break;
        case "View roles":
          viewRoles();
          break;
        case "View employees":
          viewEmployees();
          break;
        case "Add department":
          addDepartment();
          break;
        case "Add role":
          addRole();
          break;
        case "Add employee":
          addEmployee();
          break;
        case "Update employee":
          updateEmployee();
          break;
        default:
          quit();
      }
    })
}

// "viewDepartments" function to view all departments
function viewDepartments() {
  db.viewDepartments()
    .then(([rows]) => {
      let departmentTable = rows;
      console.log("\n");
      console.table(departmentTable);
    })
    .then(() => loadPrompts());
}

// "viewRoles" function to view all roles
function viewRoles() {
  db.viewRoles()
    .then(([rows]) => {
      let roleTable = rows;
      console.log("\n");
      console.table(roleTable);
    })
    .then(() => loadPrompts());
}

// "viewEmployees" function to view all employees
function viewEmployees() {
  db.viewEmployees()
    .then(([rows]) => {
      let employeeTable = rows;
      console.log("\n");
      console.table(employeeTable);
    })
    .then(() => loadPrompts());
}

// "addDepartment" function to add a department
function addDepartment() {
  inq
    .prompt([
      {
        name: "departmentName",
        message: "Enter the name of the department."
      }
    ])
    .then((input) => {
      db.addDepartment(input.departmentName)
      .then(() => {
        console.log("\n");
        console.log(`Added ${input.departmentName} to department database`);
      })
      .then(() => loadPrompts());
    })
}

// "addRole" function to add a role
function addRole() {
  // Create array of choices from departments in the database
  let departmentChoices = [];
  db.viewDepartments()
    .then(([rows]) => {
      let departmentTable = rows;
      for (let i = 0; i < departmentTable.length; i++) {
        departmentChoices.push({
          name: departmentTable[i].name,
          value: departmentTable[i].id
        });
      }

      inq
        .prompt([
          {
            name: "title",
            message: "Enter the title of the role."
          },
          {
            name: "salary",
            message: "Enter the salary (numbers only) for the role."
          },
          {
            type: "list",
            name: "department_id",
            message: "Choose a department for the role.",
            choices: departmentChoices
          }
        ])
        .then((input) => {
          db.addRole(input)
          .then(() => {
            console.log("\n");
            console.log(`Added ${input.title} to role database`);
          })
          .then(() => loadPrompts());
        })
    })

}

// "addEmployee" function to add an employee
function addEmployee() {
  // Create array of choices from roles in the database
  let roleChoices = [];
  db.viewRoles()
    .then(([rows]) => {
      let roleTable = rows;
      for (let i = 0; i < roleTable.length; i++) {
        roleChoices.push({
          name: roleTable[i].title,
          value: roleTable[i].id
        });
      }

      // Create array of choices from managers in the database
      let managerChoices = [];
      db.viewEmployees()
        .then(([rows]) => {
          let employeeTable = rows;
          for (let i = 0; i < employeeTable.length; i++) {
            managerChoices.push({
              name: `${employeeTable[i].first_name} ${employeeTable[i].last_name}`,
              value: employeeTable[i].id
            });
          }
          managerChoices.push({
            name: "None",
            value: null
          });

          inq
            .prompt([
              {
                name: "first_name",
                message: "Enter the first name of the employee."
              },
              {
                name: "last_name",
                message: "Enter the last name of the employee."
              },
              {
                type: "list",
                name: "role_id",
                message: "Select the role of the employee.",
                choices: roleChoices
              },
              {
                type: "list",
                name: "manager_id",
                message: "Choose the manager for the employee.",
                choices: managerChoices
              }
            ])
            .then((input) => {
              db.addEmployee(input)
              .then(() => {
                console.log("\n");
                console.log(`Added ${input.first_name} ${input.last_name} to employee database`);
              })
              .then(() => loadPrompts());
            })
        })
    })
}

// "updateEmployee" function to update an employee
function updateEmployee() {
  // Create an array of choices from employees in the database
  let employeeChoices = [];
  db.viewEmployees()
    .then(([rows]) => {
      let employeeTable = rows;
      for (let i = 0; i < employeeTable.length; i++) {
        employeeChoices.push({
          name: `${employeeTable[i].first_name} ${employeeTable[i].last_name}`,
          value: {
            name: `${employeeTable[i].first_name} ${employeeTable[i].last_name}`,
            id: employeeTable[i].id
          }
        });
      }

      inq
        .prompt([
          {
            type: "list",
            name: "employee",
            message: "Choose an employee to update.",
            choices: employeeChoices
          },
          {
            type: "list",
            name: "info",
            message: "Choose employee info to update.",
            choices: [{
              name: "Role",
              value: "Role"
            },
            {
              name: "Manager",
              value: "Manager"
            }
          ]
          }
        ])
        .then((update) => {
          switch (update.info) {
            case "Role":
              updateRole(update.employee);
              break;
            case "Manager":
              updateManager(update.employee);
              break;
            default:
              console.log("Invalid choice");
              quit();
          }
        })
    })
}

// "updateRole" function to update employee role
function updateRole(employee) {
  let roleChoices = [];
  db.viewRoles()
    .then(([rows]) => {
      let roleTable = rows;
      for (let i = 0; i < roleTable.length; i++) {
        roleChoices.push({
          name: roleTable[i].title,
          value: roleTable[i].id
        });
      }

      inq
        .prompt({
          type: "list",
          name: "role_id",
          message: "Choose a new role for the employee.",
          choices: roleChoices
        })
        .then((role) => {
          let employeeId = { id: employee.id }
          db.updateEmployee(employeeId, role)
          .then(() => {
            console.log("\n");
            console.log(`Updated ${employee.name}'s role in the employee database`);
          })
          .then(() => loadPrompts());
        })
    })
}

// "updateManager" function to update employee manager
function updateManager(employee) {
  // Create array of choices from managers in the database
  let managerChoices = [];
  db.viewEmployees()
    .then(([rows]) => {
      let employeeTable = rows;
      for (let i = 0; i < employeeTable.length; i++) {
        managerChoices.push({
          name: `${employeeTable[i].first_name} ${employeeTable[i].last_name}`,
          value: employeeTable[i].id
        });
      }
      managerChoices.push({
        name: "None",
        value: "null"
      });

      inq
        .prompt({
          type: "list",
          name: "manager_id",
          message: "Choose a new manager for the employee.",
          choices: managerChoices
        })
        .then((manager) => {
          let employeeId = { id: employee.id }
          db.updateEmployee(employeeId, manager)
          .then(() => {
            console.log("\n");
            console.log(`Updated ${employee.name}'s manager in the employee database`);
          })
          .then(() => loadPrompts());
        })
    })
}

// "quit" function to exit the app
function quit() {
  console.log("\n");
  console.log("Closing Employee Tracker");
  process.exit();
}