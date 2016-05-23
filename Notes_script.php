<?php 
$con = new MongoClient();
$coll = $con -> snotes -> notes;
$con -> close();

if($_POST['for'] == "displaynotes") {
	$arr = "[";
	$notes = $coll -> find(array('id' => $_COOKIE['id']));
	while($note = $notes -> getNext()) {
		$arr .= json_encode($note);
    	if($notes -> hasNext()) {
    		$arr .= ",";
    	}
	}
	$arr .= "]";
	echo $arr;
}

if($_POST['for'] == "newnote") {
	$title = $_POST['title'];
	$description = $_POST['description'];
	$note = array('id' => $_COOKIE['id'], 'title' => $title, 'description' => $description);
	$coll -> insert($note);
}

if($_POST['for'] == "deletenote") {
	$title = $_POST['title'];
	$description = $_POST['description'];
	$params = array('justOne' => true);
	$note = array('title' => $title, 'description' => $description);
	$coll -> remove($note, $params);
}

if($_POST['for'] == "editnote") {
	$editingNoteTitle = $_POST['editingNoteTitle'];
	$editingNoteDescr = $_POST['editingNoteDescr'];
	$title = $_POST['title'];
	$description = $_POST['description'];
	$coll -> update(array('title' => $editingNoteTitle, 'description' => $editingNoteDescr), array('$set' => array('title' => $title, 'description' => $description)), array('upsert' => false));
}
?>