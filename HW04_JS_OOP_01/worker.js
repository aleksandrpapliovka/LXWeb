function Worker(name, gender, birthDate, speciality, companyName, position, salary) {

    var _applyBirthDate = function(birthDate) {
        var dateSplit = birthDate.split(".");
        return new Date(dateSplit[2], dateSplit[1]-1, dateSplit[0]);
    }

    var _name = name;
    var _gender = gender;
    var _birthDate = _applyBirthDate(birthDate);
    var _speciality = speciality;
    var _companyName = companyName;
    var _position = position;
    var _salary = salary;

    this.getName = function() {
        return _name;
    }
    this.setName = function(name) {
        _name = name;
    }

    this.getAge = function() {
        var diffMS = Date.now() - _birthDate.getTime();
        var ageDate = new Date(diffMS); 
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    this.getGender = function() {
        return _gender;
    }
    this.setGender = function(gender) {
        if (gender !== "Male" && gender !== "Female") {
            throw new Error("Invalid Gender");
        }
        _gender = gender;        
    }    

    this.getBirthDate = function() {
        return _birthDate;
    }
    this.setBirthDate = function(birthDate) {
        _birthDate = _applyBirthDate(birthDate);
    }

    this.getSpeciality = function() {
        return _speciality;
    }
    this.setSpeciality = function(speciality) {
        _speciality = speciality;
    }

    this.getCompanyName = function() {
        return _companyName;
    }
    this.setCompanyName = function(companyName) {
        _companyName = companyName;
    }

    this.getPosition = function() {
        return _position;
    }
    this.setPosition = function(position) {
        _position = position;
    }

    this.getSalary = function() {
        return _salary;
    }
    this.setSalary = function(salary) {
        if (salary <= 0) {
            throw new Error("Invalid Salary");
        }
        _salary = salary;
    }

};

function FactoryWorker(name, gender, birthDate, speciality, companyName, position, salary, factoryName, factoryLocation) {

    var _factoryName = factoryName;
    var _factoryLocation = factoryLocation;

    Worker.apply(this, arguments);

    this.getFactoryName = function() {
        return _factoryName;
    }
    this.setFactoryName = function(factoryName) {
        _factoryName = factoryName;
    }

    this.getFactoryLocation = function() {
        return _factoryLocation;
    }
    this.setFactoryLocation = function(factoryLocation) {
        _factoryLocation = factoryLocation;
    }

};

function AirlinesWorker(name, gender, birthDate, speciality, companyName, position, salary, airportName, airportLocation) {

    var _airportName = airportName;
    var _airportLocation = airportLocation;

    Worker.apply(this, arguments);

    this.getAirportName = function() {
        return _airportName;
    }
    this.setAirportName = function(airportName) {
        _airportName = airportName;
    }

    this.getAirportLocation = function() {
        return _airportLocation;
    }
    this.setAirportLocation = function(airportLocation) {
        _airportLocation = airoprtLocation;
    }

};

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

var jsonWorker = JSON.stringify(worker);
alert(jsonWorker);
var jsonFactWorker = JSON.stringify(factoryWorker);
alert(jsonFactWorker.toString());
var jsonAirWorker = JSON.stringify(airportWorker);
alert(jsonAirWorker.toString());
