
$(document).ready(function () {
    var config = [];
    var json = [];

    $.getJSON(require("../../app.config.json"), function (data) {
        config = data;
        $.fn.getForm(config.forms);
        $.fn.getSelect(config.forms);
    });

    $.fn.getForm = (forms) => {
        var espacios = 0;
        $("forms").empty();
        $.get("views/global/_form.html", (formTemplate) => {
            $.get("views/global/_input.html", (template) => {
                $.each(forms, (index, data) => {
                    espacios++;
                    var tmpForm = formTemplate;
                    var content = "";
                    tmpForm = tmpForm.split("{{title}}").join($.fn.getFormat("title", data.title));
                    $.each(data.fields, (_index, _data) => {
                        var tmp = template;
                        $.each(_data, (field, value) => {
                            tmp = tmp.split("{{" + field + "}}").join($.fn.getFormat(field, value));
                        });
                        content += tmp;
                    });

                    tmpForm = tmpForm.split("{{content}}").join(content);
                    if (espacios > 5) {
                        tmpForm = tmpForm + $.fn.getClearfix(1);
                        espacios = 0;
                    }
                    $("forms").append(tmpForm);
                });
            });
        });
    };

    $.fn.getFormat = (field, value) => {
        switch (field) {
            case "validate":
                return value ? "has-warning" : "has-success";
            case "active":
                return value ? "" : "hide";
            default:
                return value;
        }
    };

    $.fn.getSelect = (forms) => {
        $.each(forms, (index, data) => {
            $("#slcForms").append("<option value='" + data.category + "'>" + data.title + "</option>");
        });
    };

    $(document).on("change", "#slcForms", function () {
        var $this = $(this);
        $.fn.getForm(_.filter(config.forms, (filter) => { return filter.category == $this.val(); }));
    });

});