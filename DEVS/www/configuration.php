<?php

Class Configuration	{

	/**
	 * @static
	 * Returns the project config from the ini file
	 * 
	 * @return array|false It will return an array, or false if an error occurred
	 */
	public static function getGlobalsINI() {
		$DOCUMENT_ROOT= $_SERVER['DOCUMENT_ROOT'];
		$aOfPaths= explode("/", $DOCUMENT_ROOT);
		for ($i=count($aOfPaths)-1; $i>0; $i--)	{
			$DOCUMENT_ROOT= str_replace($aOfPaths[$i], "", $DOCUMENT_ROOT);
			$DOCUMENT_ROOT= str_replace("//", "/", $DOCUMENT_ROOT);
			if (is_file($DOCUMENT_ROOT . "files/config_framework_ghibli.ini"))	{
				return parse_ini_file($DOCUMENT_ROOT . "files/config_framework_ghibli.ini", false);
			}  else if (is_file($DOCUMENT_ROOT . "files/config_framework_ghibli_prod.ini"))	{
				return parse_ini_file($DOCUMENT_ROOT . "files/config_framework_ghibli_prod.ini", false);
			}
		}
	}

}

?>