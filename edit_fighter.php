<?php
include_once 'konfiguracija.php';

if ($_FILES["catImage"]["name"] != "") {
    $izraz=$veza->prepare("update cats set name= :name, age= :age, cat_info= :cat_info, win = :win, loss= :loss, img= :img WHERE cat_id = :id");
} else {
    $izraz=$veza->prepare("update cats set name= :name, age= :age, cat_info= :cat_info, win = :win, loss= :loss WHERE cat_id = :id");
}

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
                    "id"=>$_GET['id']
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
            "id"=>$_GET['id']
        ));
        header('location: index.php');
	}
}

?>