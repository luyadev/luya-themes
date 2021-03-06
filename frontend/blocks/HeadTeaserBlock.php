<?php

namespace luya\themes\frontend\blocks;

use luya\cms\base\PhpBlock;
use luya\themes\frontend\BaseBlock;
use luya\themes\frontend\blockgroups\BlockCollectionGroup;

/**
 * Head Teaser Block.
 *
 * File has been created with `block/create` command on LUYA version 1.0.0-RC3.
 */
class HeadTeaserBlock extends BaseBlock
{
    public $module = 'luyathemes';
    
    /**
     * @var boolean Choose whether block is a layout/container/segmnet/section block or not, Container elements will be optically displayed
     * in a different way for a better user experience. Container block will not display isDirty colorizing.
     */
    public $isContainer = true;
    
    /**
     * @var bool Choose whether a block can be cached trough the caching component. Be carefull with caching container blocks.
     */
    public $cacheEnabled = false;
    
    /**
     * @var int The cache lifetime for this block in seconds (3600 = 1 hour), only affects when cacheEnabled is true
     */
    public $cacheExpiration = 3600;
    
    /**
     * @inheritDoc
     */
    public function blockGroup()
    {
        return BlockCollectionGroup::class;
    }
    
    /**
     * @inheritDoc
     */
    public function name()
    {
        return 'Head Teaser Block';
    }
    
    /**
     * @inheritDoc
     */
    public function icon()
    {
        return 'extension'; // see the list of icons on: https://design.google.com/icons/
    }
    
    /**
     * @inheritDoc
     */
    public function config()
    {
        return [
            'placeholders' => [
                ['var' => 'elements', 'label' => 'Elemente', 'type' => self::TYPE_LIST_ARRAY],
            ],
        ];
    }
    
    /**
     * {@inheritDoc}
     *
     */
    public function admin()
    {
        return '<p>Head Teaser Block Admin View</p>';
    }
}