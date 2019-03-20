function callPopup () {

    var content, contentUp;

    content = prompt("Enter Username");

    if (hasNumber(content)) {

        contentUp = content.toUpperCase();
        content = "";

        for (var i = 0; i <= contentUp.length; i++) {

            if ( i % 2 == 0) {
                content += contentUp.charAt(i).toLowerCase();
            }
            else {
                content += contentUp.charAt(i)
            }
            
        }
    }

    prompt("Enter Username", content);
}

function hasNumber(input) {
    return /\d+/.test(input);
}

var callPopup = callPopup();



