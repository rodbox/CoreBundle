<?php

namespace RB\CoreBundle\Services;

use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\Yaml\Parser;
use Symfony\Component\Yaml\Dumper;

class RBFileService
{
    function __construct($container,$twig){
        $this->container = $container;
        $this->twig = $twig;
    }



    function file($file){
        $info = pathinfo($file);
        $ext = $info['extension'];

        if($ext == 'xls' || $ext == 'xlsx'){
            $phpexcel       = $this->container->get('phpexcel');
            $phpExcelObject = $phpexcel->createPHPExcelObject($file);
            $writer         = $phpexcel->createWriter($phpExcelObject,'CSV');

            $this->sheet    = $phpExcelObject->getActiveSheet();
            $arrXLS = [];
            for ($i=0; $i < $this->rowXlsRowCount(); $i++) {
                $arrXLS[] = $this->rowXls($i);
            }

            $this->arr = $arrXLS;
        }
        else if($ext == 'csv'){
            $arrCSV = [];
            if (($handle = fopen($file, "r")) !== FALSE) {
                while (($data = fgetcsv($handle, 1000, ";")) !== FALSE) {
                    $arrCSV[] = $data;
                }
            }
            $this->arr = $arrCSV;
        }

        else if($ext == 'json')
            $this->arr = json_encode(file_get_contents($file),true);

        else if($ext == 'xml')
            $this->arr = simplexml_load_file($file);

        else if($ext == 'yml'){
            $yaml  = new Parser();
            $arrYml = $yaml->parse(file_get_contents($dirYaml));
            $this->arr = $arrYml;
        }
        else
            $this->arr = false;

        return $this->arr;
    }

    function toCsv($data, $dir, $separator = ";", $enclosure='"'){
        $file = fopen($dir,"w");

        foreach ($data as $line)
            fputcsv($file, $line, $separator, $enclosure);

        return fclose($file);
    }


    public function paginate($page = 1, $per = 50)
    {
        $pages      = count($this->arr);

        $rowFirst   = $per * ($page - 1);
        $rowLast    = $per * $page;

        $pagesLast  = $rowLast / $per;

        return array_slice($this->arr, $rowFirst, $rowLast);
    }



    // EXCEL
    function cellXls($cell='A1'){
        $cell = $this->sheet->getCell($cell)->getValue();
        return $cell;
    }

    function rowXls($row='1'){
        $row = $this->sheet->rangeToArray('A'.$row.':'.$this->sheet->getHighestColumn().$row);
        return $row[0];
    }

    function rowXlsRowCount(){
        return $this->sheet->getHighestRow();
    }
    // END : EXCEL
}

?>