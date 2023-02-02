-- "department" table
INSERT INTO department (name)
VALUES ("Sales"),
  ("Engineering"),
  ("Finance"),
  ("Legal");

-- "role" table
INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 110000, 1),
  ("Salesperson", 80000, 1),
  ("Lead Engineer", 160000, 2),
  ("Software Engineer", 130000, 2),
  ("Account Manager", 120000, 3),
  ("Accountant", 90000, 3),
  ("Legal Team Lead", 200000, 4),
  ("Lawyer", 150000, 4);

-- "employee" table
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Stephen", "Curry", 3, null),
	("Draymond", "Green", 1, null),
  ("Klay", "Thompson", 5, null),
  ("Steve", "Kerr", 7, null),
  ("Jordan", "Poole", 4, 1),
  ("Andrew", "Wiggins", 6, 3),
  ("Kevon", "Looney", 2, 2),
  ("Andre", "Iguodala", 6, 3),
  ("Donte", "DiVincenzo", 4, 1),
  ("Jonathan", "Kuminga", 6, 3),
  ("James", "Wiseman", 2, 2),
  ("Kenny", "Atkinson", 8, 4);