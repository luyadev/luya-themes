<?php
/**
 * @var string[] $placeholders
 */
?>
<section id="header" class="wrapper">
    <!-- Intro -->
    <div class="header-container">
        <?= $placeholders['intro'] ?>
    </div>
</section>

<!-- Main -->
<section id="main" class="wrapper">
    <?= $placeholders['main'] ?>
</section>

<?php if ($placeholders['highlights']) : ?>
    <!-- Highlights -->
    <section id="highlights" class="wrapper style3">
        <div class="container">
            <?= $placeholders['highlights'] ?>
        </div>
    </section>
<?php endif ?>