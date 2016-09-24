<?php
/**
 * Created by PhpStorm.
 * User: vilimstubican
 * Date: 12/09/16
 * Time: 12:50
 */

namespace app\models\helpers;


class JSAutoLoader implements AutoLoader
{
    private $root;
    private $fromBase;

    public function __construct($root, $fromBase)
    {
        $this->root = $root;
        $this->fromBase = $fromBase;
    }

    public function autoLoad($output)
    {
        $this->importScript($this->root);
    }

    private function importScript($dir)
    {
        $base = '/Users/vilimstubican/work/neat-ai' . $dir;
        $files = scandir($base);
        arsort($files);

        foreach ($files as $file) {
            if($file == "." || $file == ".." ) {
                continue;
            }

            if (is_dir($base . DIRECTORY_SEPARATOR . $file)) {
                $this->importScript($dir . DIRECTORY_SEPARATOR . $file);
                continue;
            }

            echo '<script src="' . implode(DIRECTORY_SEPARATOR, [$this->fromBase, $dir, $file ]) . '"></script>';
        }
    }
}