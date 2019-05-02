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
?>

<section class="wrapper style1">
    <?php echo Html::tag('h2', $title, ['class' => 'title', 'data-track-content' => true, 'data-content-name' => Html::encode($title)]) ?>
    <div class="container">
        <header>
            <?php if ($image) : ?>
                <div class="image object">
                    <?php echo Html::img($image->source, [
                        'width' => $image->resolutionWidth,
                        'height' => $image->resolutionHeight
                    ]) ?>
                </div>
            <?php endif ?>

            <?php echo Html::tag('p', $subTitle, ['class' => 'style1']) ?>
        </header>

        <?php echo Html::tag('p', $text, ['class' => 'style3']) ?>

        <?php if ($link) : ?>
            <ul class="actions">
                <li><?php echo Html::a($buttonName ?: $link->getHref(), $link->getHref(), ['target' => $link->getTarget(), 'class' => 'button style3 large'])?></li>
            </ul>
        <?php endif ?>
    </div>
</section>
