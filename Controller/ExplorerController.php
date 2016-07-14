<?php

namespace RB\CoreBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Finder\Finder;


class ExplorerController extends Controller
{
    
    /**
    * @Route("/finder_expose", name="finder_expose", options = { "expose" = true })
    */
    public function finderAction(Request $request)
        {
            $finder    = new finder();

            $dir       = $this->container->getParameter('dir_src');
            
            $ext       = $request->request->get("ext",["js","css","less","scss","twig"]);
            $search    = $request->request->get("action","");
            $exclude   = $request->request->get("exclude",['var','web','node_modules']);

            $reg       = "{1}([a-zA-Z0-9\..\s_-]{0,}";
            $regsearch = implode($reg, str_split($search));

            $list      = [];

            $finder->in($dir);
            // Filtre de dossier
            foreach ($exclude as $key => $value)
                $finder->notPath($value);

            // Regurlar ex by js
            $finder
                ->path($regsearch)
            ;

            foreach ($ext as $key => $value)
                $finder->name('*.'.$value);

            $finder->files();

            foreach ($finder as $file){
                $list[]   = [
                    'name'=>'/'.$file->getRelativePathname()
                ];
            }


            $r    = $list;

            return new JsonResponse($r);
    }  


    /**
     * @Route("/explorer", name="explorer")
     */
    public function explorerAction(Request $request)
    {
        $d      = $request->request->all();
        $src    = $request->request->get("value",'media');
        $folder = $request->request->get("folder",'');

        $dir    = $this->container->getParameter('dir_'.$src);
        $dir    .= $folder;

        /* SERVICE : rb.scan */
        $scan = $this->get('rb.scan');
        /* END SERVICE :  rb.scan */

        $folders = $scan->dir($dir);
        $files   = $scan->file($dir);

        return $this->render('RBCoreBundle:Explorer:explorer.html.twig', [
            'folders' => $folders,
            'files'   => $files,
            'folder'  => $folder,
            'src'     => $src
        ]);
    }



    /**
     * @Route("/f", name="folder")
     */
    public function folderAction(Request $request)
        {
        $d      = $request->request->all();
        $src    = $request->request->get("src",'media');
        $folder = $request->request->get("folder",'');

        $session = $request->getSession();
        $ui      = $session->get('ui');
        $view    = (isset($ui["V"]))?$ui["V"]: 'default';

        $dir    = $this->container->getParameter('dir_'.$src);
        $dir    .= '/'.$folder;

        /* SERVICE : rb.scan */
        $scan = $this->get('rb.scan');
        /* END SERVICE :  rb.scan */

        $folders = $scan->dir($dir);
        $files   = $scan->file($dir);

        $r = [
            'infotype' =>'success',
            'msg'      =>'ok',
            'app'      =>$this->renderView('RBCoreBundle:Explorer:folder-'.$view.'.html.twig', [
                'folders' => $folders,
                'files'   => $files,
                'folder'  => $folder,
                'src'     => $src

            ])
        ];

        return new JsonResponse($r);
    }



    /**
    * @Route("/editor/{file}",name="editor")
    */
    public function editorAction($file, Request $request)
    {

        $src        = $request->request->get("src",'media');
        $folder     = $request->request->get("folder",'');
        $force      = $request->request->get("force",'');

        /* SERVICE : rb.editor */
        $editorService = $this->get('rb.editor');
        $editor        = $editorService->open($file, $folder, $src, $force);
        $cb            = $editorService->callback($file);
        /* END SERVICE :  rb.editor */

        $r = [
            'infotype' => 'success',
            'msg'      => 'ok',
            'cb'       => $cb,
            'app'      => $editor
        ];

        return new JsonResponse($r);
    }



    /**
    * @Route("/editor_save/{ext}",name="editor_save")
    */
    public function editor_saveAction($ext,Request $request)
    {
        $d    = $request->request->all();
        $force = $request->request->get("force",false);
        extract($d);

        // extract($img);
        // content
        // img
        // crop
        // data
        // encode
        // $imgBase64 = $img['crop'];

        /* SERVICE : rb.editor */
        // $editorService = $this->get('rb.editor');
        // $editor        = $editorService->save($file, $folder, $src, $force);

        $editorService = $this->get('rb.image');

        // $file = 'file_'.$suffix.'.'.$ext;

        $editor        = $editorService->save_base64($content, $file, $folder, $src, $force, $suffix);
        /* END SERVICE :  rb.editor */

        // if ($editor) {
        if (true) {
            $r    = [
                'infotype' => 'success',
                'msg'      => 'action : ok',
                'data'     => $d
            ];
        }
        else{
            $r    = [
                'infotype' => 'error',
                'msg'      => 'Fichier non enregistrer',
                'data'     => $d
            ];
        }

        $list = [];

        return new JsonResponse($r);
    }
}
