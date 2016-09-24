<?php
/**
 * Created by PhpStorm.
 * User: vilimstubican
 * Date: 12/09/16
 * Time: 12:50
 */

namespace app\models\helpers;


interface AutoLoader
{
    function __construct($root, $fromBase);

    function autoLoad($output);
}