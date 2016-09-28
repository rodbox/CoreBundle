<?php

namespace RB\CoreBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Trace
 *
 * @ORM\Table(name="trace")
 * @ORM\Entity(repositoryClass="RB\CoreBundle\Repository\TraceRepository")
 */
class Trace
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
     * @ORM\Column(name="ref", type="string", length=10, nullable=true)
     */
    private $ref;

    /**
     * @var string
     *
     * @ORM\Column(name="msg", type="string", length=255, nullable=true)
     */
    private $msg;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="date", type="datetime")
     */
    private $date;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="dateInput", type="datetime")
     */
    private $dateInput;
    

    /**
     *
     * @ORM\ManyToOne(targetEntity="RB\UserBundle\Entity\User", cascade={"persist"})
     */
    private $user;


    /**
     * Get id
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set ref
     *
     * @param string $ref
     *
     * @return Trace
     */
    public function setRef($ref)
    {
        $this->ref = $ref;

        return $this;
    }

    /**
     * Get ref
     *
     * @return string
     */
    public function getRef()
    {
        return $this->ref;
    }

    /**
     * Set msg
     *
     * @param string $msg
     *
     * @return Trace
     */
    public function setMsg($msg)
    {
        $this->msg = $msg;

        return $this;
    }

    /**
     * Get msg
     *
     * @return string
     */
    public function getMsg()
    {
        return $this->msg;
    }

    /**
     * Set date
     *
     * @param \DateTime $date
     *
     * @return Trace
     */
    public function setDate($date)
    {
        $this->date = $date;

        return $this;
    }

    /**
     * Get date
     *
     * @return \DateTime
     */
    public function getDate()
    {
        return $this->date;
    }

    /**
     * Set dateInput
     *
     * @param \DateTime $dateInput
     *
     * @return Trace
     */
    public function setDateInput($dateInput)
    {
        $this->dateInput = $dateInput;

        return $this;
    }

    /**
     * Get dateInput
     *
     * @return \DateTime
     */
    public function getDateInput()
    {
        return $this->dateInput;
    }

    /**
     * Set user
     *
     * @param integer $user
     *
     * @return Trace
     */
    public function setUser($user)
    {
        $this->user = $user;

        return $this;
    }

    /**
     * Get user
     *
     * @return integer
     */
    public function getUser()
    {
        return $this->user;
    }
}
