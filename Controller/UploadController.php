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
     * @Route("/upload",name="upload", options={"expose"=true})
    */
    public function uploadAction(Request $request){
        ini_set("memory_limit",-1);

        // on recupere le nom de la constante de destination.
        $dest       = $request->request->get("dest", "upload");
        $dir        = $request->request->get("index", "/");
        $rename     = $request->request->get("rename", "");

        $d = $request->request->all();

        $dir_upload = $this->container->getParameter('dir_'.$dest);
        $web_upload = $this->container->getParameter('web_'.$dest);
        $dir_dest   = $dir_upload.$dir;
        $web_dest   = $web_upload.$dir;
        $files      = $request->files;
        $filters    = [];

        $rand       = substr( md5(rand()), 0, 8);
        
        $fs         = new Filesystem();
        $list       = [];

        $fs->mkdir($dir_dest);
        foreach ($files as $file){

            $fileExt    = pathinfo($file->getClientOriginalName(),PATHINFO_EXTENSION);

            if ($rename == ""){
                $filename   = $file->getClientOriginalName();
                $filename   = utf8_encode(preg_replace('/\s+/', '_', $filename));
            }

            else
                $filename   = $rename;

            $file->move($dir_dest, $filename);

//s            $fs->mkdir($dir_dest.'/'.dirname($dir.'/'.$filename));

            $list['valid'][] = [
                'src'      => $dest,
                'dir'      => $dir.'/'.$filename,
                'url'      => $web_dest.'/'.$filename.'?r='.$rand,
                'filename' => $filename,
                'ext'      => $fileExt
            ];
        }


        $r = [
            'infotype' => "success",
            'msg'      => $rename,
            'url'      => $web_upload,
            'dir'      => $dir,
            'file'     => $list,
            'd'=>$d
        ];
        return new JsonResponse($r);
    }
}
