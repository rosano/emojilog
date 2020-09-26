exports.OLSKControllerRoutes = function () {
	return [{
		OLSKRoutePath: '/stub/EMTBrowseInfo',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'EMTBrowseInfoStubRoute',
		OLSKRouteFunction(req, res, next) {
			return res.render(require('path').join(__dirname, 'stub-view'));
		},
		OLSKRouteLanguages: ['en', 'fr'],
	}];
};
