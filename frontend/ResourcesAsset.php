<?php

namespace boehsermoe\blockcollection\frontend;

class ResourcesAsset extends \luya\web\Asset
{
    public $sourcePath = '@escape-velocity/dist';
    
    public $css = [
        'font-awesome.min.css',
        'main.css'
    ];

    public $js = [
        'main.js',
    ];

    public $depends = [
        'yii\web\JqueryAsset',
    ];
}
