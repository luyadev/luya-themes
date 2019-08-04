<?php
/**
 * View file for block: FeaturesBlock 
 *
 * File has been created with `block/create` command on LUYA version 1.0.0-RC3. 
 *
 *
 * @var $this \luya\cms\base\PhpBlockView
 */

use yii\helpers\Html;

$elements = $this->placeholderValue('elements');
$containerHtmlClass = [$this->cfgValue('containerHtmlClass')];

if ($this->varValue('useFlexContainer')) {
    $containerHtmlClass[] = 'container-flex';
}

$content = Html::tag('div', $elements, ['class' => $containerHtmlClass]);

if ($this->varValue('disableWrapper')) {
    echo $content;
} else {
    $htmlClass = [$this->cfgValue('htmlClass','container')];
    
    echo Html::tag('div', $content, ['class' => $htmlClass]);
}
?>
