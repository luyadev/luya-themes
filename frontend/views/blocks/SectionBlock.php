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

$useFlexContainer = $this->varValue('useFlexContainer');


$elements = $this->placeholderValue('elements');
$htmlClass = $this->cfgValue('htmlClass', 'container');
$containerHtmlClass = $this->cfgValue('containerHtmlClass');

$content = Html::tag('div', $elements, ['class' => $containerHtmlClass]);
?>

<?php echo Html::tag('div', $content, ['class' => $htmlClass])?>

