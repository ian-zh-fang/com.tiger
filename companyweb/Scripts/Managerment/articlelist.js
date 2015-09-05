/// <reference path="../jquery-1.11.3.js" />
/// <reference path="../jqueryextenion.js" />
/// <reference path="../uploadify/jquery.uploadify.js" />
/// <reference path="../tinymce/tinymce.js" />
/// <reference path="../globalvariables.js" />

$(document).ready(function () {

    var
        currentarticleid        = 0,
        requestcount            = 10,
        $body                   = $("body"),
        listcontrainer          = $("div#listcontrainer"),
        listcontentmore         = $("div#listcontentmore"),
        listcontentno           = $("div#listcontentno"),
        articlecategory         = $("input[type=hidden]#articlecategory"),
        contentbtnadd           = $(":button#contentbtnadd"),
        contentbtndel           = $(":button#contentbtndel"),
        articlecate             = articlecategory.val(),
        renderlistFunc          = function (content) {

            var
                itemHTML = '',
                itemTemplate,
                defaults = {
                    Id: 0,
                    Code: "",
                    Title: "",
                    Publishstatus: 0,
                    Publishtext: "",
                    Authenticstatus: "0000",
                    Category: ""
                };

            itemTemplate = '<div class="listitem">\
                                <div class="listitemcheck">\
                                    <input type="checkbox" id="listitemcheck_${Id}" value="${Id}" />\
                                </div>\
                                <div class="listitemcontent">\
                                    <label for="listitemcheck_${Id}">\
                                        <a href="/Managerment/Detail/${Id}" target="_blank" >${Title}</a>\
                                    </label>\
                                </div>\
                                <sub status="${Authenticstatus}">${Publishtext}</sub>\
                                <sub>\
                                    <a onclick="javascript:return checkeditauthenticstate(\'${Authenticstatus}\')" href="/Managerment/Add?cate=${Category}&code=${Code}&single=false&tag=' + _normaltag + '">编辑</a>\
                                </sub>\
                                <sub>\
                                    <a onclick="javascript:return checkapplyauthenticstate(\'${Authenticstatus}\')" href="/api/service/apply?id=${Id}&cate=' + articlecate + '">申请审核</a>\
                                </sub>\
                                <sub>\
                                    <a onclick="javascript:return checkpublishauthenticstate(\'${Authenticstatus}\')" href="/api/service/pub?id=${Id}&cate=' + articlecate + '">发布</a>\
                                </sub>\
                                <sub>\
                                    <a onclick="javascript:return checkunpublishauthenticstate(\'${Authenticstatus}\')" href="/api/service/unpub?id=${Id}&cate=' + articlecate + '">撤回</a>\
                                </sub>\
                            </div>';

            $.extend(defaults, content);

            if (defaults.Id > currentarticleid)
                currentarticleid = defaults.Id;

            itemHTML = itemTemplate;
            for (var d in defaults) {
                itemHTML = itemHTML.replace(new RegExp('\\$\\{' + d + '\\}', 'g'), defaults[d]);
            }

            listcontrainer.append(itemHTML);
        },
        contentlistFunc         = function () {
            $.getJSON("/api/service/list", { cate: articlecate, id: currentarticleid, count:requestcount }, function (data) {
                if (data.length < requestcount) {
                    listcontentmore.hide();
                    listcontentno.show();
                }

                $.each(data, function (index, e) {
                    renderlistFunc(e);
                })
            });
        },
        contenteditFunc         = function (code) {

            window.location.href = "/Managerment/Add?code=&single=false&tag=" + _normaltag + "&cate=" + articlecate;
        },
        contentitemdelFunc      = function () {

            var
                ids,
                itemselects;

            if (contentbtndel.confirm({ msg: "注意: 被删除的内容将不再显示, 是否删除选中的内容 ?" })) {
                ids = [];
                itemselects = $(":checked");
                $.each(itemselects, function (index, e) {
                    ids.push($(e).val());
                });

                $.getJSON("/api/service/del", { ids: ids }, function (data) {

                    window.location.reload(true);
                });
            }
        };
    
    contentbtnadd
        .click(contenteditFunc);

    contentbtndel
        .click(contentitemdelFunc);

    listcontentmore
        .click(contentlistFunc);

    //初始化加载数据
    listcontentmore
        .trigger("click");

});