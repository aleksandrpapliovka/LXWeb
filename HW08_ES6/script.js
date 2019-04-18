class Worker {
    constructor(name, gender, birthDate, speciality, companyName, position, salary) {

        this._name = name;
        this._gender = gender;
        this._birthDate = Worker.convertBirthDate(birthDate);
        this._speciality = speciality;
        this._companyName = companyName;
        this._position = position;
        this._salary = salary;
    };

    static convertBirthDate(birthDate) {
        var dateSplit = birthDate.split(".");
        return new Date(dateSplit[2], dateSplit[1] - 1, dateSplit[0]);
    }

    static getAge(birthDate) {
        var diffMS = Date.now() - Worker.convertBirthDate(birthDate).getTime();
        var ageDate = new Date(diffMS);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    get getName() {
        return this._name;
    }
    set setName(name) {
        this._name = name;
    }

    get getGender() {
        return this._gender;
    }
    set setGender(gender) {
        this._gender = gender;
    }

    get getBirthDate() {
        return this._birthDate;
    }
    set setBirthDate(birthDate) {
        this._birthDate = Worker.convertBirthDate(birthDate);
    }

    getAge() {
        var diffMS = Date.now() - this._birthDate.getTime();
        var ageDate = new Date(diffMS);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    get getSpeciality() {
        return this._speciality;
    }
    set setSpeciality(speciality) {
        this._speciality = speciality;
    }

    get getCompanyName() {
        return this._companyName;
    }
    set setCompanyName(companyName) {
        this._companyName = companyName;
    }

    get getPosition() {
        return this._position;
    }
    set setPosition(position) {
        this._position = position;
    }

    get getSalary() {
        return this._salary;
    }
    set setSalary(salary) {
        this._salary = salary;
    }

};

class FactoryWorker extends Worker {

    constructor(name, gender, birthDate, speciality, companyName, position, salary, factoryName, factoryLocation) {
        super(name, gender, birthDate, speciality, companyName, position, salary);
        this._factoryName = factoryName;
        this._factoryLocation = factoryLocation;
    }

    get getFactoryName() {
        return this._factoryName;
    }
    set setFactoryName(factoryName) {
        this._factoryName = factoryName;
    }

    get getFactoryLocation() {
        return this._factoryLocation;
    }
    set setFactoryLocation(factoryLocation) {
        this._factoryLocation = factoryLocation;
    }

};

class AirlinesWorker extends Worker {

    constructor(name, gender, birthDate, speciality, companyName, position, salary, airportName, airportLocation) {
        super(name, gender, birthDate, speciality, companyName, position, salary);
        this._airportName = airportName;
        this._airportLocation = airportLocation;
    }

    get getAirportName() {
        return this._airportName;
    }
    set setAirportName(airportName) {
        this._airportName = airportName;
    }

    get getAirportLocation() {
        return this._airportLocation;
    }
    set setAirportLocation(airportLocation) {
        this._airportLocation = airportLocation;
    }

    getAge() {
        return super.getAge() + " years";
    }
};

//Testing
// let worker = new Worker("Bill", "Male", "12.03.1989", "", "GoodCo", "Cleaner", 500);
// let factoryWorker = new FactoryWorker("Anna", "Female", "01.03.1988", "Managing", "FactoryCo", "Manager", 1500, "FactoryGreen", "Orlando");
// let airportWorker = new AirlinesWorker("John", "Male", "04.02.1994", "HR", "AirportCo", "HRManager", 1300, "AirportOne", "Chicago");

// alert("Worker name: " + worker.getName);
// alert("Worker age: " + worker.getAge());

// alert("Factory worker name: " + factoryWorker.getName);
// alert("Factory worker age: " + factoryWorker.getAge());
// alert("Factory location: " + factoryWorker.getFactoryLocation);

// alert("Airport worker name: " + airportWorker.getName);
// alert("Airport worker age: " + airportWorker.getAge());
// alert("Airport location: " + airportWorker.getAirportLocation);

function onCreate(ev) {

    if ($('#createForm')[0].checkValidity() === false) {
        ev.preventDefault();
        ev.stopPropagation();
        $('#createForm').addClass('was-validated');
        return;
    }

    ev.preventDefault();

    var dataCrea = ({
        name: $("#cname").val(),
        gender: $("#cgender option:selected").text(),
        birthDate: $("#cbirthDate").val(),
        speciality: $("#cspec").val(),
        companyName: $("#ccompName").val(),
        position: $("#cposition").val(),
        salary: $("#csalary").val()
    });

    $.ajax({
        url: "http://195.50.2.67:2403/alpa-workers/",
        type: 'POST',
        datatype: 'json',
        data: dataCrea,
        success: function (result) {
            alert("Creation was successful");
        },
        error: function () {
            alert("Creation error");
        }
    });
}

function onRefresh() {

    let promise = new Promise(function (resolve, reject) {
        $.ajax({
            url: "http://195.50.2.67:2403/alpa-workers/",
            type: 'GET',
            datatype: 'json',
            success: function (response) { resolve(response); },
            error: function () { reject("Reading error") }
        })
    });

    promise.then(
        result => {
            $('#rTBody tr').remove();
            for (i = 0; i < result.length; i++) {
                $('#workerT > tbody:last-child').append(
                    '<tr><td>' + result[i].id + '</td>' +
                    '<td>' + result[i].name + '</td>' +
                    '<td>' + result[i].gender + '</td>' +
                    '<td>' + result[i].birthDate + '</td>' +
                    '<td>' + Worker.getAge(result[i].birthDate) + '</td>' +
                    '<td>' + result[i].speciality + '</td>' +
                    '<td>' + result[i].companyName + '</td>' +
                    '<td>' + result[i].position + '</td>' +
                    '<td>' + result[i].salary +
                    '</td></tr>');
            }
        },

        error => {
            alert(error);
        }
    )
}

function onPrepareUpdate() {

    let promise = new Promise(function (resolve, reject) {
        $.ajax({
            url: "http://195.50.2.67:2403/alpa-workers/",
            type: 'GET',
            datatype: 'json',
            success: function (response) { resolve(response); },
            error: function () { reject("Prepare Update error") }
        })
    });

    promise.then(
        result => {
            $('#uid > option').remove();
            for (i = 0; i < result.length; i++) {
                $('#uid').append('<option>' + result[i].id + '</option>');
            };
        },

        error => {
            alert(error);
        }
    )

}

function onUpdate() {

    var updData = ({
        name: $('#uname').val(),
        gender: $("#cgender option:selected").text(),
        birthDate: $('#ubirthDate').val(),
        speciality: $('#uspec').val(),
        companyName: $('#ucompName').val(),
        position: $('#uposition').val(),
        salary: $('#usalary').val(),
    });

    let promise = new Promise((resolve, reject) => {
        $.ajax({
            url: "http://195.50.2.67:2403/alpa-workers/" + $("#uid option:selected").text(),
            type: 'PUT',
            datatype: 'json',
            data: updData,
            success: function () { resolve("Updated successfully"); },
            error: function () { reject("Update error"); }
        });
    })
    promise.then(
        updated => { alert(updated); },
        error => { alert(error); }
    )
}

function onDelete(ev) {

    var form = $('#deleteForm')[0];

    if (form.checkValidity() === false) {
        ev.preventDefault();
        ev.stopPropagation();
        form.classList.add('was-validated');
        return;
    }

    ev.preventDefault();

    $.ajax({
        url: "http://195.50.2.67:2403/alpa-workers/" + $('#did').val(),
        type: 'DELETE',
        datatype: 'json',
        success: function (result) {
            alert("Deletion was successful");
        },
        error: function () {
            alert("Deletion error");
        }
    });

}

(function () {

    $('#cbutton').click(function (ev) {
        onCreate(ev);
    });

    $('#rbutton').click(function () {
        onRefresh();
    });

    $('#ubutton').click(function (ev) {
        ev.preventDefault();
        onUpdate(ev);
    });

    $('#pubutton').click(function (ev) {
        ev.preventDefault();
        onPrepareUpdate();
    });

    $('#dbutton').click(function (ev) {
        onDelete(ev);
    });

})()
