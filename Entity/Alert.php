<?php

namespace RB\CoreBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Alert
 *
 * @ORM\Table(name="alert")
 * @ORM\Entity(repositoryClass="RB\CoreBundle\Repository\AlertRepository")
 */
class Alert
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;



    /**
     * @var string
     *
     * @ORM\Column(name="content", type="text")
     */
    private $content;

    /**
     * @var string
     *
     * @ORM\Column(name="type", type="text", options={"default" = 'all'})
     */
    private $type;


    /**
     * @var \DateTime
     * Gedmo\Timestampable (on="create")
     * @ORM\Column(name="dateCreate", type="datetime")
     */
    private $dateCreate;

    /**
     * @var \DateTime
     * @ORM\Column(name="dateExpir", type="datetime", nullable=trues)
     */
    private $dateExpir;


}