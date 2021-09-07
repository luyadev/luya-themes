<?php
/**
 * View file for block: BannerBlock 
 *
 * File has been created with `block/create` command on LUYA version 1.0.0-RC3. 
 *
 * @param $this->varValue('subTitle');
 * @param $this->varValue('title');
 *
 * @var \luya\cms\base\PhpBlockView $this
 * @var \luya\web\LinkInterface $link
 */

use yii\helpers\Html;
use \luya\yii\helpers\Url;

$image = $this->extraValue('image');
$title = $this->varValue('title');
$subTitle = $this->varValue('subTitle');
$text = $this->varValue('text');
$link = $this->extraValue('link');
$buttonName = $this->varValue('buttonName');

$backgroundColor = $this->cfgValue('background-color', 'none');
$backgroundImage = $this->cfgValue('background-image', null);
$backgroundVideo = $this->cfgValue('background-video', null);
$titleHeading = $this->cfgValue('title-heading', 'h2');
?>

<?php echo Html::beginTag('section', [
		'class' => 'banner style1 orient-left content-align-left image-position-right fullscreen onload-image-fade-in onload-content-fade-right',
	]) ?>

    <?php echo Html::beginTag('div', [
        'class' => 'image',
        'style' => $this->extraValue('background-style'),
    ]) ?>
        <?php if ($image) : ?>
            <?php echo Html::img($image->source, [
                'width' => $image->resolutionWidth,
                'height' => $image->resolutionHeight
            ]) ?>
        <?php endif ?>

        <?php if ($title) : ?>
            <?php echo Html::tag($titleHeading, Html::encode($title), ['class' => 'title']) ?>
        <?php endif ?>

        <?php if ($subTitle) : ?>
            <?php echo Html::tag('p', Html::encode($subTitle), ['class' => 'text']) ?>
        <?php endif ?>
    <?php echo Html::endTag('div') ?>

    <div class="content">
        <?php if ($text) : ?>
            <?php echo Html::tag('div', $text, ['class' => 'major']) ?>
        <?php endif ?>

        <?php if ($link) : ?>
            <ul class="actions stacked">
                <li>
                    <?php echo Html::beginTag('a', [
                            'href' => Url::to($link->getHref()),
                            'target' => $link->getTarget(), 'class' => 'button style3 large'
                        ])?>
                        <?php if ($link->getTarget() == '_blank') : ?>
                            <i class="icon solid fa-external-link-alt"></i>
                        <?php endif ?>
    
                        <?php echo Html::encode($buttonName ?: $link->getHref()) ?>
                    
                    <?php echo Html::endTag('a')?>
                </li>
            </ul>
        <?php endif ?>
    </div>

<?php echo Html::endTag('section') ?>
