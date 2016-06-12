<?php
namespace RB\CoreBundle\Services;

use Symfony\Component\DependencyInjection\ContainerInterface;

class RBMustacheService {
    public function __construct($container)
    {
        $this->container=$container;
    }


    public function mustache_tpl($id='', $view='@RBCoreBundle')
    {
        $dirTpl         = explode(':',$view);
        $fileLocator    = $this->container->get('file_locator');
        $path           = $fileLocator->locate($dirTpl[0]);

        return file_get_contents($path.'/Resources/views/'.$dirTpl[1].'/'.$dirTpl[2]);
    }

?>