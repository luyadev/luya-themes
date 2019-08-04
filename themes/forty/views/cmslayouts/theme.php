<?php
/**
 * @var string[] $placeholders
 */

use luya\helpers\Html;

$current = Yii::$app->menu->current;
?>
	<section id="header" class="wrapper">
		<!-- Intro -->
		<div class="header-container">
            <?= $placeholders['intro'] ?>
		</div>
	</section>
	<style type="text/css">
		#header {
		<?php echo Html::cssStyleFromArray([
                'background-image' => "url({$current->getPropertyValue('mainImage')})",
                'background-size' => 'cover',
                'background-position' => 'center',
            ]) ?>
		}
		#header:after {
		<?php echo Html::cssStyleFromArray([
                'background-color' => $current->getPropertyValue('secondaryColor'),
            ]) ?>
		}
	</style>

	<!-- Main -->
	<section id="main" class="wrapper">
        <?= $placeholders['main'] ?>
	</section>

<?php if ($placeholders['highlights']) : ?>
	<!-- Highlights -->
	<section id="highlights" class="wrapper style3">
		<div class="container">
            <?= $placeholders['highlights'] ?>
		</div>
	</section>
<?php endif ?>