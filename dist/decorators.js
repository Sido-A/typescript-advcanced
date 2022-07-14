"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
const Logger = (logString) => {
    return function (constructor) {
        console.log(logString);
        console.log(constructor);
    };
};
const withTemplate = (template, hookId) => {
    return function (originalConstructor) {
        return class extends originalConstructor {
            constructor(..._) {
                super();
                const hookElm = document.querySelector(hookId);
                if (hookElm) {
                    hookElm.innerHTML = template;
                    hookElm.querySelector("h1").textContent = this.name;
                }
            }
        };
    };
};
let DecoratorPerson = class DecoratorPerson {
    constructor() {
        this.name = "Sido";
        console.log("Creating person obj");
    }
};
DecoratorPerson = __decorate([
    Logger("Logging here"),
    withTemplate("<h1>My H1 tag here </h1>", "#app")
], DecoratorPerson);
const person = new DecoratorPerson();
const Log = (target, propertyName) => {
    console.log("Property decorator");
    console.log(target, propertyName);
};
const accessorDecorator = (target, name, descriptor) => {
    console.log("Accessor decorator");
    console.log(target);
    console.log(name);
    console.log(descriptor);
};
const methodDecorator = (target, name, descriptor) => {
    console.log("Method decorator");
    console.log(target);
    console.log(name);
    console.log(descriptor);
};
const parameterDecorator = (target, name, position) => {
    console.log("Parameter decorator");
    console.log(target);
    console.log(name);
    console.log(position);
};
class Product {
    constructor(t, p) {
        this.title = t;
        this._price = p;
    }
    set price(val) {
        if (val > 0) {
            this._price = val;
        }
        else {
            throw new Error("Invalid price - should be positive");
        }
    }
    getPriceWithTax(tax) {
        return this._price * (1 + tax);
    }
}
__decorate([
    Log
], Product.prototype, "title", void 0);
__decorate([
    accessorDecorator
], Product.prototype, "price", null);
__decorate([
    methodDecorator,
    __param(0, parameterDecorator)
], Product.prototype, "getPriceWithTax", null);
const autoBind = (_target, _name, descriptor) => {
    const originalMethod = descriptor.value;
    const adjustedDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            const boundFunc = originalMethod.bind(this);
            return boundFunc;
        },
    };
    return adjustedDescriptor;
};
class Printer {
    constructor() {
        this.message = "This works!";
    }
    showMessage() {
        console.log(this.message);
    }
}
__decorate([
    autoBind
], Printer.prototype, "showMessage", null);
const printer = new Printer();
const button = document.querySelector("button");
button.addEventListener("click", printer.showMessage);
const registeredValidators = {};
const Required = (target, propName) => {
    var _a, _b;
    registeredValidators[target.constructor.name] = Object.assign(Object.assign({}, registeredValidators[target.constructor.name]), { [propName]: [
            ...((_b = (_a = registeredValidators[target.constructor.name]) === null || _a === void 0 ? void 0 : _a[propName]) !== null && _b !== void 0 ? _b : []),
            "required",
        ] });
};
const PositiveNumber = (target, propName) => {
    var _a, _b;
    registeredValidators[target.constructor.name] = Object.assign(Object.assign({}, registeredValidators[target.constructor.name]), { [propName]: [
            ...((_b = (_a = registeredValidators[target.constructor.name]) === null || _a === void 0 ? void 0 : _a[propName]) !== null && _b !== void 0 ? _b : []),
            "positive",
        ] });
};
const validate = (obj) => {
    const objValidatorConfig = registeredValidators[obj.constructor.name];
    if (!objValidatorConfig) {
        return true;
    }
    for (const prop in objValidatorConfig) {
        for (const validator of objValidatorConfig[prop]) {
            switch (validator) {
                case "required":
                    return !!obj[prop];
                case "positive":
                    return obj[prop] > 0;
            }
        }
    }
    return true;
};
class Course {
    constructor(t, p) {
        this.title = t;
        this.price = p;
    }
}
__decorate([
    Required
], Course.prototype, "title", void 0);
__decorate([
    PositiveNumber
], Course.prototype, "price", void 0);
const courseForm = document.querySelector("#courseForm");
courseForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const titleInputElm = document.querySelector("#title");
    const priceInputElm = document.querySelector("#price");
    const title = titleInputElm.value;
    const price = +priceInputElm.value;
    const createCourse = new Course(title, price);
    if (!validate(createCourse)) {
        alert("Invalid Input");
        return;
    }
});
