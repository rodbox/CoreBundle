<?php

namespace RB\CoreBundle\Services;

use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Filesystem\Filesystem;

class RBSerializerService
{
    function __construct(){

    }


    function normalize($entity){
        $encoders    = array(new JsonEncoder());
        $normalizers = array(new ObjectNormalizer());
        $serializer  = new Serializer($normalizers, $encoders);

        $this->list  = $serializer->normalize($entity);

        return $this->serialize = $this->list;
    }


    function keyId(){
        $list = [];

        foreach ($this->list as $key => $value)
            $list[$value['id']]=$value;

        return $this->serialize = $list;
    }


    function save($file, $opt=''){
        $fs = new Filesystem();

        $fs->mkdir(dirname($file));

        return file_put_contents($file, json_encode($this->serialize, $opt));
    }


    function groupBy($keyName){
        $list = [];

        foreach($this->serialize as $val)
            $list[$val[$keyName]['id']][$val['id']] = $val;

        return $this->serialize = $list;

    }


}

?>


