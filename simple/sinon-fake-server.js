/* global sinon, $ */

var url = 'resource.json';
var value = ['sinon', 'is', 'a', 'nice', 'tool'];

// sinon fake server wrapper

var fakeServerWrapper = {
    init: function() {
        this.fs = sinon.fakeServer.create();

        this.fs.respondWith("GET", url,
            [200, { "Content-Type": "application/json" },
                JSON.stringify(value) ]);

        this.fs.autoRespond = true;
    },

    restore: function() {
        this.fs.restore();
    }
};

// simple ui

$(document).ready(function() {
    var callButton = $('#call'),
        fsCheckbox = $('#fsOn');
    fsCheckbox.change(function() {
        if (fsCheckbox.is(':checked')) {
            fakeServerWrapper.init();
        } else {
            fakeServerWrapper.restore();
        }
    });

    callButton.click(function() {
        $.ajax({
            url: url
        }).done(function(value) {
            console.info(value);
        }).fail(function(value) {
            console.error(value);
        });
    });
});
