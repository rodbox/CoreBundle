<?php
namespace RB\CoreBundle\Twig;

use Symfony\Component\DependencyInjection\ContainerInterface;

class RBUploadExtension  extends \Twig_Extension{
    public function __construct($container,$twig)
    {
        $this->container = $container;
        $this->twig      = $twig;
    }


    public function btn_upload($index='/',$id='upl-default', $data = [])
    {

        $data = [
            'id'     => $id,
            'index'  => $index,
            'route'  => 'upload',
            'data'   => [
                'filter'   =>  'all',
                'dest'     => 'dir_upload',
                'rename'   => false,
                'multiple' => true,
                "cbapp"    => 'import',
                "cb"       => 'default'
            ]
        ];

        echo $this->twig->render('RBCoreBundle:Twig:btn-upload.html.twig',$data);
    }

    public function dropzone($index='/',$id='plup-drop',$filter='def',$dest='dir_upload')
    {
        echo $this->twig->render('RBCoreBundle:Twig:drop-upload.html.twig',[
            'id'     => $id,
            'index'  => $index,
            'filter' => $filter,
            'dest'   => $dest
        ]);
    }

    public function btn_upload_import($rename='import', $index='/',$cbapp='admin',$cb='import'){

        $data = [
            'id'     => 'import',
            'index'  => $index,
            'route'  => 'upload',
            'data'   => [
                'filter'   => 'xls',
                'rename'   => $rename,
                'dest'     => 'dir_import',
                'index'    => $index,
                'multiple' => false,
                "cbapp"    => $cbapp,
                "cb"       => $cb
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
                'dest'     => 'dir_media',
                'rename'   => false,
                'multiple' => true,
                "cbapp"    => 'import',
                "cb"       => 'default'
            ]
        ];

        echo $this->twig->render('RBCoreBundle:Twig:btn-upload.html.twig',$data);
    }


    public function btn_upload_user($id, $index = '/'){
        $data = [
            'id'     => 'user',
            'index'  => '/'.$id.$index,
            'route'  => 'upload',
            'data'   => [
                'filter'   =>  'all',
                'dest'     => 'dir_user',
                'rename'   => false,
                'multiple' => true,
                "cbapp"    => 'import',
                "cb"       => 'default'
            ]
        ];

        echo $this->twig->render('RBCoreBundle:Twig:btn-upload.html.twig',$data);
    }


    public function getName(){
        return 'rb_upload_extension';
    }



    public function getFunctions(){
        return array(
            "btn_upload"             => new \Twig_Function_Method($this, 'btn_upload',            ['is_safe' => ['html']]),
            "btn_upload_import"      => new \Twig_Function_Method($this, 'btn_upload_import',            ['is_safe' => ['html']]),
            "btn_upload_media"       => new \Twig_Function_Method($this, 'btn_upload_media',            ['is_safe' => ['html']]),
            "btn_upload_user"        => new \Twig_Function_Method($this, 'btn_upload_user',            ['is_safe' => ['html']]),
            "dropzone"               => new \Twig_Function_Method($this, 'dropzone',            ['is_safe' => ['html']])
        );
    }
}

?>