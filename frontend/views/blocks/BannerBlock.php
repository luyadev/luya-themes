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
use luya\lazyload\LazyLoad;

$image = $this->extraValue('image');
$title = $this->varValue('title');
$subTitle = $this->varValue('subTitle');
$text = $this->varValue('text');
$link = $this->extraValue('link');
$buttonName = $this->varValue('buttonName');

$titleHeading = $this->cfgValue('title-heading', 'h2');
?>

<?php echo Html::beginTag('div', [
		'class' => 'banner style1',
		'style' => ['background' => $this->extraValue('background')],
	]) ?>
<div class="banner style1">
   <div class="inner">
        <?php if ($title) : ?>
            <?php echo Html::tag($titleHeading, Html::encode($title), ['class' => 'title']) ?>
        <?php endif ?>
    
        <div class="content">
            <header>
                <?php if ($image) : ?>
                    <div class="image object">
                        <?php echo Html::img($image->source, [
                            'width' => $image->resolutionWidth,
                            'height' => $image->resolutionHeight
                        ]) ?>
                    </div>
                <?php endif ?>
    
                <?php if ($subTitle) : ?>
                    <?php echo Html::tag('p', Html::encode($subTitle), ['class' => 'style1']) ?>
                <?php endif ?>
            </header>
        
            <?php if ($text) : ?>
                <?php echo Html::tag('p', $text, ['class' => 'style3']) ?>
            <?php endif ?>
    
            <?php if ($link) : ?>
                <ul class="actions">
                    <li><?php echo Html::a($buttonName ?: $link->getHref(), $link->getHref(), ['target' => $link->getTarget(), 'class' => 'button style3 large'])?></li>
                </ul>
            <?php endif ?>
        </div>
   </div>
</div>
