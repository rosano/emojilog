exports.OLSKControllerRoutes = function () {
	return [{
		OLSKRoutePath: '/stub/EMLBrowseListItem',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'EMLBrowseListItemStubRoute',
		OLSKRouteFunction(req, res, next) {
			return res.OLSKExpressLayoutRender(require('path').join(__dirname, 'stub-view'));
		},
		OLSKRouteLanguageCodes: ['en', 'fr', 'es', 'pt'],
	}];
};
