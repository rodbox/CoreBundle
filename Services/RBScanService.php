<?php
namespace RB\CoreBundle\Services;

use Symfony\Component\DependencyInjection\ContainerInterface;

class RBScanService {



    public function __construct($container)
    {
		$this->container=$container;
		$this->filter  = [
			".",
			"..",
			"__MACOSX",
			"nbproject",
			"_notes",
			".DS_Store",
			".komodotools",
			"_tmp",
			".git",
			".idea",
			".gitignore"
		];
    }



    public function scan($dir){
		$list = array_diff( scandir( $dir ), $this->filter );
		return $list;
    }



    public function dir($dir){
		$list     = $this->scan($dir);
		$listFile = [];
		foreach ($list as $key => $value) {
			// si c'est un dossier
			if(is_dir($dir.'/'.$value))
				$listFile[] = $value;
		}
		return $listFile;
    }



    public function file($dir,$filter='',$filterMeta=false){
		$list     = $this->scan($dir);
		$listFile = [];
			foreach ($list as $key => $value) {
				// si c'est un dossier
				if(!is_dir($dir.'/'.$value)){
					$infoFile = pathinfo($value);

					//si  il y a un filtre pour les extensions
					if(is_array($filter)){

						// si l'extension du fichier est dans la liste des filtres
						if (in_array($infoFile['extension'],$filter) ){
							// si on retourne les metas
							if($filterMeta){
								$listFile[] = [
									'filename' 	=> $infoFile['filename'],
									'ext' 		=> $infoFile['extension'],
									'file' 		=> $infoFile['basename']
								];
							}
							else
								$listFile[] = $value;
						}
					}

					// sinon on liste tout les fichiers
					else{
						// si on retourne les metas
						if($filterMeta){
							$listFile[] = [
								'filename' 	=> $infoFile['filename'],
								'ext' 		=> $infoFile['extension'],
								'file' 		=> $infoFile['basename']
							];
						}
						else
							$listFile[] = $value;
					}
				}
			}

		return $listFile;
    }



}

?>