// dependecies
const inquirer = require('inquirer');
const mysql = require('mysql2/promise');
require('dotenv').config();
//connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: process.env.DB_USER,
      // TODO: Add MySQL password
      password: process.env.DB_PASSWORD,
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
          'View All Departments',
          'Add Department',
          'Exit'
        ],
        name: 'action'
      }
]

let mainPrompt = () =>{
    inquirer.prompt(to_do).then((response)=>{
        switch (response.action) {
            case 'View All Employees':
                viewEmployees();
                break;
            case 'Add Employee':
                addEmployee();
                break;
            case 'Update Employee Role':
                break;
            case 'View All Roles':
                break;
            case 'View All Departments':
                break;
            case 'Add Department':
                break;
            case 'exit':
                console.log('exit');

                break;
        }
        return;
    }).then();        
}

function viewEmployees(){
    db.query('Describe employee', function (err, results) {
        console.log(results);
    });
    mainPrompt();
}

function addEmployee(){
    inquirer.prompt([
        {
            type: 'input',
            message: 'Enter first name:',
            name: 'first_name'
        },
        {
            type: 'input',
            message: 'Enter last name:',
            name: 'last_name'
        },
        {
            type: 'input',
            message: 'Enter role id:',
            name: 'role_id'
        },
        {
            type: 'input',
            message: 'Enter manager id if applicable:',
            name: 'manager_id'
        }
        
    ]).then((res) =>{ 
        console.log(res); 
        mainPrompt();
    });

}

mainPrompt();