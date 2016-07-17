<?php

namespace RB\CoreBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

use Symfony\Component\Filesystem\Filesystem;

class UploadController extends Controller
{
    /**
     * @Route("/upload",name="upload")
    */
    public function uploadAction(Request $request){

        // on recupere le nom de la constante de destination.
        $dest       = $request->request->get("dest", "upload");
        $dir        = $request->request->get("index", "/");
        $rename     = $request->request->get("rename", "");

        $dir_upload = $this->container->getParameter('dir_'.$dest);
        $web_upload = $this->container->getParameter('web_'.$dest);
        $dir_dest   = $dir_upload.$dir;
        $files      = $request->files;
        $filters    = [];

        $fs         = new Filesystem();

        $list = [];

        foreach ($files as $file){

            $fileExt    = pathinfo($file->getClientOriginalName(),PATHINFO_FILENAME);

            if ($rename == ""){
                $filename   = $file->getClientOriginalName();
                $filename   = preg_replace('/\s+/', '_', $filename);
            }

            else
                $filename   = $rename;

            $fs->mkdir($dir_dest);
            $file->move($dir_dest, $filename);

            $list['valid'][] = $dir.$filename;
        }


        $r = [
            'infotype' => "success",
            'msg'      => $rename,
            'url'      => $web_upload.$dir,
            'file'     => $list
        ];
        return new JsonResponse($r);
    }
}
