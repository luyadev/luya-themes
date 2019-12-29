# Themecollection Module
 
Collection of blocks with some different themes. In the `frontend` directory all basic blocks are located. And in the `themes` directory contains only the theme specificated stuff like layouts, css and some block views overrides.

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
            'class' => 'luyadev\themes\frontend\Module',
            'useAppViewPath' => true, // When enabled the views will be looked up in the @app/views folder, otherwise the views shipped with the module will be used.
        ],
        'themecollectionadmin' => 'luyadev\themes\admin\Module',
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
