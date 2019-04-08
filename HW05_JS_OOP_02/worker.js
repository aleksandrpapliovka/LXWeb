function Worker(name, gender, birthDate, speciality, companyName, position, salary) {

    this.name = name;
    this.gender = gender;
    this.birthDate = Worker.convertBirthDate(birthDate);
    this.speciality = speciality;
    this.companyName = companyName;
    this.setNameposition = position;
    this.salary = salary;

};

Worker.convertBirthDate = function(birthDate) {
    var dateSplit = birthDate.split(".");
    return new Date(dateSplit[2], dateSplit[1]-1, dateSplit[0]);
}

Worker.prototype.getName = function() {
    return this.name;
}
Worker.prototype.setName = function(name) {
    this.name = name;
}

Worker.prototype.getAge = function() {
    var diffMS = Date.now() - this.birthDate.getTime();
    var ageDate = new Date(diffMS); 
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

Worker.prototype.getGender = function() {
    return this.gender;
}
Worker.prototype.setGender = function(gender) {
    if (gender !== "Male" && gender !== "Female") {
        throw new Error("Invalid Gender");
    }
    this.gender = gender;        
}    

Worker.prototype.getBirthDate = function() {
    return this.birthDate;
}
Worker.prototype.setBirthDate = function(birthDate) {
    this.birthDate = Worker.convertBirthDate(birthDate);
}

Worker.prototype.getSpeciality = function() {
    return this.speciality;
}
Worker.prototype.setSpeciality = function(speciality) {
    this.speciality = speciality;
}

Worker.prototype.getCompanyName = function() {
    return this.companyName;
}
Worker.prototype.setCompanyName = function(companyName) {
    this.companyName = companyName;
}

Worker.prototype.getPosition = function() {
    return this.position;
}
Worker.prototype.setPosition = function(position) {
    this.position = position;
}

Worker.prototype.getSalary = function() {
    return this.salary;
}
Worker.prototype.setSalary = function(salary) {
    if (salary <= 0) {
        throw new Error("Invalid Salary");
    }
    this.salary = salary;
}

function FactoryWorker(name, gender, birthDate, speciality, companyName, position, salary, factoryName, factoryLocation) {

    Worker.apply(this, arguments);
    this.factoryName = factoryName;
    this.factoryLocation = factoryLocation;

};

FactoryWorker.prototype = Object.create(Worker.prototype);
FactoryWorker.prototype.constructor = FactoryWorker;

FactoryWorker.prototype.getFactoryName = function() {
    return this.factoryName;
}
FactoryWorker.prototype.setFactoryName = function(factoryName) {
    this.factoryName = factoryName;
}

FactoryWorker.prototype.getFactoryLocation = function() {
    return this.factoryLocation;
}
FactoryWorker.prototype.setFactoryLocation = function(factoryLocation) {
    this.factoryLocation = factoryLocation;
}


function AirlinesWorker(name, gender, birthDate, speciality, companyName, position, salary, airportName, airportLocation) {

    Worker.apply(this, arguments);
    this.airportName = airportName;
    this.airportLocation = airportLocation;

};

AirlinesWorker.prototype = Object.create(Worker.prototype);
AirlinesWorker.prototype.constructor = AirlinesWorker;

AirlinesWorker.prototype.getAirportName = function() {
    return this.airportName;
}
AirlinesWorker.prototype.setAirportName = function(airportName) {
    this.airportName = airportName;
}

AirlinesWorker.prototype.getAirportLocation = function() {
    return this.airportLocation;
}
AirlinesWorker.prototype.setAirportLocation = function(airportLocation) {
    this.airportLocation = airoprtLocation;
}

AirlinesWorker.prototype.getAge = function() {
    return Worker.prototype.getAge.apply(this, arguments) + " years";
}

/* Testing */

var worker = new Worker("Bill", "Male", "12.03.1989", "", "GoodCo", "Cleaner", 500);
var factoryWorker = new FactoryWorker("Anna", "Female", "01.03.1988", "Managing", "FactoryCo", "Manager", 1500, "FactoryGreen", "Orlando");
var airportWorker = new AirlinesWorker("John", "Male", "04.02.1994", "HR", "AirportCo", "HRManager", 1300, "AirportOne", "Chicago");

// alert("Private name: " + worker._name);
// alert("Private age: " + worker._age);

alert("Worker name: " + worker.getName());
alert("Worker age: " + worker.getAge());

alert("Factory worker name: " + factoryWorker.getName());
alert("Factory worker age: " + factoryWorker.getAge());
alert("Factory location: " + factoryWorker.getFactoryLocation());

alert("Airport worker name: " + airportWorker.getName());
alert("Airport worker age: " + airportWorker.getAge());
alert("Airport location: " + airportWorker.getAirportLocation());

// var jsonWorker = JSON.stringify(worker);
// alert(jsonWorker);
// var jsonFactWorker = JSON.stringify(factoryWorker);
// alert(jsonFactWorker.toString());
// var jsonAirWorker = JSON.stringify(airportWorker);
// alert(jsonAirWorker.toString());
