
$(document).ready(function () {
    var config = [];
    var json = [];
    $.getJSON(require("../../app.config.json"), function (data) {
        config = data;
        $.fn.getForm(config.forms);
        $.fn.getSelect(config.formValidate);
    });

    $.fn.getForm = (forms) => {
        var espacios = 0;
        $("forms").empty();
        $.get("views/global/_form.html", (formTemplate) => {
            $.get("views/global/_input.html", (template) => {
                $.each(forms, (index, data) => {
                    espacios++;
                    var messages = {};
                    var tmpForm = formTemplate;
                    var content = "";
                    $.each(data, (field, value) => {
                        tmpForm = tmpForm.split("{{" + field + "}}").join($.fn.getFormat(field, value));
                    });

                    $.each(data.fields, (_index, _data) => {
                        messages[_data.id] = _data.message;
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
                    $("#" + data.id).validate({
                        submitHandler: (form) => {
                            console.log("envia Ajax");
                        },
                        "messages": messages
                    });
                });
            });
        });
    };


    $.fn.getFormat = (field, value) => {
        return value;
    };

    $.fn.getSelect = (forms) => {
        $.each(forms, (index, data) => {
            $("#slcForms").append("<option value='" + data.id + "'>" + data.title + "</option>");
        });
    };

    $.fn.setFormValidate = (fields) => {
        if (fields.length == 0) {
            return false;
        }

        $.each(config.forms[0].fields, (index, data)=>{
            $("[name='" + data.name + "']").attr("required", data.required).closest("div").show();
        });

        $.each(fields[0].fields, (index, data) => {
            $("[name='" + data.name + "']").closest("div")[data.show]();
            if(data.required == "required"){
                $("[name='" + data.name + "']").attr("required", data.required);
            }else{
                $("[name='" + data.name + "']").removeAttr("required");
            }
        });
    };

    $(document).on("change", "#slcForms", function () {
        var $this = $(this);
        $.fn.setFormValidate(_.filter(config.formValidate, (filter) => { return filter.id == $this.val(); }));
    });
});