<?php
require_once "ghibli_service.php";

/**
 * Class Save_ghibli | file Save_ghibli.php
 *
 * In this class, we show the interface "Save_ghibli.html".
 * With this interface, we'll be able to save a new Ghibli's anim
 *
 * @package Cinema Project
 * @subpackage configuration
 * @author @Afpa Lab Team
 * @copyright  1920-2080 The Afpa Lab Team Group Corporation World Company
 * @version v1.0
 */
class Save_ghibli	{
	
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
	 * Add a Ghibli's anim in the database
	 */
	function main()	{
		// Create a new Ghibli's anim
		$obj_save_ghibli = new Ghibli_service();
		$obj_save_ghibli->save_ghibli();

		$this->resultat= $obj_save_ghibli->resultat;
		$this->VARS_HTML= $obj_save_ghibli->VARS_HTML;
	}
}

?>
