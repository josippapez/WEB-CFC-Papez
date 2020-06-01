<?php
include_once 'konfiguracija.php';

$izraz=$veza->prepare("insert into cats(name, age, cat_info, win, loss, img) values (:name, :age, :cat_info, :win, :loss, :img)");

$allow = array("jpg", "jpeg", "gif", "png");

if(isset($_POST["submit"])) {

	$file = $_FILES["catImage"];
	$fileName = $file["name"];
	$fileTempName = $file["tmp_name"];
	$fileSize = $file["size"];
	$fileType = $file["type"];
	$fileError = $file["error"];

	$fileExtension = explode(".", $fileName);
	$fileActualExtension = strtolower(end($fileExtension));
	$allowed = array('jpg', 'png', 'jpeg');
	if (in_array($fileActualExtension, $allowed)) {
		if ($fileError === 0) {
			if ($fileSize < 10000000){
				$fileNameNew = uniqid('', true).".".$fileActualExtension;
				$fileDestination = 'img/'.$fileNameNew;
				move_uploaded_file($fileTempName, $fileDestination);
				$izraz->execute(array(
					"name"=>$_POST["name"],
					"age"=>$_POST["age"],
					"cat_info"=>$_POST["cat_info"],
					"win"=>$_POST["win"],
					"loss"=>$_POST["loss"],
					"img" => "img/".$fileNameNew,
				));
				header('location: index.php');
			} else {
				echo "Your file is too big";
			}
		} else {
			echo "There was an error uploading your file";
		}
	} else {
		$izraz->execute(array(
			"name"=>$_POST["name"],
			"age"=>$_POST["age"],
			"cat_info"=>$_POST["cat_info"],
			"win"=>$_POST["win"],
			"loss"=>$_POST["loss"],
			"img" => null
		));
		header('location: index.php');
	}
}
