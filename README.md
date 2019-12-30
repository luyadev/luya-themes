# Themes Module
 
This module is a collection themes with some block which shared between the different themes.

The `frontend` directory contains the basic blocks and shared views and in the `themes` directory contains only the theme specificated stuff like layouts, css and some block views overrides.

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
            'class' => 'luya\themes\frontend\Module',
            'useAppViewPath' => true, // When enabled the views will be looked up in the @app/views folder, otherwise the views shipped with the module will be used.
        ],
        // ...
    ],
];
```

To activate a theme you have to go to the admin area under *Settings > Themes*. All installed themes will be listed here and you can choose your active theme. 

For more information see https://luya.io/guide/app-themes

**Optional**

You can also set the active theme to the *themeManager* in the config section *components*.
```php
    // ...
    'components' => [
        'themeManager' => [
            'activeThemeName' => dirname(__DIR__) . '/vendor/luyadev/luya-themes/themes/forty'
        ],
    // ...
```
