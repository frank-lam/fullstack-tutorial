(function () {
    // Functions
    // =========================================================================
    /**
     * Adds event listeners to change active stylesheet and restore previously
     * activated stylesheet on reload.
     *
     * @example
     *
     * This link:
     *   <a href="#" data-link-title="Foo">Foo</a>
     * Will active this existing link:
     *   <link rel="stylesheet alternate" title="Foo" href="..." >
     *
     * @example
     *
     * This link:
     *   <a href="#" data-link-href="path/to/file.css">Bar</a>
     * Will activate this existing link:
     *   <link rel="stylesheet alternate" title="[someID]" href="path/to/file.css" >
     * Or generate this active link:
     *   <link rel="stylesheet" title="Bar" href="path/to/file.css" >
     */

    function imgAdd2() {
        var imgs = document.querySelectorAll('.content img');
        // var imgs = document.getElementsByTagName('medium-zoom-image');
        for (let j = 0; j < imgs.length; j++) {
            // console.log('zheshi')
            let img = imgs[j];
            // console.log(img);
            if (img.src) {
                console.log(img.src);
                if (!img.getAttribute('hadassets')) {
                    let hasharr = window.location.hash.split('/');
                    // console.log(hasharr);
                    let origin = window.location.origin;
                    img.setAttribute('hadassets', 1);
                    var hasharrPath = "";
                    for(var i = 1; i < hasharr.length - 1 ; i++){
                        hasharrPath += hasharr[i] + "/";
                    }
                    img.src = origin + '/' + hasharrPath  + img.src.substring(origin.length + 1);
                    // img.src = origin + '/' + hasharrPath  + img.src;
                }
            }
        }
    }

    function imgAdd() {
        var imgs = document.querySelectorAll('.markdown-section img');
        // var imgs = document.getElementsByTagName('medium-zoom-image');

        for (let j = 0; j < imgs.length; j++) {
            // console.log('zheshi')
            let img = imgs[j];
            // console.log(img);
            if (img.src) {
                console.log(img.src);
                if (!img.getAttribute('hadassets')) {
                    let hasharr = window.location.hash.split('/');
                    // console.log(hasharr);
                    let origin = window.location.origin;
                    img.setAttribute('hadassets', 1);
                    var hasharrPath = "";
                    for(var i = 1; i < hasharr.length - 1 ; i++){
                        hasharrPath += hasharr[i] + "/";
                    }
                    
                    // img.src = origin + '/' + hasharrPath  + img.src.substring(origin.length + 1);
                    var imgSrc = img.getAttribute("src");
                    if(!imgSrc.includes(hasharrPath)){
                        img.setAttribute("src", hasharrPath  + imgSrc);
                    }
                    // img.src = origin + '/' + hasharrPath  + img.getAttribute("src");
                }
            }
        }
    }
    function initStyleSwitcher() {
        var isInitialzed = false;
        var sessionStorageKey = 'activeStylesheetHref';

        function handleSwitch(activeHref, activeTitle) {
            var activeElm = document.querySelector('link[href*="' + activeHref + '"],link[title="' + activeTitle + '"]');

            if (!activeElm && activeHref) {
                activeElm = document.createElement('link');
                activeElm.setAttribute('href', activeHref);
                activeElm.setAttribute('rel', 'stylesheet');
                activeElm.setAttribute('title', activeTitle);

                document.head.appendChild(activeElm);

                activeElm.addEventListener('load', function linkOnLoad() {
                    activeElm.removeEventListener('load', linkOnLoad);
                    setActiveLink(activeElm);
                });
            }
            else if (activeElm) {
                setActiveLink(activeElm);
            }
        }

        function setActiveLink(activeElm) {
            var activeHref = activeElm.getAttribute('href');
            var activeTitle = activeElm.getAttribute('title');
            var inactiveElms = document.querySelectorAll('link[title]:not([href*="' + activeHref + '"]):not([title="' + activeTitle + '"])');

            // Remove "alternate" keyword
            activeElm.setAttribute('rel', (activeElm.rel || '').replace(/\s*alternate/g, '').trim());

            // Force enable stylesheet (required for some browsers)
            activeElm.disabled = true;
            activeElm.disabled = false;

            // Store active style sheet
            sessionStorage.setItem(sessionStorageKey, activeHref);

            // Disable other elms
            for (var i = 0; i < inactiveElms.length; i++) {
                var elm = inactiveElms[i];

                elm.disabled = true;

                // Fix for browsersync and alternate stylesheet updates. Will
                // cause FOUC when switching stylesheets during development, but
                // required to properly apply style updates when alternate
                // stylesheets are enabled.
                if (window.browsersyncObserver) {
                    var linkRel = elm.getAttribute('rel') || '';
                    var linkRelAlt = linkRel.indexOf('alternate') > -1 ? linkRel : (linkRel + ' alternate').trim();

                    elm.setAttribute('rel', linkRelAlt);
                }
            }

            // CSS custom property ponyfil
            if ((window.$docsify || {}).themeable) {
                window.$docsify.themeable.util.cssVars();
            }
        }

        // Event listeners
        if (!isInitialzed) {
            isInitialzed = true;
            // Restore active stylesheet
            document.addEventListener('DOMContentLoaded', function () {
                // setTimeout(function () {
                //     imgAdd();
                // }, 300)
                var activeHref = sessionStorage.getItem(sessionStorageKey);

                if (activeHref) {
                    handleSwitch(activeHref);
                }

                // 方法一：会出现时而可以加载，时而不能加载问题
                // var getJs = true;
                // while(getJs){
                //     setTimeout(function () {
                //         $('#la_19815069').append('<script type="text/javascript" src="//quote.51.la/q?id=19815069&mb=4"></script>');
                //     }, 150)
                //     if($('#la_19815069 a')){
                //        getJs = false;
                //     }
                // }

                // 方法二：
                for(var i = 1; i < 20; i++){
                    if($('#la_19815069 a').length != 0){
                        break;
                    }
                    else{
                        setTimeout(function(){
                            $('#la_19815069').append('<script type="text/javascript" src="//quote.51.la/q?id=19815069&mb=4"></script>');
                        }, 200);
                    }
                }
                
            });

            // Update active stylesheet
            document.addEventListener('click', function (evt) {
                var dataHref = evt.target.getAttribute('data-link-href');
                var dataTitle = evt.target.getAttribute('data-link-title')

                if (dataHref || dataTitle) {
                    dataTitle = dataTitle
                        || evt.target.textContent
                        || '_' + Math.random().toString(36).substr(2, 9); // UID

                    handleSwitch(dataHref, dataTitle);
                    evt.preventDefault();
                }
                // setTimeout(function () {
                //     imgAdd();
                // }, 300)
            });
        }
    }



    // Main
    // =========================================================================
    initStyleSwitcher();
})();
