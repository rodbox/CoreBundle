<?php 
namespace RB\CoreBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\RadioType;

class GenderType extends AbstractType
{
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'placeholder' => 'label.no_info',
            'expanded'=>true,
            'required'=>false,
            'choices' => [
                'label.male'    => 'label.male',
                'label.female'  => 'label.female'
            ],
            'attr'=>[
            ]
        ]);
    }

    public function getParent()
    {
        return ChoiceType::class;
    }
}

?>