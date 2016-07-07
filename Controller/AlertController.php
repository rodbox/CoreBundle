<?php

namespace RB\CoreBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;


class AlertController extends Controller
{
    /**
     * @Route("/add", name="alert_add")
     */
    public function addAction(Request $request)
    {
        $data = $request->request->getAll();
        $this->get('rb.alert')->add($data);

        $r = [
            'infotype' => 'success',
            'msg'      => 'ok'
        ];

        return new JsonResponse($r);
    }

    /**
     * @Route("/upd/{id}", name="alert_upd")
     */
    public function updAction(Request $request, $id)
    {
        $data = $request->request->getAll();
        $this->get('rb.alert')->upd($id, $data);

        $r = [
            'infotype' => 'success',
            'msg'      => 'ok'
        ];

        return new JsonResponse($r);
    }

    /**
     * @Route("/del/{id}", name="alert_del")
     */
    public function delAction(Request $request, $id)
    {
        $data = $request->request->getAll();
        $this->get('rb.alert')->del($id);
    }

    /**
     * @Route("/form", name="alert_form")
     */
    public function formAction()
    {
        return $this->render('RBCoreBundle:Alert:form.html.twig');
    }


    /**
     * @Route("/reload", name="alert_reload", options = { "expose" = true })
     */
    public function reloadAction()
    {
        $em = $this->getDoctrine()->getManager();
        $alerts = $em
          ->getRepository('RBCoreBundle:Alert')
          ->findAll();
        return $this->render('RBCoreBundle:Alert:reload.html.twig', array(
            'alerts'=>$alerts
        ));
    }
}

