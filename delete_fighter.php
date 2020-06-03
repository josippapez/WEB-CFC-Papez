<?php
include_once 'konfiguracija.php';

$izraz=$veza->prepare("DELETE FROM cats WHERE cat_id = :id");

$izraz->bindValue(':id', $_GET["id"]);
$izraz->execute();

header('location: index.php');

?>