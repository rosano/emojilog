exports.OLSKControllerRoutes = function () {
	return [{
		OLSKRoutePath: '/stub/EMTBrowse',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'EMTBrowseStubRoute',
		OLSKRouteFunction(req, res, next) {
			return res.OLSKExpressLayoutRender(require('path').join(__dirname, 'stub-view'));
		},
		OLSKRouteLanguageCodes: ['en', 'fr'],
	}];
};
