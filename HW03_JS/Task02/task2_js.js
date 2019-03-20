function delContentById(id) {
    document.getElementById(id).innerHTML = '';
}

function delBodyContent() {
    document.getElementsByTagName('BODY')[0].innerHTML = '';
}