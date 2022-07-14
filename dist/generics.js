"use strict";
///////////////////////////////
//// Generics & Constraints ///
///////////////////////////////
const merge = (objA, objB) => {
    return Object.assign(objA, objB);
};
// Now we can access to the name and string because we told function to use Generics
const mergedObj = merge({ name: "sido" }, { age: 28 });
const countNumberOfElement = (element) => {
    let desc = "Got no value.";
    let length = element.length;
    if (length === 1) {
        desc = `Got ${element.length} element`;
    }
    else if (length > 1) {
        desc = `Got ${element.length} elements`;
    }
    return [element, desc];
};
console.log(countNumberOfElement("Hi there!"));
const extractAndConvert = (obj, key) => {
    return "Value" + obj[key];
};
extractAndConvert({ job: "coder" }, "job");
///////////////////////////////
/////// Generic Classes ///////
///////////////////////////////
//
class DataStorage {
    constructor() {
        this.data = [];
    }
    addItem(item) {
        this.data.push(item);
    }
    removeItem(item) {
        this.data.splice(this.data.indexOf(item), 1);
    }
    getItems() {
        return [...this.data];
    }
}
const textStorage = new DataStorage();
textStorage.addItem("Sido");
textStorage.addItem("Abe");
console.log(textStorage);
const numberStorage = new DataStorage();
function createCourseGoal(title, desc, date) {
    let courseGoal = {};
    courseGoal.title = title;
    courseGoal.desc = desc;
    courseGoal.completeUntil = date;
    return courseGoal;
}
// Readonly
const names = ["Sido", "Abe"];
// names.push("new name"); you get  error here
