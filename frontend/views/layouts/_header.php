<?php
use luya\helpers\Html;

/**
 * @var
 */
?>
<div class="nav-logo">
    <?php echo Html::img('https://placeholder.pics/svg/150x50/4B82D2/FFFFFF-4B82D2/logo', ['width' => '150'])?>
</div>

<!-- Nav -->
<nav id="nav">
    <ul>
        <?php foreach (Yii::$app->menu->find()->container('default')->root()->all() as $item): ?>
            <li class="<?php echo $item->isActive ? 'active' : '' ?>">
                <?php if ($item->hasChildren) : ?>
                    <?php echo Html::a($item->title, $item->link, ['class' => $item->alias == Yii::$app->menu->current->alias ]) ?>

                    <ul>
                        <?php foreach ($item->children as $childItem) : ?>
                            <li>
                                <?php echo Html::a($childItem->title, $childItem->link, ['class' => $childItem->alias == Yii::$app->menu->current->alias]) ?>
                            </li>
                        <?php endforeach; ?>
                    </ul>
                <?php else: ?>
                    <?php echo Html::a($item->title, $item->link, ['class' => $item->alias == Yii::$app->menu->current->alias ]) ?>
                <?php endif ?>
            </li>
        <?php endforeach; ?>
    </ul>
</nav>
