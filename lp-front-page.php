<!DOCTYPE html>
<html>
<?php
// SET VARIABLES
$facebook_link = 'http://facebook.com/hyzershop';
$twitter_link = 'http://twitter.com/hyzer_shop';
$instagram_link = 'http://instagram.com/hyzershop';

?>
<head>
	<title>Coming Soon | hyzershop.com</title>
	<meta charset="utf-8"/>
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">

	<link rel="icon" href="favicon.png" type="image/png" />
	<script type="text/javascript" src="/wp-content/themes/storefront-child/lp-js/jquery.min.js"></script>
	<link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/themes/smoothness/jquery-ui.css">
	<script type="text/javascript" src="/wp-content/themes/storefront-child/lp-js/jquery-ui.min.js"></script>
	<script type="text/javascript" src="/wp-content/themes/storefront-child/lp-js/jquery.countdown.min.js"></script>
	<script type="text/javascript" src="http://ajax.aspnetcdn.com/ajax/jquery.validate/1.14.0/jquery.validate.min.js"></script>
	<link href='https://fonts.googleapis.com/css?family=Rock+Salt|Montserrat' rel='stylesheet' type='text/css'>
	<link rel="stylesheet" type="text/css" href="/wp-content/themes/storefront-child/lp-style.css">
</head>
<body>

<div id="wrapper">

<div id="masthead" class="clearfix">
	<div id="countdown">
		<table id="count"><tbody>
		<tr class="numbers sans blue">
		<td id="months"></td><td id="days"></td><td id="hours"></td><td id="minutes"></td><td id="seconds"></td>
		</tr>
		<tr class="units sans" style="color:#aaa5a9;">
		<td>mo</td><td>d</td><td>h</td><td>m</td><td>s</td>
		</tr>
		</tbody></table>
	</div>
	<div id="social" class="social" class="clearfix">
		<a href="<?php echo $instagram_link; ?>" target="_blank" class="first"><img src="/wp-content/themes/storefront-child/lp-images/instagram-o-pink.png" width="50" height="50"></a>
		<a href="<?php echo $facebook_link; ?>" target="_blank"><img src="/wp-content/themes/storefront-child/lp-images/facebook-o-pink.png" width="50" height="50"></a>
		<a href="<?php echo $twitter_link; ?>" target="_blank" class="last"><img src="/wp-content/themes/storefront-child/lp-images/twitter-o-pink.png" width="50" height="50"></a>
	</div>
	<div id="logo" style="width:177px; height:55px;"><img src="/wp-content/themes/storefront-child/lp-images/hyzershop-wordmark-1073-102015.png" alt="Hyzer Shop" width="177" height="55"></div>
</div>

<div id="main">
	<div class="tile signup-tile">
		<div class="specific-logo shop-logo"><img src="/wp-content/themes/storefront-child/lp-images/shop-logo-white.png" alt="Hyzer Shop" /></div>
		<h2>Hyzer Shop launches <strong>this February.</strong></h2>
		<h1 class="rtext-custom1">We're pretty psyched.</h1>
		<div id="form-container" class="clearfix">
		<?php
		if(!isset($_POST['submit'])) { 
			echo ('
				<form id="signupform" class="sans" action="/wp-content/themes/storefront-child/front-page.php" method="POST">
					<div id="text-inputs">
					<input type="text" name="first_name" placeholder="First Name">
					<input type="text" name="last_name" placeholder="Last Name">
					<input type="email" name="email" placeholder="Email">
					</div>
					<div id="brands">
					<label id="brands-label">Which brand(s) do you prefer? (optional)</label>
					<div id="brand-checkboxes">
					<input type="checkbox" name="brand_discraft" value="yes"><label for="brand_discraft" id="discraft_label" class="brand-label"><img src="/wp-content/themes/storefront-child/lp-images/discraft-logo-small-white.png" alt="MVP" width="60" height="23"/></label>
					<input type="checkbox" name="brand_mvp" value="yes"><label for="brand_mvp" id="mvp_label" class="brand-label"><img src="/wp-content/themes/storefront-child/lp-images/mvp-logo-small-white.png" alt="MVP" width="60" height="23"/></label>
					<input type="checkbox" name="brand_axiom" value="yes"><label for="brand_axiom" id="axiom_label" class="brand-label"><img src="/wp-content/themes/storefront-child/lp-images/axiom-logo-small-white.png" alt="MVP" width="60" height="23" style="margin-left:-9px;"/></label>
					</div>
					</div>
					<div id="submit-group">
					<input type="submit" name="submit" id="submit">
					<label id="submit-label" class="cta-text" for="submit">Sign up</label>
					</div>
				</form>
			');
		} else {
		    $first_name = $_POST['first_name'];
		    $last_name = $_POST['last_name'];
		    $email = $_POST['email'];

		    $brand_mvp = 'no';
		    $brand_discraft = 'no';
		    $brand_axiom = 'no';

		    $date = date('m\/j\/Y');
		    $time = date('h:i a');
			
			if(isset($_POST['brand_discraft'])) {
		    	$brand_discraft = $_POST['brand_discraft'];
			}
		    if(isset($_POST['brand_mvp'])) {
		    	$brand_mvp = $_POST['brand_mvp'];
			}
		    if(isset($_POST['brand_axiom'])) {
		    	$brand_axiom = $_POST['brand_axiom'];
			}

			if(!isset($error)) {
				$submission = array($first_name,$last_name,$email,$brand_discraft,$brand_mvp,$brand_axiom,$date,$time);
			}

			$fp = fopen('/home/hyzers5/public_html/wp-content/themes/storefront-child/lp-data/hyzershop-landingpage-submissions.csv', 'a');
			fputcsv($fp, $submission);
			fclose($fp);
		    //$ret = fopen('/Users/danielmayer/Sites/hyzershop-landing/lp-data/hyzershop-landingpage-submissions.csv', $submission, FILE_APPEND | LOCK_EX);
		    //$ret = file_put_contents('/wp-content/themes/storefront-child/lp-data/hyzershop-landingpage-submissions.csv', $submission, FILE_APPEND | LOCK_EX);
		    // if($ret === false) {
		    //     die('Oops--something went wrong. Email danny@hyzershop.com to let us know so we can solve the problem. Thanks!');
		    // }
			echo('<div id="thank-you-message">Thanks! <span class="pink">Stay tuned.</span></div>');
		} ?>
		</div>
	</div>

	<div class="tile blog-tile">
		<div class="specific-logo blog-logo"><img src="/wp-content/themes/storefront-child/lp-images/blog-logo-white.png" alt="Hyzer Blog" /></div>
		<h2>Meantime,</h2>
		<h1 class="rtext-custom2">Read up.</h1>
		<p>Is your body ready? The Hyzer Blog is rolling out new content every week. Come February, you’ll know exactly which discs you need in order to max out your game.</p>
		<div class="cta">
			<a href="http://blog.hyzershop.com"><span id="cta-text" class="cta-text">Start exploring</span><div class="cta-button"></div></a>
		</div>
	</div>

	<div id="vertical-divider"></div>
</div>

<div id="social-footer" class="social" class="clearfix">
		<a href="<?php echo $instagram_link; ?>" target="_blank" class="first"><img src="/wp-content/themes/storefront-child/lp-images/instagram-o-pink.png" width="50" height="50"></a>
		<a href="<?php echo $facebook_link; ?>" target="_blank"><img src="/wp-content/themes/storefront-child/lp-images/facebook-o-pink.png" width="50" height="50"></a>
		<a href="<?php echo $twitter_link; ?>" target="_blank" class="last"><img src="/wp-content/themes/storefront-child/lp-images/twitter-o-pink.png" width="50" height="50"></a>
		<p class="rocksalt blue">get updates on social</p>
</div>

<script type="text/javascript" src="/wp-content/themes/storefront-child/lp-js/responsivetext.js"></script>
<script>
	responsiveText();
	$(window).resize(responsiveText);
</script>
<script>
$("#signupform").validate({
	rules: {
	    first_name: "required",
	    email: {
	      required: true,
	      email: true
	    }
	},
  	messages: {
    	first_name: "Tell us your name.",
    	email: {
    		required: "Can't submit without an email address&mdash;sorry. Try again!",
    	}
  	}
});
</script>

<script type="text/javascript" src="/wp-content/themes/storefront-child/lp-js/custom.js"></script>
<script type="text/javascript">
	$(".tile").each(tileFullHeight);
	$(window).resize(function() {
	    $(".tile").each(tileFullHeight);
	});
</script>

<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-69062205-1', 'auto');
  ga('send', 'pageview');

</script>

</div>
</body>
</html>