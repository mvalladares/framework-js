$(document).ready(function () {
    $.fn.getClearfix = function(qty){
        var html = "";
        for(var i = 0; i < qty; i++){
            html+= "<div class='clearfix'></div>";
        }
        return html;
    };

    $.fn.htmlDiv = function(html, css){
        return "<div class='" + css + "'>" + html + "</div>";
    };
});