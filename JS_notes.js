function CheckForAuthorization() {
	var req = new XMLHttpRequest();
	if(req) {
		req.onreadystatechange = function() {
			if(req.readyState == 4) {  // если запрос закончил выполняться 
				if(req.status == 200) {
					if(req.responseText == "error") {
						location.replace("index.html");
					}
					else {
						document.getElementById('whois').innerHTML = "Привіт, " + req.responseText;
					}
				}
				else alert(req.statusText);
			}	
		}

		req.open("POST", 'Customers.php', true);  // задать адрес подключения
		req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		req.send("for=checkauth"); // отослать запрос
	}
	else {
		alert("Браузер не підтримує технологію AJAX");
	}

	setTimeout("CheckForAuthorization()", 1000);
}


function AddNote() {
	var error = document.getElementById('error');

	if(document.getElementById('noteTitleForm').value.trim().length == 0 || document.getElementById('noteDescriptionForm').value.trim().length == 0) {
		error.innerHTML = "Поля не можуть бути порожніми";
		return;
	}
	else {
		error.innerHTML = "";
	}

	var req = new XMLHttpRequest();
	if(req) {
	req.onreadystatechange = function() {
		if(req.readyState == 4) {
			if(req.status == 200) {
				var title = document.getElementById('noteTitleForm').value;
				var descr = document.getElementById('noteDescriptionForm').value;
				Add(title, descr);
				$('#createForm').modal("hide");
				document.getElementById('noteTitleForm').value = "";
				document.getElementById('noteDescriptionForm').value= "";
			}
			else alert(req.statusText);
		}
	}
	req.open("POST", 'Notes_script.php', true);
	req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	var params = "title=" + document.getElementById('noteTitleForm').value + "&description=" + document.getElementById('noteDescriptionForm').value + "&for=newnote";
	req.send(params);
	}
	else {
		alert("Браузер не підтримує технологію AJAX");
	}
}


function EditNote() {
	var error = document.getElementById('errorEdit');
	var req = new XMLHttpRequest();

	if(document.getElementById('noteTitleEdit').value.trim().length == 0 || document.getElementById('noteDescriptionEdit').value.trim().length == 0) {
		error.innerHTML = "Поля не можуть бути порожніми";
		return;
	}
	else {
		error.innerHTML = "";
	}

	if(req) {
		req.onreadystatechange = function() {
			if(req.readyState == 4) {
				if(req.status == 200) {
					editingNote.children[0].innerHTML = document.getElementById('noteTitleEdit').value;
					editingNote.children[1].innerHTML = document.getElementById('noteDescriptionEdit').value;
					$('#editForm').modal("hide");
				}
				else alert(req.statusText);
			}
		}
		req.open("POST", 'Notes_script.php', true)
		req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		var params = "title=" + document.getElementById('noteTitleEdit').value + "&editingNoteTitle=" + editingNoteTitle + "&description=" + document.getElementById('noteDescriptionEdit').value + "&editingNoteDescr=" + editingNoteDescr + "&for=editnote";
		req.send(params); // отослать запрос
	}
	else {
		alert("Браузер не підтримує технологію AJAX");
	}
}


function DisplayNotes() {
	CheckForAuthorization();

	var req = new XMLHttpRequest();

	if(req) {
		req.onreadystatechange = function() {
			if(req.readyState == 4) {  // если запрос закончил выполняться 
				if(req.status == 200) {
					var json = req.responseText;
					var allNotes = JSON.parse(json);
					for(var i = 0; i < allNotes.length; i++) {
						Add(allNotes[i].title, allNotes[i].description);
					}
				}
				else alert(req.statusText);
			}	
		}

		req.open("POST", 'Notes_script.php', true)  // задать адрес подключения
		req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		req.send("for=displaynotes"); // отослать запрос
	}
	else {
		alert("Браузер не підтримує технологію AJAX");
	}
}


var editingNoteTitle = "";
var editingNoteDescr = "";
var editingNote;

function Add (title, description) {
	var note = document.createElement('div');
	var deleteNote = document.createElement('div');
	var noteTitle = document.createElement('p');
	var noteDescription = document.createElement('textarea');

	note.setAttribute('id', 'note');
	note.setAttribute('class', 'panel');
	note.setAttribute('class', 'panel-warning');
	noteTitle.setAttribute('id', 'noteTitle');
	noteTitle.setAttribute('class', 'panel-heading text-center');
	noteDescription.setAttribute('id', 'noteDescription');
	noteDescription.setAttribute('class', 'panel-body');
	noteDescription.setAttribute('readonly', 'true');
	noteDescription.setAttribute('maxlength', '2000');
	noteDescription.setAttribute('title', 'Edit note');

	noteTitle.innerHTML = title;
	noteDescription.innerHTML = description;

	note.appendChild(noteTitle);
	note.appendChild(noteDescription);

	noteTitle.ondblclick = function() {
		var req = new XMLHttpRequest();
		var that = this;
		if(req) {
			req.open("POST", 'Notes_script.php', true);
			req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			var params = "title=" + this.parentElement.children[0].innerHTML + "&description=" + this.parentElement.children[1].value + "&for=deletenote";
			req.send(params);
			that.parentElement.parentElement.removeChild(that.parentElement);
		}
		else {
			alert("Браузер не підтримує технологію AJAX");
		}
	}

	noteDescription.onclick = function() {
		$('#editForm').modal("show");
		editingNoteTitle = this.previousSibling.innerHTML;
		editingNoteDescr = this.innerHTML;
		document.getElementById('noteTitleEdit').value = editingNoteTitle;
		document.getElementById('noteDescriptionEdit').value = editingNoteDescr;
		editingNote = this.parentElement;
	}

	document.getElementById('AllNotes').appendChild(note);
}



function Logout() {
	var req = new XMLHttpRequest(); // создать объект для запроса к серверу

	if(req) {	
		req.open("POST", 'Customers.php', true)  // задать адрес подключения
		req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		req.send("for=logout"); // отослать запрос
	}
	else {
		alert("Браузер не підтримує технологію AJAX");
	}
}