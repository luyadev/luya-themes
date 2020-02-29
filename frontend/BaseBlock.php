<?php

namespace luya\themes\frontend;

use luya\cms\base\PhpBlock;

abstract class BaseBlock extends PhpBlock
{
    /**
     * @inheritdoc
     */
    public function getViewPath()
    {
        return  dirname(__DIR__) . '/frontend/views/blocks';
    }
}