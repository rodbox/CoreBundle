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
      
      $query->select('p')
         ->from('RBCoreBundle:Trace', 't');
       //  ->where("p.type = '".$type."'");
        
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

}

