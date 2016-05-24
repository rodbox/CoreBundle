<?php

namespace RB\CoreBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Session\Session;

class CoreController extends Controller
{
        /**
        * @Route("/c",name="input_me")
        */
        public function input_meAction(Request $request)
            {
                $action = $request->request->get("action");

                $pos    = strpos($action, "fix");

                if($pos === 0){
                    // $msg = "status fix - ok";
                    /* SERVICE : rb.fix */
                    $msg      = $this->get('rb.fix')->setStatus($action);
                    $callback = 'setFixStatus';
                    /* END SERVICE :  rb.fix */
                }
                else{
                    $msg      = "recherche un produit";
                    $callback = '';
                }

                $list = [];

                $r    = [
                    'infotype' => 'success',
                    'msg'      => $msg,
                    'cb'       => $callback,
                    'app'      => $this->renderView('::base.html.twig', [
                        'list' => $list
                    ])
                ];

                return new JsonResponse($r);
            }



        /**
        * @Route("/ct",name="ct")
        */
        public function ctAction(Request $request)
        {

            /* SERVICE : rb.counter */
            $counter = $this->get('rb.counter');
            /* END SERVICE :  rb.counter */

            $list = [];
            $r    = [
                'infotype' => 'success',
                'msg'      => 'action : ok',
                'cb'       => 'setCounter',
                'cbapp'    => 'core',
                'counter'  => $counter->getCounter(),
                'app'      => $this->renderView('::base.html.twig', [
                'list'     => $list
                ])
            ];
            return new JsonResponse($r);
        }


    /**
    * @Route("/data", name="data")
    * charge toute les données d'une entité
    */
    public function dataAction(Request $request)
        {
            $entityName = $request->request->get("entityName");
            $field = "name";


            $em         = $this->getDoctrine()->getManager();
            $entities   = $em
              ->getRepository($entityName)
              ->findAll();

            $list = [];
            $r    = [
                'infotype' => 'success',
                'cb'       => 'setDataOption',
                'msg'      => 'action : ok',
                'list'     => $entities,
                'app'      => $this->renderView(':list:option.html.twig', [
                    'field'    => $field,
                    'list'     => $entities
                ])
            ];
            return new JsonResponse($r);
    }

    /**
    * @Route("/session",name="session", options={"expose"=true})
    */
    public function sessionAction(Request $request)
    {
        $all     = $request->query->all();

        $context[$all['key']] = ($all['checked']=="true")?$all['value']:false;

        $session = $request->getSession();

        $ui      = $session->get('ui',[]);
        $uiMerge = array_merge($ui,$context);

        $session->set('ui',$uiMerge);

        $r = array(
            'infotype' => 'success',
            'msg'      => 'ok',
            'session'  => $session->get('ui')
        );

        return new JsonResponse($r);
    }


    /**
    * @Route("/session_view/{route}/{view}",name="session_view")
    */
    public function sessionViewAction($route,$view,Request $request)
    {
        $session      = $request->getSession();
        $view         = $session->get('view',[]);
        $view[$route] = $view;

        // $viewMerge    = array_merge($view, $context);
        $session->set('view', $view);

        $list    = [];

        $r       = [
            'infotype' => 'success',
            'msg'      => 'action : ok',
            'app'      => $this->renderView('::base.html.twig', [
            'list' => $list
            ])
        ];
        return new JsonResponse($r);
    }


    /**
    * @Route("/curl",name="rb_curl")
    */
    public function curlAction(Request $request){
        $url          = $request->request->get("url");

        $dir          = $request->request->get("dir");
        $folder       = $request->request->get("folder");

        $dir_dest = $this->container->getParameter('dir_'.$dir);
        $web_dest = $this->container->getParameter('web_'.$dir);
        $info         = parse_url($url);

        $path         = explode('.',$info['path']);
        $ext          = end($path);
        // $extension    = $path[$ext];
        $file         = $dir_dest.'/'.$folder.'.'.$ext;
        $web_file     = $web_dest.'/'.$folder.'.'.$ext;

        $curl         = $this->get('rb.curl')->save($url, $file);


        if($curl){
            $r            = [
                'infotype'=> 'success',
                'msg'     => 'curl : ok',
                'url'     => $web_file,
                'img'    => $this->renderView('RBCoreBundle:Twig:img.html.twig',[
                    "url"      => $web_file,
                    "format"   => "A",
                    "cssClass" => ""
                ])
            ];
        }
        else{
            $r            = [
                'infotype'=> 'error',
                'msg'     => 'problème de chargement'
            ];
        }

        return new JsonResponse($r);
    }
}