// Generated by CoffeeScript 1.6.3
(function() {
  var express, phantom, should, sync, _ref;

  should = require('should');

  express = require('express');

  _ref = require('../lib/phantom-sync'), phantom = _ref.phantom, sync = _ref.sync;

  describe("phantom-sync", function() {
    return describe("sync", function() {
      return describe("adv", function() {
        var app, page, ph, server, _ref1;
        _ref1 = [], app = _ref1.app, server = _ref1.server, ph = _ref1.ph, page = _ref1.page;
        before(function(done) {
          app = express();
          app.use(express["static"](__dirname));
          app.get('/', function(req, res) {
            return res.send("<html>\n  <head>\n    <title>Test page title</title>\n  </head>\n  <body>\n    <img src=\"/test.gif\" />\n  </body>\n</html>");
          });
          server = app.listen();
          return done();
        });
        after(function(done) {
          return sync(function() {
            if (server != null) {
              server.close();
            }
            if (ph != null) {
              ph.exitAndWait(500);
            }
            return done();
          });
        });
        return describe("phantom  instance with --load-images=no", function() {
          it("opening  a page", function(done) {
            return sync(function() {
              var status;
              ph = phantom.create('--load-images=no');
              page = ph.createPage();
              status = page.open("http://127.0.0.1:" + (server.address().port) + "/");
              status.should.be.ok;
              return done();
            });
          });
          it("checking that loadImages is not set", function(done) {
            return sync(function() {
              var s;
              s = page.get('settings');
              s.loadImages.should.be["false"];
              return done();
            });
          });
          return it("checking a test image", function(done) {
            return sync(function() {
              var img;
              img = page.evaluate(function() {
                return document.getElementsByTagName('img')[0];
              });
              img.width.should.equal(0);
              img.height.should.equal(0);
              return done();
            });
          });
        });
      });
    });
  });

}).call(this);
