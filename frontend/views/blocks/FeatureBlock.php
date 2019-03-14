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
 * @var \luya\web\LinkInterface $link
 * @var string $text
 * @var string $linkName
 * @var string $iconClass
 */
use yii\helpers\Html;

$link = $this->extraValue('link');
$iconClass = $this->varValue('iconClass');
$title = $this->extraValue('title');
$text = $this->extraValue('text');
$linkName = $this->varValue('linkName') ?: 'Mehr';

?>
<section class="feature-list">
    <h3 class="icon <?php echo "fa-$iconClass"?>">
        <?php echo Html::encode($title) ?>
    </h3>
    <p>
        <?php echo Html::encode(trim($text)) ?>
    </p>
</section>

