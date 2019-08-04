<?php

namespace boehsermoe\themecollection\frontend\properties;

use boehsermoe\themecollection\frontend\Module;
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