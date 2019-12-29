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
        'themes' => [
            'class' => 'luyadev\themes\frontend\Module',
            'useAppViewPath' => true, // When enabled the views will be looked up in the @app/views folder, otherwise the views shipped with the module will be used.
        ],
        'themesadmin' => 'luyadev\themes\admin\Module',
        // ...
    ],
];
```
