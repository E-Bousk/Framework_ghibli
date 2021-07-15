#------------------------------------------------------------
#        Script MySQL.
#------------------------------------------------------------



#------------------------------------------------------------
# Table: anim
#------------------------------------------------------------

CREATE TABLE anim(
        id_anim             Int  Auto_increment  NOT NULL ,
        titre_anim          Varchar (80) NOT NULL ,
        titre_kanji_anim    Varchar (80) NOT NULL ,
        titre_japonais_anim Varchar (80) NOT NULL ,
        annee_anim          Year NOT NULL ,
        nom_realisateur     Varchar (80) NOT NULL ,
	CONSTRAINT anim_PK PRIMARY KEY (id_anim)
)ENGINE=InnoDB;

#------------------------------------------------------------
#------------------------------------------------------------
ALTER TABLE `anim` CHANGE `nom_realisateur` `nom_realisateur` VARCHAR(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL;
#------------------------------------------------------------
#------------------------------------------------------------
ALTER TABLE `anim` CHANGE `titre_kanji_anim` `titre_kanji_anim` VARCHAR(80) CHARACTER SET ujis COLLATE ujis_japanese_ci NOT NULL;
#------------------------------------------------------------
#------------------------------------------------------------
ALTER TABLE `anim` CHANGE `titre_japonais_anim` `titre_japonais_anim` VARCHAR(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL;
#------------------------------------------------------------
#------------------------------------------------------------


INSERT INTO anim (titre_anim, titre_kanji_anim, titre_japonais_anim, annee_anim, nom_realisateur)
 VALUES
 ("Le Château dans le ciel", "天空の城ラピュタ", "Tenkū no shiro Rapyuta", 1986, "Hayao Miyazaki"),
 ("Mon voisin Totoro", "となりのトトロ", "Tonari no Totoro", 1988, "Hayao Miyazaki"),
 ("Le Tombeau des lucioles", "火垂るの墓", "Hotaru no haka", 1988, "Isao Takahata"),
 ("Kiki la petite sorcière", "魔女の宅急便", "Majo no takkyūbin", 1989, "Hayao Miyazaki"),
 ("Souvenirs goutte à goutte", "おもひでぽろぽろ", "Omoiporo poro", 1991, "Isao Takahata"),
 ("Porco Rosso", "紅の豚", "Kurenai no buta", 1992, "Hayao Miyazaki"),
 ("Je peux entendre l'océan", "海がきこえる", "Umi ga kikoeru", 1993, "Tomomi Mochizuki"),
 ("Pompoko","平成狸合戦ぽんぽこ","Heisei tanuki gassen Ponpoko", 1994, "Isao Takahata"),
 ("Si tu tends l'oreille","耳をすませば","Mimi wo sumaseba", 1995, "Yoshifumi Kondō"),
 ("Princesse Mononoké","もののけ姫","Mononoke hime", 1997, "Hayao Miyazaki"),
 ("Mes voisins les Yamada","ホーホケキョ となりの山田くん","Hōhokekyo tonari no Yamada-kun", 1999, "Isao Takahata"),
 ("Le Voyage de Chihiro","千と千尋の神隠し","Sen to Chihiro no kamikakushi", 2001, "Hayao Miyazaki"),
 ("Le Royaume des chats","猫の恩返し","Neko no ongaeshi", 2002, "Hiroyuki Morita"),
 ("Le Château ambulant","ハウルの動く城","Hauru no ugoku shiro", 2004, "Hayao Miyazaki"),
 ("Les Contes de Terremer","ゲド戦記","Gedo senki", 2006, "Gorō Miyazaki"),
 ("Ponyo sur la falaise","崖の上のポニョ","Gake no ue no Ponyo", 2008, "Hayao Miyazaki"),
 ("Arrietty, le petit monde des chapardeurs","借りぐらしのアリエッティ","Karigurashi no Arietti", 2010, "Hiromasa Yonebayashi"),
 ("La Colline aux coquelicots","コクリコ坂から","Kokuriko zaka kara", 2011, "Gorō Miyazaki"),
 ("Le vent se lève","風立ちぬ","Kaze tachinu", 2013, "Hayao Miyazaki"),
 ("Le Conte de la princesse Kaguya","かぐや姫の物語","Kaguya-Hime no Monogatari", 2013, "Isao Takahata"),
 ("Souvenirs de Marnie","思い出のマーニー","Omoide no Marnie", 2014, "Hiromasa Yonebayashi"),
 ("La Tortue rouge","レッドタートル ある島の物語","Reddotātoru aru shima no monogatari", 2016, "Michael Dudok de Wit"),
 ("Aya et la Sorcière","アーヤと魔女","Âya to majo", 2020, "Gorō Miyazaki");

#------------------------------------------------------------
#------------------------------------------------------------

ALTER TABLE anim AUTO_INCREMENT = 1;