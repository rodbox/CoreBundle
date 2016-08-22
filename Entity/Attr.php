<?php

namespace RB\CoreBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Attr
 *
 * @ORM\Table(name="attr")
 * @ORM\Entity(repositoryClass="RB\CoreBundle\Repository\AttrRepository")
 */
class Attr
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
     * @ORM\Column(name="title", type="string", length=50, nullable=true)
     */
    private $title;

    /**
     * @var string
     *
     * @ORM\Column(name="type", type="string", length=50, nullable=true)
     */
    private $type;

    /**
     * @var string
     *
     * @ORM\Column(name="typeValue", type="string", length=30, nullable=true)
     */
    private $typeValue;


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
     * Set title
     *
     * @param string $title
     *
     * @return Attr
     */
    public function setTitle($title)
    {
        $this->title = $title;

        return $this;
    }

    /**
     * Get title
     *
     * @return string
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * Set type
     *
     * @param string $type
     *
     * @return Attr
     */
    public function setType($type)
    {
        $this->type = $type;

        return $this;
    }

    /**
     * Get type
     *
     * @return string
     */
    public function getType()
    {
        return $this->type;
    }

    /**
     * Set typeValue
     *
     * @param string $typeValue
     *
     * @return Attr
     */
    public function setTypeValue($typeValue)
    {
        $this->typeValue = $typeValue;

        return $this;
    }

    /**
     * Get typeValue
     *
     * @return string
     */
    public function getTypeValue()
    {
        return $this->typeValue;
    }
}

