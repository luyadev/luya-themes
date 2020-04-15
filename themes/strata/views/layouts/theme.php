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
    <?= $content ?>

    <footer>
        <nav>
            <ul class="nav">
                <?php foreach (Yii::$app->menu->findAll(['depth' => 1, 'container' => 'default']) as $item): /* @var $item \luya\cms\menu\Item */ ?>
                    <li class="nav-item<?= $item->isActive ? ' active' : '' ?>">
                        <a class="nav-link" href="<?= $item->link; ?>"><?= $item->title; ?></a>
                    </li>
                <?php endforeach; ?>
            </ul>
        </nav>
    </footer>
    <?php $this->endBody() ?>
    </body>
    </html>
<?php $this->endPage() ?>