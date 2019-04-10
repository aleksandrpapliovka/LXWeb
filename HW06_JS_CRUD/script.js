function Worker(name, gender, birthDate, speciality, companyName, position, salary) {

    this.name = name;
    this.gender = gender;
    this.birthDate = Worker.convertBirthDate(birthDate);
    this.speciality = speciality;
    this.companyName = companyName;
    this.position = position;
    this.salary = salary;

};

Worker.convertBirthDate = function (birthDate) {  
    var dateSplit = birthDate.split(".");
    return new Date(dateSplit[2], dateSplit[1] - 1, dateSplit[0]);
}

Worker.prototype.getName = function () {
    return this.name;
}
Worker.prototype.setName = function (name) {
    this.name = name;
}

Worker.prototype.getAge = function () {
    var diffMS = Date.now() - this.birthDate.getTime();
    var ageDate = new Date(diffMS);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

Worker.prototype.getGender = function () {
    return this.gender;
}
Worker.prototype.setGender = function (gender) {
    if (gender !== "Male" && gender !== "Female") {
        throw new Error("Invalid Gender");
    }
    this.gender = gender;
}

Worker.prototype.getBirthDate = function () {
    return this.birthDate;
}
Worker.prototype.setBirthDate = function (birthDate) {
    this.birthDate = Worker.convertBirthDate(birthDate);
}

Worker.prototype.getSpeciality = function () {
    return this.speciality;
}
Worker.prototype.setSpeciality = function (speciality) {
    this.speciality = speciality;
}

Worker.prototype.getCompanyName = function () {
    return this.companyName;
}
Worker.prototype.setCompanyName = function (companyName) {
    this.companyName = companyName;
}

Worker.prototype.getPosition = function () {
    return this.position;
}
Worker.prototype.setPosition = function (position) {
    this.position = position;
}

Worker.prototype.getSalary = function () {
    return this.salary;
}
Worker.prototype.setSalary = function (salary) {
    if (salary <= 0) {
        throw new Error("Invalid Salary");
    }
    this.salary = salary;
}

function onCreate(ev) {

    var form = document.getElementById('createForm');

    if (form.checkValidity() === false) {
        ev.preventDefault();
        ev.stopPropagation();
        form.classList.add('was-validated');
        return;
    }

    ev.preventDefault();

    var gender = document.getElementById("cgender");
    var gen_text = gender.options[gender.selectedIndex].text;

    var data = JSON.stringify({
        "name": String(document.getElementById("cname").value),
        "gender": String(gen_text),
        "birthDate": String(document.getElementById("cbirthDate").value),
        "speciality": String(document.getElementById("cspec").value),
        "companyName": String(document.getElementById("ccompName").value),
        "position": String(document.getElementById("cposition").value),
        "salary": String(document.getElementById("csalary").value)
    });

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    // xhr.addEventListener("readystatechange", function () {
    //     if (this.readyState === 4) {
    //         form.dispatchEvent(new Event('submit'));
    //     }
    // });

    xhr.open("POST", "http://195.50.2.67:2403/alpa-workers");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(data);
}

function onRead() {

    // alert("onRead");
    xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {

            var resultTBody = document.createElement('tbody');
            JSON.parse(this.response).map(function (workerIn) {
                resultTBody.appendChild(parseWorkerToTableRow(workerIn));
            });

            var table = document.getElementById('rTBody').parentElement;
            table.replaceChild(resultTBody, document.getElementById('rTBody'));
            resultTBody.id = 'rTBody';
        }
    });

    xhr.open("GET", "http://195.50.2.67:2403/alpa-workers");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
}

function onPrepareUpdate(ev){

    ev.preventDefault();
    xhrids = new XMLHttpRequest();
    xhrids.withCredentials = true;

    xhrids.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {

            var ids = document.createElement('select');
            ids.className = 'form-control';
            JSON.parse(this.response).map(function (workerIn){
                var id = document.createElement('option');
                id.innerHTML = workerIn['id'];
                ids.appendChild(id);
            });

            document.getElementById('uid').parentElement.replaceChild(ids,document.getElementById('uid'));
            ids.id='uid';
        }
    });
    xhrids.open("GET", "http://195.50.2.67:2403/alpa-workers/");
    xhrids.setRequestHeader("Content-Type", "application/json");
    xhrids.send();
}

function onUpdate(ev) {
    ev.preventDefault();
   
    var gender = document.getElementById("ugender");
    var gen_text = gender.options[gender.selectedIndex].text;

    var uid = document.getElementById("uid");
    var uid_text = uid.options[uid.selectedIndex].text;

    var data = JSON.stringify({
        "name": String(document.getElementById("uname").value),
        "gender": String(gen_text),
        "birthDate": String(document.getElementById("ubirthDate").value),
        "speciality": String(document.getElementById("uspec").value),
        "companyName": String(document.getElementById("ucompName").value),
        "position": String(document.getElementById("uposition").value),
        "salary": String(document.getElementById("usalary").value)
    });

    xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    // xhr.addEventListener("readystatechange", function () {
    //     if (this.readyState === 4) {
    //         document.getElementById("updateForm").dispatchEvent(new Event('submit'));
    //     }
    // });

    xhr.open("PUT", "http://195.50.2.67:2403/alpa-workers/"+uid_text);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(data);
}

function onDelete(ev) {

    var form = document.getElementById('deleteForm');

    if (form.checkValidity() === false) {
        ev.preventDefault();
        ev.stopPropagation();
        form.classList.add('was-validated');
        return;
    }

    ev.preventDefault();
    xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    // xhr.addEventListener("readystatechange", function () {
    //     if (this.readyState === 4) {
    //         form.dispatchEvent(new Event('submit'));
    //     }
    // });

    xhr.open("DELETE", "http://195.50.2.67:2403/alpa-workers/" + document.getElementById("did").value);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
}


function parseWorkerToTableRow(workerIn) {

    var row = document.createElement('tr');

    var worker = new Worker(workerIn['name'], workerIn['gender'], workerIn['birthDate'], workerIn['speciality'], workerIn['companyName'],
        workerIn['position'], workerIn['salary']);

    var elem = document.createElement('th');
    elem.innerText = workerIn['id'];
    row.appendChild(elem);

    elem = document.createElement('td');
    elem.innerText = worker.getName();
    row.appendChild(elem);

    elem = document.createElement('td');
    elem.innerText = worker.getGender();
    row.appendChild(elem);

    elem = document.createElement('td');
    elem.innerText = worker.getBirthDate();
    row.appendChild(elem);

    elem = document.createElement('td');
    elem.innerText = worker.getSpeciality();
    row.appendChild(elem);

    elem = document.createElement('td');
    elem.innerText = worker.getCompanyName();
    row.appendChild(elem);

    elem = document.createElement('td');
    elem.innerText = worker.getPosition();
    row.appendChild(elem);

    elem = document.createElement('td');
    elem.innerText = worker.getSalary();
    row.appendChild(elem);

    return row;
}

(function () {

    document.getElementById('cbutton').addEventListener(
        'click', onCreate
    );

    document.getElementById('rbutton').addEventListener(
        'click', onRead
    );

    document.getElementById('ubutton').addEventListener(
        'click', onUpdate
    );

    document.getElementById('pubutton').addEventListener(
        'click', onPrepareUpdate
    );

    document.getElementById('dbutton').addEventListener(
        'click', onDelete
    );

})()