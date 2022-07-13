///////////////////////////////
////// More about types ///////
///////////////////////////////
type Admin = {
  name: string;
  work_type: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

type ElevatedEmployee = Admin & Employee;
const employee_1: ElevatedEmployee = {
  name: "Sido",
  work_type: ["front-end-dev"],
  startDate: new Date(),
};

type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;

type UnknownEMployee = Employee | Admin;
const printEmployee = (employee: UnknownEMployee) => {
  console.log("Name: " + employee.name);
  if ("work_type" in employee) {
    console.log("Work type" + employee.work_type);
  }

  if ("startDate" in employee) {
    console.log("Started date: " + employee.startDate);
  }
};

///////////////////////////////
//////// Type Guards //////////
///////////////////////////////
class Car {
  drive() {
    console.log("Driving...");
  }
}

class Truck {
  drive() {
    console.log("Driving a truck");
  }

  loadCargo(amount: number) {
    console.log("Loading cardo..." + amount);
  }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

const useVehicle = (vehicle: Vehicle) => {
  vehicle.drive();
  if (vehicle instanceof Truck) {
    vehicle.loadCargo(1000);
  }
};

///////////////////////////////
///////// Type Union //////////
///////////////////////////////
interface Bird {
  type: "bird";
  flyingSpeed: number;
}

interface Horse {
  type: "horse";
  runningSpeed: number;
}

interface Fish {
  type: "fish";
  swimmingSpeed: number;
}

type Animal = Bird | Horse | Fish;

const moveAnimal = (animal: Animal) => {
  let speed, verb;
  switch (animal.type) {
    case "bird":
      speed = animal.flyingSpeed;
      verb = "Flying";
      break;
    case "horse":
      speed = animal.runningSpeed;
      verb = "Running";
      break;
    case "fish":
      speed = animal.swimmingSpeed;
      verb = "Swimming";
      break;
  }
  console.log(verb + " with speed " + speed);
};

moveAnimal({ type: "bird", flyingSpeed: 10000 });
moveAnimal({ type: "horse", runningSpeed: 30 });
moveAnimal({ type: "fish", swimmingSpeed: 900 });

///////////////////////////////
//////// Type Casting /////////
///////////////////////////////
// 1st case, if you are sure element wont be NULL
const userInput = <HTMLInputElement>document.querySelector("#user-input");
userInput.value = "case 3!";

// 2nd case if you are sure element wont be NULL
const userInput_2 = document.querySelector("#user-input") as HTMLInputElement;
userInput_2.value = "case 2!";

// 3rd case if you are unsure about element
const userInput_3 = document.querySelector("#user-input");
if (userInput_3) {
  (userInput_3 as HTMLInputElement).value = "case 3!";
}

///////////////////////////////
////// Index Properties ///////
///////////////////////////////
interface ErrorContainer {
  [prop: string]: string;
}

const errorBag: ErrorContainer = {
  email: "Not a valid email",
  username: "Must start with a capital character!",
};

///////////////////////////////
///// Function Overloads //////
///////////////////////////////
function sums(a: number, b: number): number;
function sums(a: string, b: string): string;
function sums(a: Combinable, b: Combinable) {
  if (typeof a === "string" || typeof b === "string") {
    return a.toString + b.toString();
  }
  return a + b;
}

///////////////////////////////
////// Optional Chaining //////
///////////////////////////////
const fetchUser = {
  id: "abc123",
  name: "Sido",
  job: {
    title: "Frontend",
  },
};

console.log(fetchUser?.job?.title);

///////////////////////////////
////// Nullish Coalescing /////
///////////////////////////////
const user = fetchUser;
const isUserNull = user ?? "No fetched user";
