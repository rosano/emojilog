exports.OLSKControllerRoutes = function() {
	return [{
		OLSKRoutePath: '/track',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'EMTTrackRoute',
		OLSKRouteFunction (req, res, next) {
			return res.OLSKLayoutRender(require('path').join(__dirname, 'ui-view'));
		},
		OLSKRouteLanguages: ['en'],
		OLSKRouteMiddlewares: [
			'EMTSharedDonateLinkGuardMiddleware',
		],
	}];
};
