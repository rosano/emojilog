exports.OLSKControllerRoutes = function () {
	return [{
		OLSKRoutePath: '/stub/EMLBrowseList',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'EMLBrowseListStubRoute',
		OLSKRouteFunction(req, res, next) {
			return res.OLSKExpressLayoutRender(require('path').join(__dirname, 'stub-view'));
		},
		OLSKRouteLanguageCodes: ['en', 'fr'],
	}];
};
