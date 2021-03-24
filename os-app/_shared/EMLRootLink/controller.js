exports.OLSKControllerRoutes = function() {
	return [{
		OLSKRoutePath: '/stub/EMLRootLinkEJS',
		OLSKRouteMethod: 'get',
		OLSKRouteFunction (req, res, next) {
			return res.OLSKExpressLayoutRender(require('path').join(__dirname, 'stub-view'));
		},
		OLSKRouteSignature: 'EMLRootLinkEJSStubRoute',
		OLSKRouteLanguageCodes: ['en', 'fr', 'es', 'pt'],
		OLSKRouteIsHidden: process.env.NODE_ENV === 'production',
	}, {
		OLSKRoutePath: '/stub/EMLRootLinkSvelte',
		OLSKRouteMethod: 'get',
		OLSKRouteFunction (req, res, next) {
			return res.OLSKExpressLayoutRender(require('path').join(__dirname, 'stub-view'));
		},
		OLSKRouteSignature: 'EMLRootLinkSvelteStubRoute',
		OLSKRouteLanguageCodes: ['en', 'fr', 'es'],
		OLSKRouteIsHidden: process.env.NODE_ENV === 'production',
	}];
};
