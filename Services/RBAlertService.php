<?php
namespace RB\CoreBundle\Services;

use Symfony\Component\DependencyInjection\ContainerInterface;

class RBalertService {



    public function __construct($container,$doctrine)
    {
        $this->container=$container;
        $this->doctrine=$doctrine;
    }



    public function alert()
    {

    }


    public function getalert()
    {
       
    }


    public function setalert($id,$value)
    {
       
    }



    public function add($id,$value)
    {
        
    }
}

?>