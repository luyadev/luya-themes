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
        Yii::setAlias('@luyathemes', static::staticBasePath());
    
        self::registerTranslation('luyathemes*', '@luyathemes/messages', [
            'luyathemes' => 'luyathemes.php',
        ]);
        
        parent::onLoad();
    }
    
    public static function t($message, array $params = [], $language = null)
    {
        return parent::baseT('luyathemes', $message, $params, $language);
    }
}