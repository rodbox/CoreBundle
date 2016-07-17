<?php
namespace RB\CoreBundle\Twig;

use Symfony\Component\DependencyInjection\ContainerInterface;

class RBUploadExtension  extends \Twig_Extension{


    public function __construct($container, $twig)
    {
        $this->container = $container;
        $this->twig      = $twig;
    }


    public function btn_upload($index='/', $id='upl-default', $data = [])
    {

        $data = [
            'id'     => $id,
            'index'  => $index,
            'route'  => 'upload',
            'data'   => [
                'filter'   =>  'all',
                'dest'     => 'upload',
                'rename'   => '',
                'multiple' => true,
                'cbapp'    => 'upload',
                'cb'       => 'upload'
            ]
        ];

        echo $this->twig->render('RBCoreBundle:Twig:btn-upload.html.twig', $data);
    }


    public function dropzone($index='/', $id='plup-drop', $filter='def', $dest='upload')
    {
        echo $this->twig->render('RBCoreBundle:Twig:drop-upload.html.twig',[
            'id'     => $id,
            'index'  => $index,
            'filter' => $filter,
            'dest'   => $dest
        ]);
    }


    public function btn_upload_import($rename='', $index='/', $cbapp='upload', $cb='uploadImport'){

        $data = [
            'id'     => 'import',
            'index'  => $index,
            'route'  => 'upload',
            'data'   => [
                'filter'   => 'xls',
                'rename'   => $rename,
                'dest'     => 'import',
                'index'    => $index,
                'multiple' => false,
                'cbapp'    => $cbapp,
                'cb'       => $cb
            ]
        ];

        echo $this->twig->render('RBCoreBundle:Twig:btn-upload.html.twig', $data);
    }


    public function btn_upload_media($filter = 'img', $index = '/'){
        $data = [
            'id'     => 'media',
            'index'  => $index,
            'route'  => 'upload',
            'data'   => [
                'filter'   => $filter,
                'dest'     => 'media',
                'rename'   => false,
                'multiple' => true,
                'cbapp'    => 'upload',
                'cb'       => 'uploadMedia'
            ]
        ];

        echo $this->twig->render('RBCoreBundle:Twig:btn-upload.html.twig', $data);
    }


    public function btn_upload_user($id, $index = '/'){
        $data = [
            'id'     => 'user',
            'index'  => '/'.$id.$index,
            'route'  => 'upload',
            'data'   => [
                'filter'   =>  'all',
                'dest'     => 'user',
                'rename'   => false,
                'multiple' => true,
                'cbapp'    => 'import',
                'cb'       => 'uploadUser'
            ]
        ];

        echo $this->twig->render('RBCoreBundle:Twig:btn-upload.html.twig', $data);
    }


    public function btn_upload_file($dir='upload', $index = '/', $rename = '', $filter = 'all'){
        $rand    = substr( md5(rand()), 0, 8);
        
        $data = [
            'id'     => 'file-'.$rand,
            'index'  => $index,
            'route'  => 'upload',
            'data'   => [
                'filter'   => $filter,
                'dest'     => $dir,
                'rename'   => $rename,
                'multiple' => false,
                'cbapp'    => 'upload',
                'cb'       => 'uploadFile'
            ]
        ];

        echo $this->twig->render('RBCoreBundle:Twig:btn-upload.html.twig', $data);
    }


    public function getName(){
        return 'rb_upload_extension';
    }


    public function getFunctions(){
        return array(
            new \Twig_SimpleFunction('btn_upload',[$this, 'btn_upload'],['is_safe' => ['html']]),
            new \Twig_SimpleFunction('btn_upload_import',[$this, 'btn_upload_import'],['is_safe' => ['html']]),
            new \Twig_SimpleFunction('btn_upload_media',[$this, 'btn_upload_media'],['is_safe' => ['html']]),
            new \Twig_SimpleFunction('btn_upload_user',[$this, 'btn_upload_user'],['is_safe' => ['html']]),
            new \Twig_SimpleFunction('btn_upload_file',[$this, 'btn_upload_file'],['is_safe' => ['html']]),
            new \Twig_SimpleFunction('dropzone',[$this, 'dropzone'],['is_safe' => ['html']])
        );
    }
}
?>