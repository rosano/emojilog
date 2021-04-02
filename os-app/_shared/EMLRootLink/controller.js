exports.OLSKControllerRoutes = function() {
	return [{
		OLSKRoutePath: '/stub/EMLRootLink',
		OLSKRouteMethod: 'get',
		OLSKRouteFunction (req, res, next) {
			return res.OLSKExpressLayoutRender(require('path').join(__dirname, 'main'));
		},
		OLSKRouteSignature: 'EMLRootLinkStubRoute',
		OLSKRouteLanguageCodes: ['en'],
		OLSKRouteIsHidden: process.env.NODE_ENV === 'production',
	}];
};
