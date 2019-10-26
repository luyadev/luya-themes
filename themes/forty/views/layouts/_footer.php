<?php
/**
 * @var \luya\web\View $this
 */
?>

<!-- Contact -->
<section id="contact" class="wrapper">
	<div class="container">
		<section>
			<form method="post" action="#">
				<div class="fields">
					<div class="field half">
						<label for="name">Name</label>
						<input type="text" name="name" id="name" />
					</div>
					<div class="field half">
						<label for="email">Email</label>
						<input type="text" name="email" id="email" />
					</div>
					<div class="field">
						<label for="message">Message</label>
						<textarea name="message" id="message" rows="6"></textarea>
					</div>
				</div>
				<ul class="actions">
					<li><input type="submit" value="Send Message" class="primary" /></li>
					<li><input type="reset" value="Clear" /></li>
				</ul>
			</form>
		</section>
		<section class="split">
			<section>
				<div class="contact-method">
					<span class="icon solid alt fa-envelope"></span>
					<h3>Email</h3>
					<a href="#">information@untitled.tld</a>
				</div>
			</section>
			<section>
				<div class="contact-method">
					<span class="icon solid alt fa-phone"></span>
					<h3>Phone</h3>
					<span>(000) 000-0000 x12387</span>
				</div>
			</section>
			<section>
				<div class="contact-method">
					<span class="icon solid alt fa-home"></span>
					<h3>Address</h3>
					<span>1234 Somewhere Road #5432<br />
										Nashville, TN 00000<br />
										United States of America</span>
				</div>
			</section>
		</section>
	</div>
</section>

<!-- Footer -->
<footer id="footer" class="wrapper">
	<div class="container">
		<ul class="icons">
			<li><a href="#" class="icon brands alt fa-twitter"><span class="label">Twitter</span></a></li>
			<li><a href="#" class="icon brands alt fa-facebook-f"><span class="label">Facebook</span></a></li>
			<li><a href="#" class="icon brands alt fa-instagram"><span class="label">Instagram</span></a></li>
			<li><a href="#" class="icon brands alt fa-github"><span class="label">GitHub</span></a></li>
			<li><a href="#" class="icon brands alt fa-linkedin-in"><span class="label">LinkedIn</span></a></li>
		</ul>
		<ul class="copyright">
			<li>&copy; <?php echo Yii::$app->name ?></li></li>
		</ul>
	</div>
</footer>