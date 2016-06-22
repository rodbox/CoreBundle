<?php
namespace RB\CoreBundle\Services;

use Symfony\Component\DependencyInjection\ContainerInterface;

class RBCounterService {



    public function __construct($container)
    {
        $this->container=$container;
    }



    public function counter()
    {

    }


    /**
     * [getCounter description]
     * @return [type] [description]
     */
    public function getCounter()
    {
        $dir_counter = $this->container->getParameter('dir_counter');
        return $this->counter = json_decode(file_get_contents($dir_counter),true);
    }


    public function setCounter($id,$value)
    {
        $dir_counter = $this->container->getParameter('dir_counter');

        $this->getCounter();

        $this->counter[$id] = $value;

        file_put_contents($dir_counter,json_encode($this->counter));
    }



    public function add($id,$value)
    {
        $dir_counter = $this->container->getParameter('dir_counter');

        $this->getCounter();

        $this->counter[$id] = (isset($this->counter[$id]))?$this->counter[$id]) + $value:$value;

        file_put_contents($dir_counter,json_encode($this->counter));
    }
}

?>