/// <reference path="../../../../Scripts/jquery-1.11.3.js" />

// 产品及服务

$(document).ready(function () {

    var
        categorycom = $("input[type=hidden]#category"),
        contentlistcontainer = $("div#contentlistcontainer"),
        listcontentmore = $("div#listcontentmore"),
        listcontentno = $("div#listcontentno"),
        loadfn = function () {
            var
                id = 0,
                count = 10,
                cate = categorycom.val(),
                renderFunc = function (data) {

                    var
                        html = '',
                        itemHTML = '',
                        templateHTML = '<div class="nClear" style="margin-top:15px;">\
                                            <div style="border-bottom:1px dashed #ededed; margin-bottom:5px;">\
                                                <h4>${Title}</h4>\
                                            </div>\
                                            <div class="contentlistitemimg">\
                                                <img src="${ThumbnailContent}" title="${Title}" alt="${Title}" style="width:100%; height:100%;" />\
                                            </div>\
                                            <div class="contentlistitem">${Contenteditor}</div>\
                                        </div>';

                    if (count > data.length) {
                        listcontentmore
                            .hide();

                        listcontentno
                            .show();
                    }

                    $.each(data, function (i, e) {
                        itemHTML = templateHTML;
                        for (var d in e) {
                            itemHTML = itemHTML.replace(new RegExp('\\$\\{' + d + '\\}', 'g'), e[d]);
                        }
                        html += itemHTML;
                    });

                    contentlistcontainer
                        .append(html);
                },
                loadFunc = function () {
                    $.getJSON("/api/service/listpic", { id: id, count: count, cate: cate }, renderFunc);
                }

            this.load = loadFunc;
        },
        loader = new loadfn();

    listcontentmore
        .click(loader.load);

    listcontentmore
        .trigger('click');
});