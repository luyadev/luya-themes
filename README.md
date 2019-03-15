# Blockcollection Module
 
File has been created with `module/create` command. 
 
## Installation

In order to add the modules to your project go into the modules section of your config:

```php
return [
    'modules' => [
        // ...
        'blockcollection' => [
            'class' => 'boehsermoe\blockcollection\frontend\Module',
            'useAppViewPath' => true, // When enabled the views will be looked up in the @app/views folder, otherwise the views shipped with the module will be used.
        ],
        'blockcollectionadmin' => 'boehsermoe\blockcollection\admin\Module',
        // ...
    ],
];
```

Layout body
```php
    // ...
    <body class="homepage is-preload">
    <?php $this->beginBody() ?>

        <div id="page-wrapper">
            <?php echo $this->render('@blockcollection/views/layouts/_header') ?>
            <?php echo $content ?>
            <?php echo $this->render('@blockcollection/views/layouts/_footer') ?>
        </div>

    <?php $this->endBody() ?>
    </body>
    // ...
```