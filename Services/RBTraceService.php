<?php
namespace RB\CoreBundle\Services;

use Symfony\Component\DependencyInjection\ContainerInterface;
use RB\CoreBundle\Entity\Trace;
class RBTraceService {

    public function __construct($container, $doctrine)
    {
		$this->container 	= $container;	
        $this->doctrine 	= $doctrine;
        $this->em 			= $this->doctrine->getManager();
    }

    public function traces($traces, $dateInput)
    {
    	foreach ($traces as $key => $trace) {
    		extract($trace);
    		$this->trace($ref, $msg, $date, $dateInput);
    	}
    }

    public function trace($ref, $msg, $date, $dateInput)
    {
		$trace = new Trace();

		$trace
			->setRef($ref)
			->setMsg($msg)
			->setDate($date)
			->setDateInput($dateInput)
			->setUser(0);

		$this->em->persist($trace);
		$this->em->flush();

    }


    public function get($ref="default", $user = 0, $date ='')
    {
    	$traces = $this->em
    	  ->getRepository('RBCoreBundle:Trace')
    	  ->findAll();

    	return $traces;
    }


    public function purge($ref="default", $user = 0, $date ='')
    {
    	$traces = $this->get($ref, $user,$date);

    	foreach ($traces as $key => $trace)
    		$this->em->remove($trace);

		$this->em->flush();
    }
}

?>