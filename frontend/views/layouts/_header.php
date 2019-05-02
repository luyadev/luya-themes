<?php
use luya\helpers\Html;

/**
 * @var
 */
?>
<div class="nav-logo">
    <?php echo Html::img('https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo1.jpg', ['width' => '150'])?>
</div>

<!-- Nav -->
<nav id="nav">
    <ul>
        <?php foreach (Yii::$app->menu->find()->container('default')->root()->all() as $item): ?>
            <li>
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
