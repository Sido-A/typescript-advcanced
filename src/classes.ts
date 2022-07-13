abstract class Department {
  protected employees: string[] = [];
  constructor(protected readonly id: string, public name: string) {}
  abstract describe(this: Department): void;

  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  printEmployee() {
    console.log(this.employees);
  }
}

class ITDepartment extends Department {
  constructor(id: string, public admins: string[]) {
    super(id, "IT");
  }

  describe() {
    console.log(`IT Department: ${this.id}`);
  }
}
const it = new ITDepartment("IT1", ["Sido"]);
it.addEmployee("Sido");
it.addEmployee("Abe");

class Accounting extends Department {
  private lastReports: string;

  get mostRecentReport() {
    if (this.lastReports) return this.lastReports;
    throw new Error("No report found");
  }

  set mostRecentReport(value: string) {
    if (!value) {
      this.addReport(value);
    }
    throw new Error("No value was provided");
  }

  constructor(id: string, private reports: string[]) {
    super(id, "Account");
    this.lastReports = reports[0];
  }

  describe() {
    console.log(`Accountant: ${this.id}`);
  }

  addReport(text: string) {
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
