exports.OLSKControllerRoutes = function() {
	return [{
		OLSKRoutePath: '/stub/EMLTemplate',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'EMLTemplateStubRoute',
		OLSKRouteFunction (req, res, next) {
			return res.OLSKExpressLayoutRender(require('path').join(__dirname, 'stub-view'));
		},
		OLSKRouteLanguageCodes: ['en', 'fr', 'es'],
	}];
};
