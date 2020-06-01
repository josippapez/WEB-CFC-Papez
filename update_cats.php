<?php

include_once 'konfiguracija.php';

$firstjson = $_POST['firstCatInfo'];
$decoded = json_decode($firstjson, true);
$record = $decoded["record"];

$secondjson = $_POST['secondCatInfo'];
$secondDecoded = json_decode($secondjson, true);
$secondRecord = $secondDecoded["record"];

$izraz=$veza->prepare("UPDATE cats SET win = :win, loss = :loss WHERE cat_id = :id");
$izraz->bindValue(':win', $record["wins"]);
$izraz->bindValue(':loss', $record["loss"]);
$izraz->bindValue(':id', $decoded["id"]);
$izraz->execute();

$izraz->bindValue(':win', $secondRecord["wins"]);
$izraz->bindValue(':loss', $secondRecord["loss"]);
$izraz->bindValue(':id', $secondDecoded["id"]);
$izraz->execute();

?>