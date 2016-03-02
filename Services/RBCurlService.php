<?php

namespace RB\CoreBundle\Services;

use Symfony\Component\DependencyInjection\ContainerInterface;

class RBCurlService {
    public function __construct($container)
    {
		$this->container=$container;
    }

    public function curl($url)
    {
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_TIMEOUT, 5);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $this->data = curl_exec($ch);
        curl_close($ch);

        return $this->data;
    }


    function save($url,$dir_file)
    {
        $file_content = $this->curl($url);

        file_put_contents($dir_file,$file_content);

        return filesize($dir_file);
    }


    public function json($url)
    {
		$data = $this->curl($url);

        return json_decode($data,true);
    }
}

?>