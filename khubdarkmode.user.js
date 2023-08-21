// ==UserScript==
// @name         KHub Dark Mode
// @namespace    http://tampermonkey.net/
// @version      0.1.2
// @description  A dark mode script for KHub.
// @author       JaSonic / Twitter: @therealjasonic / Discord: therealjasonic
// @grant        none
// @icon         https://raw.githubusercontent.com/JaSonic4PSHSMC/pshsdarkmode/main/logo.png

// @match        *://khub.irc.pshs.edu.ph/*
// @match        *://khub.cvc.pshs.edu.ph/*
// @match        *://khub.carc.pshs.edu.ph/*
// @match        *://khub.clc.pshs.edu.ph/*
// @match        *://khub.mc.pshs.edu.ph/*
// @match        *://khub.cbzrc.pshs.edu.ph/*
// @match        *://khub.mrc.pshs.edu.ph/*
// @match        *://khub.brc.pshs.edu.ph/*
// @match        *://khub.wvc.pshs.edu.ph/*
// @match        *://khub.cvisc.pshs.edu.ph/*
// @match        *://khub.evc.pshs.edu.ph/*
// @match        *://khub.cmc.pshs.edu.ph/*
// @match        *://khub.smc.pshs.edu.ph/*
// @match        *://khub.src.pshs.edu.ph/*
// @match        *://khub.crc.pshs.edu.ph/*
// @match        *://khub.zrc.pshs.edu.ph/*
// ==/UserScript==

(function() {
    'use strict';

    function cssAsId(selectors, p, st){
        var head = document.getElementsByTagName('head')[0];
        var s = document.createElement('style');
        s.setAttribute('type', 'text/css');
        var i;
        if (s.styleSheet) { // thanks internet explorer :+1:
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

    function basicCssAdd(css){ // i love this code :3 i literally put it in all my userscripts its that good
        var head = document.getElementsByTagName('head')[0];
        var s = document.createElement('style');
        s.setAttribute('type', 'text/css');
        if (s.styleSheet) { //thanks internet explorer :+1:
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

    //START OF CUSTOMIZABLE

    /* default options
    let background1 = '#000';
    let background2 = '#080808';
    let background3 = '#121212';
    let background4 = '#242424';
    let accent1 = '#40128B';
    let accent2 = '#0B666A';
    let font = 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap'
    let fontName = "JetBrains Mono"
    */

    //backgroundX denotes the layering, backrground 1 is the very back
    //for background colors, it is ALWAYS better to have them cascade upwards (i.e. #000000 -> #080808 -> #121212) rather than downwards

    let background1 = '#000';
    let background2 = '#080808';
    let background3 = '#121212';
    let background4 = '#242424';
    let accent1 = '#40128B';
    let accent2 = '#0B666A';
    let font = 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap'
    let fontName = "JetBrains Mono"
    //END OF CUSTOMIZABLE

    document.head.innerHTML += `<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="${font}" rel="stylesheet">`;
    document.getElementsByClassName('userpicture').forEach(pic => {pic.src = "https://i.kym-cdn.com/photos/images/newsfeed/002/548/073/ed4.gif"})

    //REMOVE THE DOUBLE SLASHES FROM THE PREVIOUS LINE TO GET A COOL EASTER EGG!!!

    //logo
    //let logo = document.getElementsByClassName('logo')[0]
    //logo.src = "https://raw.githubusercontent.com/JaSonic4PSHSMC/pshsdarkmode/main/logo.png"
    //logo.style.borderRadius = '0.5em'
    //logo.style.boxShadow = 'rgba(255, 255, 255, 0.2) 0px 0px 10px 0px'

    console.log("Running script...")

    //+50% of root background
    let background2border = rgbToHex(hexToRgb(background2).r*2, hexToRgb(background2).g*2, hexToRgb(background2).b*2)
    let background3border = rgbToHex(hexToRgb(background3).r*2, hexToRgb(background3).g*2, hexToRgb(background3).b*2)
    let background4border = rgbToHex(hexToRgb(background4).r*2, hexToRgb(background4).g*2, hexToRgb(background4).b*2)
    let accent1border = rgbToHex(hexToRgb(accent1).r*2, hexToRgb(accent1).g*2, hexToRgb(accent1).b*2)
    let accent2border = rgbToHex(hexToRgb(accent2).r*2, hexToRgb(accent2).g*2, hexToRgb(accent2).b*2)
    let fontNames = `'FontAwesome', '${fontName}', monospace`

    let bg2arrNoBorder = ['#region-main', '.dashboard-card-footer', '.path-mod .activity-header:not(:empty)', '.card-body', '.format-tiles #page .course-content ul li.section.main']
    let bg2arr = ['.modal-content', '.main-inner', '#page-login-index .login-container .loginform', '.message-app']
    let bg3arrNoBorder = ['.description .course-description-item', '#page.drawers::-webkit-scrollbar-track', '.format-tiles li.activity.subtile', '.format-tiles .course-content ul.tiles .tile', '.format-tiles .course-content .section .activity:hover'];
    let bg3arr = ['.activity-item', '#modal-content', '.forumpost', '.dashboard-card', '.page-item.disabled .page-link', '.list-group-item', '[data-region=right-hand-drawer].drawer .footer-container', '.que .formulation', '.que .info', '.moodle-dialogue-base .moodle-dialogue-wrap', '.que .outcome, .que .comment', 'div.editor_atto_toolbar']
    let bg4arrNoBorder = ['.editor_atto_content_wrap']
    let bg4arr = ['.message-app .message.send', '.MathJax_Menu', '.progress', 'div.editor_atto_toolbar div.atto_group', '.badge-secondary', '.alert', '.popover']
    let accent1arr = ['.path-login .login-container .login-logo', '.progress-bar', '.dashboard-card .dashboard-card-img .course-category', '.format-tiles .tiles-top-button']
    let accent2arr = ['.custom-select', '.btn-secondary', '.btn-primary', '.secondary-navigation', '.login-container .login-identityproviders .login-identityprovider-btn', '.maincalendar .calendarmonth td.today .day-number-circle']
    let removeBorder = ['.btn-primary', '.custom-select', '.format-tiles li.activity.subtile', '.btn-secondary', '.login-container .login-identityproviders .login-identityprovider-btn']

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
    basicCssAdd('.format-tiles .course-content ul.tiles .tile, .format-tiles li.section:not(#section-0) .course-section-header {border: none !important; margin: 4px !important}')
    basicCssAdd('.format-tiles .course-content ul.tiles .tile.phototile .photo-tile-text h3 {background-color: transparent !important; text-shadow: 0 0 10px BLACK !important;} .format-tiles .course-content ul.tiles .tile-clickable:hover {transform: rotate(-3deg) scale(1.02); transform-origin: bottom left; transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);}')

    //quiz
    basicCssAdd('.path-mod-quiz #mod_quiz_navblock .qnbutton.thispage .thispageholder {border-width: 1px !important;}')
    basicCssAdd('.path-mod-quiz #mod_quiz_navblock .qnbutton.notyetanswered .trafficlight, .path-mod-quiz #mod_quiz_navblock .qnbutton.invalidanswer .trafficlight {background: none !important;}')
    basicCssAdd(`.generaltable th, .generaltable td {background-color: ${background1} !important; border: ${background2border} !important; border-radius: 3px !important}`)
    basicCssAdd('.path-mod-quiz #mod_quiz_navblock .qnbutton.correct .trafficlight, .path-mod-quiz #mod_quiz_navblock .qnbutton.notanswered .trafficlight, .path-mod-quiz #mod_quiz_navblock .qnbutton.incorrect .trafficlight {border-radius: 1rem !important; border: black 0.3rem solid !important;}')
    basicCssAdd(`.path-mod-quiz #mod_quiz_navblock .qnbutton .trafficlight {height: 30px; margin-top: 0px; z-index: -1}`)
    basicCssAdd(`.path-mod-quiz #mod_quiz_navblock .qnbutton {height: 30px; z-index: 2; padding: 0.25rem;}`)
    basicCssAdd(`.path-mod-quiz #mod_quiz_navblock .qnbutton.correct .trafficlight, .path-mod-quiz #mod_quiz_navblock .qnbutton.notanswered .trafficlight, .path-mod-quiz #mod_quiz_navblock .qnbutton.incorrect .trafficlight {border: transparent !important; border-radius: 0 !important; border-radius: 3px !important;}`)

    //stuff 4 l8r
    //background-image: url(https://cdn.jsdelivr.net/gh/JaSonic4PSHSMC/khubdarkmode@latest/img/checkmark.svg); background-size: 40%; background-position: 50% !important; background-repeat: no-repeat;
    //background-image: url(https://cdn.jsdelivr.net/gh/JaSonic4PSHSMC/khubdarkmode@latest/img/xmark.svg); background-size: 40%; background-position: 50% !important; background-repeat: no-repeat;

    basicCssAdd(`.path-mod-quiz #mod_quiz_navblock .qnbutton.correct .trafficlight {filter: invert(1); background: #9b5bb1;}`)
    basicCssAdd(`.path-mod-quiz #mod_quiz_navblock .qnbutton.notanswered .trafficlight, .path-mod-quiz #mod_quiz_navblock .qnbutton.incorrect .trafficlight {filter: invert(1); background: #35cedf;}`)
    //basicCssAdd(`.path-mod-quiz #mod_quiz_navblock .qnbutton.correct, .path-mod-quiz #mod_quiz_navblock .qnbutton.notanswered, .path-mod-quiz #mod_quiz_navblock .qnbutton.incorrect {color: transparent !important; text-shadow: none !important;}`)


    //general patches
    cssAsId(removeBorder, 'border', 'none')
    basicCssAdd('.card {background-color: transparent !important}')
    basicCssAdd('.message-app .message.send {word-wrap: break-word!important}')
    basicCssAdd(`a {background-color: transparent !important; color: white !important}`)
    basicCssAdd('.format-tiles .course-content ul.tiles .tile {box-shadow: none !important;}')
    basicCssAdd('.badge-secondary {box-shadow: none !important;}')
    basicCssAdd('.aabtn.focus, .aabtn:focus, .btn-link.focus, .btn-link:focus, .nav-link.focus, .nav-link:focus, .editor_atto_toolbar button.focus, .editor_atto_toolbar button:focus, .editor_atto_toolbar .atto_toolbar_row.focus, .editor_atto_toolbar .atto_toolbar_row:focus, [role="button"].focus, [role="button"]:focus, .list-group-item-action.focus, .list-group-item-action:focus, input[type="checkbox"].focus, input[type="checkbox"]:focus, input[type="radio"].focus, input[type="radio"]:focus, input[type="file"].focus, input[type="file"]:focus, input[type="image"].focus, input[type="image"]:focus, .sr-only-focusable.focus, .sr-only-focusable:focus, a.dropdown-toggle.focus, a.dropdown-toggle:focus, .modal-dialog[tabindex="0"].focus, .modal-dialog[tabindex="0"]:focus, .moodle-dialogue-base .closebutton.focus, .moodle-dialogue-base .closebutton:focus, button.close.focus, button.close:focus, .form-autocomplete-selection.focus, .form-autocomplete-selection:focus, [role="treeitem"]:not([aria-expanded="true"]).focus, [role="treeitem"]:not([aria-expanded="true"]):focus, .btn-primary:not(:disabled):not(.disabled):active:focus, .btn-primary:not(:disabled):not(.disabled).active:focus, .show>.btn-primary.dropdown-toggle:focus, .btn-primary:focus, .btn-primary.focus {box-shadow: none !important}')
    basicCssAdd(`.bs-popover-right > .arrow::after, .bs-popover-auto[x-placement^="right"] > .arrow::after {border-right-color: ${background4border}}`)

    console.log("End of script. Enjoy Dark Mode!")

})();
