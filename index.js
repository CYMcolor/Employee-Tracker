// dependecies
const inquirer = require('inquirer');
const mysql = require('mysql2');

//connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // TODO: Add MySQL password
      password: 'Njoya3r2',
      database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
);

// main to do question
const to_do = [
    {
        type: 'list',
        message: 'What would you like to do?',
        choices: [
          'View All Employees', 
          'Add Employee',
          'Update Employee Role',
          'View All Roles',
          'Add Role',
          'View All Depeartments',
          'Add Department',
          'Quit'
        ],
        name: 'action'
      }
]

