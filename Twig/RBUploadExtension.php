<?php
namespace RB\CoreBundle\Twig;

use Symfony\Component\DependencyInjection\ContainerInterface;

class RBUploadExtension  extends \Twig_Extension{
    public function __construct($container,$twig)
    {
        $this->container = $container;
        $this->twig      = $twig;
    }


    public function btn_upload($index='/',$id='plup-default',$filter='def',$dest='dir_upload')
    {
        echo $this->twig->render('RBCoreBundle:Twig:btn-upload.html.twig',[
            'id'     => $id,
            'index'  => $index,
            'filter' => $filter,
            'dest'   => $dest
        ]);
    }

    public function btn_upload_import(){
        $this->btn_upload('/','plup-import','imports','dir_import');
    }

    public function btn_upload_import_wait(){
        $this->btn_upload('/','plup-import','imports','dir_import_wait');
    }
    public function btn_upload_product($id){
        $this->btn_upload('/','plup-product','img','dir_product');
    }
    public function btn_upload_media(){
        $this->btn_upload('/','plup-media','def','dir_import');
    }
    public function btn_upload_user($id){
        $this->btn_upload('/','plup-user','def','dir_user');
    }

    public function getName(){
        return 'rb_upload_extension';
    }



    public function getFunctions(){
        return array(
            "btn_upload"         => new \Twig_Function_Method($this, 'btn_upload',            ['is_safe' => ['html']]),
            "btn_upload_import"  => new \Twig_Function_Method($this, 'btn_upload_import',            ['is_safe' => ['html']]),
            "btn_upload_import_wait" => new \Twig_Function_Method($this, 'btn_upload_import_wait',            ['is_safe' => ['html']]),
            "btn_upload_product" => new \Twig_Function_Method($this, 'btn_upload_product',            ['is_safe' => ['html']]),
            "btn_upload_media"   => new \Twig_Function_Method($this, 'btn_upload_media',            ['is_safe' => ['html']]),
            "btn_upload_user"    => new \Twig_Function_Method($this, 'btn_upload_user',            ['is_safe' => ['html']])
        );
    }
}

?>