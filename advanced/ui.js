$(document).ready(function() {
    var fsCheckbox = $('#fsOn');
    fsCheckbox.change(function() {
        if (fsCheckbox.is(':checked')) {
            fakeServerWrapper.init();
        } else {
            fakeServerWrapper.restore();
        }
    });

    function register(selector, url) {
        $(selector).click(function() {
            $.ajax({
                url: url
            }).done(function(value) {
                console.info(value);
            }).fail(function(value) {
                console.error(value);
            });
        });
    }

    register('#call-local-a', "resourceA.json");
    register('#call-local-b', "resourceB.json");
    register('#call-external', externalHost + '/posts/1');
});
