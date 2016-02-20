<?php
namespace RB\CoreBundle\Services;

use Symfony\Component\DependencyInjection\ContainerInterface;

class RBImageService {



    public function __construct($container, $twig)
    {
        $this->container = $container;
        $this->twig      = $twig;
    }


    public function save_base64($imgBase64, $file = 'img.png', $folder = '', $src = 'products', $force = false,$suffix='')
    {
        $info       = pathinfo($file);
        extract($info);

        $extension  = 'jpg';

        $suffix     = ($suffix != '')?'_'.$suffix:'';
        $dir_target = $this->container->getParameter('dir_'.$src);
        $img_target = $dir_target.$folder.'/'.$filename.$suffix.'.'.$extension;

        $pattern = [
            '/data:image\/png;base64/',
            '/data:image\/jpg;base64/',
            '/\s/'
        ];
        $replacements = [
            '',
            '',
            '+'
        ];


        $img        = preg_replace($pattern, $replacements, $imgBase64);


        $data       = base64_decode($img);



        if(!file_exists($img_target)|| $force)
            return file_put_contents($img_target , $data);
            // return file_put_contents($img_target , $imgBase64);
    }


    /**
     * [callback description]
     * @param  [type]   $file [description]
     * @return function       [description]
     */
    public function callback($file)
    {
       return 'getEditor'.ucfirst($this->editor);
    }


}

?>