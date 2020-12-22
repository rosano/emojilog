exports.OLSKControllerRoutes = function() {
	return [{
		OLSKRoutePath: '/stub/EMTTrackMaster',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'EMTTrackMasterStubRoute',
		OLSKRouteFunction (req, res, next) {
			return res.OLSKExpressLayoutRender(require('path').join(__dirname, 'stub-view'));
		},
		OLSKRouteLanguageCodes: ['en'],
	}];
};
