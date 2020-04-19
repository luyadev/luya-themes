<?php
/**
 * @var $this \luya\web\View
 */
use luya\themes\frontend\ResourcesAsset;

ResourcesAsset::register($this);

$this->beginPage();
?>
    <!DOCTYPE html>
    <!--
        Forty by HTML5 UP
        html5up.net | @ajlkn
        Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
    -->
    <html lang="<?= Yii::$app->composition->language; ?>">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title><?= $this->title; ?></title>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
        <link rel="icon" href="/favicon.ico" type="image/x-icon">
        <?php $this->head() ?>
    </head>
    <body>
    <?php $this->beginBody() ?>

    <?php echo $this->render('_header') ?>
    <?php echo $this->render('_nav') ?>
    <?= $content ?>
    <?php echo $this->render('_footer') ?>

    <?php $this->endBody() ?>
    </body>
    </html>
<?php $this->endPage() ?>