/// <reference path="../jquery-1.11.3.js" />
/// <reference path="../jqueryextenion.js" />
/// <reference path="../uploadify/jquery.uploadify.js" />
/// <reference path="../tinymce/tinymce.js" />
/// <reference path="../globalvariables.js" />

//单页面列表脚本文件

$(document).ready(function () {

    var
        contentbtnedit      = $(":button#contentbtnedit"),
        datacontentcode     = $("input[type=hidden]#datacontentcode"),
        datacontentcate     = $("input[type=hidden]#datacontentcate"),
        datacontenttag      = $("input[type=hidden]#datacontenttag"),
        codevalue           = datacontentcode.val(),
        catevalue           = datacontentcate.val(),
        tagvalue            = datacontenttag.val();

    contentbtnedit
        .click(function () {
            window.location.href = "/Managerment/Add?code=" + codevalue + "&single=true&tag=" + tagvalue + "&cate=" + catevalue;
        });
});