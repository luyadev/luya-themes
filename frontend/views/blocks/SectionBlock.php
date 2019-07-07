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
$htmlClass = [$this->cfgValue('htmlClass', 'container')];
$containerHtmlClass = [$this->cfgValue('containerHtmlClass')];

$useFlexContainer = $this->varValue('useFlexContainer') == "true";
if ($useFlexContainer) {
    $containerHtmlClass[] = 'container-flex';
}

$content = Html::tag('div', $elements, ['class' => $containerHtmlClass]);
?>

<?php echo Html::tag('div', $content, ['class' => $htmlClass])?>

