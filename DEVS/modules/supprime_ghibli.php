<?php
require_once "ghibli_service.php";

/**
 * Class Supprime_ghibli | file Supprime_ghibli.php
 *
 * In this class, we show the interface "Supprime_ghibli.html".
 * With this interface, we'll be able to delete a Ghibli's anim with its id
 *
 * @package Cinema Project
 * @subpackage configuration
 * @author @Afpa Lab Team
 * @copyright  1920-2080 The Afpa Lab Team Group Corporation World Company
 * @version v1.0
 */
class Supprime_ghibli	{
	
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
	 * delete a Ghibli's anim in the database with its id
	 */
	function main()	{
		$objet_supprime_ghibli = new Ghibli_service();
		$objet_supprime_ghibli->supprime_ghibli();

		$this->resultat= $objet_supprime_ghibli->resultat;
		$this->VARS_HTML= $objet_supprime_ghibli->VARS_HTML;
	}
}
?>
