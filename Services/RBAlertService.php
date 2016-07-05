<?php
namespace RB\CoreBundle\Services;


use RB\CoreBundle\Entity\Alert;
use Symfony\Component\DependencyInjection\ContainerInterface;

class RBAlertService {



    public function __construct($container,$doctrine)
    {
        $this->container=$container;
        $this->doctrine=$doctrine;
    }



    public function alerts()
    {
        $em = $this->doctrine->getManager();
        $alerts = $em
          ->getRepository('RBCoreBundle:Alert')
          ->findAll();

        return $alerts;
    }


    public function getAlert($id)
    {
        $em = $this->doctrine->getManager();
        $alert = $em
          ->getRepository('RBCoreBundle:Alert')
          ->find($id);

        return $alert;
    }


    public function del($id)
    {
        $em = $this->doctrine->getManager();
        $alert = $em
          ->getRepository('RBCoreBundle:Alert')
          ->find($id);
        $em->remove($alert);
        $em->flush();

        /* SERVICE : rb.counter */
        $this->container->get('rb.counter')->add('alert',-1);
        /* END SERVICE :  rb.counter */
    }

    public function add($data)
    {
        $alert = new Alert();

        $alert->setContent($data['content']);
        $alert->setGroups($data['groups']);
        $alert->setUsers($data['users']);
        $alert->setType($data['type']);
        $alert->setDateCreate(new \DateTime());
        $alert->setDateExpir($data['expir']);

        $em = $this->doctrine->getManager();
        $em->persist($alert);
        $em->flush();

        /* SERVICE : rb.counter */
        $this->container->get('rb.counter')->add('alert',1);
        /* END SERVICE :  rb.counter */
    }
}

?>