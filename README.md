Backbone.Sync using jQuery AJAX Queue (AJAX Manager) Plugin
============================================

This small JavaScript file can be included after Backbone.js on a page to overload the default Backbone.Sync and have it use the AJAX Manager plugin (http://plugins.jquery.com/project/AjaxManager)

Usage
-----
Just include the JavaScript file after Backbone.js, jQuery, and the AJAX Manager files and everything will work.

Defaults
--------

By default AJAX Manager is setup with the following options:

* `queue: true`
* `cacheResponse: false`
* `preventDoubleRequests: true`
* `maxRequests: 5`

This means that AJAX requests will be placed in a FIFO (First In, First Out) queue. Successful responses will not be cached. It will try and prevent double requests. No more than 5 requests will be going on at the same time.
If you want to change these options you can open the JavaScript file and there is an section clearly marked. The options can be found here: http://www.protofunc.com/scripts/jquery/ajaxManager/
