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
    public function uploadAction(Request $request){

        // on recupere le nom de la constante de destination.
        $dest       = $request->request->get("dest", "dir_upload");
        $dir        = $request->request->get("index", "/");
        $rename     = $request->request->get("rename", false);

        $dir_upload = $this->container->getParameter($dest);
        $dir_dest   = $dir_upload.$dir;

        $files      = $request->files;
        $filters    = [];


         $list = [];

        foreach ($files as $file){

            $fileExt    = pathinfo($file->getClientOriginalName(),PATHINFO_FILENAME);

            if (!$rename)
                $filename   = $rename;
            else{
                $filename   = $file->getClientOriginalName();
                $filename   = preg_replace('/\s+/', '_', $filename);
            }

        $filename   = $file->getClientOriginalName();
                $filename   = preg_replace('/\s+/', '_', $filename);

            $file->move($dir_dest, $filename);

            $list['valid'][] = $filename;
        }


        $r = [
            'infotype' => "success",
            'msg'      => "ok",
            'file'     => $list
        ];
        return new JsonResponse($r);
    }
}
