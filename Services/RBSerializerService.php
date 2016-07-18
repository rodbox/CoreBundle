<?php

namespace RB\CoreBundle\Services;

use Symfony\Component\DependencyInjection\ContainerInterface;

use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;

class RBSerializerService
{
    function __construct(){


    }



    function json($entity){
        $encoders    = array(new JsonEncoder());
        $normalizers = array(new ObjectNormalizer());
        $serializer  = new Serializer($normalizers, $encoders);

        return $serializer->serialize($products, 'json');
    }
}

?>