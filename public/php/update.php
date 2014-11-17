<?php
include 'LikeVM.php';
require 'jsonwrapper/jsonwrapper.php';

// The JSON standard MIME header.
header('Content-type: application/json; charset=utf-8');
$like = simplexml_load_file("info.xml");

if(stripos($_SERVER["CONTENT_TYPE"], "application/json") === 0) {
    $_POST["data"] = json_decode(file_get_contents("php://input"))->data;
}

if(!empty($_POST["data"])) {
    $like->userLike = $_POST["data"]->userLike;
    $like->nbLikes = $_POST["data"]->nbLikes;
}

$like->asXML("info.xml");

echo json_encode($like);
?>