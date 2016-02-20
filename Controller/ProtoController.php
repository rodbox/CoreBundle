<?php

namespace RB\CoreBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

class ProtoController extends Controller
{
    /**
     * @Route("/load", name="proto_load")
     */
    public function loadAction(Request $request)
    {
        $proto = $request->request->get("proto","");
        $data  = $request->request->get("data",[]);
        $data['counter'] = $request->request->get("protoCounter",0);
        return $this->render($proto, $data);
    }

}
