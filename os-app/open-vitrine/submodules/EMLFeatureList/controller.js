exports.OLSKControllerRoutes = function() {
	return [{
		OLSKRoutePath: '/stub/EMLFeatureList',
		OLSKRouteMethod: 'get',
		OLSKRouteFunction (req, res, next) {
			return res.OLSKExpressLayoutRender(require('path').join(__dirname, 'stub-view'));
		},
		OLSKRouteSignature: 'EMLFeatureListStubRoute',
		OLSKRouteLanguageCodes: ['en', 'fr', 'es', 'pt'],
	}];
};
