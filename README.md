<p align="center">
  <img src="https://raw.githubusercontent.com/luyadev/luya/master/docs/logo/luya-logo-0.2x.png" alt="LUYA Logo"/>
</p>

# LUYA Themes module

[![LUYA](https://img.shields.io/badge/Powered%20by-LUYA-brightgreen.svg)](https://luya.io)
[![Build Status](https://travis-ci.org/luyadev/luya-themes.svg?branch=master)](https://travis-ci.org/luyadev/luya-themes)
[![Test Coverage](https://api.codeclimate.com/v1/badges/26ce6892fcb4899cbd49/test_coverage)](https://codeclimate.com/github/luyadev/luya-themes/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/26ce6892fcb4899cbd49/maintainability)](https://codeclimate.com/github/luyadev/luya-themes/maintainability)
[![Latest Stable Version](https://poser.pugx.org/luyadev/luya-themes/v/stable)](https://packagist.org/packages/luyadev/luya-themes)
[![Total Downloads](https://poser.pugx.org/luyadev/luya-themes/downloads)](https://packagist.org/packages/luyadev/luya-themes)
[![Slack Support](https://img.shields.io/badge/Slack-luyadev-yellowgreen.svg)](https://slack.luya.io/)

This module is a collection themes with some block which shared between the different themes.

![LUYA Themes management](https://github.com/luyadev/luya/raw/master/docs/guide/img/theme-management.png) 

The `frontend` directory contains the basic blocks and shared views and in the `themes` directory contains only the theme specificated stuff like layouts, css and some block views overrides.

## Installation

For the installation of modules Composer is required.

```sh
composer require luyadev/luya-theme:dev-master
```

### Configuration

In order to add the properties to your project go into the modules section of your config:

```php
return [
    'modules' => [
        // ...
        'themes' => [
            'class' => 'luya\themes\frontend\Module',
        ],
        // ...
    ],
];
```

### Initialization 

After successfully installation and configuration, activate a theme in the admin area under *Settings > Themes*. All installed themes will be listed here and you can choose your active theme. 

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

## Examples

+ [Forty](http://forty.bennetklarhoelter.de/)

Login: mail@demo.de

Password: luya

## Developers

If you want to contribute, make sure to read the following guidelines: https://luya.io/guide/luya-guideline.