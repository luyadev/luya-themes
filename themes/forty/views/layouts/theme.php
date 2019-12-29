<?php
/**
 * @var $this \luya\web\View
 */
use luya\themes\frontend\ResourcesAsset;

ResourcesAsset::register($this);

$this->beginPage();
?>
<!DOCTYPE html>
<html lang="<?= Yii::$app->composition->language; ?>">
    <head>
        <title><?= $this->title; ?></title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <meta name="author" content="boehsermoe">
        <?php $this->head() ?>
    </head>
    <body class="homepage">
    <?php $this->beginBody() ?>

        <div id="wrapper">
            <?php echo $this->render('_header') ?>
            <?php echo $content ?>
            <?php echo $this->render('_footer') ?>
        </div>

    <?php $this->endBody() ?>
    </body>
</html>
<?php $this->endPage() ?>
