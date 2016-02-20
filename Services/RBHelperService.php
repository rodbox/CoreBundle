<?php
namespace RB\CoreBundle\Services;

use Symfony\Component\DependencyInjection\ContainerInterface;

class RBHelperService {



    public function __construct($container,$twig)
    {
        $this->container =$container;
        $this->twig      =$twig;
    }



	public function helper($content)
    {
        return $this->twig->render('RBCoreBundle:Services:helper.html.twig',['content'=>$content]);
    }



    public function helper_list($list)
    {
        return $this->twig->render('RBCoreBundle:Services:helper_list.html.twig',['list'=>$list]);
    }
}
?>