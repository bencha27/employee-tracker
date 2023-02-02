-- "department" table
INSERT INTO department (name)
VALUES ("Sales"),
  ("Engineering"),
  ("Finance"),
  ("Legal");

-- "role" table
INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 100000, 1),
  ("Salesperson", 80000, 1),
  ("Lead Engineer", 150000, 2),
  ("Software Engineer", 120000, 2),
  ("Account Manager", 110000, 3),
  ("Accountant", 90000, 3),
  ("Legal Team Lead", 200000, 4),
  ("Lawyer", 160000, 4);

-- "employee" table
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Stephen", "Curry", 3, null),
	("Draymond", "Green", 1, null),
    ("Klay", "Thompson", 5, null),
    ("Steve", "Kerr", 7, null),
    ("Jordan", "Poole", 4, 3),
    ("Andrew", "Wiggins", 6, 5),
    ("Kevon", "Looney", 2, 1),
    ("Andre", "Iguodala", 8, 7),
    ("Donte", "DiVincenzo", 4, 3),
    ("Jonathan", "Kuminga", 6, 5),
    ("James", "Wiseman", 2, 1),
    ("Kenny", "Atkinson", 8, 7);