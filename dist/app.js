"use strict";
var _a;
const employee_1 = {
    name: "Sido",
    work_type: ["front-end-dev"],
    startDate: new Date(),
};
const printEmployee = (employee) => {
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
    loadCargo(amount) {
        console.log("Loading cardo..." + amount);
    }
}
const v1 = new Car();
const v2 = new Truck();
const useVehicle = (vehicle) => {
    vehicle.drive();
    if (vehicle instanceof Truck) {
        vehicle.loadCargo(1000);
    }
};
const moveAnimal = (animal) => {
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
const userInput = document.querySelector("#user-input");
userInput.value = "case 3!";
// 2nd case if you are sure element wont be NULL
const userInput_2 = document.querySelector("#user-input");
userInput_2.value = "case 2!";
// 3rd case if you are unsure about element
const userInput_3 = document.querySelector("#user-input");
if (userInput_3) {
    userInput_3.value = "case 3!";
}
const errorBag = {
    email: "Not a valid email",
    username: "Must start with a capital character!",
};
function sums(a, b) {
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
console.log((_a = fetchUser === null || fetchUser === void 0 ? void 0 : fetchUser.job) === null || _a === void 0 ? void 0 : _a.title);
///////////////////////////////
////// Nullish Coalescing /////
///////////////////////////////
const user = fetchUser;
const isUserNull = user !== null && user !== void 0 ? user : "No fetched user";
