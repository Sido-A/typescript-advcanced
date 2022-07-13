"use strict";
class Department {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.employees = [];
    }
    addEmployee(employee) {
        this.employees.push(employee);
    }
    printEmployee() {
        console.log(this.employees);
    }
}
class ITDepartment extends Department {
    constructor(id, admins) {
        super(id, "IT");
        this.admins = admins;
    }
    describe() {
        console.log(`IT Department: ${this.id}`);
    }
}
const it = new ITDepartment("IT1", ["Sido"]);
it.addEmployee("Sido");
it.addEmployee("Abe");
class Accounting extends Department {
    constructor(id, reports) {
        super(id, "Account");
        this.reports = reports;
        this.lastReports = reports[0];
    }
    get mostRecentReport() {
        if (this.lastReports)
            return this.lastReports;
        throw new Error("No report found");
    }
    set mostRecentReport(value) {
        if (!value) {
            this.addReport(value);
        }
        throw new Error("No value was provided");
    }
    describe() {
        console.log(`Accountant: ${this.id}`);
    }
    addReport(text) {
        this.reports.push(text);
    }
    getReports() {
        console.log(this.reports);
    }
}
const accounting = new Accounting("ACC1", []);
accounting.addEmployee("Sol");
accounting.addReport("Adding report 1");
accounting.addReport("Adding report 2");
