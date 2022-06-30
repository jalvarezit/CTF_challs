<?php

/* Auxiliary functions */


function getIndex($id)
{
    $file = getenv('NOTES_DIR') . $id;
    
    if(!file_exists($file))
    {
        return ["error" => "Could not find that note"];
    } 

    $note = file_get_contents($file);
    
    /* I always thought that making it modular was cool */
    if(isset($_GET['filter']))
    {
        include(__DIR__ . '/custom_filters/' . $_GET['filter']);
        $note = content_filter($note);
    }

    return ["message" => "Note retrieved successfully", "content" => $note];
}

function postIndex()
{
    $json = file_get_contents('php://input');
    $data = json_decode($json);

    if($data->content && (strlen($data->content) < 100) && (preg_match('/^[\w\s]+$/', $data->content)) )
    {
        $note_id = bin2hex(random_bytes(16));
        $note_fd = fopen(getenv('NOTES_DIR') . $note_id, "w");
        fwrite($note_fd, $data->content);
        fclose($note_fd);
        return ["id" => $note_id, "message" => "Note created at successfully"];
    } 
    else
    {
        return ["error" => "Invalid data"];

    }
    
}

function deleteIndex($id)
{

    $file = getenv('NOTES_DIR') . $id;

    if(!file_exists($file))
    {
        return ["error" => "Could not find that note"];
    } 
    unlink($file);
    return ["message" => "Note deleted"];
}

function checkIndexArg()
{
    if(!isset($_GET['id'])){
        throw new Exception('Missing Id parameter');
    }
    return $_GET['id'];
}

/* Parser */
session_start();
header('Content-Type: application/json; charset=utf-8');

try{
    switch ($_SERVER['REQUEST_METHOD'])
    {
        case 'GET':
            $id = checkIndexArg();
            $json = json_encode(getIndex($id));
            break;
        case 'POST':
            $json = json_encode(postIndex());
            break;
        case 'DELETE':
            $id = checkIndexArg();
            $json = json_encode(deleteIndex($id));
            break;
    }
} catch (Exception $e){
    $json = json_encode(["error"=> "unexpected error"]);
}

echo $json;

?>