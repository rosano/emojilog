exports.OLSKControllerRoutes = function () {
	return [{
		OLSKRoutePath: '/stub/EMTBrowseList',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'EMTBrowseListStubRoute',
		OLSKRouteFunction(req, res, next) {
			return res.OLSKExpressLayoutRender(require('path').join(__dirname, 'stub-view'));
		},
		OLSKRouteLanguageCodes: ['en', 'fr'],
	}];
};
