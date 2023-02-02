-- View all departments
SELECT * FROM depatment;

-- View all roles
SELECT * FROM role;

-- View all employees
SELECT * from employee;

-- Add a department
INSERT INTO department (name)
VALUE ("Department");

-- Add a role
INSERT INTO role (title, salary, department_id)
VALUE ("Title", 0, 1);

-- Add an employee
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("First", "Last", 1, 1);

-- Update an employee role
UPDATE employee
SET role_id = 1
WHERE id = 2;