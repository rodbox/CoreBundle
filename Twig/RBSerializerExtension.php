<?php
namespace RB\CoreBundle\Twig;

use Symfony\Component\DependencyInjection\ContainerInterface;

class RBSerializerExtension  extends \Twig_Extension{



    public function __construct($container)
    {
        $this->container = $container;
    }

    public function json_encode($data = [])
    {
       echo"<pre>";
       print_r($data);
       echo"</pre>";
    }


    public function getName()
    {
        return 'rb_serialize_extension';
    }



    public function getFilters()
    {
        return array(
            new \Twig_SimpleFilter('json_encode', array($this, 'json_encode')),
        );
    }
}

?>