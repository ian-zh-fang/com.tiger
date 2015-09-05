/// <reference path="../jquery-1.11.3.js" />
/// <reference path="../regexps.js" />

$(document).ready(function () {

    var
        form            = $("form#form"),
        formcontent     = $("div#formcontent"),
        msg             = $("div#formmessage"),
        innerHeight     = $(document).innerHeight(),
        formHeight      = formcontent.outerHeight(),
        usernamereg     = _usernamereg,
        pwdreg          = _pwdreg,
        username        = $("input#username[type=text]"),
        formvalid       = function () {
            
            var
                password    = $("input#password[type=password]"),
                namevalue   = username.val(),
                pwdvalue    = password.val(),
                valid       = namevalue && pwdvalue && usernamereg.test(namevalue) && pwdreg.test(pwdvalue);

            if (!valid) {
                msg.text("数据格式错误,请重新输入。");
                valid = false;
                username.select();
            }

            return valid;
        };
        
    formcontent
        .css("margin-top", (innerHeight - formHeight) / 2 + "px");

    form
        .submit(formvalid);

    username
        .select();
});