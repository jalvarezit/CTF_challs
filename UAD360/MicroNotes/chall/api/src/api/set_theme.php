<?php

/* Deprecated, available for backwards compatibility */

session_start();

if(isset($_GET['theme']))
{
    $_SESSION['theme'] = $_GET['theme'];

}

?>