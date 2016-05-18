<?php
namespace RB\CoreBundle\Twig;

use Symfony\Component\DependencyInjection\ContainerInterface;

class RBPdfExtension  extends \Twig_Extension{



    public function __construct($container)
    {
        $this->container = $container;
    }

    public function css_pdf()
    {
        echo "<style>";
        echo "table.grey th,table.grey td {   border-bottom: 1px solid #EEEEEE; background-color: #F7F7F7;} ";
        echo "table.grey .last th,table.grey .last td {   border-bottom: 0px solid #EEEEEE;} ";
        echo "label {   font-size:8px} ";

        echo "</style>";
    }

    public function css_border_bottom($size = 1, $color="#ccc")
    {
        echo "border : ".$size."px solid ".$color." ";
    }


    public function getName()
    {
        return 'rb_cdn';
    }



    public function getFunctions(){
        return array(
            "css_pdf"      => new \Twig_Function_Method($this, 'css_pdf',        ['is_safe' => ['html']]),
            "css_border_bottom"      => new \Twig_Function_Method($this, 'css_border_bottom',        ['is_safe' => ['html']]),
        );
    }
}

?>