<?php
namespace RB\CoreBundle\Twig;

use Symfony\Component\DependencyInjection\ContainerInterface;

class RBCrudExtension  extends \Twig_Extension{



    public function __construct($container,$twig)
    {
        $this->container = $container;
        $this->twig      = $twig;
    }



    public function crud_entity($entityName, $suffix="index")
    {
        $entity = explode(":",$entityName);
        $prefix = strtolower($entity[1]);

        return $prefix;
    }



    public function menu_edit($prefix, $delete_form)
    {
        echo $this->twig->render('RBCoreBundle:Twig:menu_edit.html.twig',[
            'prefix'      => $prefix,
            'delete_form' => $delete_form
        ]);
    }



    public function menu_show($prefix)
    {
        echo $this->twig->render('RBCoreBundle:Twig:menu_show.html.twig',[
            'prefix' => $prefix,
            'id'     => $prefix
        ]);
    }



    public function menu_new($prefix)
    {
        echo $this->twig->render('RBCoreBundle:Twig:menu_new.html.twig',[
            'prefix' => $prefix,
            'id'     => $prefix
        ]);
    }


    public function play_select($prefix="",$target = '#table', $suffix = '')
    {
        echo $this->twig->render('RBCoreBundle:Twig:play-select.html.twig',[
            'prefix' => $prefix,
            'target' => $target,
            'suffix' => $suffix
        ]);
    }



    public function edit_me($field, $entity, $entityName, $multiple=false)
    {
        $id         = $entity->getId();
        $getterName = 'get'.ucfirst($field);
        $value      = $entity->$getterName();

        $idInput      = $field.'_'.$id;

        if (is_array($value)|| is_object($value)) {
            $name = "edit_me[$id][$entityName][$field]";
            if ($multiple) {
                $name=$name."[]";
                $class="select2-tag";
            }
            else {
                $class="";
            }
            echo $this->twig->render('RBCoreBundle:Twig:edit-me-select.html.twig',[
                'id'      => $entity->getId(),
                'idInput' => $idInput,
                'field'   => $field,
                'name'    => $name,
                'multiple'=> $multiple,
                'class'   => $class,
                'value'   => $value,
                'entity'  => $entityName
            ]);
        }

        else {
            echo $this->twig->render('RBCoreBundle:Twig:edit-me-text.html.twig',[
                'id'     => $entity->getId(),
                'idInput'=> $idInput,
                'field'  => $field,
                'name'   => "edit_me[$id][$entityName][$field]",
                'value'  => $value,
                'entity' => $entityName
            ]);
        }
    }



    public function check_setter_me($field, $entity, $entityName, $disabled = false)
    {
        $id         = $entity->getId();
        $getterName = 'get'.ucfirst($field);
        $value      = $entity->$getterName();

        $idInput    = $field.'_'.$id;

        $name       = "check_setter_me[$id][$entityName][$field]";
        $class      = "check-setter";

        echo $this->twig->render('RBCoreBundle:Twig:check-setter-me.html.twig',[
            'id'       => $entity->getId(),
            'idInput'  => $idInput,
            'field'    => $field,
            'name'     => $name,
            'class'    => $class,
            'disabled' => $disabled,
            'value'    => $value,
            'entity'   => $entityName
        ]);
    }



    function find_me($entity, $entityName)
    {
        $id = $entity->getId();

        echo $this->twig->render('RBCoreBundle:Twig:find-me.html.twig',[
            'id'     => $id,
            'name'   => "edit_me[$id][$entityName][finder]",
            'entity' => $entityName
        ]);
    }



    function check_me($id, $entityName, $suffix='')
    {
        echo $this->twig->render('RBCoreBundle:Twig:check-me.html.twig',[
            'id'         => $id,
            'entityName' => $entityName,
            'suffix'     => $suffix
        ]);
    }



    function action_me($id, $entityName)
    {
        $crud_entity = $this->crud_entity($entityName);

        echo $this->twig->render('RBCoreBundle:Twig:action-me.html.twig',[
            'id'           => $id,
            'entityName'   => $entityName,
            'entitySuffix' => $crud_entity
        ]);
    }



    function crud_menu($entityName)
    {
        $crud_entity = $this->crud_entity($entityName);

        echo $this->twig->render('RBCoreBundle:Twig:crud-menu.html.twig',[
            'entityName'   => $entityName,
            'entitySuffix' => $crud_entity,
            'target'       => '#'.$crud_entity.'-list'
        ]);
    }


    function crud_menu_entity($id,$entityName)
    {
        $crud_entity = $this->crud_entity($entityName);

        echo $this->twig->render('RBCoreBundle:Twig:crud-menu-entity.html.twig',[
            'entityName'   => $entityName,
            'entitySuffix' => $crud_entity
        ]);
    }


    public function getName(){
        return 'rb_crud_extension';
    }



    public function getFunctions(){
        return array(
            new \Twig_SimpleFunction("menu_edit", [$this, 'menu_edit'], ['is_safe' => ['html']]),
            new \Twig_SimpleFunction("menu_show", [$this, 'menu_show'], ['is_safe' => ['html']]),
            new \Twig_SimpleFunction("menu_new", [$this, 'menu_new'], ['is_safe' => ['html']]),
            new \Twig_SimpleFunction("play_select", [$this, 'play_select'], ['is_safe' => ['html']]),
            new \Twig_SimpleFunction("edit_me", [$this, 'edit_me'], ['is_safe' => ['html']]),
            new \Twig_SimpleFunction("find_me", [$this, 'find_me'], ['is_safe' => ['html']]),
            new \Twig_SimpleFunction("action_me", [$this, 'action_me'], ['is_safe' => ['html']]),
            new \Twig_SimpleFunction("crud_menu", [$this, 'crud_menu'], ['is_safe' => ['html']]),
            new \Twig_SimpleFunction("crud_menu_entity", [$this, 'crud_menu_entity'], ['is_safe' => ['html']]),
            new \Twig_SimpleFunction("check_me", [$this, 'check_me'], ['is_safe' => ['html']]),
            new \Twig_SimpleFunction("check_setter_me", [$this, 'check_setter_me'], ['is_safe' => ['html']])
        );
    }
}

?>