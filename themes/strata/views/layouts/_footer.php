<?php
?>

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
