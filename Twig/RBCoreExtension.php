<?php
namespace RB\CoreBundle\Twig;

use Symfony\Component\DependencyInjection\ContainerInterface;

class RBCoreExtension  extends \Twig_Extension{


    public function __construct($container, $twig, $session, $router, $doctrine)
    {
        $this->container = $container;
        $this->twig      = $twig;
        $this->router    = $router;
        $this->router    = $router;
        $this->session   = $session;
        $this->doctrine  = $doctrine;
    }



    public function char_me($id = 0)
    {
        $num    = floor($id / 26);

        $chr    =  $id - (26 * $num) + 65;

        echo chr($chr);
        if ($num>1)
            echo $num-1;
    }



    public function input_me($route='input_me', $data=[], $class='', $datainput = [])
    {
        echo $this->twig->render('RBCoreBundle:Twig:input-me.html.twig',[
            'route'     => $route,
            'data'      => $data,
            'class'     => $class,
            'datainput' => $datainput
        ]);
    }


    public function increment_me($name='', $value='0', $id='', $attr, $increment=1)
    {
        echo $this->twig->render('RBCoreBundle:Twig:increment-me.html.twig',[
            'increment' => $increment,
            'id'        => $id,
            'value'     => $value,
            'name'      => $name,
            'attr'      => $attr
        ]);
    }



    public function context_me()
    {
        echo $this->twig->render('RBCoreBundle:Twig:context-me.html.twig');
    }



    public function table_me($data, $name = 'table', $class = '')
    {
        echo $this->twig->render('RBCoreBundle:Twig:table-me.html.twig',[
            'data'  => $data,
            'name'  => $name,
            'class' => $class
        ]);
    }



    public function table_sheet_me($data, $name = 'table', $class = '')
    {
        echo $this->twig->render('RBCoreBundle:Twig:table-sheet-me.html.twig',[
            'data'  => $data,
            'name'  => $name,
            'class' => $class
        ]);
    }



    public function pagin_me($data = [], $param = [], $class = '')
    {
        $paramDefault = [
            'id'     => 'pagin',
            'view'   => 'RBCoreBundle:Twig:pagin-list.html.twig',
            'per'    => 5,
            'cur'    => 1,
            'filter' => false,
            'search' => true,
            'data'   => $data
        ];

        $param                 = array_merge($paramDefault, $param);

        $first                 = ($param['cur'] - 1) * $param['per'];
        $last                  = $param['cur'] * $param['per'];
        $count                 = count($data);
        $param['pages']        = $count / $param['per'];

        $last                  = ($last > $count)?$param['per']:$last;

        $data_page             = array_slice($data, $first, $param['per'], true);


        echo $this->twig->render('RBCoreBundle:Twig:pagin-me.html.twig',[
            'id'        => $param['id'],
            'data'      => $data,
            'data_page' => $data_page,
            'param'     => $param,
            'class'     => $class
        ]);
    }



    public function context_me_attr()
    {
        $sessionUi = $this->session->get('ui',[]);
        foreach ($sessionUi as $key => $value)
            echo ' data-context-'.$key.'="'.$value.'" ';
    }



    public function attr_me($attr)
    {
        foreach ($attr as $key => $value)
            echo ' '. $key.'="'.$value.'" ';
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



    public function setter_me($data, $id="")
    {
        $data = json_encode($data);
        echo $this->twig->render('RBCoreBundle:Twig:btn-setter-me.html.twig',[
            'data'  => $data,
            'id'    => $id
        ]);
    }



    public function context_me_checkbox($keyContext="H", $valueSetter="true", $content="<i class='fa fa-question'></i>", $class="")
    {
        echo $this->twig->render('RBCoreBundle:Twig:btn-context-me.html.twig',[
            'context' => $keyContext,
            'value'   => $valueSetter,
            'content' => $content,
            'type'    => 'checkbox',
            'class'   => $class
        ]);
    }



    public function context_me_select($keyContext="H", $valueSetter="true", $class="")
    {
        echo $this->twig->render('RBCoreBundle:Twig:select-context-me.html.twig',[
            'context' => $keyContext,
            'value'   => $valueSetter,
            'class'   =>$class
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



    public function alert_me($id='all')
    {
        $em = $this->doctrine->getManager();
        $alerts = $em
          ->getRepository('RBCoreBundle:Alert')
          ->findAll();

        echo $this->twig->render('RBCoreBundle:Twig:alert-me.html.twig',[
            'id'     =>$id,
            'alerts' => $alerts
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



    public function tabslive_me($routes, $id)
    {
        echo $this->twig->render('RBCoreBundle:Twig:tablive-me.html.twig',[
            'id'      => $id,
            'routes'  => $routes
        ]);
    }



    public function nav_me($id="nav_me", $target="#app-cotent")
    {
        $routeCollection = $this->router->getRouteCollection()->all();

        foreach($routeCollection as $route => $routeMeta){
            $path     = $routeMeta->getPath();
            preg_match_all('[\{[{a-zA-Z0-9]{1,}\}]', $path , $matches);
            $routes[] = [
                'name'   => $route,
                'path'   => $path,
                'req'    => json_encode($matches[0]),
                'reqStr' => implode(',', $matches[0])
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



    public function pane_me_lazy($id, $route, $dataRoute='', $class='col-md-6 col-xs-6 col-lg-3 col-xl-3 ', $paneClass='', $submenu = '')
    {
        echo $this->twig->render('RBCoreBundle:Twig:pane-me-lazy.html.twig',[
            'id'        => $id,
            'route'     => $route,
            'data'      => $dataRoute,
            'class'     => $class,
            'paneClass' => $paneClass,
            'submenu'   => $submenu
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
    public function curl_me($target="#product_img", $dir="products", $folder="/123")
    {
        echo $this->twig->render('RBCoreBundle:Twig:curl-me.html.twig',[
            'target' => $target,
            'dir'    => $dir,
            'folder' => $folder
        ]);
    }



    public function logo($size='M')
    {
        echo $this->twig->render('RBCoreBundle:Twig:logo.html.twig',[
            'size'    => $size
        ]);
    }



    public function mustache_tpl($id='', $view='@RBCoreBundle')
    {
        $dirTpl      = explode(':', $view);

        $fileLocator = $this->container->get('file_locator');
        $path        = $fileLocator->locate($dirTpl[0]);

        $data        = file_get_contents($path.'/Resources/views/'.$dirTpl[1].'/'.$dirTpl[2]);

        echo $this->twig->render('RBCoreBundle:Twig:mustache-tpl.html.twig',[
            'id'   => $id,
            'data' => $data
        ]);
    }



    public function local_me($route, $index, $data = [])
    {
        $url = $this->router->generate($route, $data);
        echo $this->twig->render('RBCoreBundle:Twig:local-me.html.twig',[
            'url'   => $url,
            'data'  => $data,
            'index' => $index
        ]);
    }



    public function btn_local($content = 'local', $target, $index, $tpl)
    {
        echo $this->twig->render('RBCoreBundle:Twig:btn-local.html.twig',[
            'content' => $content,
            'target'  => $target,
            'index'   => $index,
            'tpl'     => $tpl
        ]);
    }



    public function traces($traces)
    {
        echo $this->twig->render('RBCoreBundle:Trace:table.html.twig',[
            'traces' => $traces
        ]);
    }


    public function getName(){
        return 'rb_core_extension';
    }



    public function getFunctions(){
        return array(
            new \Twig_SimpleFunction("traces"              , [$this , 'traces']              , ['is_safe' => ['html']]) ,
            new \Twig_SimpleFunction("char_me"             , [$this , 'char_me']             , ['is_safe' => ['html']]) ,
            new \Twig_SimpleFunction("table_me"            , [$this , 'table_me']            , ['is_safe' => ['html']]) ,
            new \Twig_SimpleFunction("table_sheet_me"      , [$this , 'table_sheet_me']      , ['is_safe' => ['html']]) ,
            new \Twig_SimpleFunction("pagin_me"            , [$this , 'pagin_me']            , ['is_safe' => ['html']]) ,
            new \Twig_SimpleFunction("alert_me"            , [$this , 'alert_me']            , ['is_safe' => ['html']]) ,
            new \Twig_SimpleFunction("counter_me"          , [$this , 'counter_me']          , ['is_safe' => ['html']]) ,
            new \Twig_SimpleFunction("input_me"            , [$this , 'input_me']            , ['is_safe' => ['html']]) ,
            new \Twig_SimpleFunction("increment_me"        , [$this , 'increment_me']        , ['is_safe' => ['html']]) ,
            new \Twig_SimpleFunction("clip_me"             , [$this , 'clip_me']             , ['is_safe' => ['html']]) ,
            new \Twig_SimpleFunction("context_me"          , [$this , 'context_me']          , ['is_safe' => ['html']]) ,
            new \Twig_SimpleFunction("context_me_attr"     , [$this , 'context_me_attr']     , ['is_safe' => ['html']]) ,
            new \Twig_SimpleFunction("context_me_radio"    , [$this , 'context_me_radio']    , ['is_safe' => ['html']]) ,
            new \Twig_SimpleFunction("context_me_checkbox" , [$this , 'context_me_checkbox'] , ['is_safe' => ['html']]) ,
            new \Twig_SimpleFunction("context_me_select"   , [$this , 'context_me_select']   , ['is_safe' => ['html']]) ,
            new \Twig_SimpleFunction("setter_me"           , [$this , 'setter_me']           , ['is_safe' => ['html']]) ,
            new \Twig_SimpleFunction("tab_me"              , [$this , 'tab_me']              , ['is_safe' => ['html']]) ,
            new \Twig_SimpleFunction("tabslive_me"         , [$this , 'tabslive_me']         , ['is_safe' => ['html']]) ,
            new \Twig_SimpleFunction("nav_me"              , [$this , 'nav_me']              , ['is_safe' => ['html']]) ,
            new \Twig_SimpleFunction("pane_me"             , [$this , 'pane_me']             , ['is_safe' => ['html']]) ,
            new \Twig_SimpleFunction("pane_me_lazy"        , [$this , 'pane_me_lazy']        , ['is_safe' => ['html']]) ,
            new \Twig_SimpleFunction("crop_me"             , [$this , 'crop_me']             , ['is_safe' => ['html']]) ,
            new \Twig_SimpleFunction("curl_me"             , [$this , 'curl_me']             , ['is_safe' => ['html']]) ,
            new \Twig_SimpleFunction("view_me"             , [$this , 'view_me']             , ['is_safe' => ['html']]) ,
            new \Twig_SimpleFunction("logo"                , [$this , 'logo']                , ['is_safe' => ['html']]) ,
            new \Twig_SimpleFunction("mustache_tpl"        , [$this , 'mustache_tpl']        , ['is_safe' => ['html']]) ,
            new \Twig_SimpleFunction("btn_local"           , [$this , 'btn_local']           , ['is_safe' => ['html']]) ,
            new \Twig_SimpleFunction("local_me"          , [$this , 'local_me']          , ['is_safe' => ['html']])
        );
    }
}

?>