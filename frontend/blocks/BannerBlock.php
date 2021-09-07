<?php

namespace luya\themes\frontend\blocks;

use luya\cms\base\PhpBlock;
use luya\themes\frontend\BaseBlock;
use luya\themes\frontend\blockgroups\BlockCollectionGroup;

/**
 * Banner Block.
 *
 * File has been created with `block/create` command on LUYA version 1.0.0-RC3.
 */
class BannerBlock extends BaseBlock
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
        return 'Banner Block';
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
                ['var' => 'title', 'label' => 'Titel', 'type' => self::TYPE_TEXT],
                ['var' => 'subTitle', 'label' => 'Untertitel', 'type' => self::TYPE_TEXT],
                ['var' => 'url', 'label' => 'URL', 'type' => self::TYPE_LINK],
                ['var' => 'text', 'label' => 'Text', 'type' => self::TYPE_WYSIWYG],
                ['var' => 'buttonName', 'label' => 'Buttonname', 'type' => self::TYPE_TEXT],
                ['var' => 'image', 'label' => 'Image', 'type' => self::TYPE_IMAGEUPLOAD],
            ],
            'cfgs' => [
                ['var' => 'background-color', 'label' => 'Hintergrund Color', 'type' => self::TYPE_COLOR],
                ['var' => 'background-image', 'label' => 'Hintergrund Image', 'type' => self::TYPE_IMAGEUPLOAD],
                ['var' => 'background-video', 'label' => 'Hintergrund Video', 'type' => self::TYPE_FILEUPLOAD],
                [
                    'var' => 'title-heading',
                    'label' => 'Titel',
                    'type' => self::TYPE_SELECT,
                    'initValue' => 'h2',
                    'options' => [
                        ['value' => 'h1', 'label' => 'Heading 1'],
                        ['value' => 'h2', 'label' => 'Heading 2'],
                        ['value' => 'h3', 'label' => 'Heading 3'],
                        ['value' => 'h4', 'label' => 'Heading 4'],
                    ]
                ],
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
    
    public function getImage()
    {
        return \Yii::$app->storage->getImage($this->getVarValue('image'));
    }
    
    public function getBackgroundStyle()
    {
        $color = $this->getCfgValue('background-color', '');
    
        $imageId = $this->getCfgValue('background-image');
        if ($imageId) {
            $imageStorage = \Yii::$app->storage->getImage($imageId);
            $image = "url('$imageStorage->source')";
        }
    
        return [
            'background-color' => $color,
            'background-image' => $image
        ];
    }
    
    /**
     * @inheritdoc
     */
    public function extraVars()
    {
        return [
            'link' => $this->getLink(),
            'image' => $this->getImage(),
            'background-style' => $this->getBackgroundStyle(),
        ];
    }
    
    /**
     * {@inheritDoc}
     *
     * @param {{vars.subTitle}}
     * @param {{vars.title}}
     */
    public function admin()
    {
        return '<p>
			{% if extras.image is empty %}<span class="block__empty-text">Banner Block Image</span>
			{% else %}
				<img src="{{ extras.image.source }}">
			{% endif %}
			
			<header>
			    <h2>
			    {% if vars.title is empty %}<span class="block__empty-text">Banner Block Title</span>
    			{% else %}{{ vars.title }}
    			{% endif %}
				</h2>
			</header>
			
			{% if vars.text is empty %}<span class="block__empty-text">Banner Block Text</span>
			{% else %}{{ vars.text }}
			{% endif %}
			
			</p>';
        
        return '<p>Banner Block Admin View</p>';
    }
}