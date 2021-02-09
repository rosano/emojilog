exports.OLSKControllerRoutes = function () {
	return [{
		OLSKRoutePath: '/stub/EMLBrowseInfo',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'EMLBrowseInfoStubRoute',
		OLSKRouteFunction(req, res, next) {
			return res.OLSKExpressLayoutRender(require('path').join(__dirname, 'stub-view'));
		},
		OLSKRouteLanguageCodes: ['en', 'fr'],
	}];
};
