<?php

function content_filter($content)
{
    return base64_encode($content);
}

?>