<?php
require_once "ghibli_service.php";

/**
 * Class Update_ghibli | file Update_ghibli.php
 *
 * In this class, we show the interface "Update_ghibli.html".
 * With this interface, we'll be able to update a Ghibli's anim with its id
 *
 * @package Cinema Project
 * @subpackage configuration
 * @author @Afpa Lab Team
 * @copyright  1920-2080 The Afpa Lab Team Group Corporation World Company
 * @version v1.0
 */
class Update_ghibli	{
	
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
	 * Update a Ghibli's anim with its id
	 */
	function main()	{
		$objet_update_ghibli = new Ghibli_service();
		$objet_update_ghibli->update_ghibli();

		$this->resultat= $objet_update_ghibli->resultat;
		$this->VARS_HTML= $objet_update_ghibli->VARS_HTML;
	}
}
?>
