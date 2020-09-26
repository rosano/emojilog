exports.OLSKControllerRoutes = function () {
	return [{
		OLSKRoutePath: '/stub/EMTBrowse',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'EMTBrowseStubRoute',
		OLSKRouteFunction(req, res, next) {
			return res.render(require('path').join(__dirname, 'stub-view'));
		},
		OLSKRouteLanguages: ['en', 'fr'],
	}];
};
