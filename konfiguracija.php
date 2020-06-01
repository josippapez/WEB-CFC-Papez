<?php
session_start();

$mysqlHost="eu-cdbr-west-03.cleardb.net";
$mysqlBaza="heroku_4a760cf305f0dfa";
$mysqlKorisnik="b8812483718ed0";
$mysqlLozinka="3286566e";

$veza = new PDO("mysql:host=" . $mysqlHost. ";dbname=" . $mysqlBaza,$mysqlKorisnik,$mysqlLozinka);
$veza->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$veza->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
$veza->exec("SET CHARACTER SET utf8");
$veza->exec("SET NAMES utf8");