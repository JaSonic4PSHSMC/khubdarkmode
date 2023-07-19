// ==UserScript==
// @name         KHub Dark Mode
// @namespace    http://tampermonkey.net/
// @version      0.1.1
// @description  A dark mode script for KHub.
// @author       JaSonic / Twitter: @therealjasonic / Discord: therealjasonic
// @match        *://*.pshs.edu.ph/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // NOTE: APPARENTLY MATHJAX CANNOT LOAD, SO YOU SHOULD PROBABLY CHANGE THE MATH RENDERER FOR MATHJAX BY RIGHT-CLICKING ON ANY MATH EQUATION > MATH SETTINGS > MATH RENDERER > COMMON HTML.
    // THANKS!

    function cssAsId(selectors, p, st){
        var head = document.getElementsByTagName('head')[0];
        var s = document.createElement('style');
        s.setAttribute('type', 'text/css');
        var i;
        if (s.styleSheet) {//thanks internet explorer :+1:
            for(i = 0; i < selectors.length; i++) {
                s.styleSheet.cssText = `${selectors[i]} {${p}: ${st} !important;}`;
            }
        } else {
            for(i = 0; i < selectors.length; i++) {
                s.appendChild(document.createTextNode(`${selectors[i]} {${p}: ${st} !important;}`));
            }
        }
        head.appendChild(s);
    }

    function basicCssAdd(css){
        var head = document.getElementsByTagName('head')[0];
        var s = document.createElement('style');
        s.setAttribute('type', 'text/css');
        if (s.styleSheet) {//thanks internet explorer :+1:
            s.styleSheet.cssText = css;
        } else {
            s.appendChild(document.createTextNode(css));
        }
        head.appendChild(s);
    }

    function rgbToHex(r, g, b) {
        return "#" + (1 << 24 | Math.min(r, 255) << 16 | Math.min(g, 255) << 8 | Math.min(b, 255)).toString(16).slice(1);
    }

    function hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    //FONTS GO HERE
    let font = 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap'
    let fontNames = "'FontAwesome', 'JetBrains Mono', monospace"

    document.head.innerHTML += `<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="${font}" rel="stylesheet">`;
    //document.getElementsByClassName('userpicture').forEach(pic => {pic.src = "https://i.imgflip.com/7gfjei.jpg?a468864"})
    //double slash previous line if you are NOT a boykisser

    console.log("Running script...")

    //for background colors, it is ALWAYS better to have them cascade upwards (i.e. #000000 -> #080808 -> #121212) rather than downwards
    let background1 = '#000';
    let background2 = '#080808';
    let background3 = '#121212';
    let background4 = '#242424';
    let accent1 = '#00262D';
    let accent2 = '#2A1E0D'

    //+50% of root background
    let background2border = rgbToHex(hexToRgb(background2).r*2, hexToRgb(background2).g*2, hexToRgb(background2).b*2)
    let background3border = rgbToHex(hexToRgb(background3).r*2, hexToRgb(background3).g*2, hexToRgb(background3).b*2)
    let background4border = rgbToHex(hexToRgb(background4).r*2, hexToRgb(background4).g*2, hexToRgb(background4).b*2)

    let bg2arrNoBorder = ['#region-main', '.dashboard-card-footer', '.path-mod .activity-header:not(:empty)', '.card-body']
    let bg2arr = ['.main-inner', '#page-login-index .login-container .loginform', '.message-app', '.format-tiles #page .course-content ul li.section.main']
    let bg3arrNoBorder = ['#page.drawers::-webkit-scrollbar-track', '.format-tiles li.activity.subtile', '.format-tiles .course-content ul.tiles .tile', '.format-tiles .course-content .section .activity:hover'];
    let bg3arr = ['.activity-item', '.forumpost', '.dashboard-card', '.page-item.disabled .page-link', '.list-group-item', '[data-region=right-hand-drawer].drawer .footer-container', '.que .formulation', '.que .info', '.moodle-dialogue-base .moodle-dialogue-wrap', '.que .outcome, .que .comment']
    let bg4arrNoBorder = []
    let bg4arr = ['.message-app .message.send', '.MathJax_Menu']
    let accent1arr = ['.navbar-light .navbar-brand', '.path-login .login-container .login-logo', '.dashboard-card .dashboard-card-img .course-category']
    let accent2arr = ['.custom-select', '.btn-secondary', '.btn-primary', '.secondary-navigation']
    let removeBorder = ['.btn-primary', '.custom-select', '.format-tiles li.activity.subtile']

    let formControl = ['#groupingdropdown', '.form-control', '.select', '.page-link']

    //setting bg borders
    cssAsId(formControl, 'border', `${background3border} solid 2px`)
    cssAsId(bg2arr,'border', `${background2border} solid 2px`)
    cssAsId(bg3arr,'border', `${background3border} solid 2px`)
    cssAsId(bg4arr,'border', `${background4border} solid 2px`)


    //bg colors
    cssAsId(formControl, 'background', 'transparent')
    cssAsId(formControl, 'color', 'white')
    cssAsId(['body', '.navbar', '.pagelayout-login #page', '.drawer', '.dropdown-menu', '.bg-white', '#page-site-index.notloggedin #feature', '#page-site-index.notloggedin #topofscroll'], 'background', background1)
    cssAsId(bg2arr.concat(bg2arrNoBorder), 'background-color', background2)
    cssAsId(bg3arr.concat(bg3arrNoBorder), 'background-color', background3)
    cssAsId(bg4arr.concat(bg4arrNoBorder), 'background-color', background4)

    cssAsId(['.navbar-light .navbar-brand', '.path-login .login-container .login-logo', '.que .info', '.img-responsive'], 'border-radius', '0.5rem')
    cssAsId(['.navbar-light .navbar-brand', '.path-login .login-container .login-logo'], 'margin', '0.4rem')
    basicCssAdd(`.popover-region-toggle::after {border-bottom: 10px solid #000 !important; } .popover-region-container,.popover-region-footer-container{background-color: ${background1} !important; }`)

    cssAsId(accent1arr, 'background', accent1)
    cssAsId(accent2arr, 'background', accent2)

    cssAsId('*','font-family', fontNames)
    cssAsId(['*', '.navbar-nav', '.text-primary', '.text-muted'], 'color', '#fffffff0')
    cssAsId('*', 'text-shadow', '0px 0px 5px #ffffff')

    cssAsId(['.moremenu .nav-link:hover', '.moremenu .nav-link:focus'], 'background-color', background3)
    cssAsId(['.rounded-circle', '.activityiconcontainer', '.forumpost', '.img-fluid', '.card-body'], 'border-radius', '0.5rem')

    basicCssAdd('#page.drawers::-webkit-scrollbar-thumb:hover, #page.drawers::-webkit-scrollbar-thumb {background-color: #ccc !important;} ')

    //calendar
    basicCssAdd(`.day {transition: all 0.5s ease-in-out} .maincalendar .calendarmonth .clickable:hover {background-color: ${background3}}`)

    //course
    basicCssAdd('.format-tiles .course-content ul.tiles .tile, .format-tiles li.section:not(#section-0) .course-section-header {border: none !important}')
    basicCssAdd('.format-tiles .course-content ul.tiles .tile.phototile .photo-tile-text h3 {background-color: transparent !important; text-shadow: 0 0 10px BLACK !important;} .format-tiles .course-content ul.tiles .tile-clickable:hover {transform: scale(1.02)}')

    //quiz
    basicCssAdd('.path-mod-quiz #mod_quiz_navblock .qnbutton.thispage .thispageholder {border-width: 1px !important;}')
    basicCssAdd('.path-mod-quiz #mod_quiz_navblock .qnbutton.notyetanswered .trafficlight, .path-mod-quiz #mod_quiz_navblock .qnbutton.invalidanswer .trafficlight {background: none !important;}')
    basicCssAdd(`.generaltable th, .generaltable td {background-color: ${background1} !important; border: ${background2border} !important; border-radius: 3px !important}`)
    basicCssAdd('.path-mod-quiz #mod_quiz_navblock .qnbutton.correct .trafficlight, .path-mod-quiz #mod_quiz_navblock .qnbutton.notanswered .trafficlight, .path-mod-quiz #mod_quiz_navblock .qnbutton.incorrect .trafficlight {border-radius: 1rem !important; border: black 0.3rem solid !important;}')

    //general patches
    cssAsId(removeBorder, 'border', 'none')
    basicCssAdd('.card {background-color: transparent !important}')
    basicCssAdd('.message-app .message.send {word-wrap: break-word!important}')
    basicCssAdd(`a {background-color: transparent !important; color: white !important}`)
    basicCssAdd('.format-tiles .course-content ul.tiles .tile {box-shadow: none !important;}')

    console.log("End of script. Enjoy Dark Mode!")

})();
