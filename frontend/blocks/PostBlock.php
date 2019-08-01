<?php

namespace boehsermoe\blockcollection\frontend\blocks;

use luya\cms\base\PhpBlock;
use boehsermoe\blockcollection\frontend\blockgroups\BlockCollectionGroup;
use luya\TagParser;

/**
 * Post Block.
 *
 * File has been created with `block/create` command on LUYA version 1.0.0-RC3.
 */
class PostBlock extends PhpBlock
{
    public $module = 'blockcollection';
    
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
        return 'Post Block';
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
            'cfgs' => [
                ['var' => 'htmlClass', 'label' => 'Html-Klasse', 'type' => self::TYPE_TEXT, 'initvalue' => 'post', 'placeholder' => 'post (default)'],
                ['var' => 'imageHtmlClass', 'label' => 'Image Html-Klasse', 'type' => self::TYPE_TEXT, 'initvalue' => 'centered', 'placeholder' => 'centered (default)'],
            ],
            'vars' => [
                ['var' => 'url', 'label' => 'URL', 'type' => self::TYPE_LINK],
                ['var' => 'image', 'label' => 'Image', 'type' => self::TYPE_IMAGEUPLOAD],
                ['var' => 'title', 'label' => 'Titel', 'type' => self::TYPE_TEXT, 'placeholder' => '(optional)'],
                ['var' => 'text', 'label' => 'Text', 'type' => self::TYPE_TEXTAREA, 'placeholder' => '(optional)'],
                ['var' => 'linkName', 'label' => 'Linkname', 'type' => self::TYPE_TEXT, 'placeholder' => '(optional)'],
            ],
        ];
    }
    
    private $_url;
    
    /**
     * @return false|\luya\web\LinkInterface|\luya\cms\menu\Item
     */
    public function getUrl()
    {
        if ($this->_url === null) {
            $this->_url = \luya\cms\helpers\BlockHelper::linkObject($this->getVarValue('url'));
        }
        
        return $this->_url;
    }
    
    /**
     * Get the text based on type input.
     */
    public function getTitle()
    {
        if ($this->getVarValue('url', 0)['type'] == 1) {
            return $this->getUrl()->title;
        }
        
        return $this->getVarValue('title');
    }
    
    /**
     * Get the text based on type input.
     */
    public function getText()
    {
        $text = $this->getVarValue('text');
        
        if (!$text && $this->getVarValue('url', 0)['type'] == 1) {
            $text = $this->getUrl()->description;
        }
        
        return TagParser::convertWithMarkdown($text);
    }
    
    private $_image = null;
    
    public function getImage()
    {
        if ($this->_image === null) {
            $this->_image = \Yii::$app->storage->getImage($this->getVarValue('image'));
        }
        
        return $this->_image;
    }
    
    /**
     * @inheritdoc
     */
    public function extraVars()
    {
        return [
            'url' => $this->getUrl(),
            'text' => $this->getText(),
            'title' => $this->getTitle(),
            'image' => $this->getImage(),
        ];
    }
    
    /**
     * {@inheritDoc}
     *
     */
    public function admin()
    {
        return '<p>
			{% if extras.image is empty %}<span class="block__empty-text">Post Block Image</span>
			{% else %}
				<img src="{{ extras.image.source }}" width="100" height="100">
			{% endif %}
			
			<header>
			    <h3>
			    {% if extras.title is empty %}<span class="block__empty-text">Post Block Title</span>
    			{% else %}{{ extras.title }}
    			{% endif %}
				</h3>
			</header>
			
			{% if extras.text is empty %}<span class="block__empty-text">Post Block Text</span>
			{% else %}{{ extras.text }}
			{% endif %}
			
			</p>';
    }
}