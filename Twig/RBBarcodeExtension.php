<?php
namespace RB\CoreBundle\Twig;

use Symfony\Component\DependencyInjection\ContainerInterface;

class RBBarcodeExtension  extends \Twig_Extension{


    public function __construct()
    {

    }


    public function barcode($code)
    {

/*$generatorSVG = new Picqer\Barcode\BarcodeGeneratorSVG();
$generatorPNG = new Picqer\Barcode\BarcodeGeneratorPNG();
$generatorJPG = new Picqer\Barcode\BarcodeGeneratorJPG();
$generatorHTML = new Picqer\Barcode\BarcodeGeneratorHTML();
*/
       $generator = new \Picqer\Barcode\BarcodeGeneratorPNG();
echo '<img src="data:image/png;base64,' . base64_encode($generator->getBarcode($code, $generator::TYPE_CODE_128)) . '" style="width:150px;" >';
    }


    public function getName(){
        return 'rb_barcode_extension';
    }


    public function getFunctions(){
        return array(
            new \Twig_SimpleFunction('barcode',[$this, 'barcode'],['is_safe' => ['html']])
        );
    }
}
?>