<?php
namespace RB\CoreBundle\Twig;

use Symfony\Component\DependencyInjection\ContainerInterface;

class RBCoreExtension  extends \Twig_Extension{
    public function __construct($container, $twig, $session, $router)
    {
        $this->container = $container;
        $this->twig      = $twig;
        $this->router      = $router;
        $this->session   = $session;
    }


    public function input_me()
    {
        echo $this->twig->render('RBCoreBundle:Twig:input-me.html.twig');
    }



    public function context_me()
    {
        echo $this->twig->render('RBCoreBundle:Twig:context-me.html.twig');
    }




    public function context_me_attr()
    {
        $sessionUi = $this->session->get('ui',[]);
        foreach ($sessionUi as $key => $value)
            echo ' data-context-'.$key.'="'.$value.'" ';
    }



    public function context_me_radio($keyContext="H", $valueSetter="true", $content="<i class='fa fa-question'></i>")
    {
        echo $this->twig->render('RBCoreBundle:Twig:btn-context-me.html.twig',[
            'context' => $keyContext,
            'value'   => $valueSetter,
            'content' => $content,
            'type'    => 'radio'
        ]);
    }

    public function context_me_checkbox($keyContext="H", $valueSetter="true", $content="<i class='fa fa-question'></i>")
    {
        echo $this->twig->render('RBCoreBundle:Twig:btn-context-me.html.twig',[
            'context' => $keyContext,
            'value'   => $valueSetter,
            'content' => $content,
            'type'    => 'checkbox'
        ]);
    }

    public function context_me_select($keyContext="H", $valueSetter="true")
    {
        echo $this->twig->render('RBCoreBundle:Twig:select-context-me.html.twig',[
            'context' => $keyContext,
            'value'   => $valueSetter
        ]);
    }



    public function clip_me($target = '')
    {
        echo $this->twig->render('RBCoreBundle:Twig:clip-me.html.twig',[
            'target' => $target
        ]);
    }



    public function view_me($route = 'default')
    {
        echo $this->twig->render('RBCoreBundle:Twig:view-me.html.twig',[
            'route' => $route
        ]);
    }



    public function counter_me($id='', $value=0, $color='default')
    {
        echo $this->twig->render('RBCoreBundle:Twig:counter-me.html.twig',[
            'id'    => $id,
            'value' => $value,
            'color' => $color
        ]);
    }



    public function tab_me($id, $route, $dataRoute='',  $target='.tab-content', $active=false)
    {
        echo $this->twig->render('RBCoreBundle:Twig:tab-me.html.twig',[
            'id'      => $id,
            'route'   => $route,
            'data'    => $dataRoute,
            'active'  => $active,
            'target'  => $target
        ]);
    }



    public function nav_me($id="nav_me", $target="#app-cotent")
    {
        $routeCollection = $this->router->getRouteCollection()->all();

        foreach($routeCollection as $route => $routeMeta){
            $path     = $routeMeta->getPath();
            preg_match_all('[\{[{a-zA-Z0-9]{1,}\}]',$path , $matches);
            $routes[] = [
                'name' => $route,
                'path' => $path,
                'req'  => json_encode($matches[0]),
                'reqStr'  => implode(',',$matches[0])
            ];
        }

        echo $this->twig->render('RBCoreBundle:Twig:nav-me.html.twig',[
            'id'      => $id,
            'routes'  => $routes,
            'target'  => $target
        ]);
    }



    public function pane_me($id, $content, $dataRoute='')
    {
        echo $this->twig->render('RBCoreBundle:Twig:pane-me.html.twig',[
            'id'      => $id,
            'content' => $content,
            'data'    => $dataRoute
        ]);
    }


    public function pane_me_lazy($id, $route, $dataRoute='')
    {
        echo $this->twig->render('RBCoreBundle:Twig:pane-me-lazy.html.twig',[
            'id'      => $id,
            'route'   => $route,
            'data'    => $dataRoute
        ]);
    }


    /**
     * [crop_me description]
     * @return [type] [description]
     */
    public function crop_me($src, $file, $folder)
    {
        echo $this->twig->render('RBCoreBundle:Twig:crop-me.html.twig',[
            'src'    => $src,
            'file'   => $file,
            'folder' => $folder
        ]);
    }


    /**
     * [curl_me description]
     * @return [type] [description]
     */
    public function curl_me($target="#product_img",$dir="products",$folder="/123")
    {
        echo $this->twig->render('RBCoreBundle:Twig:curl-me.html.twig',[
            'target' => $target,
            'dir'    => $dir,
            'folder' => $folder
        ]);
    }


    public function getName(){
        return 'rb_core_extension';
    }



    public function getFunctions(){
        return array(
            "counter_me"          => new \Twig_Function_Method($this, 'counter_me',           ['is_safe' => ['html']]),
            "input_me"            => new \Twig_Function_Method($this, 'input_me',             ['is_safe' => ['html']]),
            "clip_me"             => new \Twig_Function_Method($this, 'clip_me',              ['is_safe' => ['html']]),
            "context_me"          => new \Twig_Function_Method($this, 'context_me',           ['is_safe' => ['html']]),
            "context_me_attr"     => new \Twig_Function_Method($this, 'context_me_attr',      ['is_safe' => ['html']]),
            "context_me_radio"    => new \Twig_Function_Method($this, 'context_me_radio',     ['is_safe' => ['html']]),
            "context_me_checkbox" => new \Twig_Function_Method($this, 'context_me_checkbox',  ['is_safe' => ['html']]),
            "context_me_select"   => new \Twig_Function_Method($this, 'context_me_select',    ['is_safe' => ['html']]),
            "tab_me"              => new \Twig_Function_Method($this, 'tab_me',               ['is_safe' => ['html']]),
            "nav_me"              => new \Twig_Function_Method($this, 'nav_me',               ['is_safe' => ['html']]),
            "pane_me"             => new \Twig_Function_Method($this, 'pane_me',              ['is_safe' => ['html']]),
            "pane_me_lazy"        => new \Twig_Function_Method($this, 'pane_me_lazy',         ['is_safe' => ['html']]),
            "crop_me"             => new \Twig_Function_Method($this, 'crop_me',              ['is_safe' => ['html']]),
            "curl_me"             => new \Twig_Function_Method($this, 'curl_me',              ['is_safe' => ['html']]),
            "view_me"             => new \Twig_Function_Method($this, 'view_me',              ['is_safe' => ['html']])
        );
    }
}

?>