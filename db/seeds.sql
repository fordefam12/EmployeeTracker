INSERT INTO department (name)
VALUES ('IT'),
       ('Finance & Accounting'),
       ('Sales & marketing'),
       ('Operations');

INSERT INTO  roles (title, salary, department_id)
VALUES ('full stack developer', 84500, 1),
       ('software engineer', 107714, 1),
       ('accountant', 44866, 2),
       ('finacial analyst', 81096, 2),
       ('sales lead', 28000, 3),
       ('marketing Coordinator', 50636, 3),
       ('project manager', 95682, 4),
       ('operations manager', 115338, 4);
       
       
INSERT INTO employee (first_name, last_name, roles_id,
manager_id)
VALUES ('pam', 'beesley', 2, NULL),
       ('jim', 'halpert', 1, 1),
       ('dwight', 'schrute', 4, NULL),
       ('micheal', 'scott', 3, 3),
       ('ryan', 'howard', 6, NULL),
       ('angela', 'martin', 5, 5),
       ('meredith', 'palmer', 7, NULL),
       ('creed', 'bratton', 8, 7);
       
       