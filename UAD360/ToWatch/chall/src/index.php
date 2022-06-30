<?php

class Gadget{
    public $cmd = 'whoami';
    public function __destruct() {
        system($this->cmd);
    }
}

if (isset($_GET['debug'])) {
    highlight_file(__FILE__);
    exit;
}

if (!isset($_COOKIE['session'])) {
    $series = [];
    setcookie("session", serialize($series));
} else {
    $series = unserialize($_COOKIE['session']);
}


if (isset($_POST['submit']) && isset($_POST['name'])) {
    $series[] = $_POST['name'];
    setcookie("session", serialize($series));
}

?>

<!DOCTYPE html>
<html>
    <head>
        <title>ToWatch</title>
    </head>
    <body>
        <!-- /?debug -->
        <h1>Pick your favourite series</h1>
        <form method="POST">
            <input type="text" name="name"></input>
            <input type="submit" name="submit"/>
        </form>

        <?php

            foreach($series as $name) { 
                echo "<p>" . $name . "<p/>";
            }
        ?>
    </body>
</html>