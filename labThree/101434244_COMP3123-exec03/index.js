import { createServer, STATUS_CODES } from "http";
// Use Employee Module here
import { employees } from "./Employee.js";
console.log("Lab 03 -  NodeJs");

//Define Server Port
const port = process.env.PORT || 8081;

//Create Web Server using CORE API
const server = createServer((req, res) => {
  if (req.method !== "GET") {
    res.end(`{"error": "${STATUS_CODES[405]}"}`);
  } else {
    if (req.url === "/") {
      // Display message "<h1>Welcome to Lab Exercise 03</h1>"
      res.end("<h1>Welcome to Lab Exercise 03</h1>");
      return;
    } else if (req.url === "/employee") {
      // Display all details for employees in JSON format
      res.end(JSON.stringify(employees));
      return;
    } else if (req.url === "/employee/names") {
      // Display only all employees {first name + lastname} in Ascending order in JSON Array
      //e.g. [ "Ash Lee", "Mac Mohan", "Pritesh Patel"]
      const employeeNames = employees
        .map((emp) => `${emp.firstName} ${emp.lastName}`)
        .sort();
      res.end(JSON.stringify(employeeNames));
      return;
    } else if (req.url === "/employee/totalsalary") {
      // Display Sum of all employees salary in given JSON format
      //e.g. { "total_salary" : 100 }
      const totalSalary = employees.reduce((acc, emp) => acc + emp.Salary, 0);
      res.end(JSON.stringify({ total_salary: totalSalary }));
      return;
    }
    res.end(`{"error": "${STATUS_CODES[404]}"}`);
    return;
  }
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
