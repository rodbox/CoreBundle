<?php
namespace RB\CoreBundle\Twig;

use Symfony\Component\DependencyInjection\ContainerInterface;

class RBBootstrapExtension  extends \Twig_Extension{
    public function __construct($container,$twig)
    {
        $this->container = $container;
        $this->twig      = $twig;
    }

    /**
     * btn popover : créer un bouton popover parametrable
     * @param  [array] $popoverMeta [
     * id : string
     * color : 'popover-default,popover-inverse,popover-success,popover-helper,popover-light'
     * size
     * ]
     * @param  [type] $content     [description]
     * @return [type]              [description]
     */
    public function btn_popover($btnContent,$popoverContent,$btnClass="")
    {
        echo $this->twig->render('RBCoreBundle:Twig:btn-popover.html.twig',[
            'btnContent'     => $btnContent,
            'btnClass'       => $btnClass,
            'popoverContent' => $popoverContent
        ]);
    }


    public function btn_popover_live($btnContent,$url,$btnClass="")
    {
        echo $this->twig->render('RBCoreBundle:Twig:btn-popover-live.html.twig',[
            'url'        => $url,
            'btnClass'   => $btnClass,
            'btnContent' => $btnContent
        ]);
    }

    public function getName(){
        return 'rb_bootstrap_extension';
    }



    public function getFunctions(){
        return array(
            "btn_popover"      => new \Twig_Function_Method($this, 'btn_popover',            ['is_safe' => ['html']]),
            "btn_popover_live" => new \Twig_Function_Method($this, 'btn_popover_live',       ['is_safe' => ['html']])
        );
    }
}

?>