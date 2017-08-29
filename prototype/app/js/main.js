$(function() {
    const unitybar = $('.pwd-unity-bar');

    activateSearch = function() {
        $('.app-actions').addClass('-search');
    }

    deactivateSearch = function() {
        $('.app-actions').removeClass('-search');
    }

    // THEMES
    $('.demo-panel > .themes > button').on('click', function() {
        unitybar
            .removeClass('pwdub-theme-blue pwdub-theme-white pwdub-theme-internal')
            .addClass('pwdub-theme-' + $(this).attr('name'));
    });

    // APP SWITCHER
    $('.app-switcher > .toggle').on('click', function() {
        $('.app-switcher').toggleClass('-on');
    });

    // MORE ACTIONS
    $('.app-actions > .additional-actions > .toggle').on('click', function() {
        $('.app-actions > .additional-actions').toggleClass('-on');
    });

    // SEARCH
    $('.app-actions > .search-form').on('click', function(){
        $('.app-actions').addClass('-search');
        $('.app-actions > .search-form > .field ').focus();
    });

    $('.app-actions > .search-form > .field ')
        .on('focus', function(){
            $('.app-actions').addClass('-search');
        })
        .on('blur', function(){
            $('.app-actions').removeClass('-search');
    });
});
