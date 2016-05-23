function SignUp() {
	var error = document.getElementById('error');
	if(document.getElementById('login').value.trim().length == 0 || document.getElementById('password').value.trim().length == 0 || document.getElementById('repeatPassword').value.trim().length == 0) {
		error.innerHTML = "Поля не можуть бути порожніми";
		return;
	}
	else if(document.getElementById('password').value.trim() != document.getElementById('repeatPassword').value.trim()) {
		error.innerHTML = "Паролі не співпадають";
		return;
	}
	else {
		error.innerHTML = "";
	}

	var req = new XMLHttpRequest();
	document.getElementById("signupbtn").disabled = true;

	if(req) {
		req.onreadystatechange = function() {
			if(req.readyState == 4) {
				if(req.status == 200) {
					if(req.responseText == "ok") {
						location.replace("Notes.html");
					}
					else {
						document.getElementById("error").innerHTML = req.responseText;
						document.getElementById("signupbtn").disabled = false;
					}
				}
			}	
		}

		req.open("POST", 'Customers.php', true);
		req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		var params = "login=" + document.getElementById('login').value + "&password=" + document.getElementById('password').value + "&for=signup";
		req.send(params);
	}
	else {
		alert("Браузер не підтримує технологію AJAX");
	}
}


function LogIn() {
	var error = document.getElementById('error');
	if(document.getElementById('login').value.trim().length == 0 || document.getElementById('password').value.trim().length == 0) {
		error.innerHTML = "Поля не можуть бути порожніми";
		return;
	}
	else {
		error.innerHTML = "";
	}
	
    document.getElementById('loginbtn').disabled = true;

    var req = new XMLHttpRequest();
    if(req) {
        req.onreadystatechange = function() {
            if(req.readyState == 4) {
                if(req.status == 200) {
                    if(req.responseText == "ok") {
                    	location.replace("Notes.html");
                    }
                    else {
                    	error.innerHTML = req.responseText;
                    	document.getElementById('loginbtn').disabled = false;
                    }
                }
                else alert(req.statusText);
            }
        }
        req.open("POST", 'Customers.php', true);
        req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        var params = "login=" + document.getElementById('login').value + "&password=" + document.getElementById('password').value + "&for=login";
        req.send(params);
    }
    else {
        alert("Браузер не підтримує технологію AJAX");
    }
}


function CheckForAuthorization() {
	var req = new XMLHttpRequest();
    if(req) {
        req.onreadystatechange = function() {
            if(req.readyState == 4) {
                if(req.status == 200) {
                    if(req.responseText != "error") {
                        location.replace("Notes.html");
                    }
                }
                else alert(req.statusText);
            }   
        }

        req.open("POST", 'Customers.php', true);
        req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        req.send("for=checkauth");
    }
    else {
        alert("Браузер не підтримує технологію AJAX");
    }
}