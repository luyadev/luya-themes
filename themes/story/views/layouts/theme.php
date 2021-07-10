<?php
/**
 * @var $this \luya\web\View
 */
use app\themes\story\StoryAsset;

StoryAsset::register($this);

$this->beginPage();
?>
<!DOCTYPE html>
<html lang="<?= Yii::$app->composition->langShortCode; ?>">
    <head>
        <title><?= $this->title; ?></title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <?php $this->head() ?>
    </head>
    <body class="homepage">
    <?php $this->beginBody() ?>

        <div id="wrapper">
            <?php echo $content ?>
        </div>

    <?php $this->endBody() ?>
    </body>
</html>
<?php $this->endPage() ?>
