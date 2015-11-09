<!DOCTYPE html>
<html>

<head>
<title>Flight Info Test</title>
</head>

<body>
<h1 style="margin-bottom:10px;">Flight Ratings Input Form</h1>
<h4 style="margin-top:5px;">Use this form to build the flightratings.xml document, from which the site will pull flight ratings for each disc.</h4> 
<p>Note: Since I'm no PHP wizard, there's no way to delete or change entries from here. If you do make a mistake, don't sweat it&mdash;just note it down and let me know, and I can correct it manually in the XML.</p>
<br/>
<form action="submit-data.php" method="post">
	<label for="brand">brand</label><br/>
	<input type="text" name="brand" required><br/><br/>
	<label for="model">model (slug form, i.e. lowercase with hyphens)</label><br/>
	<input type="text" name="model" required><br/><br/>
	<label for="id">inbounds ID #</label><br/>
	<input type="number" name="id" required><br/><br/>
	<label for="speed">speed</label><br/>
	<input type="text" name="speed" required><br/><br/>
	<label for="glide">glide</label><br/>
	<input type="text" name="glide" required><br/><br/>
	<label for="turn">turn</label><br/>
	<input type="text" name="turn" required><br/><br/>
	<label for="fade">fade</label><br/>
	<input type="text" name="fade" required><br/><br/>
	<input type="submit" value="Go">
</form>
<p><a href="flightratings.xml">View the output</a></p>
</body>
</html>