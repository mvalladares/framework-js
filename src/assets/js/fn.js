window._ = require('underscore');
window.numeral = require('numeral');
window.moment = require('moment');

$(document).ready(function () {
    var config = [];
    var json = [];

    $.getJSON(require("../../app.config.json"), function (data) {
        config = data;
        $.fn.getTemplate(config);
    });

    $.getJSON(require("../../mock.json"), function (data) {
        json = data;
    });

    $.fn.getTemplate = function (config) {
        $.get("views/menu/index.html?version=" + config.server.version, function (menu) {
            $.get("views/template.html?version=" + config.server.version, function (template) {
                var html = "";
                $.each(_.uniq(config.libs, function (uniq) { return uniq.type; }), function (index, data) {
                    var menuTmp = menu;
                    $.each(data, function (field, value) {
                        menuTmp = menuTmp.split("{{" + field + "}}").join(value);/*genera menu*/
                    });
                    html += menuTmp;
                });

                html =$.fn.htmlDiv(html, "col-lg-12 mbottom15 menu-nav");

                var htmlContent = "";
                $.each(config.libs, function (index, data) {
                    var tmp = template;
                    $.each(data, function (field, value) {
                        tmp = tmp.split("{{" + field + "}}").join(value);/*genera contenido*/
                    });
                    htmlContent += tmp;
                });
                html+= $.fn.htmlDiv(htmlContent, "col-lg-12 row");
                $("section").html(html);
            });
        });
    };



    /*acciones*/

    $(document).on("click", ".filterMenu", function(){
        $(".filterMenu").removeClass("active");
        $(this).addClass("active");
        $("[data-hide]").hide();
        $("[data-hide='" + $(this).data("search") + "']").show();
    });
});