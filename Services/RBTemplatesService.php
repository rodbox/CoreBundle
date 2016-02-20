<?php
namespace RB\CoreBundle\Services;


use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\Filesystem\Filesystem;

class RBTemplatesService {

    public function __construct($container)
    {
      $this->container = $container;
      $this->fs        = new Filesystem();
      $this->scan      = $this->container->get('rb.scan');
    }


  public function templates()
    {
      $dir = [
        'folders' => $this->folders(),
        'files'   => $this->files()
      ];
      return $dir;
    }

    public function folders()
    {
      $dir_templates_folders = $this->container->getParameter('dir_templates_folders');

      return $this->folders = $this->scan->dir($dir_templates_folders);
    }

    public function files()
    {
      $dir_templates_files = $this->container->getParameter('dir_templates_files');
      return $this->files = $this->scan->file($dir_templates_files);
    }

    public function folder($srcFolderName, $destFolderName, $dirTarget, $force=false)
    {
      $dir_templates_folders = $this->container->getParameter('dir_templates_folders');

      $this->fs->mirror($dir_templates_folders.'/'.$srcFolderName,$dirTarget.'/'.$destFolderName);
    }



    public function file($srcFile='file',$fileName,$dirTarget)
    {
      $dir_templates_files = $this->container->getParameter('dir_templates_files');

      $info     = pathinfo($srcFile);
      $fileName = $fileName.'.'.$info['extension'];

      if(file_exists($dir_templates_files.'/'.$srcFile)){
         $this->fs->copy($dir_templates_files.'/'.$srcFile,$dirTarget.'/'.$fileName);
         return true;
      }
      else
        return false;
    }
}

?>