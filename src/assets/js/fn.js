window._ = require('underscore');
window.numeral = require('numeral');
window.moment = require('moment');

$(document).ready(function(){
    var config = [];
    var json = [];

    $.getJSON(require("../../app.config.json"), function(data){
        config = data;
        $.fn.getTemplate(config);
    });

    $.getJSON(require("../../mock.json"), function(data){
        json = data;
    });

    $.fn.getTemplate = function(config){
        $.get("views/template.html?version=" + config.server.version , function(template){
            var html = "";
            $.each(config.libs, function(index, data){
                var tmp = template;
                $.each(data, function(field, value){
                    tmp = tmp.split("{{" + field + "}}").join(value);
                });
                html += tmp;
            });

            $.each(config.css, function(index, data){
                var tmp = template;
                $.each(data, function(field, value){
                    tmp = tmp.split("{{" + field + "}}").join(value);
                });
                html += tmp;
            });
            $("section").html(html);
        });
    };
});