$(function() {

    const closeAllMenus = function() {
        closeAppSwitcher();
        closeMoreMenu();
    }

    const closeAppSwitcher = function() {
        $('.app-switcher')
            .removeClass('-on')
            .find('.app-switcher-menu a').attr('tabindex', '-1');
    }

    const openAppSwitcher = function() {
        closeMoreMenu();

        $('.app-switcher')
            .addClass('-on')
            .find('.app-switcher-menu a').attr('tabindex', '0');
    }

    const closeMoreMenu = function() {
        $('.app-actions > .additional-actions')
            .removeClass('-on')
            .find('a').attr('tabindex', '-1');
    }

    const openMoreMenu = function() {
        closeAppSwitcher();

        $('.app-actions > .additional-actions')
            .addClass('-on')
            .find('a').attr('tabindex', '0');
    }

    const activateSearch = function(doFocus) {
        if (doFocus === undefined) {
            doFocus = true;
        }
        closeAllMenus();
        $('.app-actions').addClass('-search');
        $('.app-actions > .search-form > .action').attr('tabindex', '0');
        if (doFocus) {
            $('.app-actions > .search-form > .field ').focus();
        }

        $('.app-actions > .search-form')
            .off('click.activateSearch focusin.activateSearch')
            .on('focusout.activateSearch', function(e){
                if (!$.contains($('.app-actions > .search-form').get(0), e.relatedTarget)) {
                    console.log($('*:focus'));
                    deactivateSearch();
                }
            });
    }

    const deactivateSearch = function() {
        $('.app-actions').removeClass('-search');
        $('.app-actions > .search-form > .action').attr('tabindex', '-1');

        $('.app-actions > .search-form')
            .off('focusout.activateSearch')
            .on('click.activateSearch', function(){
                // Handles click on search icon (mobile)
                activateSearch(true);
            })
            .on('focusin.activateSearch', function(){
                // Handles tab/click into search field (desktop)
                activateSearch(false);
            });
    }

    // THEME SWITCHER
    $('.demo-panel > .themes > button').on('click', function() {
        $('.pwd-unity-bar')
            .removeClass('pwdub-theme-blue pwdub-theme-white pwdub-theme-internal')
            .addClass('pwdub-theme-' + $(this).attr('name'));
    });

    // APP SWITCHER
    $('.app-switcher > .toggle').on('click', function() {
        if ($('.app-switcher').hasClass('-on')) {
            closeAppSwitcher();
        } else {
            openAppSwitcher();
        }
    });


    // MORE MENU
    $('.app-actions > .additional-actions > .toggle').on('click', function() {
        if ($('.app-actions > .additional-actions').hasClass('-on')) {
            closeMoreMenu();
        } else {
            openMoreMenu();
        }
    });

    // SEARCH
    $('.app-actions:not(.-search) > .search-form')
        .one('click.activateSearch', function(){
            console.log('click in');
            activateSearch(true);
        })
        .one('focusin.activateSearch', function(){
            console.log('focus in');
            activateSearch(false);
        });
});
