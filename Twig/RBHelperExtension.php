<?php
namespace RB\CoreBundle\Twig;

use Symfony\Component\DependencyInjection\ContainerInterface;

class RBHelperExtension  extends \Twig_Extension{
    public function __construct($container,$twig)
    {
        $this->container =$container;
        $this->twig      =$twig;
    }

    public function form_helper($index)
    {
        echo $this->twig->render('RBCoreBundle:Twig:helper.html.twig',['index'=>$index]);
    }
    
    public function form_helper_addon($index)
    {
        echo $this->twig->render('RBCoreBundle:Twig:helper_addon.html.twig',['index'=>$index]);
    }

    public function getName(){
        return 'rb_RBHelper_extension';
    }



    public function getFunctions(){
        return array(
            new \Twig_SimpleFunction("form_helper",[$this, 'form_helper'], ['is_safe' => ['html']]),
            new \Twig_SimpleFunction("form_helper_addon",[$this, 'form_helper_addon'], ['is_safe' => ['html']]),
        );
    }
}

?>