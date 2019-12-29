<?php

namespace luyadev\themes\frontend;

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
    
        self::registerTranslation('themecollection*', '@themecollection/messages', [
            'themecollection' => 'themecollection.php',
        ]);
        
        parent::onLoad();
    }
    
    public static function t($message, array $params = [], $language = null)
    {
        return parent::baseT('themecollection', $message, $params, $language);
    }
}