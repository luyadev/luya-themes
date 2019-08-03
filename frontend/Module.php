<?php

namespace boehsermoe\themecollection\frontend;

use Yii;

/**
 * Themecollection Admin Module.
 *
 * File has been created with `module/create` command. 
 * 
 * @author
 * @since 1.0.0
 */
class Module extends \luya\base\Module
{
    public static function onLoad()
    {
        Yii::setAlias('@themecollection', static::staticBasePath());

        parent::onLoad();
    }

}