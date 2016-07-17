<?php
namespace RB\CoreBundle\Services;

use Symfony\Component\DependencyInjection\ContainerInterface;

class RBUploadService {
    public function __construct($container)
    {
        $this->container=$container;
    }


    public function move($files, $dir = '', $filters = [], $rename = false)
    {
        $list = [];

        foreach ($files as $file){

            $fileExt    = pathinfo($file->getClientOriginalName(),PATHINFO_FILENAME);

            if (!$rename)
                $filename   = $rename;
            else{
                $filename   = $file->getClientOriginalName();
                $filename   = preg_replace('/\s+/', '_', $filename);
            }

            $file->move($dir, $filename);

            $list['valid'][] = $filename;
        }

        return $list;

    }
}

?>