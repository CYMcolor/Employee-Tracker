// dependecies
const inquirer = require('inquirer');
const mysql = require('mysql2');
require('dotenv').config();
//connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: process.env.DB_USER,
      // TODO: Add MySQL password
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
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

function menu(){
    inquirer.prompt(to_do)
    .then((response)=>{
        if( response.action == 'Exit')
        {
            //end the cconnection to th database
            db.end();
            console.log('You have exited the application'); 
        }
        switch (response.action) {
            case 'View All Employees':
                viewEmployees();
                break;
            case 'Add Employee':
                addEmployee();
                break;
            case 'Update Employee Role':
                updateRole();
                break;
            case 'View All Roles':
                viewRoles();
                break;
            case 'Add Role':
                addRole();
                break;
            case 'View All Departments':
                viewDepartments();
                break;
            case 'Add Department':
                addDepartment();
                break;
        }
        return;        
    });    
};

function viewEmployees(){
    db.query('SELECT * FROM employee', function (err, res) {
        console.table(res);
    });
    console.log('test space');
    nextQuestion();
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
        nextQuestion();
    });

}

function updateRole(){
    console.log('update role');
    nextQuestion();
}

function viewRoles(){
    db.query('SELECT * FROM role', function (err, res) {
        console.table(res);
    });
    nextQuestion();
}

function addRole(){
    inquirer.prompt([
        {
            type: 'input',
            message: 'Enter title:',
            name: 'role_title'
        },
        {
            type: 'input',
            message: 'Enter salary:',
            name: 'salary'
        },
        {
            type: 'input',
            message: 'Enter department id:',
            name: 'department_id'
        }        
    ]).then((res) =>{ 
        console.log(res); 
        nextQuestion();
    });

}

function viewDepartments(){
    db.query('SELECT * FROM department', function (err, res) {
        console.log('List of Departments:\n');
        console.table(res);
    });
    nextQuestion();
}

function addDepartment(){
    inquirer.prompt([
        {
            type: 'input',
            message: 'Enter name:',
            name: 'department_name'
        }        
    ]).then((res) =>{ 
        console.log(res); 
        nextQuestion();
    });
}

menu();

function nextQuestion(){
    //calls menu prompt again if use didn't exit
    //wrapped in timeout to not
    setTimeout(()=>{
        menu();
    },1000);
}