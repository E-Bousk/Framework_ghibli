// ///////////////////////////////////////////////////////////////////////////////////
// /// Au chargement de la page : création DataTable & images background aléatoire ///
// ///////////////////////////////////////////////////////////////////////////////////
/**
 * Init start
 * 
 */
var tables;
//affiche le tableau DataTable lorsque la page est finie d'être chargée
$(document).ready(function() {
    // creation du tableau en HTML
    loadAnim();

    // //////////////////////////////////////////////////////////////
    // Création tableau de background-images pour affichage aléatoire
    // //////////////////////////////////////////////////////////////
    var imagesFond = ["background1.jpg", "background2.png", "background3.jpg", "background5.jpg", "background6.jpg"];
    $("body").css({"background": "url(img/" + imagesFond[Math.floor(Math.random() * imagesFond.length)] + ") no-repeat center fixed", "background-size": "cover" });
    var imagesModal = ["background3.jpg", "background5.jpg", "background7.jpg", "background8.jpg", "background9.jpg", "background10.jpg"];
    $(".modal-body").css({"background-image": "url(img/" + imagesModal[Math.floor(Math.random() * imagesModal.length)] + ")" });

}); // end of "$(document).ready"
// ///////////////////////////////////////////////////

/**
 * clear table HTML
 * 
 * clear and destroy datatable
 * 
 * build table and call datatable
 * 
 */
// ///////////////////////////////////////////////////
// /////////// fonction creerDataTable() /////////////
// ///////////////////////////////////////////////////
// pour créer le tableau DataTable
function creerDataTable() {
    tables.clear(); 
    tables.destroy(); 
    constructTable();
    tables = $("#table_anime").DataTable(configuration);
}
// ///////////////////////////////////////////////////


/**
* detect IE
* returns version of IE or false, if browser is not Internet Explorer or Edge
*/
function detectIEorSafari() {
    var ua = window.navigator.userAgent;

    var msie = ua.indexOf('MSIE');
    if (msie > 0) {
        // IE 10 or older
        return true;
    }

    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
        // IE 11
        return true;
    }

    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
        // Edge (IE 12+)
        return true;
    }

    var safari = ua.indexOf('Safari/');
    var chrome = ua.indexOf('Chrome/');
    if ((safari > 0) && (chrome == -1)) {
        // Safari
        return true;
    }

    // other browser
    return false;
}

/**
 * Convert date aaaa-mm-jj into jj/mm/aaaa
 */
function convertDate(sDate)	{
    var aOfDates= sDate.split("-");
    return aOfDates[2] + "/" + aOfDates[1] + "/" + aOfDates[0];
}

/**
 * Convert date jj/mm/aaaa into aaaa-mm-jj
 */
function inverseDate(sDate)	{
    var aOfDates= sDate.split("/");
    return aOfDates[2] + "-" + aOfDates[1] + "-" + aOfDates[0];
}

/**
 * Convert specials HTML entities HTML in character
 */
function htmlspecialchars_decode(str) {
    if (typeof(str) == "string") {
        str = str.replace(/&amp;/g, "&");
        str = str.replace(/&quot;/g, "\"");
        str = str.replace(/&#039;/g, "'");
        str = str.replace(/&lt;/g, "<");
        str = str.replace(/&gt;/g, ">");
    }
    return str;
}


// ///////////////////////////////////////////////////
// ////////// fonction constructTable() //////////////
// ///////////////////////////////////////////////////
/**
 * public aOfGhibli is used to store all datas of Ghibli's anims
 * @var array
 */
var aOfGhibli=[];

/**
 * Parse array aOfGhibli and build table HTML
 */
function constructTable() {
    var sHTML= "<thead>";
    sHTML+= "<tr>";
    sHTML+= "<th>ID</th>";
    sHTML+= "<th>Titre</th>";
    sHTML+= "<th>Titre en Kanji</th>";
    sHTML+= "<th>Titre en Japonais</th>";
    sHTML+= "<th>Année</th>";
    sHTML+= "<th>Réalisateur</th>";
    sHTML+= "<th>Editer</th>";
    sHTML+= "<th>Supprimer</th>";
    sHTML+= "</tr>";
    sHTML+= "</thead>";
    sHTML+= "<tbody>";
    
    //boucle dans variable structurée pour récuperer les données
    for (var i=0; i<aOfGhibli.length; i++) {
        sHTML+= "<tr>";
        sHTML+= "<td>" + aOfGhibli[i]["id_anim"] + "</td>";
        sHTML+= "<td>" + aOfGhibli[i]["titre_anim"] + "</td>";
        sHTML+= "<td>" + aOfGhibli[i]["titre_kanji_anim"] + "</td>";
        sHTML+= "<td>" + aOfGhibli[i]["titre_japonais_anim"] + "</td>";
        sHTML+= "<td>" + aOfGhibli[i]["annee_anim"] + "</td>";
        sHTML+= "<td>" + aOfGhibli[i]["nom_realisateur"] + "</td>";
        sHTML+= "<td data-bs-toggle=\"modal\" data-bs-target=\"#Modal\" onClick=\"editAnime(" + i + ")\"><img class=\"imgEdit\" src=\"img/edit.png\" alt=\"edit\"></td>";
        sHTML+= "<td data-bs-toggle=\"modal\" data-bs-target=\"#Modal\" onClick=\"supprimAnim(" + i + ")\"><img class=\"imgDelete\" src=\"img/delete.png\" alt=\"delete\"></td>";
        sHTML+= "</tr>";
    }
    sHTML+= "</tbody>";
    
    //affichage du tableau dans la <section><table id="table_film">
    $("#table_anime").html(sHTML);
}
// ///////////////////////////////////////////////////


/**
 * Get Ghibli's anims from database
 *
 * if OK add Ghibli's anims to array aOfGhibli
 * if OK add director's name to array sHTMLSelect
 *
 * if OK then build table, build select and call datatable
 */
// ///////////////////////////////////////////////////
// ////////////// fonction loadAnim() ////////////////
// ///////////////////////////////////////////////////
function loadAnim() {
    // Affiche un GIF "chargement de la page"
    $("#working").show();

    var datas = {
        page : "liste_ghibli",
        bJSON : 1
    }

    $.ajax({
        type: "POST",
        url: "route.php",
        async: true,
        data: datas,
        dataType: "json",
        cache: false,
    })

    .done(function(result) {

        // create anim's table
        var iGhibli= 0;
        for (var ligne in result) {
            // je reconstruis mon tableau local en JS
            aOfGhibli[iGhibli]= [];
            aOfGhibli[iGhibli]["id_anim"]= result[ligne]["id_anim"];
            aOfGhibli[iGhibli]["titre_anim"]= result[ligne]["titre_anim"];
            aOfGhibli[iGhibli]["titre_kanji_anim"]= result[ligne]["titre_kanji_anim"];
            aOfGhibli[iGhibli]["titre_japonais_anim"]= result[ligne]["titre_japonais_anim"];
            aOfGhibli[iGhibli]["annee_anim"]= result[ligne]["annee_anim"];
            aOfGhibli[iGhibli]["nom_realisateur"]= result[ligne]["nom_realisateur"];
            iGhibli++;
        }
        
        // INIT DATATABLE :
        constructTable();
        tables = $("#table_anime").DataTable(configuration);

        // enlève le GIF "chargement de la page"
        $("#working").hide();
    })

    .fail(function(err) {
        // Affichage d'erreur
        alert("error : " + err.status);

        // enlève le GIF "chargement de la page"
        $("#working").hide();
    });
}
// ///////////////////////////////////////////////////


// ///////////////////////////////////////////////////
// ////////// fonction viderChampsInput() ////////////
// ///////////////////////////////////////////////////
// pour vider les champs input
/**
 * clear HTML Form
 * 
 */
function viderChampsInput() {
    // vide les champs input
    $("#ID_Anim").val("");
    $("#Titre").val("");
    $("#Kanji").val("");
    $("#Jap").val("");
    $("#Reali").val("");
    $("#Annee").val("");
}
// ///////////////////////////////////////////////////


// ///////////////////////////////////////////////////
// ///////// fonction afficheFormulaire() ////////////
// ///////////////////////////////////////////////////
function afficheFormulaire() {
    // vide les champs input
    viderChampsInput();

    //Titre modal
    $("#ModalLabel").html("Ajouter un nouvel animé");
    $(".modal-header").css({"background-color": "blue", "color": "white"});

    //Couleurs du footer
    $(".modal-footer").css({"background-color": "blue", "color": "white"});

    // Inputs du modal
    $("#modalText").html("<div id=\"input\" class=\"hide\"><p>ID# :<br> <input type=\"text\" name=\"ID_Anim\" id=\"ID_Anim\" readonly></p><p>Titre :<br><input type=\"text\" name=\"Titre\" id=\"Titre\"></p><p>Titre en kanji :<br><input type=\"text\" name=\"Kanji\" id=\"Kanji\"></p><p>Titre en Japonais :<br><input type=\"text\" name=\"Jap\" id=\"Jap\"></p><p>Réalisateur :<br><input type=\"text\" name=\"Reali\" id=\"Reali\"></p><p>Année :<br><input type=\"number\" name=\"Annee\" id=\"Annee\"></p></div>")


    //affiche les inputs, boutton 'confirmation ajouter' et 'annuler', cache message (eventuel) et autres bouttons confirmation
    $("#ID_Anim").val("ID_" + (parseInt(aOfGhibli[(aOfGhibli.length-1)]["id_anim"]) + 1));
    $("#input").show();
    $("#message").hide();
    $("#btn_confAjouter").show();
    $("#btn_termine").show();
    $("#btn_confEdit").hide();
    $("#btn_confSupp").hide();
}
// ///////////////////////////////////////////////////


/**
 * add an anim in database
 * 
 * build table and call datatable
 * 
 */
// ///////////////////////////////////////////////////
// ///////////// fonction ajoutAnim() ////////////////
// ///////////////////////////////////////////////////
function ajoutAnim() {
    // Affiche un GIF "chargement de la page"
    $("#working").show();
           
    var datas = {
        page : "save_ghibli",
        bJSON : 1,
        titre_anim: $("#Titre").val(),
        titre_kanji_anim: $("#Kanji").val(),
        titre_japonais_anim: $("#Jap").val(),
        annee_anim: $("#Annee").val(),
        nom_realisateur: $("#Reali").val(),
    }

    $.ajax({
        type: "POST",
        url: "route.php",
        async: true,
        data: datas,
        dataType: "json",
        cache: false,
    })

    .done(function(result) {
        if (result[0]["error"] != "") {
            // affiche un message d'erreur
            $("#message").show();
            $("#message").html("<img class=\"img_warning\" src=\"img/warning.png\" alt=\"attention\"></img>" + "Veuillez saisir tous les champs");
            // enlève le GIF "chargement de la page"
            $('#working').hide();
            // alert("Erreur lors de l'ajout de votre film. Vous allez être déconnecté.");
            // self.location.href= "route.php?page=logout";
        }  else  {
            var iLongueur= aOfGhibli.length;
            aOfGhibli[iLongueur]= [];
            aOfGhibli[iLongueur]["id_anim"]= result[0]["id_anim"];
            aOfGhibli[iLongueur]["titre_anim"]= $("#Titre").val();
            aOfGhibli[iLongueur]["titre_kanji_anim"]= $("#Kanji").val();
            aOfGhibli[iLongueur]["titre_japonais_anim"]= $("#Jap").val();
            aOfGhibli[iLongueur]["annee_anim"]= $("#Annee").val();
            aOfGhibli[iLongueur]["nom_realisateur"]= $("#Reali").val();

            // (re)creation du tableau DataTable
            creerDataTable();

            // vide les champs input
            viderChampsInput();

            // enlève les inputs du modal
            $("#modalText").html("");

            // hide buttons
            $("#btn_confAjouter").hide();
            $("#btn_termine").hide();
            
            // confirme ajout reussi
            $("#message").show();
            $("#message").html("<img class=\"img_warning\" src=\"img/validation.png\" alt=\"réussite\"></img>" + "Les données ont bien été ajoutées");

            // delais avant fermeture de la modal
            window.setTimeout(function() {
                $('#Modal').modal('hide');
            }, 3000);
             
            // enlève le GIF "chargement de la page"
            $("#working").hide();
        }
    })

    .fail(function(err) {
        // Affichage d'erreur
        alert("error : " + err.status);

        // affiche un message d'erreur
        $("#message").show();
        $("#message").html("<img class=\"img_warning\" src=\"img/warning.png\" alt=\"attention\"></img>" + "erreur, dans le '.fail'");


        // enlève le GIF "chargement de la page"
        $("#working").hide();

        // alert("Erreur lors de l'ajout de votre film. Vous allez être déconnecté.");
        // self.location.href= "route.php?page=logout"
    });   
}
// ///////////////////////////////////////////////////


/**
 * delete a movie in database
 * 
 * build table and call datatable
 * 
 */
// ///////////////////////////////////////////////////
// //////////// fonction supprimAnim() ///////////////
// ///////////////////////////////////////////////////
// variable pour garder en mémoire sur quel indice on agit
var iIndiceSuppr;
function supprimAnim(iIndiceSupp) {
    // mise en memoire de l'indice sur laquelle on agit
    iIndiceSuppr= iIndiceSupp;
    
    // vide les champs input
    viderChampsInput();

    //Titre modal et couleurs
    $("#ModalLabel").html("Supprimer un animé");
    $(".modal-header").css({"background-color": "red", "color": "white"});
    
    //Couleurs du footer
    $(".modal-footer").css({"background-color": "red", "color": "white"});

    //demande de confirmation avant d'effacer
    $("#message").html("<img class=\"img_warning\" src=\"img/warning.png\" alt=\"attention\"></img>" + "Êtes-vous sûr de VRAIMENT vouloir supprimer<br> « " + aOfGhibli[iIndiceSupp]["titre_anim"] + " » ?");  

    // affiche message, boutton 'confirmation supprimer' et 'annuler', cache les inputs et autres bouttons confirmation
    $("#input").hide();
    $("#message").show();
    $("#btn_confAjouter").hide();
    $("#btn_confEdit").hide();
    $("#btn_confSupp").show();
    $("#btn_termine").show();
}
// ///////////////////////////////////////////////////

// ///////////////////////////////////////////////////
// ////////// fonction confirmSuppAnime() ////////////
// ///////////////////////////////////////////////////
//pour effacer l'entrée selectionnée dans la variable structurée
function confirmSuppAnime() {
    // Affiche un GIF "chargement de la page"
    $("#working").show();

    var datas = {
        page : "supprime_ghibli",
        bJSON : 1, 
        id_anim: aOfGhibli[iIndiceSuppr]["id_anim"]
    }

    $.ajax({
        type: "POST",
        url: "route.php",
        async: true,
        data: datas,
        dataType: "json",
        cache: false,
    })

    .done(function(result) {
        if (result[0]["error"] != "") {
            // affiche un message d'erreur
            $("#message").show();
            $("#message").html("<img class=\"img_warning\" src=\"img/warning.png\" alt=\"attention\"></img>" + "erreur, données non éffacées");
            
            // enlève le GIF "chargement de la page"
            $("#working").hide();
            // alert("Erreur lors de la suppression de votre film. Vous allez être déconnecté.");
            // self.location.href= "route.php?page=logout"
        }  else  {
            for (var i=iIndiceSuppr; i<(aOfGhibli.length-1); i++)	{
                aOfGhibli[i]= aOfGhibli[i+1];
            }
            aOfGhibli.length--;
            // (re)creation du tableau DataTable
            creerDataTable();

            // vide les champs input
            viderChampsInput();

            // hide buttons
            $("#btn_confSupp").hide();
            $("#btn_termine").hide();

            // confirme suppression reussie
            $("#message").show();
            $("#message").html("<img class=\"img_warning\" src=\"img/validation.png\" alt=\"réussite\"></img>" + "Les données ont bien été effacées");

            // delais avant fermeture de la modal
            window.setTimeout(function() {
                $('#Modal').modal('hide');
            }, 2000);

            // enlève le GIF "chargement de la page"
            $("#working").hide();
        }
    })

    .fail(function(err) {
        // Affichage d'erreur
        alert("error : " + err.status);

        // affiche un message d'erreur
        $("#message").show();
        $("#message").html("<img class=\"img_warning\" src=\"img/warning.png\" alt=\"attention\"></img>" + "erreur, dans le '.fail'");


        // enlève le GIF "chargement de la page"
        $("#working").hide();

        // alert("Erreur lors de la suppression de votre film. Vous allez être déconnecté.");
        // self.location.href= "route.php?page=logout"
    });   
}
// ///////////////////////////////////////////////////

/**
 * Edit a Ghibli's anim to the form
 * 
 */
// ///////////////////////////////////////////////////
// ////////////// fonction editAnim() ////////////////
// ///////////////////////////////////////////////////
var iIndiceEditionEncours;
function editAnime(iIndiceEdition) {
    // mise en memoire de l'indice sur laquelle on agit
    iIndiceEditionEncours= iIndiceEdition;

    //Titre modal et couleur
    $("#ModalLabel").html("Modifier un animé");
    $(".modal-header").css({"background-color": "green", "color": "white"});

    //Couleurs du footer
    $(".modal-footer").css({"background-color": "green", "color": "white"});

    // Input du modal
    $("#modalText").html("<div id=\"input\" class=\"hide\"><p>ID# :<br> <input type=\"text\" name=\"ID_Anim\" id=\"ID_Anim\" readonly></p><p>Titre :<br><input type=\"text\" name=\"Titre\" id=\"Titre\"></p><p>Titre en kanji :<br><input type=\"text\" name=\"Kanji\" id=\"Kanji\"></p><p>Titre en Japonais :<br><input type=\"text\" name=\"Jap\" id=\"Jap\"></p><p>Réalisateur :<br><input type=\"text\" name=\"Reali\" id=\"Reali\"></p><p>Année :<br><input type=\"number\" name=\"Annee\" id=\"Annee\"></p></div>")

    //affiche les valeurs dans les inputs
    $("#ID_Anim").val(aOfGhibli[iIndiceEdition]["id_anim"]);
    $("#Titre").val(aOfGhibli[iIndiceEdition]["titre_anim"]);
    $("#Kanji").val(aOfGhibli[iIndiceEdition]["titre_kanji_anim"]);
    $("#Jap").val(aOfGhibli[iIndiceEdition]["titre_japonais_anim"]);
    $("#Annee").val(aOfGhibli[iIndiceEdition]["annee_anim"]);
    $("#Reali").val(aOfGhibli[iIndiceEdition]["nom_realisateur"]);

    //affiche les inputs, boutton 'confirmation editer' et 'annuler', cache message (eventuel) et autres bouttons confirmation
    $("#input").show();
    $("#message").hide();
    $("#btn_confAjouter").hide();
    $("#btn_confEdit").show();
    $("#btn_termine").show();
    $("#btn_confSupp").hide();
}
// ///////////////////////////////////////////////////
/**
 * Update a Ghibli's anim in database
 * 
 * build table and call datatable
 * 
 */
// ///////////////////////////////////////////////////
// ////////// fonction confirmEditAnime() ////////////
// ///////////////////////////////////////////////////
function confirmEditAnime() {
    // Affiche un GIF "chargement de la page"
    $("#working").show();

    var datas = {
        page : "update_ghibli",
        bJSON : 1, 
        id_anim: $('#ID_Anim').val(),
        titre_anim: $('#Titre').val(),
        titre_kanji_anim: $('#Kanji').val(),
        titre_japonais_anim: $('#Jap').val(),
        nom_realisateur: $('#Reali').val(),
        annee_anim: $('#Annee').val(),
    }

    $.ajax({
        type: "POST",
        url: "route.php",
        async: true,
        data: datas,
        dataType: "json",
        cache: false,
    })

    .done(function(result) {
        if (result[0]["error"] != "") {
            // enlève le GIF "chargement de la page"
            $("#working").hide();

            // affiche un message d'erreur
            $("#message").show();
            $("#message").html("<img class=\"img_warning\" src=\"img/refuse.png\" alt=\"erreur\"></img>" + "Données non editées<br>Veuillez à remplir tous les champs");
            // alert("Erreur lors de la modification de votre animé. Vous allez être déconnecté.");
            // self.location.href= "route.php?page=logout"
        }  else  {
            // récupère et remplace les nouvelles valeurs dans la variable stucturée
            aOfGhibli[iIndiceEditionEncours]["id_anim"]= $('#ID_Anim').val();
            aOfGhibli[iIndiceEditionEncours]["titre_anim"]= $('#Titre').val();
            aOfGhibli[iIndiceEditionEncours]["titre_kanji_anim"]= $('#Kanji').val();
            aOfGhibli[iIndiceEditionEncours]["titre_japonais_anim"]= $('#Jap').val();
            aOfGhibli[iIndiceEditionEncours]["annee_anim"]= $('#Annee').val();
            aOfGhibli[iIndiceEditionEncours]["nom_realisateur"]= $("#Reali").val();
        
            // (re)creation du tableau DataTable
            creerDataTable();

            // vide les champs input
            viderChampsInput();

            // enlève les inputs du modal
            $("#modalText").html("");

            // hide buttons
            $("#btn_confEdit").hide();
            $("#btn_termine").hide();
    
            // confirme edition reussi
            $("#message").show();
            $("#message").html("<img class=\"img_warning\" src=\"img/validation.png\" alt=\"réussite\"></img>" + "Les données ont bien été editées");

            // delais avant fermeture de la modal
            window.setTimeout(function() {
                $('#Modal').modal('hide');
            }, 2000);

            // enlève le GIF "chargement de la page"
            $("#working").hide();
        }
    })
    
    .fail(function(err) {
        // Affichage d'erreur
        alert("error : " + err.status);

        // affiche un message d'erreur
        $("#message").show();
        $("#message").html("<img class=\"img_warning\" src=\"img/warning.png\" alt=\"attention\"></img>" + "erreur, dans le '.fail'");

        // enlève le GIF "chargement de la page"
        $("#working").hide();

        // alert("Erreur lors de la modification de votre animé. Vous allez être déconnecté.");
        // self.location.href= "route.php?page=logout"
    });   
}
// ///////////////////////////////////////////////////


// ///////////////////////////////////////////////////
// //////////// CONFIGURATION DATATABLE //////////////
// ///////////////////////////////////////////////////
const configuration = 
{
    "stateSave": false,
    "order": [[0, "desc"]],
    "pagingType": "simple_numbers",
    "searching": true,
    "lengthMenu": [[5, 10, 25, 50, 100, -1], ["Cinq", "Dix", "Vingt-cinq", "Cinquante", "Cent", "La totalité"]], 
    "language": 
    {
        "info": "Films animés _START_ à _END_ sur _TOTAL_ sélectionnés",
        "emptyTable": "Aucun utilisateur",
        "lengthMenu": "_MENU_ films animés par page",
        "search": "Rechercher dans tableau : ",
        "zeroRecords": "Aucun résultat pour cette recherche",
        "paginate": 
        {
            "previous": "Précédent",
            "next": "Suivant"
        },
        "sInfoFiltered":   "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",
        "sInfoEmpty":      "Films 0 à 0 sur 0 sélectionné",
    },
    // ATTENTION : Une colonne sera cachée par la propriété 'columnDefs' qui suit...
    "columns": 
    [
        {
            "orderable": true
        },
        {
            "orderable": true
        },
        {
            "orderable": true
        },
        {
            "orderable": true
        },
        {
            "orderable": true
        },
        {
            "orderable": true
        },
        {
            "orderable": false
        },
        {
            "orderable": false
        }
    ],
    "columnDefs": 
    [
        {
            // The `data` parameter refers to the data for the cell (defined by the
            // `data` option, which defaults to the column being worked with, in
            // this case `data: 0`.
            "render": function ( data, type, row ) {
                return data +" ["+ row[4]+"]";
            },
            "targets": 1
        },
        // La colonne n'est plus affichée
        { "visible": false,  "targets": [ 4 ] }
    ],
    "retrieve": true
    // pour reproduire les fonctionnalités en haut et en bas (recherche, choix nbre d'élément, navigation)
    // "dom": "<'top'iflp<'clear'>>rt<'bottom'iflp<'clear'>>"

    
};
// ///////////////////////////////////////////////////
