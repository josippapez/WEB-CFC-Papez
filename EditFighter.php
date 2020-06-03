<?php
include_once 'konfiguracija.php';

$id = $_GET['id'];

$izraz=$veza->prepare("SELECT * FROM cats WHERE cat_id = :id");
$izraz->bindValue(':id', $id);
$izraz->execute();
$red=$izraz->fetch();

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Zadatak 1</title>
    <link
      rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
      integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
      crossorigin="anonymous"
    />
</head>
<body>
    <a href="index.php" class="btn btn-outline-dark mt-lg-5 ml-lg-5">Go back</a>
    <div class="container mt-lg-5">
        <form method="post" action="edit_fighter.php?id=<?php echo $red['cat_id']; ?>" enctype="multipart/form-data">
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" class="form-control" id="name" aria-describedby="nameHelp" placeholder="Enter name" name="name" value='<?php echo $red['name']; ?>' required>
            </div>
            <div class="form-group">
                <label for="age">Age</label>
                <input type="number" class="form-control" id="age" placeholder="Number" name="age" value='<?php echo $red['age']; ?>' required>
            </div>
            <div class="Cat Info">
                <label for="catInfo">Cat Info</label>
                <input type="text" class="form-control" id="catInfo" placeholder="Cat Info" name="cat_info" value='<?php echo $red['cat_info']; ?>' required>
            </div>
            <div class="row form-group mt-2">
                <div class="col">
                    <label for="number">Wins</label>
                    <input type="number" class="form-control" id="number" placeholder="Wins" name="win" value='<?php echo $red['win']; ?>' required>
                </div>
                <div class="col">
                    <label for="number">Loss</label>
                    <input type="number" class="form-control" id="number" placeholder="Loss" name="loss" value='<?php echo $red['loss']; ?>' required>
                </div>
            </div>
            <div class="form-group">
                <label for="catImage">Cat Image</label>
                <input type="file" name="catImage" id="catImage" value='<?php echo $red['img']; ?>'>
            </div>
            <button type="submit" class="btn btn-primary" name="submit">Submit</button>
        </form>
        <button type="delete" class="btn btn-primary float-right" name="delete" onclick="location.href='delete_fighter.php?id=<?php echo $red['cat_id']; ?>'">Delete fighter</button>
    </div>
</body>
</html>
