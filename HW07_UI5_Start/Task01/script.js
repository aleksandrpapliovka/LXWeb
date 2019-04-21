function sendRequest(filter) {

    return new Promise(function (resolve) {
        $.ajax({
            url: "https://services.odata.org/V4/(S(2k3iyrbhmcv3bf3cj4urocce))/TripPinServiceRW/" + filter,
            type: 'GET',
            datatype: 'json',
            success: function (response) { resolve(response); },
            error: function () { alert("oData Request Error"); }
        })
    });

}

function onTry(filter) {

    sendRequest(filter).then(function (response) {
        if (response['@odata.count'] !== undefined) {

            alert("Count: " + response['@odata.count']);
        }
        else {

            var result, res;
            if (response.Friends !== undefined) {
                result = response.Friends;
            }
            else {
                result = response.value;
            }

            $('#rTBody tr').remove();

            for (i = 0; i < result.length; i++) {

                res = ['', '', '', '', ''];

                if (result[i].FirstName !== undefined) {
                    res[0] = result[i].FirstName;
                }

                if (result[i].LastName !== undefined) {
                    res[1] = result[i].LastName;
                }

                if (result[i].Gender !== undefined) {
                    res[2] = result[i].Gender;
                }                

                if (result[i].Emails !== undefined) {
                    res[3] = result[i].Emails.join(', ');
                }

                if (result[i].Concurrency !== undefined) {
                    res[4] = result[i].Concurrency;
                }                

                $('#peopleT > tbody:last-child').append(
                    '<tr><td>' + res[0] + '</td>' +
                    '<td>' + res[1] + '</td>' +
                    '<td>' + res[2] + '</td>' +
                    '<td>' + res[3] + '</td>' +
                    '<td>' + res[4] +
                    '</td></tr>');
            }
        }
    });
}

(function () {

    $('#iTryCount').click(function () {
        onTry("People?$count=true");
    });

    $('#iTryExpand').click(function () {
        onTry("People('keithpinckney')?$expand=Friends");
    });

    $('#iTryOrderby').click(function () {
        onTry("People?$orderby=FirstName");
    });

    $('#iTrySearch').click(function () {
        onTry("People?$search=Vincent");
    });

    $('#iTrySelect').click(function () {
        onTry("People?$select=FirstName, LastName, Gender");
    });

    $('#iTrySkip').click(function () {
        onTry("People?$skip=14");
    });

    $('#iTryTop').click(function () {
        onTry("People?$top=3");
    });

    $('#iTryFilter').click(function () {
        onTry("People?$filter=FirstName eq 'Keith'");
    });

    $('#iTryOrderTopFilter').click(function () {
        onTry("People?$orderby=LastName&$top=3&$filter=LastName eq 'Alfred'");
    });


})()
