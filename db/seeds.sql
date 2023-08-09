INSERT INTO department (name)
VALUES  ("Component Control"),
        ("Defense"),
        ("Human Resources"),
        ("Buisness"),
        ("Structural"),
        ("Engineering");

INSERT INTO roles (title, salary, department_id)
VALUES  ("Chief Executive Officer", 165000, 1),
        ("Defense Manager", 65000, 2),
        ("Human Resources Manager", 142000, 3),
        ("Buisness Manager", 69000, 4),
        ("Structural Manager", 79000, 5),
        ("Engineering Manager", 127000, 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("Kirsten", "Wright", 1, NULL),
        ("Saria", null, 2, 1),
        ("Jara", "Wilson", 3 , 1),
        ("Ferdinand", "Clooney", 4 , 1),
        ("Ahren", "Parvis", 5, 1),
        ("Nasti", "Lundrey", 6, 1);