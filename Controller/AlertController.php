<?php

namespace RB\CoreBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

class AlertController extends Controller
{
    /**
     * @Route("/add")
     */
    public function addAction()
    {
        return $this->render('RBCoreBundle:Alert:add.html.twig', array(
            // ...
        ));
    }

    /**
     * @Route("/upd")
     */
    public function updAction()
    {
        return $this->render('RBCoreBundle:Alert:upd.html.twig', array(
            // ...
        ));
    }

    /**
     * @Route("/del")
     */
    public function delAction()
    {
        return $this->render('RBCoreBundle:Alert:del.html.twig', array(
            // ...
        ));
    }

    /**
     * @Route("/reload")
     */
    public function reloadAction()
    {
        return $this->render('RBCoreBundle:Alert:reload.html.twig', array(
            // ...
        ));
    }

}
