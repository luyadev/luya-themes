<?php

namespace luyadev\themes\frontend;

use yii\web\View;

class ResourcesAsset extends \luya\web\Asset
{
    public $sourcePath = '@activeTheme/dist';
    
    public $css = [
        'main.css'
    ];

    public $js = [
        'main.js',
    ];
    
    public $jsOptions = [
        'async' => true,
    ];
    
    public $depends = [
        'yii\web\JqueryAsset',
    ];
}
