/// <reference path="../../../../Scripts/jquery-1.11.3.js" />

$(document).ready(function () {

    var
        listitemcontainer = $("div#listitemcontainer"),
        categorycontainer = $("input[type=hidden]#category"),
        listcontentmore = $("div#listcontentmore"),
        listcontentno = $("div#listcontentno"),
        loadfn = function () {
            var
                id = 0,
                count = 10,
                cate = categorycontainer.val(),
                renderFunc = function (data) {
                    var
                        html = '',
                        itemHTML = '',
                        templateHTML = '<div class="row-item eight columns identity" style="width:30%; height:288px;">\
                                            <div class="work">\
                                                <a href="/UI/Home/Detail/${Id}" class="work-image" target="_blank">\
                                                    <img src="${ThumbnailContent}" alt="${Title}" title="${Title}" style="height:185px;" />\
                                                    <div class="link-overlay fa fa-chevron-right"></div>\
                                                </a>\
                                                <div class="tags" style="margin-top:10px;">${Title}</div>\
                                            </div>\
                                        </div>';
                    
                    if (count > data.length) {
                        listcontentmore.hide();
                        listcontentno.show();
                    }

                    $.each(data, function (i, e) {
                        if (e.Id > id)
                            id = e.id;

                        itemHTML = templateHTML;
                        for (var d in e) {
                            itemHTML = itemHTML.replace(new RegExp('\\$\\{' + d + '\\}', 'g'), e[d]);
                        }
                        html += itemHTML;
                    });

                    listitemcontainer
                        .append(html);
                },
                loadFunc = function () {
                    $.getJSON("/api/service/listpic", { id: id, count: count, cate: cate }, renderFunc);
                };

            this.load = loadFunc;
        },
        loader = new loadfn();

    listcontentmore
        .click(loader.load);

    listcontentmore
        .trigger('click');
});