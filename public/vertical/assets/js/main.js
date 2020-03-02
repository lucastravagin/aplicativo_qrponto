/*
 Template Name: Neon - Responsive Bootstrap 4 Admin Dashboard & UI Kits 
 Website: http://xpanthersolutions.com/html/neon
 Author: xPanther Solutions
 File: Main JS File
 */

"use strict";
$(document).ready(function() {       

    /* -----  Menu JS ----- */
    $.sidebarMenu($('.xp-vertical-menu'));      



    /* -----  Menu Hamburger ----- */
    $(".xp-menu-hamburger").on("click", function(e) {
        e.preventDefault();
        $("body").toggleClass("xp-toggle-menu");
    }); 

    /* -----  Menu Scrollbar ----- */
    $('.xp-vertical-menu').slimscroll({
        height: '800',
        position: 'right',
        size: "7px",
        color: '#CFD8DC'
    });    

    /* -----  Bootstrap Popover ----- */
    $('[data-toggle="popover"]').popover();

    /* -----  Bootstrap Tooltip ----- */
    $('[data-toggle="tooltip"]').tooltip();

});