<?php
include 'LikeVM.php';
require 'jsonwrapper/jsonwrapper.php';

// The JSON standard MIME header.
header('Content-type: application/json; charset=utf-8');
$like = simplexml_load_file("info.xml");

echo json_encode($like);
?>