<?php
/**
 * View file for block: FeatureBlock 
 *
 * File has been created with `block/create` command on LUYA version 1.0.0-RC3. 
 *
 *
 * @var $this \luya\cms\base\PhpBlockView
 *
 * @var string $title
 * @var \luya\web\LinkInterface $url
 * @var string $text
 * @var string $linkName
 * @var string $iconClass
 */
use yii\helpers\Html;
use luya\lazyload\LazyLoad;

/** @var luya\web\WebsiteLink $url */
$url = $this->extraValue('url');
$title = $this->extraValue('title');
$text = $this->extraValue('text');
$linkName = $this->varValue('linkName') ?: 'Mehr';
$image = $this->extraValue('image');

if ($image) {
	$lazyImage = LazyLoad::widget([
		'src' => $image->source,
		'width' => $image->resolutionWidth,
		'height' => $image->resolutionHeight,
	]);
	// Todo: LazyLoad ist buggy
	$lazyImage = Html::img($image->source, [
		'width' => $image->resolutionWidth,
		'height' => $image->resolutionHeight,
    ]);
}
?>

<div class="<?php echo $this->cfgValue('htmlClass', 'post') ?>">
    <article>
        <div class="image <?php echo $this->cfgValue('imageHtmlClass', 'centered') ?>">
            <?php echo $lazyImage ?>
        </div>
        <header>
            <h3 data-track-content data-content-name="<?php echo Html::encode($title) ?>"><?php echo Html::encode($title) ?></h3>
        </header>
        <p>
            <?php echo $text ?>
        </p>

        <?php if ($url) : ?>
            <ul class="actions">
                <li><?php echo Html::a($linkName ?: $url->getHref(), $url->getHref(), ['target' => $url->getTarget(), 'class' => 'button style1'])?></li>
            </ul>
        <?php endif ?>
    </article>
</div>
