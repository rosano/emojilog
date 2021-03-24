exports.OLSKControllerRoutes = function() {
	return [{
		OLSKRoutePath: '/track',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'EMLTrackRoute',
		OLSKRouteFunction (req, res, next) {
			return res.OLSKExpressLayoutRender(require('path').join(__dirname, 'ui-view'));
		},
		OLSKRouteLanguageCodes: ['en', 'fr'],
	}];
};
