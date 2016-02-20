<?php
namespace RB\CoreBundle\Services;

use Symfony\Component\DependencyInjection\ContainerInterface;

class RBEditorService {



    public function __construct($container, $twig)
    {
        $this->container = $container;
        $this->twig      = $twig;
    }



    /**
     * Retourne l'editeur correspondant a l'extension du fichier
     * @param  string $file   le nom du fichier
     * @param  string $folder le dossier du fichier (valeur absolue par rapport a src)
     * @param  string $src    suffix du dossier source referencer dans le fichier de rb_config.yml
     * @return array         retourne l'editeur avec son callback d'initialisation
     */
    public function open($file, $folder, $src, $force = false)
    {
        $this->chooseEditor($file);
        $rand           = substr( md5(rand()), 0, 8);

        $this->file     = $file;
        $this->folder   = $folder;
        $this->src      = $src;
        $this->force    = $force;

        $this->dir      = $dir = $this->container->getParameter('dir_'.$src);
        $this->web      = $web = $this->container->getParameter('web_'.$src);

        $this->dirFile  = $dirFile = $dir.'/'.$folder.'/'.$file;
        $this->webFile  = $webFile = $web.'/'.$folder.'/'.$file;

        $this->idEditor = 'editor_'.$rand;

        return $this->twig->render('RBCoreBundle:Editor:'.$this->editor.'.html.twig', [
            'id'       => $this->idEditor,
            'src'      => $this->src,
            'file'     => $this->file,
            'ext'      => $this->ext,
            'force'    => $this->force,
            'dir_file' => $this->dirFile,
            'web_file' => $this->webFile,
            'menu'     => $this->menu(),
            'content'  => ($this->editor_src=='content')?file_get_contents($this->dirFile):''
        ]);
    }



    /**
     * [menu description]
     * @return [type] [description]
     */
    public function menu()
    {
        $menu = ($this->force == "true")?$this->editor:'default';
        return $this->twig->render('RBCoreBundle:Editor:menu/'.$menu.'.html.twig', [
                'id'       => $this->idEditor,
                'src'      => $this->src,
                'file'     => $this->file,
                'folder'   => $this->folder,
                'editor'   => $this->editor,
                'ext'      => $this->ext,
                'force'    => $this->force,
                'dir_file' => $this->dirFile,
                'web_file' => $this->webFile
            ]);
    }



    /**
     * Retourne le nom de l'editeur du fichier
     * @param  [type] $file [description]
     * @return [type]       [description]
     */
    public function chooseEditor($file)
    {
        $info             = pathinfo($file);
        $this->ext        = $ext = $info['extension'];

        $editors          = $this->container->getParameter('editor');
        $editors_src      = $this->container->getParameter('editor_src');

        // on recupere le nom de l'editeur du fichier
        $this->editor     = (array_key_exists($ext,$editors))?$editors[$ext]:'default';

        // on recupere la source de necessaire pour l'editeur :  web, dir ou content
        $this->editor_src = $editors_src[$this->editor];

        return [
            'editor'    => $this->editor,
            'editorsrc' => $this->editor_src
        ];
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