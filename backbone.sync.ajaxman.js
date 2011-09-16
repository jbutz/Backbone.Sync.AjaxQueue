// Map from CRUD to HTTP for our default `Backbone.sync` implementation.
var methodMap = {
	'create': 'POST',
	'update': 'PUT',
	'delete': 'DELETE',
	'read'  : 'GET'
};
// Helper function to get a URL from a Model or Collection as a property
// or as a function.
var getUrl = function(object) {
	if (!(object && object.url)) return null;
	return _.isFunction(object.url) ? object.url() : object.url;
};

// Throw an error when a URL is needed, and none is supplied.
var urlError = function() {
	throw new Error('A "url" property or function must be specified');
};


// Backbone.sync
// -------------

// Override this function to change the manner in which Backbone persists
// models to the server. You will be passed the type of request, and the
// model in question. By default, uses makes a RESTful Ajax request
// to the model's `url()`. Some possible customizations could be:
//
// * Use `setTimeout` to batch rapid-fire updates into a single request.
// * Send up the models as XML instead of JSON.
// * Persist models via WebSockets instead of Ajax.
//
// Turn on `Backbone.emulateHTTP` in order to send `PUT` and `DELETE` requests
// as `POST`, with a `_method` parameter containing the true HTTP method,
// as well as all requests with the body as `application/x-www-form-urlencoded` instead of
// `application/json` with the model in a param named `model`.
// Useful when interfacing with server-side languages like **PHP** that make
// it difficult to read the body of `PUT` requests.
Backbone.sync = function(method, model, options)
{
var type = methodMap[method];

// Default JSON-request options.
var params = _.extend({
  type:         type,
  dataType:     'json'
}, options);

// Ensure that we have a URL.
if (!params.url)
{
  params.url = getUrl(model) || urlError();
}

// Ensure that we have the appropriate request data.
if (!params.data && model && (method == 'create' || method == 'update'))
{
  params.contentType = 'application/json';
  params.data = JSON.stringify(model.toJSON());
}

// For older servers, emulate JSON by encoding the request into an HTML-form.
if (Backbone.emulateJSON)
{
  params.contentType = 'application/x-www-form-urlencoded';
  params.data        = params.data ? {model : params.data} : {};
}

// For older servers, emulate HTTP by mimicking the HTTP method with `_method`
// And an `X-HTTP-Method-Override` header.
if (Backbone.emulateHTTP)
{
  if (type === 'PUT' || type === 'DELETE')
  {
	if (Backbone.emulateJSON) params.data._method = type;
	params.type = 'POST';
	params.beforeSend = function(xhr) {
	  xhr.setRequestHeader('X-HTTP-Method-Override', type);
	};
  }
}

// Don't process data on a non-GET request.
if (params.type !== 'GET' && !Backbone.emulateJSON)
{
  params.processData = false;
}

// AJAX Manager
if(Backbone.ajaxMan == undefined)
{
/**********************************************************
 * AJAX Manager Settings                                 */
	Backbone.ajaxMan = $.manageAjax.create('BackBoneAJAX', {
	   queue: true,
	   cacheResponse: false,
		preventDoubleRequests: true,
	   maxRequests: 5
	});
/*********************************************************/
}
//
// Make the request.
//return $.ajax(params);
return Backbone.ajaxMan.add(params);
};
