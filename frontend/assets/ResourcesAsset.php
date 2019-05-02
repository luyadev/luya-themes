<?php

namespace boehsermoe\blockcollection\frontend\assets;

class ResourcesAsset extends \luya\web\Asset
{
    public $sourcePath = '@blockcollection/dist';
    
    public $css = [
        'main.css'
    ];

    public $js = [
        'main.js',
    ];

    public $depends = [
        'yii\web\JqueryAsset',
    ];
}
