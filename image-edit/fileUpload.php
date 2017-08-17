<?php
    $data = $_POST['filedata'];
    $data = str_replace('data:image/png;base64,', '', $data);
    $data = base64_decode($data);
    file_put_contents("i".  rand(0, 50).".png", $data);

/*    function abc($name){
		echo($name);
	}
	$image = imagegrabscreen();
	imagejpeg($image,"my_screenshot.jpeg");
	imagedestroy($image);
*/

?>

<?php
/*
$im = imagecreatefrompng("test.png");

header('Content-Type: image/png');

imagepng($im);
imagedestroy($im);
*/
?>
