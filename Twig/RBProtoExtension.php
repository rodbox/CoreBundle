<?php
namespace RB\CoreBundle\Twig;

use Symfony\Component\DependencyInjection\ContainerInterface;

class RBProtoExtension  extends \Twig_Extension{
    public function __construct($container,$twig)
    {
        $this->container =$container;
        $this->twig      =$twig;
    }

    public function btn_proto($id="this", $proto = 'RBCoreBundle:Twig:input.html.twig', $data="", $counter=0)
    {
        echo $this->twig->render('RBCoreBundle:Twig:btn-proto.html.twig',[
            'proto'  => $proto,
            'target' => $id,
            'title'  => $id,
            'counter'=> $counter,
            'data'   => $data
        ]);
    }

    public function getName(){
        return 'rb_proto_extension';
    }



    public function getFunctions(){
        return array(
            new \Twig_SimpleFunction("btn_proto",[$this, 'btn_proto'],['is_safe' => ['html']])
        );
    }
}

?>