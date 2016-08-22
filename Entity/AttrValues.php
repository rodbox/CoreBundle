<?php

namespace RB\CoreBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * AttrValues
 *
 * @ORM\Table(name="attr_values")
 * @ORM\Entity(repositoryClass="RB\CoreBundle\Repository\AttrValuesRepository")
 */
class AttrValues
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
     * @var int
     *
     * @ORM\Column(name="attr", type="integer")
     */
    private $attr;

    /**
     * @var int
     *
     * @ORM\Column(name="item", type="integer")
     */
    private $item;

    /**
     * @var string
     *
     * @ORM\Column(name="value", type="text", nullable=true)
     */
    private $value;


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
     * Set attr
     *
     * @param integer $attr
     *
     * @return AttrValues
     */
    public function setAttr($attr)
    {
        $this->attr = $attr;

        return $this;
    }

    /**
     * Get attr
     *
     * @return int
     */
    public function getAttr()
    {
        return $this->attr;
    }

    /**
     * Set item
     *
     * @param integer $item
     *
     * @return AttrValues
     */
    public function setItem($item)
    {
        $this->item = $item;

        return $this;
    }

    /**
     * Get item
     *
     * @return int
     */
    public function getItem()
    {
        return $this->item;
    }

    /**
     * Set value
     *
     * @param string $value
     *
     * @return AttrValues
     */
    public function setValue($value)
    {
        $this->value = $value;

        return $this;
    }

    /**
     * Get value
     *
     * @return string
     */
    public function getValue()
    {
        return $this->value;
    }
}

