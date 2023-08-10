# Employee-Tracker

[![License: MIT License](https://img.shields.io/badge/License-MIT_License-blue.svg)](https://opensource.org/licenses/MIT)

## Description
A content manager system to interact with an employee database using MYSQL and inquirer

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Contact](#contact)

## Installation
Download code from the GitHub repository. Have Node.js installed. Link to Node.js downloads: https://nodejs.dev/en/download/. In a terminal input npm init -y. Then in the terminal install inquirer version 8.2.4, dotenv, and mysql2 by inputting npm install.

## Usage
In a terminal the user should source their database. To connect the database to the application, the user should change the data in .env.EXAMPLE to their use information and remove the .EXAMPLE part from the file name.

Aftewerwards the user can start the application by entering node index. They wil be presented with a menu with  View ALll Employees, Add Employee, Update, Employee Information, View All Roles, Add Role, View All Departments, Add Department, Delete Information, and Exit. The user may have to scroll in order to see all the options. Choosing exit will close the application. View All Employees, Update Employee Information, and Delete Information all have sub menus. All have a back option which will show the main menu again.

View All Employees can be viewd by id, manager, department. All the column information will bepresented in the same location, but the order of the information will be displayed by the option chosen.



![screenshot of prompts](./assets/images/screenshot)

## License
 This application is covered under MIT License.

You can click on the badge for further information.

[![License: MIT License](https://img.shields.io/badge/License-MIT_License-blue.svg)](https://opensource.org/licenses/MIT)

## Contributing
Node.js (download here: https://nodejs.dev/en/download/)
Packages used: mysql2, dotenv, and inquirer (vers. 2.8.4)

## Contact
GitHub profile: https://github.com/CYMcolor