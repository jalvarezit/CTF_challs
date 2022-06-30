<?php

    if (isset($_GET['debug'])) {
        $source = show_source("/var/www/html/index.php", true);
        echo $source;
        die();
    }

    session_start();

    $conn = new mysqli("database", "root", "my_secret_pw", "elections");
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    if (isset($_POST['president'])) {
        if(isset($_SESSION['csrf_token']) && isset($_POST['csrf_token']) && $_SESSION['csrf_token'] === $_POST['csrf_token'] ){
            $query = "INSERT INTO candidates (cand_name) VALUES('" . $_POST['president'] . "')";
            $conn->query($query);
        }

    }
    $_SESSION['csrf_token'] = md5(uniqid(mt_rand(), true));

?>

<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>TownElections</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="/public/css/main.css">
    </head>
    <body>
        <!-- /debug -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js" integrity="sha512-894YE6QWD5I59HgZOGReFYm4dnWc1Qt5NtvYSaNcOP+u1T9qYdvdihz0PPSiiqn/+/3e7Jo4EaG7TubfWGUrMQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js" integrity="sha384-QJHtvGhmr9XOIpI6YVutG+2QOK9T+ZnN4kzFN1RtK3zEFEIsxhlmWl5/YESvpZ13" crossorigin="anonymous"></script>
        <div class="container-fluid">    
            <h1 class="text-center">Town Elections</h1>
            <div class="text-center">
                <img class="img-fluid p-5" src="https://images.pexels.com/photos/1550337/pexels-photo-1550337.jpeg?crop=entropy&cs=srgb&dl=pexels-element-digital-1550337.jpg&fit=crop&fm=jpg&h=853&w=1280">
            </div>
            <p class="p-2 text-center">After four years we are back with our election system. Make sure you submit your candidacy:</p> 
            <form class="form-inline row justify-content-center" method="POST">
                <div class="col-md-3 col-sm-12">
                    <input id="president" type="text" class="form-control m-2" placeholder="John Doe" name="president"></input>
                </div>
                <div class="d-none col-md-4 col-sm-12">
                    <input id="csrf_token" type="text" class="col-md-1" name="csrf_token" value="<?php echo $_SESSION['csrf_token']?>"></input>
                </div>
                <div class="col-xl-1 col-md-2 col-sm-12">
                    <button id="submit" class="btn btn-light form-control m-2" type="submit">Submit</button>
                </div>
            </form>
        <div>
    </body>
</html>