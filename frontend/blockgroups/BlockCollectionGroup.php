<?php

namespace luya\themes\frontend\blockgroups;

use luya\cms\base\BlockGroup;
use luya\cms\frontend\Module;

/**
 * Class BlockCollectionGroup
 *
 * @author Bennet Klarhoelter <boehsermoe@me.com>
 */
class BlockCollectionGroup extends BlockGroup
{
    public function identifier()
    {
        return 'theme-collection-group';
    }
    
    public function label()
    {
        return Module::t('Block Collection');
    }
    
    public function getPosition()
    {
        return 64;
    }
}
