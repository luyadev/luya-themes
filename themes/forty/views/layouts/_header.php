<?php
use luya\helpers\Html;

/**
 * @var
 */
?>

<!-- Logo -->
<header id="logo" class="alt">
	<a href="/" class="logo"><strong><?php echo Yii::$app->siteTitle ?></strong> <span>partner in service, event & music</span></a>
	<nav>
		<a href="#menu">Menu</a>
	</nav>
</header>

<!-- Nav -->
<nav id="menu">
    <ul class="links">
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
