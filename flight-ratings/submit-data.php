<?php

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

$getbrand = $_POST["brand"];
$brand = strtolower($getbrand);
$getmodel = $_POST["model"];
$lowercasemodel = strtolower($getmodel);
$model = str_replace(" ", "-", $lowercasemodel);
$id = $_POST["id"];
$slug = $brand . "-" . $model;
$speed = $_POST["speed"];
$glide = $_POST["glide"];
$turn = $_POST["turn"];
$fade = $_POST["fade"];


$file_exists = file_exists("flightratings.xml");

if ($file_exists) {
	$ratings = simplexml_load_file('flightratings.xml');
} else {
	$xml = 
<<<XML
<FlightRatings>
</FlightRatings>
XML;
	$ratings = new SimpleXMLElement($xml);
}

$product = $ratings->addChild("product");
$product->addAttribute("slug", $slug);
$product->addAttribute("brand", $brand);
$product->addAttribute("model", $model);
$product->addAttribute("id", $id);

$product->addChild("speed", $speed);
$product->addChild("glide", $glide);
$product->addChild("turn", $turn);
$product->addChild("fade", $fade);

$ratings->asXML("flightratings.xml");

// echo "<br/>Success! Again?<br/>";

header("Location: index.php");
die();

}

?>