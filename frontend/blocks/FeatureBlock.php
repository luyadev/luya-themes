<?php

namespace luya\themes\frontend\blocks;

use luya\themes\frontend\blockgroups\BlockCollectionGroup;
use luya\cms\base\PhpBlock;

/**
 * Feature Block.
 *
 * File has been created with `block/create` command on LUYA version 1.0.0-RC3.
 */
class FeatureBlock extends PhpBlock
{
    public $module = 'luyathemes';
    
    /**
     * @var bool Choose whether a block can be cached trough the caching component. Be carefull with caching container blocks.
     */
    public $cacheEnabled = true;
    
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
        return 'Feature Block';
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
            'vars' => [
                ['var' => 'url', 'label' => 'URL', 'type' => self::TYPE_LINK],
                ['var' => 'iconClass', 'label' => 'Icon', 'type' => self::TYPE_TEXT, 'initvalue' => 'diamond', 'placeholder' => 'see http://fontawesome.io/icons'],
                ['var' => 'title', 'label' => 'Titel', 'type' => self::TYPE_TEXT, 'placeholder' => '(optional)'],
                ['var' => 'text', 'label' => 'Text', 'type' => self::TYPE_TEXTAREA, 'placeholder' => '(optional)'],
                ['var' => 'linkName', 'label' => 'Linkname', 'type' => self::TYPE_TEXT, 'placeholder' => '(optional)'],
            ],
            'cfgs' => [
                ['var' => 'background-src', 'label' => 'Hintergrund', 'type' => self::TYPE_IMAGEUPLOAD],
            ],
        ];
    }
    
    private $_link;
    
    /**
     * @return false|\luya\web\LinkInterface|\luya\cms\menu\Item
     */
    public function getLink()
    {
        if ($this->_link === null) {
            $this->_link = \luya\cms\helpers\BlockHelper::linkObject($this->getVarValue('url'));
        }
        
        return $this->_link;
    }
    
    /**
     * Get the text based on type input.
     */
    public function getTitle()
    {
        if (!$this->getVarValue('title') && $this->getVarValue('url', 0)['type'] == 1) {
            return $this->getLink()->title;
        }
        
        return $this->getVarValue('title');
    }
    
    /**
     * Get the text based on type input.
     */
    public function getText()
    {
        if (!$this->getVarValue('text') && $this->getVarValue('url', 0)['type'] == 1) {
            return $this->getLink()->description;
        }
        
        return $this->getVarValue('text');
    }
    
    /**
     * @return bool|\luya\admin\image\Item
     */
    public function getBackgroundImage()
    {
        return \Yii::$app->storage->getImage($this->getCfgValue('background-src'));
    }
    
    /**
     * @inheritdoc
     */
    public function extraVars()
    {
        return [
            'link' => $this->getLink(),
            'text' => $this->getText(),
            'title' => $this->getTitle(),
            'backgroundImage' => $this->getBackgroundImage(),
        ];
    }
    
    /**
     * {@inheritDoc}
     *
     */
    public function admin()
    {
        return '<p>' .
            '{% if vars.url is empty %}<span class="block__empty-text">Feature Block Admin View</span>' .
            '{% else %}{{ extras.title }}' .
            '{% endif %}' .
            '</p>';
    }
}