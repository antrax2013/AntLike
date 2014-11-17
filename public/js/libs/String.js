/*! String
 * Copyright (c) 2014 AntProduction
 * http://antproduction.free.fr
 *
 * GPL license:
 *   http://www.gnu.org/licenses/gpl.html
 *
 * Contributor: antrax2013@hotmail.com
 *
 */

String.prototype.IsNullOrWhiteSpace = function () {
    /// <summary>
    /// Méthode permettant de savoir si une chaine est vide c'est à dire null, undefined ou composée d'espaces
    /// </summary>
    /// <remark>Decpréciée utiliser plutot String.IsNullOrWhiteSpace() car plante si this est null ou undefined</remark>

    return this == "" || this == null || this == undefined ||  String.trim(this).length == 0;
}

String.IsNullOrWhiteSpace = function (chaine) {
    /// <summary>
    /// Méthode permettant de savoir si une chaine est vide c'est à dire null, undefined ou composée d'espaces
    /// </summary

    var retour = (chaine == "" || chaine == null || chaine == undefined);

    if (!retour) return String.trim(chaine).length == 0;
    return retour;
}


String.prototype.WithoutAccent = function () {
    /// <summary>
    /// Méthode remplaçant les caractères accentués, ou caractère spéciaux, par leur équivalent en lettres "normales"
    /// </summary>

    var s = this;
    var rules = {
        'a': /[àáâãäå]+/gi,
        'ae': /[æ]+/gi,
        'c': /[ç]+/gi,
        'e': /[èéêë]+/gi,
        'i': /[ìíîï]+/gi,
        'n': /[ñ]+/gi,
        'o': /[òóôõöø]+/gi,
        'oe': /[œ]+/gi,
        'u': /[ùúûü]+/gi,
        'y': /[ýÿ]+/gi,
        /*'_': /[\s\']+/gi,*/
        'th': /[ðþ]+/gi,
        'ss': /[ß]/gi
    };
    for (var r in rules) s = s.replace(rules[r], r);
    return s;
}


String.prototype.trim = function () {
    /// <summary>
    /// Méthode retirant les espaces en début et en fin de chaine
    /// </summary>

    return String.trim(this);
}

String.trim = function (chaine) {
    /// <summary>
    /// Méthode retirant les espaces en début et en fin de chaine
    /// </summary>
    try {
        return chaine.replace(/^\s+|\s+$/g, '');
    }
    catch (ex) {
        return chaine;
    }
}

String.prototype.HtmlDecode = function () {
    /// <summary>
    /// Méthode permettant un affichage correct par javascript d'une chaine de cractères issues des ressources
    /// </summary>

    var value = this;
    if (!String.IsNullOrWhiteSpace(value)) {
        String.trim(this);
        return $("<div />").html(value).text();
    }
    return "";
}


String.prototype.idToSelector = function () {
    /// <summary>
    /// Méthode ajoutant un "#" à un idHtml pour l'utiliser en jQuery
    /// </summary>

    var chaine = this.trim();
    return chaine.indexOf("#") != 0 ? "#" + chaine : chaine;
}


String.prototype.isEmail = function () {
    /// <summary>
    /// Méthode permettant de vérifier qu'une chaine est une adresse email correctement formattée
    /// </summary>

    return (this.trim().search("^[a-z0-9._-]+@[a-z0-9.-]{2,}[.][a-z]{2,3}$") != -1);
}


String.format = function (chaine) {
    /// <summary>
    /// Méthode équvalent au string.Format du C#
    /// </summary>

    //Boucle sur les arguments
    for (var i = 1; i < arguments.length; i++) {

        var regEx = new RegExp("\\{" + (i - 1) + "\\}", "gm");
        chaine = chaine.replace(regEx, arguments[i]);
    }
    return chaine;
}


String.prototype.JsonDateToDateTime = function () {
    /// <summary>
    /// Méthode transformant une date Json en datetime
    /// </summary>

    return new Date(this.match(/\d+/)[0] * 1);
}


String.prototype.contains = function (str, caseSensitive) {
    /// <summary>
    /// Méthode permettant de verifier qu'une chaine se commence par la sous chaine passée en paramétre
    /// </summary>
    /// <param name="str" type="String">La sous chaine</param>
    /// <param name="caseSensitive" type="boolean">Active ou non l'option case sensitive</param>
    var src = this;
    var tmp = str;

    if (caseSensitive == true) {
        src = src.toLowerCase();
        tmp = tmp.toLocaleLowerCase();
    }


    return src.indexOf(tmp) != -1;
}

String.prototype.startsWith = function (str, caseSensitive) {
    /// <summary>
    /// Méthode permettant de verifier qu'une chaine se commence par la sous chaine passée en paramétre
    /// </summary>
    /// <param name="str" type="String">La sous chaine</param>
    /// <param name="caseSensitive" type="boolean">Active ou non l'option case sensitive</param>
    var src = this;
    var tmp = str;

    if (caseSensitive == true) {
        src = src.toLowerCase();
        tmp = tmp.toLocaleLowerCase();
    }

    return src.indexOf(tmp) == 0;
}

String.prototype.endsWith = function (str, caseSensitive) {
    /// <summary>
    /// Méthode permettant de verifier qu'une chaine se termine par la sous chaine passée en paramétre
    /// </summary>
    /// <param name="str" type="String">La sous chaine</param>
    /// <param name="caseSensitive" type="boolean">Active ou non l'option case sensitive</param>
    var src = this;
    var tmp = str;
    var position = this.length - str.length;

    if (caseSensitive == true) {
        src = src.toLowerCase();
        tmp = tmp.toLocaleLowerCase();
    }

    return src.lastIndexOf(tmp) == position;
}