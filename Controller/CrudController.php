<?php

namespace RB\CoreBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;


class CrudController extends Controller
{
    /**
    * @Route("/edit_me/{id}/{entityName}/{field}",name="edit_me")
    */
    public function edit_meAction($id, $entityName, $field, Request $request)
        {
            $d          = $request->request->all();

            $setterName = 'set'.ucfirst($field);

            $em         = $this->getDoctrine()->getManager();
            $entity     = $em
              ->getRepository($entityName)
              ->find($id);

            $entity->$setterName($d['value']);

            $em->persist($entity);
            $em->flush();

            $list = [];

            $r    = [
                'infotype'   => 'success',
                'msg'        => 'action : ok',
                'setterName' => $setterName,
                'app'        => $this->renderView('::base.html.twig', [
                    'list'     => $list
                ]),
                'value'    => $d['value']
            ];


            return new JsonResponse($r);
        }
}
