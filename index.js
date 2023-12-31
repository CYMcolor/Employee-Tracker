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
          'View All Roles',
          'View All Departments',
          'Update Employee Information',
          'Add Information',
          'Delete Information',
          'View Department Budgets',
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
                viewEmployeesMenu();
                break;
            case 'View All Roles':
                viewRoles();
                break;
            case 'View All Departments':
                viewDepartments();
                break;
            case 'Update Employee Information':
                updateEmployeeMenu();
                break;
            case 'Add Information':
                addMenu();
                break;
            case 'Delete Information':
                deleteMenu();
                break;
            case 'View Department Budgets':
                viewBudgets();
                break;            
        }
        return;        
    });    
};

function viewEmployeesMenu(){
    inquirer.prompt([{
        type: 'list',
        message: 'What would you like to do?',
        choices: [
          'View by id', 
          'view by manager',
          'view by department',
          'back'
        ],
        name: 'action'
      }])
    .then((response)=>{
        switch (response.action) {
            case 'View by id':
                viewEmployeesID();
                break;
            case 'view by manager':
                viewEmployeesManager();
                break;
            case 'view by department':
                viewEmployeesDeparment();
                break;
            case 'back':
                nextQuestion();
                break;
        }
    });

}

function viewEmployeesID(){
    let sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary,
                CASE  WHEN manager.last_name IS NOT null THEN CONCAT(manager.first_name, ' ', manager.last_name)
                    ELSE manager.first_name END AS manager
            FROM employee
            LEFT JOIN employee manager ON manager.id = employee.manager_id
            LEFT JOIN role ON role.id = employee.role_id
            LEFT JOIN department ON role.department_id = department.id
            ORDER by employee.id;`;
    db.query(sql, function (err, res) {
        console.log('List of Employees by ID:');
        console.table(res);
    });

    nextQuestion();
}

function viewEmployeesManager(){
    let sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary,
                CASE  WHEN manager.last_name IS NOT null THEN CONCAT(manager.first_name, ' ', manager.last_name)
                    ELSE manager.first_name END AS manager
            FROM employee
            LEFT JOIN employee manager ON manager.id = employee.manager_id
            LEFT JOIN role ON role.id = employee.role_id
            LEFT JOIN department ON role.department_id = department.id
            ORDER by manager.id;`;
    db.query(sql, function (err, res) {
        console.log('List of Employees by Manager:');
        console.table(res);
    });

    nextQuestion();
}

function addMenu(){
    inquirer.prompt([{
        type: 'list',
        message: 'What would you like to add?',
        choices: [
          'add department', 
          'add role',
          'add employee',
          'back'
        ],
        name: 'action'
      }])
    .then((response)=>{
        switch (response.action) {
            case 'add department':
                addDepartment();
                break;
            case 'add role':
                addRole();
                break;
            case 'add employee':
                addEmployee();
                break;
            case 'back':
                nextQuestion();
                break;
        }
    });
}

function viewEmployeesDeparment(){
    let sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary,
                CASE  WHEN manager.last_name IS NOT null THEN CONCAT(manager.first_name, ' ', manager.last_name)
                    ELSE manager.first_name END AS manager
            FROM employee
            LEFT JOIN employee manager ON manager.id = employee.manager_id
            LEFT JOIN role ON role.id = employee.role_id
            LEFT JOIN department ON role.department_id = department.id
            ORDER by department.id;`;
    db.query(sql, function (err, res) {
        console.log('List of Employees by Department:');
        console.table(res);
    });

    nextQuestion();
}

function addEmployee(){
    inquirer.prompt([
        {
            type: 'input',
            message: 'Enter first name:',
            name: 'first_name',
            validate: (input) => {
                if (input.length < 1 ) {
                    return 'Text was empty, enter again';
                 }
                 if (input.length > 30 ) {
                    return 'Text was yoo long, enter again';
                 }
                return true;
            }
        },
        {
            type: 'input',
            message: 'Enter last name:',
            name: 'last_name',
            validate: (input) => {
                 if (input.length > 30 ) {
                    return 'Text was yoo long, enter again';
                 }
                return true;
            }
        },
        {
            type: 'input',
            message: 'Enter role id:',
            name: 'role_id',
            validate: (input) => {
                if (isNaN(input)) {
                   return 'Input was not a number';
                }
               return true;
           }
        },
        {
            type: 'input',
            message: 'Enter manager id if applicable:',
            name: 'manager_id',
            validate: (input) => {
                if (isNaN(input)) {
                   return 'Input was not a number';
                }
               return true;
           }
        }
        
    ]).then((res) =>{ 
        let {first_name, last_name, role_id, manager_id} = res;
        //set parameters in array 
        let params = [first_name, last_name, role_id, manager_id];
        //replace empty strings with null
        params.forEach(function (part, ind){
            if(part == '')
                params[ind] = null;
        });
        let sql = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ( ?, ?, ?, ?)';
        db.query(sql, params , function (err, res) {
            if (err)  
                console.log('could NOT add employee');
            else
                console.log(`Added ${first_name} ${last_name} to employees`); 
        });
        nextQuestion();   
    });

}
function updateEmployeeMenu(){
    inquirer.prompt([{
        type: 'list',
        message: 'What would you like to update?',
        choices: [
          'update role', 
          'update manager',
          'back'
        ],
        name: 'action'
      }])
    .then((response)=>{
        switch (response.action) {
            case 'update role':
                updateRole();
                break;
            case 'update manager':
                updateManager();
                break;
            case 'back':
                nextQuestion();
                break;
        }
    });

}

function updateRole(){
    inquirer.prompt([
        {
            type: 'input',
            message: 'Enter employee id:',
            name: 'employee_id',
            validate: (input) => {                
                if (isNaN(input)) {
                   return 'Input was not a number';
                }
               return true;
           }          
        },
        {
            type: 'input',
            message: 'Enter new role id:',
            name: 'role_id',
            validate: (input) => {          
                if (isNaN(input)) {
                   return 'Input was not a number';
                }
               return true;
           }          
        },
    ])
    .then((res) => {
        let {role_id, employee_id}  = res;
        let sql = 'UPDATE employee SET role_id = ? WHERE id = ?';
        db.query(sql, [res.role_id, res.employee_id],function (err, res) {
            if (err) 
                console.log(`did NOT update`);
            else
                console.log(`updated emplyee ${employee_id}`);
        });

        nextQuestion();
    });    
}
function updateManager(){
    inquirer.prompt([
        {
            type: 'input',
            message: 'Enter employee id:',
            name: 'employee_id',
            validate: (input) => {                
                if (isNaN(input)) {
                   return 'Input was not a number';
                }
               return true;
           }          
        },
        {
            type: 'input',
            message: 'Enter new manager id:',
            name: 'manager_id',
            validate: (input) => {          
                if (isNaN(input)) {
                   return 'Input was not a number';
                }
               return true;
           }          
        },
    ])
    .then((res) => {
        let {manager_id, employee_id}  = res;
        let sql = 'UPDATE employee SET manager_id = ? WHERE id = ?';
        db.query(sql, [res.manager_id, res.employee_id],function (err, res) {
            if (err) 
                console.log(`did NOT update`);
            else
                console.log(`updated emplyee ${employee_id}`);
        });

        nextQuestion();
    });    
}

function viewRoles(){
    let sql = `SELECT role.id, role.title, role.salary, department.name AS department
    FROM role 
    LEFT JOIN department ON role.department_id = department.id;`;
    db.query(sql, function (err, res) {
        console.log('List of Roles:');
        console.table(res);
    });
    nextQuestion();
}

function addRole(){
    inquirer.prompt([
        {
            type: 'input',
            message: 'Enter title:',
            name: 'role_title',
            validate: (input) => {
                if (input.length < 1 ) {
                    return 'Text was empty, enter again';
                 }
                 if (input.length > 30 ) {
                    return 'Text was yoo long, enter again';
                 }
                return true;
            }            
        },
        {
            type: 'input',
            message: 'Enter salary:',
            name: 'salary',
            validate: (input) => {
                if (isNaN(input)) {
                   return 'Input was not a number';
                }
               return true;
           }
        },
        {
            type: 'input',
            message: 'Enter department id:',
            name: 'department_id',
            validate: (input) => {
                if (isNaN(input)) {
                   return 'Input was not a number';
                }
               return true;
           }
        }        
    ])
    .then((res) =>{
        let {role_title, salary, department_id} = res;
        //set parameters in array
        let params = [role_title, salary, department_id];
        //replace empty strings with null
        params.forEach(function (part, ind){
            if(part == '')
                params[ind] = null;
        });
        let sql = 'INSERT INTO role (title, salary, department_id) VALUES ( ?, ?, ?)';
        db.query(sql, params, function (err, res) {
            if (err) 
                console.log('could NOT add role');
            else
                console.log(`Added ${role_title} to roles`); 
        });
        nextQuestion();
    });

}

function viewDepartments(){
    db.query('SELECT * FROM department', function (err, res) {
        console.log('List of Departments:');
        console.table(res);
    });
    nextQuestion();
}

function addDepartment(){
    inquirer.prompt([{
        type: 'input',
        message: 'Enter name:',
        name: 'department_name',
        validate: (input) => {
            if (input.length < 1 ) {
                return 'Text was empty, enter again';
            }
            if (input.length > 30 ) {
                return 'Text was yoo long, enter again';
            }
            return true;
        }
    }])
    .then((res) =>{ 
        let sql = 'INSERT INTO department (name) VALUES ( ? )';
        db.query(sql, res.department_name, function (err, resp) {
            if (err) 
                console.log('could NOT add department');
            else
                console.log(`Added ${res.department_name} to departments`);
        });
        
        nextQuestion();
    });
}

function deleteMenu(){
    inquirer.prompt([{
        type: 'list',
        message: 'What would you like to delete?',
        choices: [
          'delete department', 
          'delete role',
          'delete employee',
          'back'
        ],
        name: 'action'
      }])
    .then((response)=>{
        switch (response.action) {
            case 'delete department':
                deleteDepartment();
                break;
            case 'delete role':
                deleteRole();
                break;
            case 'delete employee':
                deleteEmployee();
                break;
            case 'back':
                nextQuestion();
                break;
        }
    });
}

function deleteDepartment(){
    inquirer.prompt([{
        type: 'input',
        message: 'Enter deparment id:',
        name: 'department_id',
        validate: (input) => {
            if (isNaN(input)) {
               return 'Input was not a number';
            }
           return true;
           }
    }])
    .then((res) =>{ 
        let sql = 'DELETE FROM department WHERE department.id = ?';
        db.query(sql, res.department_id, function (err, res) {
            if (err) throw err;
        });
        console.log(`deleted ${res.department_id} from departments`);
        nextQuestion();
    });
}

function deleteRole(){
    inquirer.prompt([{
        type: 'input',
        message: 'Enter role id:',
        name: 'role_id',
        validate: (input) => {
            if (isNaN(input)) {
               return 'Input was not a number';
            }
           return true;
           }
    }])
    .then((res) =>{ 
        let sql = 'DELETE FROM role WHERE role.id = ?';
        db.query(sql, res.role_id, function (err, res) {
            if (err) throw err;
        });
        console.log(`deleted ${res.role_id} from departments`);
        nextQuestion();
    });
}

function deleteEmployee(){
    inquirer.prompt([{
        type: 'input',
        message: 'Enter employee id:',
        name: 'employee_id',
        validate: (input) => {
            if (isNaN(input)) {
               return 'Input was not a number';
            }
           return true;
           }
    }])
    .then((res) =>{ 
        let sql = 'DELETE FROM employee WHERE employee.id = ?';
        db.query(sql, res.employee_id, function (err, res) {
            if (err) throw err;
        });
        console.log(`deleted ${res.employee_id} from departments`);
        nextQuestion();
    });
}
function viewBudgets(){
    let sql = `SELECT department.id, department.name AS department, sum(role.salary) AS salary_total, count(employee.id) as number_of_employees
    FROM employee
    JOIN role ON role.id = employee.role_id
    JOIN department ON role.department_id = department.id
    GROUP BY department.id`;
    db.query(sql, function (err, res) {
        console.log('Budgets List:');
        console.table(res);
    });

    nextQuestion();
}

function nextQuestion(){
    //calls menu prompt again if user didn't exit
    //wrapped in timeout to not clear console when entering new prompt
    setTimeout(()=>{
        menu();
    },100);
}

//init the program
menu();