# Themecollection Module
 
Collection of blocks with some different themes.

**Examples**

+ [Forty](http://forty.bennetklarhoelter.de/)

Login: mail@demo.de

Password: luya

## Installation

In order to add the modules to your project go into the modules section of your config:

```php
return [
    'modules' => [
        // ...
        'themecollection' => [
            'class' => 'boehsermoe\themecollection\frontend\Module',
            'useAppViewPath' => true, // When enabled the views will be looked up in the @app/views folder, otherwise the views shipped with the module will be used.
        ],
        'themecollectionadmin' => 'boehsermoe\themecollection\admin\Module',
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
            <?php echo $this->render('_header') ?>
            <?php echo $content ?>
            <?php echo $this->render('_footer') ?>
        </div>

    <?php $this->endBody() ?>
    </body>
    // ...
```
