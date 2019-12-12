exports.OLSKControllerRoutes = function() {
	return [{
		OLSKRoutePath: '/track',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'EMTTrackRoute',
		OLSKRouteFunction: function (req, res, next) {
			return res.render(require('path').join(__dirname, 'ui-view'));
		},
		OLSKRouteLanguages: ['en'],
		OLSKRouteMiddlewares: [
			'EMTSharedDonateLinkGuardMiddleware',
		],
	}];
};
