exports.OLSKControllerRoutes = function() {
	return [{
		OLSKRoutePath: '/stub/EMTTemplate',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'EMTTemplateStubRoute',
		OLSKRouteFunction (req, res, next) {
			return res.OLSKLayoutRender(require('path').join(__dirname, 'stub-view'));
		},
		OLSKRouteLanguageCodes: ['en'],
	}];
};
