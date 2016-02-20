<?php
namespace RB\CoreBundle\Twig;

use Symfony\Component\DependencyInjection\ContainerInterface;

class RBExplorerExtension  extends \Twig_Extension{



    public function __construct($container, $twig)
    {
        $this->container = $container;
        $this->twig      = $twig;
    }


    public function explorer_src($id='explorer_src', $dirSelect='media')
    {
        $dirSrcList = [
            'media','users','upload','products','root'
        ];

        $viewList = [
            'default','thumb'
        ];



        $dir = $this->container->getParameter('dir_'.$dirSelect);

        /* SERVICE : rb.scan */
        $scan = $this->container->get('rb.scan');
        /* END SERVICE :  rb.scan */

        echo $this->twig->render('RBCoreBundle:Twig:explorer-src.html.twig',[
            'list'    => $dirSrcList,
            'views'    => $viewList,
            'folders' => $scan->dir($dir),
            'files'   => $scan->file($dir),
            'src'     => $dirSelect,
            'id'      => $id
        ]);
    }



    public function explorer_me($folder, $src='media', $folderSrc='/')
    {
        echo $this->twig->render('RBCoreBundle:Twig:explorer-me.html.twig',[
            'src'       => $src,
            'folder'    => $folder,
            'folderSrc' => $folderSrc
        ]);
    }



    public function editor_me($file, $src='media', $folderSrc='/')
    {
        echo $this->twig->render('RBCoreBundle:Twig:editor-me.html.twig',[
            'src'       => $src,
            'file'      => $file,
            'folderSrc' => $folderSrc
        ]);
    }



    /**
     * [editor_menu description]
     * @return [type] [description]
     */
    public function editor_menu()
    {

    }



    public function getName(){
        return 'rb_explorer_extension';
    }



    public function getFunctions(){
        return array(
            "explorer_src" => new \Twig_Function_Method($this, 'explorer_src',             ['is_safe' => ['html']]),
            "explorer_me"  => new \Twig_Function_Method($this, 'explorer_me',           ['is_safe' => ['html']]),
            "editor_me"    => new \Twig_Function_Method($this, 'editor_me',              ['is_safe' => ['html']]),
            "editor_menu"  => new \Twig_Function_Method($this, 'editor_menu',              ['is_safe' => ['html']]),
        );
    }
}

?>