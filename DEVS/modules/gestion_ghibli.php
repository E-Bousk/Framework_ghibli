<?php
/**
 * Class Gestion_ghibli | file Gestion_ghibli.php
 *
 * In this class, we show the interface "Gestion_ghibli.html".
 * With this interface, we'll be able to add, edit, list, delete Ghibli's anims
 *
 * @package Cinema Project
 * @subpackage configuration
 * @author @Afpa Lab Team
 * @copyright  1920-2080 The Afpa Lab Team Group Corporation World Company
 * @version v1.0
 */
class Gestion_ghibli	{
	
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
	 * Get interface to gestion of Ghibli's anims
	 */
	function main()	{
	}
}

?>
