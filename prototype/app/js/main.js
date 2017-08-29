$(function() {
    // THEMES
    $('.demo-panel > .themes > button').on('click', function() {
        $('.pwd-unity-bar')
            .removeClass('pwdub-theme-blue pwdub-theme-white pwdub-theme-internal')
            .addClass('pwdub-theme-' + $(this).attr('name'));
    });

    // APP SWITCHER
    $('.app-switcher > .toggle').on('click', function() {
        const $appSwitcher = $('.app-switcher');
        if ($appSwitcher.hasClass('-on')) {
            $appSwitcher
                .removeClass('-on')
                .find('.app-switcher-menu a').attr('tabindex', '-1');
        } else {
            $appSwitcher
                .addClass('-on')
                .find('.app-switcher-menu a').attr('tabindex', '0');
        }
    });


    // MORE MENU
    $('.app-actions > .additional-actions > .toggle').on('click', function() {
        const $additionalActions = $('.app-actions > .additional-actions');
        if ($additionalActions.hasClass('-on')) {
            $additionalActions
                .removeClass('-on')
                .find('a').attr('tabindex', '-1');
        } else {
            $additionalActions
                .addClass('-on')
                .find('a').attr('tabindex', '0');
        }
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
