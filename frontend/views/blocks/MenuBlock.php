<?php
/**
 * @var $this \luya\cms\base\PhpBlockView
 * @var $menuItems \luya\cms\menu\QueryIteratorFilter|\luya\cms\menu\Item[]
 */
$menuItems = $this->extraValue('menuItems');
?>
<ul class="nav">
    <?php foreach ($menuItems as $menuItem) : ?>
        <li class="nav-item<?= $menuItem->isActive ? ' active' : '' ?>">
            <a class="nav-link" href="<?= $menuItem->link; ?>"><?= $menuItem->title; ?></a>
        </li>
    <?php endforeach; ?>
</ul>
