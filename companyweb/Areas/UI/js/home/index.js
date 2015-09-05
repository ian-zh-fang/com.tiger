/// <reference path="../../../../Scripts/jquery-1.11.3.js" />

// 首页

$(document).ready(function () {
    if ($.fn.cssOriginal != undefined)
        $.fn.css = $.fn.cssOriginal;

    var
        fullwidthbanner = $("div.fullwidthbanner ul"),
        container = $("div#contentcontainer"),
        loadtops = function () {

            var
                count = 10,
                transition = 'boxfade',
                speed = 300,
                height = 492,
                bindRevolutionFunc = function () {
                    $('.fullwidthbanner').each(function () {
                        $(this).revolution({
                            delay: 10000,
                            startwidth: 1090,
                            startheight: 492,
                            onHoverStop: "on",
                            thumbWidth: 100,
                            thumbHeight: 50,
                            thumbAmount: 3,
                            hideThumbs: 0,
                            navigationType: "bullet",
                            navigationArrows: "solo",
                            navigationStyle: "round",
                            navigationHAlign: "center",
                            navigationVAlign: "bottom",
                            navigationHOffset: 0,
                            navigationVOffset: 20,
                            soloArrowLeftHalign: "left",
                            soloArrowLeftValign: "center",
                            soloArrowLeftHOffset: 20,
                            soloArrowLeftVOffset: 0,
                            soloArrowRightHalign: "right",
                            soloArrowRightValign: "center",
                            soloArrowRightHOffset: 20,
                            soloArrowRightVOffset: 0,
                            touchenabled: "on",
                            stopAtSlide: -1,
                            stopAfterLoops: -1,
                            hideCaptionAtLimit: 0,
                            hideAllCaptionAtLilmit: 0,
                            hideSliderAtLimit: 0,
                            fullWidth: "on",
                            shadow: 0,
                        });
                    });

                    /*-------------------------------------------------*/

                    $('.b-switch').on('click', function () {
                        $('.tp-rightarrow').trigger('click');
                    });
                },
                bindFunc = function () {

                    bindRevolutionFunc();

                    $("#flexiselDemo2").flexisel({
                        visibleItems: 5,
                        animationSpeed: 1000,
                        autoPlay: true,
                        autoPlaySpeed: 3000,
                        pauseOnHover: true,
                        enableResponsiveBreakpoints: true,
                        responsiveBreakpoints: {
                            portrait: {
                                changePoint: 480,
                                visibleItems: 1
                            },
                            landscape: {
                                changePoint: 640,
                                visibleItems: 2
                            },
                            tablet: {
                                changePoint: 768,
                                visibleItems: 3
                            }
                        }
                    });
                },
                renderFunc = function (data) {

                    var
                        html = '',
                        itemHTML,
                        templateHTML = '<li data-transition="${transition}" data-slotamount="${index}" data-masterspeed="${speed}">\
                                <img src="${ToppictureContent}" alt="${Title}" title="${Title}" height="${height}" />\
                        </li>';
                    $.each(data, function (i, e) {
                        e.index = i + 1;
                        e.transition = transition;
                        e.speed = speed;
                        e.height = height;

                        itemHTML = templateHTML;
                        for (var d in e) {
                            itemHTML = itemHTML.replace(new RegExp('\\$\\{' + d + '\\}', 'g'), e[d]);
                        }
                        html += itemHTML;
                    });

                    if (data.length > 0) {

                        fullwidthbanner
                            .append(html);

                        bindFunc();
                    }
                },
                loadFunc = function () {
                    $.getJSON("/api/service/tops", { count: count }, renderFunc);
                },
                renderProAndService = function (data) {

                    var
                        html = '',
                        itemHTML = '',
                        templateHTML = '<div class="four columns identity">\
                                            <div class="work">\
                                                <a href="/UI/Home/Detail/${Id}" class="work-image">\
                                                    <img src="${ThumbnailContent}" alt="${Title}" title="${Title}">\
                                                    <div class="link-overlay fa fa-chevron-right"></div>\
                                                </a>\
                                                <div class="tags" style="margin-top:10px;">\
                                                    <strong>${Title}</strong>\
                                                </div>\
                                            </div>\
                                        </div>';

                    $.each(data, function (i, e) {
                        itemHTML = templateHTML;
                        for (var d in e) {
                            itemHTML = itemHTML.replace(new RegExp('\\$\\{' + d + '\\}', 'g'), e[d]);
                        }
                        html += itemHTML;
                    });

                    container
                        .append(html);

                },
                loadProAndService = function () {
                    $.getJSON("/api/service/toppros", { count: 4 }, renderProAndService);
                };

            this.load = loadFunc;
            this.loadPro = loadProAndService;
        },
        loader = new loadtops();

    loader.load();
    loader.loadPro();
});