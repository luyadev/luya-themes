<?php

namespace luya\themes\frontend\properties;

use luya\themes\frontend\Module;
use luya\admin\base\ImageProperty;

class MainImageProperty extends ImageProperty
{
    /**
     * @inheritDoc
     */
    public function varName()
    {
        return 'mainImage';
    }
    
    /**
     * @inheritDoc
     */
    public function label()
    {
        return Module::t('Main Image');
    }
}