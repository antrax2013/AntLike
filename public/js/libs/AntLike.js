/*! AntLike button V1.0
 * Copyright (c) 2014 AntProduction
 * http://antproduction.free.fr/AntLike
 * https://github.com/antrax2013/AntLike
 *
 * GPL license:
 *   http://www.gnu.org/licenses/gpl.html
 *
 * Contributor: antrax2013@hotmail.com
 *
 */
;(function ($) {
    $.fn.AntLike = function (options) {

        var basicClick = function ($cible, likeVm, method) {
            if(likeVm.userLike) {
                likeVm.userLike = false;
                likeVm.nbLikes--;
            }
            else {
                likeVm.userLike = true;
                likeVm.nbLikes++;
            }
            if(typeof (method) == 'function') method($cible, likeVm);
        }

        //Définition des paramétres par défaut
        var defauts =
        {
            HtmlContent : '<img class="iconAntLike" data-like="" /><span class="AntLikeValue">0</span>',
            like: {
                image: "../public/images/antLike/{0}/like.png",
                alt: "Like",
                title: "Like",
                like: true
            },
            unlike: {
                image: "../public/images/antLike/{0}/unlike.png",
                alt: "Unlike",
                title: "Unlike",
                like: false
            },
            nbLikes: 0,
            events:{
                onClick: {
                    url:null,
                    async: true,
                    action : function($cible, likeVm, url, method, async) {
                        if(String.IsNullOrWhiteSpace(url)) {
                            basicClick($cible, likeVm, method);
                        }
                        else {
                            basicClick($cible, likeVm, null);
                            $.ajax({
                                cache: false,
                                type: 'POST',
                                async: async,
                                dataType: "json",
                                contentType: "application/json; charset=utf-8",
                                url: url,
                                data: JSON.stringify({data:likeVm}),
                                success: function (data) {
                                    if (!String.IsNullOrWhiteSpace(data)) {
                                        if(!String.IsNullOrWhiteSpace(data.d)) {
                                            data = data.d;
                                        }
                                        method($cible, data);
                                    }
                                }
                            });
                        }

                    }
                },
                onLoad: {
                    enabled: false,
                    url:null,
                    action: function($cible, info, url, method) {
                        $.ajax({
                            cache: false,
                            type: 'POST',
                            async: true,
                            dataType: "json",
                            contentType: "application/json; charset=utf-8",
                            url: url,
                            data: "{'data':" + info + "}",
                            success: function (data) {
                                if (!String.IsNullOrWhiteSpace(data)) {
                                    if(!String.IsNullOrWhiteSpace(data.d)) {
                                        data = data.d;
                                    }
                                    method($cible, data);
                                }
                            }
                        });
                    }
                }
            },
            readOnly: "false",
            state: null,
            style: "basic",
            userLike: false
        };

        //Lecture des paramétres et fusion avec ceux par défaut
        var parametres = $.extend(true, defauts, options);


        if (typeof String.IsNullOrWhiteSpace === 'undefined') {
            throw "$.fn.AntLike - Error: String.js not loaded.";
        }

        parametres.like.image = String.format(parametres.like.image, parametres.style);
        parametres.unlike.image = String.format(parametres.unlike.image, parametres.style);

        return this.each(function () {
            var $$ = $(this); //conservation de l'élément
            //insertion dans le dom
            $$.addClass('hidden').html(parametres.HtmlContent).addClass("blocAntLike unlike hidden");

            //Initialisation
            if (parametres.events.onLoad.enabled == true && parametres.readOnly!= false) {
                if (typeof (parametres.events.onLoad.action) == 'function') {
                    parametres.events.onLoad.action($$, { "userLike": parametres.userLike, "nbLikes": parametres.nbLikes }, parametres.events.onLoad.url, initialisation);
                }
            }
            else {
                var like = false;
                try { like = parametres.userLike == true }
                catch (e) { }

                initialisation($$, { "userLike": like, "nbLikes": parametres.nbLikes });
            }

            //Permet via un trigger de modifier les valeurs et ainsi mettre à jour l'affichage
            //usage: .trigger("AntLike.updateParametres", { "userLike": true, "nbLikes": 56 });
            $$.on('AntLike.update', function (e, likeVm) {
                updateParametres($(this), likeVm);
            });

            function initialisation($cible, likeVm) {
                /// <summary>
                ///  Méthode initialisant le plugIn
                /// </summary>

                updateParametres($cible, likeVm);

                //Mise en place de la gestion d'événements
                if (parametres.readOnly.toString().toLowerCase() == "false") {
                    addEvents($cible);
                }
                else {
                    $cible.css("cursor", "auto");
                }
                $cible.removeClass('hidden');

                return this;
            }

            function addEvents($cible) {
                /// <summary>
                ///  Méthode ajoutant les événements
                /// </summary>

                //On bind le click
                $cible.unbind("click").bind("click", function () {
                    if (typeof (parametres.events.onClick.action) == 'function') {
                        parametres.events.onClick.action($cible, {"userLike": parametres.userLike, "nbLikes": parametres.nbLikes }, parametres.events.onClick.url, updateParametres, parametres.events.onClick.async);
                    }
                });

                //Gestion du survol
                $cible.unbind("hover").hover(
                    function () {
                        changeState($cible, parametres.state.like ? parametres.unlike : parametres.like);
                    },
                    function () {
                        changeState($cible, parametres.state);
                    }
                );
            }

            function updateParametres($cible, likeVm) {
                /// <summary>
                ///  Méthode gérant la mise à jour des paramétres de l'objet
                /// </summary>
                /// <param name="$cible" type="Handdle jQuery">Handdle sur la cible</param>
                /// <param name="state" type="Objet JSon">L'état de destination</param>
                parametres.nbLikes = likeVm.nbLikes;
                parametres.userLike = likeVm.userLike.toString().toLowerCase()=="true" || likeVm.userLike.toString()=="1";
                parametres.state = parametres.userLike ? parametres.like : parametres.unlike;

                changeState($cible, parametres.state);
                $("span.AntLikeValue", $cible).text(likeVm.nbLikes);
            }

            function changeState($cible, state) {
                /// <summary>
                ///  Méthode gérant le changement d'état de l'objet
                /// </summary>
                /// <param name="$cible" type="Handdle jQuery">Handdle sur la cible</param>
                /// <param name="state" type="Objet JSon">L'état de destination</param>

                $("img.iconAntLike", $cible).attr("src", String.format(state.image, parametres.style));
                $cible.attr("alt", state.alt).attr("title", state.title);

                if(parametres.style != "basic") $cible.addClass(parametres.style);

                if (state.like) $cible.removeClass("unlike");
                else $cible.addClass("unlike");
            }
        });
    }

})(jQuery);
