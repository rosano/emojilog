exports.OLSKControllerRoutes = function() {
	return [{
		OLSKRoutePath: '/stub/EMLTemplateParamForm',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'EMLTemplateParamFormStubRoute',
		OLSKRouteFunction (req, res, next) {
			return res.OLSKExpressLayoutRender(require('path').join(__dirname, 'stub-view'));
		},
		OLSKRouteLanguageCodes: ['en'],
	}];
};
