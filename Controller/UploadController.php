<?php

namespace RB\CoreBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;


class UploadController extends Controller
{
    /**
     * @Route("/upload",name="upload")
     */
    public function uploadAction(Request $request)
    {
        $filter = $request->request->get("filter",'def');
        $dest   = $request->request->get("dest",'dir_upload');

        return $this->render('RBCoreBundle:Upload:upload.html.twig', [
            'filter' =>$filter,
            'dest'   =>$dest
        ]);
    }


    /**
         * @Route("/uploadExec",name="upload_exec")
         */
    public function uploadExecAction(Request $request){

        // on recupere le nom de la constante de destination.
        $dest       = $request->request->get("dest","dir_upload");
        $dir        = $request->request->get("index","/");

        $dir_upload = $this->container->getParameter($dest);

        $files      = $request->files;
        foreach ($files as $uploadedFile){
            $filename    = $uploadedFile->getClientOriginalName();
            $filename    = preg_replace('/\s+/', '_', $filename);

            $file        = $uploadedFile->move($dir_upload.$dir,$filename);
            $filenameA[] = $filename;

            $ext         = explode(".",$filename);
            $fileExtA[]  = $ext[count($ext)-1];
        }

        $view = $this->renderView("RBCoreBundle:Upload:upload-file-line.html.twig",
            array(
                // 'name'    => $filenameA[0],
                // 'dir'     => $dir_media,
                // 'ext'     => $fileExtA[0],
                // 'filedir' => $dir.$filenameA[0],
                'file'    => $filenameA[0]
        ));

        $r = array(
                    'infotype' => "success",
                    'msg'      => "ok",
                    // 'src'       => $src,
                    // 'dir'      => $dir,
                    'ext'      => $fileExtA[0],
                    'file'     => $filenameA[0],
                    'view'     => $view
                );
        return new JsonResponse($r);
    }


    /**
     * @Route("/move")
     */
    public function moveAction()
    {
        return $this->render('RBCoreBundle:Upload:move.html.twig', array(
            // ...
        ));
    }

    /**
     * @Route("/del")
     */
    public function delAction()
    {
        return $this->render('RBCoreBundle:Upload:del.html.twig', array(
            // ...
        ));
    }

}
