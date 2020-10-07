const c = require('ansi-colors');
const inquirer = require('inquirer');
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'employeeTracker_db',
});

connection.connect((err) => {
  if (err) throw err;
  console.log('connected');
  start();
});

const start = () => {
  inquirer.prompt({
    name: 'start_process',
    type: 'list',
    message: 'What do you want to do?',
    choices: [
      'View all Staff', 'addEmployee',
    ],
  }).then((answer) => {
    switch (answer.start_process) {
      case 'View all Staff':
        viewAllStaff();
        break;
      case 'addEmployee':
        addStaff();
        break;
      default:
        break;
    }
  });
};

const addStaff = () => {
  inquirer.prompt({
    name: 'department',
    type: 'list',
    message: 'What department are you adding to?',
    choices: [
      'Manager', 'Employee', 'Start Over',
    ],
  }).then((answer) => {
    // console.log(answer.department);
    switch (answer.department) {
      case 'Manager':
        addManager();
        break;
      case 'Employee':
        addEmployee();
        break;
      default:
        startOver();
        break;
    }
  });
};

const addManager = () => {
  console.log(c.redBright('Choose manager, addManager function invoked'));
  inquirer.prompt({
    name: 'managers',
    type: 'list',
    message: 'What Department Manager are you adding?',
    choices: [
      'GM', 'AGM', 'Chef', 'FOH', 'BOH',
    ],
  });
};

const addEmployee = () => {
  console.log(c.greenBright('Choose employee, addEmployee function invoked'));
};

const viewAllStaff = () => {
  inquirer.prompt({
    name: 'staffTable',
    type: 'list',
    message: 'What do you want to do?',
    choices: [
      'View employee by Department?',
      'View employee by manager?',
      'See all employees list ? ',
      'See total department cost',
      'See total company cost',
      'Update employee record?',
      'Remove employee from roster?',
      'Update employee manager?',
      'Update employee role?',
      'Start Over?',
    ],
  }).then(({ staffTable }) => {
    console.log(c.green(staffTable));
    switch (staffTable) {
      case 'View employee by Department?':
        console.log('Must Create a another function to render the answers to this choice?');
        break;
      default:
        startOver();
        break;
    }
  });
};

const startOver = () => {
  inquirer.prompt({
    name: 'Reset',
    type: 'list',
    message: 'Do you want to reset/start over?',
    choices: [
      'Confirm',
      'Cancel',
    ],
  }).then(({ Reset }) => {
    switch (Reset) {
      case 'Confirm':
        start();
        break;
      default:
        break;
    }
  });
};
