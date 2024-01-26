const mysql = require('mysql2');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'CatCatCat',
    database: 'company_db',
  });
  
  connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database');
    startApp();
  });

  function startApp() {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'action',
          message: 'What would you like to do?',
          choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role',
            'Exit',
          ],
        },
      ])
      .then((answer) => {
        switch (answer.action) {
          case 'View all departments':
            viewDepartments();
            break;
          case 'View all roles':
            viewRoles();
            break;
          case 'View all employees':
            viewEmployees();
            break;
          case 'Add a department':
            addDepartment();
            break;
          case 'Add a role':
            addRole();
            break;
          case 'Add an employee':
            addEmployee();
            break;
          case 'Update an employee role':
            updateEmployeeRole();
            break;
          case 'Exit':
            exitApp();
            break;
        }
      });
  }
  
  function viewDepartments() {
    const query = 'SELECT * FROM departments';
  
    connection.query(query, (error, results) => {
      if (error) {
        console.error('Error fetching departments:', error);
      } else {
        console.log('\nDepartments:');
        if (results.length === 0) {
          console.log('No departments found.');
        } else {
          results.forEach((department) => {
            console.log(`ID: ${department.id} | Name: ${department.name}`);
          });
        }
      }
  
      // Call the startApp function to prompt the user again
      startApp();
    });
  }
  
  
  
  function viewRoles() {
    const query = 'SELECT * FROM roles';
  
    connection.query(query, (error, results) => {
      if (error) {
        console.error('Error fetching roles:', error);
      } else {
        console.log('\nRoles:');
        if (results.length === 0) {
          console.log('No roles found.');
        } else {
          results.forEach((role) => {
            console.log(`ID: ${role.id} | Title: ${role.title} | Salary: ${role.salary}`);
          });
        }
      }
  
      // Call the startApp function to prompt the user again
      startApp();
    });
}

  
  function viewEmployees() {
    // Your SQL query to view all employeEXes
  }
  
  function addDepartment() {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'departmentName',
          message: 'Enter the name of the department:',
        },
      ])
      .then((answer) => {
        const query = 'INSERT INTO departments (name) VALUES (?)';
  
        connection.query(query, [answer.departmentName], (error, results) => {
          if (error) {
            console.error('Error adding department:', error);
          } else {
            console.log('Department added successfully!');
          }
  
          // After adding the department, call the startApp function to prompt the user again
          startApp();
        });
      });
  }
  
  
  function addRole() {
    // Inquirer prompt to get the new role details
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'roleTitle',
          message: 'Enter the title of the role:',
        },
        {
          type: 'input',
          name: 'roleSalary',
          message: 'Enter the salary for the role:',
        },
        {
          type: 'input',
          name: 'departmentId',
          message: 'Enter the department ID for the role:',
        },
      ])
      .then((answer) => {
        const query = 'INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)';
  
        connection.query(
          query,
          [answer.roleTitle, answer.roleSalary, answer.departmentId],
          (error, results) => {
            if (error) {
              console.error('Error adding role:', error);
            } else {
              console.log('Role added successfully!');
            }
  
            // After adding the role, call the startApp function to prompt the user again
            startApp();
          }
        );
      });
  }
  
  
  function addEmployee() {
    // Inquirer prompt to get the new employee details
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'firstName',
          message: 'Enter the employee\'s first name:',
        },
        {
          type: 'input',
          name: 'lastName',
          message: 'Enter the employee\'s last name:',
        },
        {
          type: 'input',
          name: 'roleId',
          message: 'Enter the role ID for the employee:',
        },
        {
          type: 'input',
          name: 'managerId',
          message: 'Enter the manager ID for the employee:',
        },
      ])
      .then((answer) => {
        const query =
          'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
  
        connection.query(
          query,
          [answer.firstName, answer.lastName, answer.roleId, answer.managerId],
          (error, results) => {
            if (error) {
              console.error('Error adding employee:', error);
            } else {
              console.log('Employee added successfully!');
            }
  
            // After adding the employee, call the startApp function to prompt the user again
            startApp();
          }
        );
      });
  }
  
  
  function updateEmployeeRole() {
    // Inquirer prompt to get the employee and new role details
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'employeeId',
          message: 'Enter the ID of the employee to update:',
        },
        {
          type: 'input',
          name: 'newRoleId',
          message: 'Enter the new role ID for the employee:',
        },
      ])
      .then((answer) => {
        const query = 'UPDATE employees SET role_id = ? WHERE id = ?';
  
        connection.query(query, [answer.newRoleId, answer.employeeId], (error, results) => {
          if (error) {
            console.error('Error updating employee role:', error);
          } else {
            console.log('Employee role updated successfully!');
          }
  
          // After updating the employee role, call the startApp function to prompt the user again
          startApp();
        });
      });
  }
  
  
  function exitApp() {
    connection.end();
    console.log('Exiting application. Goodbye!');
  }
  