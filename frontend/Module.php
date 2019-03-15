<?php

namespace app\modules\blockcollection\frontend;

use Yii;

/**
 * Blockcollection Admin Module.
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
        Yii::setAlias('@blockcollection', static::staticBasePath());

        parent::onLoad();
    }

}