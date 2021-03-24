exports.OLSKControllerRoutes = function () {
	return [{
		OLSKRoutePath: '/stub/EMLBrowse',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'EMLBrowseStubRoute',
		OLSKRouteFunction(req, res, next) {
			return res.OLSKExpressLayoutRender(require('path').join(__dirname, 'stub-view'));
		},
		OLSKRouteLanguageCodes: ['en', 'fr'],
	}];
};
