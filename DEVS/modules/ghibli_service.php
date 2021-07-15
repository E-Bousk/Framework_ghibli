<?php
require_once "initialize.php";

/**
 * Class ghibli_service | file ghibli_service.php
 *
 * In this class, we have methods for :
 * - adding a Ghibli's anim with method save_ghibli()
 * - updating a Ghibli's anim with method update_ghibli()
 * - deleting a Ghibli's anim with method supprime_ghibli()
 * - listing all Ghibli's anims with method liste_ghibli()
 * - editing a Ghibli's anim with method edit_ghibli()
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
class Ghibli_service extends Initialize	{
	
	/**
	 * public $resultat is used to store all datas needed for HTML Templates
	 * @var array
	 */
	public $resultat;

	/**
	 * Call the parent constructor
	 *
	 * init variables resultat
	 */
	public function __construct()	{
		// Call Parent Constructor
		parent::__construct();

		// init variables resultat
		$this->resultat= [];
	}

	/**
	 * Call the parent destructor
	 */
	public function __destruct()	{
		// Call Parent destructor
		parent::__destruct();
	}

	/**
	 * Method save_ghibli()
	 *
	 * Insert a new Ghibli's anim in database
	 */
	public function save_ghibli()	{
		// Here I can Access to :
		// $this->GLOBALS_INI
		// $this->oBdd
		// $this->VARS_HTML
		$spathSQL= $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_SQL"] . "insert_ghibli.sql";
		$this->resultat["save_ghibli"]= $this->oBdd->treatDatas($spathSQL, array(
																	"titre_anim" => $this->VARS_HTML["titre_anim"], 
																	"titre_kanji_anim" => $this->VARS_HTML["titre_kanji_anim"],
                                                                    "titre_japonais_anim" => $this->VARS_HTML["titre_japonais_anim"], 
																	"annee_anim" => $this->VARS_HTML["annee_anim"], 
																	"nom_realisateur" => $this->VARS_HTML["nom_realisateur"]
																	));
		$this->resultat["id_ghibli_created"]= $this->oBdd->getLastInsertId();
	}
	
	/**
	 * Method liste_ghibli()
	 *
	 * List all Ghibli's anims in database
	 */
	public function liste_ghibli()	{
		$spathSQL= $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_SQL"] . "select_ghibli.sql";
		$this->resultat["liste_ghibli"]= $this->oBdd->getSelectDatas($spathSQL, array());
	}

	/**
	 * Method edit_ghibli()
	 *
	 * Edit the Ghibli's anim with param id_anim from the database
	 */
	public function edit_ghibli(){
		// Here I can Access to :
		// $this->GLOBALS_INI
		// $this->oBdd
		// $this->VARS_HTML
		$spathSQL= $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_SQL"] . "select_ghibli_single.sql";
		$this->resultat["edit_ghibli"]= $this->oBdd->getSelectDatas($spathSQL, array( "id_anim" => $this->VARS_HTML["id_anim"] ));

	}

	/**
	 * Method supprime_ghibli()
	 *
	 * Delete a Ghibli's anim in database
	 */
	public function supprime_ghibli(){
		// Here I can Access to :
		// $this->GLOBALS_INI
		// $this->oBdd
		// $this->VARS_HTML
		$spathSQL= $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_SQL"] . "delete_ghibli.sql";
		$this->resultat["supprime_ghibli"]= $this->oBdd->treatDatas($spathSQL, array(
																	"id_anim" => $this->VARS_HTML["id_anim"]
																	));

	}

	/**
	 * Method update_ghibli()
	 *
	 * Update the Ghibli's anim with param id_anim in database
	 */
	public function update_ghibli(){
		// Here I can Access to :
		// $this->GLOBALS_INI
		// $this->oBdd
		// $this->VARS_HTML
		$spathSQL= $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_SQL"] . "update_ghibli.sql";
		$this->resultat["update_ghibli"]= $this->oBdd->treatDatas($spathSQL, array(
																	"id_anim" => $this->VARS_HTML["id_anim"], 
																	"titre_anim" => $this->VARS_HTML["titre_anim"], 
																	"titre_kanji_anim" => $this->VARS_HTML["titre_kanji_anim"], 
																	"titre_japonais_anim" => $this->VARS_HTML["titre_japonais_anim"],
																	"annee_anim" => $this->VARS_HTML["annee_anim"], 
																	"nom_realisateur" => $this->VARS_HTML["nom_realisateur"]
																	));

	}
    
}

// function to get 'var_dump' in log.txt instead of page
// function var_error_log( $object=null ){
// 	ob_start();                    // start buffer capture
// 	print_r( $object );           // dump the values
// 	$contents = ob_get_contents(); // put the buffer into a variable
// 	ob_end_clean();                // end capture
// 	error_log( $contents );        // log contents of the result of var_dump( $object )
// }

// 	// Appel :
// 	var_error_log($arrayOfMonTableau);



?>
