/// <reference path="../jquery-1.11.3.js" />
/// <reference path="../jqueryextenion.js" />
/// <reference path="../globalvariables.js" />

$(document).ready(function () {

    var
        listcontrainer = $("div#listcontrainer"),
        listcontentmore = $("div#listcontentmore"),
        listcontentno = $("div#listcontentno"),
        dataLoader = function () {
            var
                _this = this,
                id = 0,
                count = 10,
                templateHTML = '<div class="listitem">\
            <div class="listitemcheck">\
                <input type="checkbox" id="listitemcheck_${Id}" value="${Id}" />\
            </div>\
            <div class="listitemcontent">\
                <label for="listitemcheck_${Id}">\
                    <a href="/Managerment/Detail/${Id}" target="_blank">${Title}</a>\
                </label>\
            </div>\
            <sub status="${Category}">${CategoryText}</sub>\
            <sub status="${Authenticstatus}">${Publishtext}</sub>\
            <sub>\
                <a onclick="javascript:return checkauditeauthenticstate(\'${Authenticstatus}\')" href="/api/service/success?id=${Id}">审核</a>\
            </sub>\
            <sub>\
                <a onclick="javascript: return checkauditefailedauthenticstate(\'${Authenticstatus}\')" href="/api/service/failed?id=${Id}">驳回</a>\
            </sub>\
        </div>',
                renderFunc = function (data) {

                    var
                        html = '',
                        itemHTML;

                    $.each(data, function (i, e) {
                        id = e.Id;
                        itemHTML = templateHTML;
                        for (var d in e) {
                            itemHTML = itemHTML.replace(new RegExp('\\$\\{' + d + '\\}', 'g'), e[d]);
                        }

                        html += itemHTML;
                    });

                    listcontrainer.append(html);

                    if (data.length < count) {
                        listcontentmore.hide();
                        listcontentno.show();
                    }
                },
                loadFunc = function () {
                    $.getJSON("/api/service/audites", { id: id, count: count }, renderFunc);
                };

            _this.load = loadFunc;
            return _this;
        },
        loader = new dataLoader();

    listcontentmore.click(loader.load);
    listcontentmore.trigger('click');
});