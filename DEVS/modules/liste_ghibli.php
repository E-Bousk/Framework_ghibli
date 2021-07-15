<?php
require_once "ghibli_service.php";

/**
 * Class liste_ghibli | file liste_ghibli.php
 *
 * In this class, we show the interface "liste_ghibli.html".
 * With this interface, we'll be able to list all the Ghibli's anims stored in database
 *
 * List of classes needed for this class
 *
 * require_once "ghibli_service.php";
 *
 * @package Cinema Project
 * @subpackage configuration
 * @author @Afpa Lab Team
 * @copyright  1920-2080 The Afpa Lab Team Group Corporation World Company
 * @version v1.0
 */
class Liste_ghibli	{
	
	/**
	 * public $resultat is used to store all datas needed for HTML Templates
	 * @var array
	 */
	public $resultat;

	/**
	 * init variables resultat
	 *
	 * execute main function
	 */
	public function __construct()	{
		// init variables resultat
		$this->resultat= [];

		// execute main function
		$this->main();
	}

	/**
	 * Get list of all movies
	 */
	function main()	{
		// List 'em all !!
		$obj= new Ghibli_service();
		$obj->liste_ghibli();
		
		// Get elements for the view
		$this->resultat= $obj->resultat;
		$this->VARS_HTML= $obj->VARS_HTML;
		
		// kill object
		unset($obj);
	}
}

?>
