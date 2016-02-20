<?php

namespace RB\CoreBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class TemplatesController extends Controller
{
    /**
     * @Route("/list",name="templates_list")
     */
    public function listAction()
    {
        /* SERVICE : rb.template */
        $list = $this->get('rb.templates')->templates();
        /* END SERVICE :  rb.template */
        return $this->render('RBCoreBundle:Templates:list.html.twig',[
            'list'=>$list
        ]);
    }

    /**
     * @Route("/create",name="templates_create")
     */
    public function createAction(Request $request)
    {
        $d = $request->request->all();
        extract($d);
        $dir_users = $this->container->getParameter($dir).'/'.$target;
        /* SERVICE : rb.templates */
        $newFile = $this->get('rb.templates')->$src($file,$name,$dir_users);
        /* END SERVICE :  rb.templates */
        $r = [
             'infotype'=>'success',
            'msg'=>'ok',
            'app'=>$newFile
        ];

        return new JsonResponse($r);
    }

}
