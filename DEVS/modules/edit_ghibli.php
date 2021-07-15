<?php
require_once "ghibli_service.php";

/**
 * Class Edit_ghibli | file edit_ghibli.php
 *
 * In this class, we show the interface "edit_ghibli.html".
 * With this interface, we'll be able to edit a Ghibli's anim with its id
 *
 * @package Cinema Project
 * @subpackage configuration
 * @author @Afpa Lab Team
 * @copyright  1920-2080 The Afpa Lab Team Group Corporation World Company
 * @version v1.0
 */
class Edit_ghibli {
	
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
	 * Get datas from database and edit a Ghibli's anim with its id
	 */
	function main()	{
		$objet_edit_ghibli = new Ghibli_service();
		$objet_edit_ghibli -> edit_ghibli();

		$this->resultat = $objet_edit_ghibli->resultat;
	}
}

?>
