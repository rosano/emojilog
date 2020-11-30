exports.OLSKControllerRoutes = function() {
	return [{
		OLSKRoutePath: '/stub/EMTTrackMaster',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'EMTTrackMasterStubRoute',
		OLSKRouteFunction (req, res, next) {
			return res.OLSKLayoutRender(require('path').join(__dirname, 'stub-view'));
		},
		OLSKRouteLanguageCodes: ['en'],
	}];
};
