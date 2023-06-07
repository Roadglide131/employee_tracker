USE employee_db;

INSERT INTO department (name) VALUES ("sales"), ("marketing");
INSERT INTO role (title, salary, department_id) VALUES ("commisions", 100.000, 1), ("social media", 60.000, 2);
INSERT INTO employee (first_name, last_name, role_id,manager_id) VALUES ("Ivan", "Ivanov", 1, NULL), ("Jane", "Doe", 2, 1);