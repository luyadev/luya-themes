<?php
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
    <html>
    <head>
        <title><?= $this->title; ?></title>
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