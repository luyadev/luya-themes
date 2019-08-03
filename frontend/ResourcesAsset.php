<?php

namespace boehsermoe\themecollection\frontend;

class ResourcesAsset extends \luya\web\Asset
{
    public $sourcePath = '@activeTheme/dist';
    
    public $css = [
//        'font-awesome.min.css',
        'main.css'
    ];

    public $js = [
        'main.js',
    ];

    public $depends = [
        'yii\web\JqueryAsset',
    ];
}
