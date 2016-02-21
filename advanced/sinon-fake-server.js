/* global sinon, $ */

var externalHost = 'http://jsonplaceholder.typicode.com';

var fakeServerWrapper = {
    data: [{
        "method": "GET",
        "url": "resourceA.json",
        "data": ['sinon', 'is', 'a', 'nice', 'tool']
    }, {
        "method": "GET",
        "url": "resourceB.json",
        "data": {
            "date": "22.02.2016, poniedziałek",
            "address": "ul. Domaniewska 44, 02-672 Warszawa",
            "description": "#6 AngularJS Warsaw odbędzie się w siedzibie Aviva (http://www.aviva.pl)"
        }
    }],

    init: function() {
        this.fs = sinon.fakeServer.create();
        
        this.fs.xhr.useFilters = true;
        // If the filter returns true, the request will not be faked - leave original
        this.fs.xhr.addFilter(
            function(method, url, async, username, password) {
                return (new RegExp(externalHost)).test(url);
        });

        this.fs.autoRespond = true;

        var self = this;
        this.data.forEach(function(el){
            self.register(el.method, el.url, el.data);
        });
    },

    register: function(method, url, data) {
        this.fs.respondWith(method, url, [
            200,
            { "Content-Type": "application/json" },
            JSON.stringify(data)
        ]);
    },

    restore: function() {
        this.fs.restore();
    }
};
