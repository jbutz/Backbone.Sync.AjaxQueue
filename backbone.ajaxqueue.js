(function($, undefined) {

    // Overwrite Backbone.ajax to queue ajax requests
    Backbone.ajax = function() {
        if (Backbone.ajaxQueue === undefined)
            Backbone.ajaxQueue = $.Deferred().resolve();
        var args = arguments;
        var callback = $.proxy(function(){
            return Backbone.$.ajax.apply(Backbone.$, args);
        }, this);
        Backbone.ajaxQueue = Backbone.ajaxQueue.then(callback, callback);
    };

})(jQuery);
