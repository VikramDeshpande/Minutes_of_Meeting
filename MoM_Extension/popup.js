chrome.storage.sync.get(["subtitleWarning"], function (result) {
    if (result.subtitleWarning) {
        $("#captions-off").css("display", "block");
    }
    else {
        $("#captions-off").css("display", "none");
    }
})

extensionState = {
    loggedIn: false,
    email: '',
    name: '',
}

console.log('extensionState', extensionState);

let loginContainerContent = '';

console.log('token from popup.js : ', localStorage.getItem('token'));

updateState = () => {
    let token = localStorage.getItem('token');
    if (token !== null && token !== undefined) {
        fetch('http://localhost:8000/api/current_user/', {
            headers: {
                Authorization: `JWT ${token}`
            }
        })
            .then(res => res.json())
            .then(json => {
                let oldContainerContent = loginContainerContent;
                let loginContainer = document.getElementById("loginContainer");

                if (json === undefined || json.email === '' || json.email === undefined) {
                    // If the token is invalid or expired
                    extensionState.loggedIn = false;
                    extensionState.email = '';
                    extensionState.name = '';
                    loginContainerContent = '<p> <a href="http://localhost:3000/login" target="_blank">Login</a> </p>';
                }
                else {
                    // If token is correct
                    extensionState.loggedIn = true;
                    extensionState.email = json.email;
                    extensionState.name = json.name;
                    loginContainerContent = `<p> Logged In as: <strong>(${extensionState.name})</strong> </p>`;
                    loginContainerContent += `<p> <a href="http://localhost:3000/dashboard" target="_blank">View Dashboard</a> </p>`;
                }
                console.log("updateState called ", extensionState);
                if (oldContainerContent != loginContainerContent) {
                    // If the display data in html has changed, make update
                    loginContainer
                    while (loginContainer.firstChild) {
                        // Remove any nodes inside loginContainer if already present
                        loginContainer.removeChild(loginContainer.firstChild);
                    }
                    loginContainer.innerHTML = loginContainerContent;
                }
            });
    }
    else {
        console.log("popup.js: token not found in localstorage");
        let loginContainer = document.getElementById("loginContainer");
        extensionState.loggedIn = false;
        extensionState.email = '';
        extensionState.name = '';
        loginContainerContent = ' <a href="http://localhost:3000/login" target="_blank">Login</a> ';
        loginContainer.innerHTML = loginContainerContent;
    }
}

updateState();

$("#download").on('click', function () {
    chrome.storage.sync.get(["script", "meet_code"], function (output) {
        const doc = new jsPDF();
        doc.setFillColor(221, 221, 221);
        doc.setLineWidth(1.5);
        doc.rect(0, 0, 220, 60, "F");

        var img = new Image();
        img.src = "round-table.png"
        doc.addImage(img, 'PNG', 20, 6, 46, 46);

        doc.setLineWidth(0.7);
        doc.setDrawColor(0, 0, 0);
        doc.line(10, 60, 200, 60);

        doc.setFontSize(37);

        doc.setFont('helvetica');
        doc.setFontType('bold');
        doc.text("Meet Transcript", 190, 28, "right");

        doc.setFontSize(17);
        doc.setFont('times');
        doc.setFontType('italic');
        var today = new Date();
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        var width = doc.getTextWidth('options');
        width = 147 - width;
        doc.text(today.toLocaleDateString(undefined, options), 190, 38, "right");
        doc.text(output.meet_code, 190, 45, "right");



        doc.setFontSize(16);
        var splitText = doc.splitTextToSize(output.script, 170);

        var y = 70;

        for (var i = 0; i < splitText.length; i++) {
            if (y > 280) {
                y = 10;
                doc.addPage();
            }
            var res = splitText[i].split(":");

            if (res.length > 1) {
                y = y + 5;
                var name = res[0].concat(" :");
                var width = doc.getTextWidth(name);
                var conversation = res[1];

                doc.setFontType('bold');
                doc.text(10, y, name);
                doc.setFontType('normal');
                doc.text(15 + width, y, conversation);
            } else {
                doc.text(30, y, splitText[i]);
            }
            y = y + 7;
        }

        doc.save(output.meet_code + ".pdf");

    })
})
$("#summary").on('click', function () {
    chrome.storage.sync.get(["script", "meet_code"], function (output) {
        const now = new Date();
        const datetime = `${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}-${now.getHours().toString().padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}${now.getSeconds().toString().padStart(2, '0')}`;
        const id = `${output.meet_code}-${datetime}`;
        const message = {
            type: "post_meet",
            data: {
                id: id,
                content: Array.isArray(output.script) ? output.script.join("") : output.script
            }
        };
        chrome.runtime.sendMessage(message);
    });
})