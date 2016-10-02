<?php

namespace RB\CoreBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

/**
 * Trace controller.
 *
 * @Route("/admin/traces")
 */
class TraceController extends Controller
{
    /**
     * @Route("/index", name="trace_index")
     */
    public function indexAction(Request $request)
    {
      $em      = $this->getDoctrine()->getManager();
      $per     = 30;
      $query   = $em->createQueryBuilder();
      
      $ref = $request->request->get("ref",'all');
      
      $query->select('t')
         ->from('RBCoreBundle:Trace', 't')
         ->orderBy('t.date','DESC');
      
      if ($ref != 'all')
        $query->where("t.ref = '".$ref."'");
        
      $paginator = $this->get('knp_paginator');
      $traces  = $paginator->paginate(
          $query,
          $request->query->getInt('page', 1)  /*page number*/,
          $per                                /*limit per page*/
      );
      return $this->render('RBCoreBundle:Trace:index.html.twig', [
        'traces'  => $traces,
        'refs'     => ['stock','fixprocess']
      ]);
    }


    /**
    * @Route("/trace_purge",name="trace_purge")
    */
    public function trace_purgeAction(Request $request)
    {

      $em     = $this->getDoctrine()->getManager();
      $ref    = $request->request->get("ref",'all');
      $traces = $em
        ->getRepository('RBCoreBundle:Trace');
      
      if ($ref == 'all')
        $traces->findAll();
      else
        $traces->findByRef($ref);

      foreach ($traces as $key => $trace)
        $em->remove($trace);

      $em->flush();

      $list = [];

      $r    = [
          'infotype' => 'success',
          'msg'      => 'action : ok',
          'app'      => $this->renderView('::base.html.twig', [
            'list' => $list
          ])
      ];

      return new JsonResponse($r);
      }

}

