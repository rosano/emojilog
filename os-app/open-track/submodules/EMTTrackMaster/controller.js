exports.OLSKControllerRoutes = function() {
	return [{
		OLSKRoutePath: '/stub/EMTTrackMaster',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'EMTTrackMasterStubRoute',
		OLSKRouteFunction: function (req, res, next) {
			return res.render(require('path').join(__dirname, 'stub-view'), {});
		},
		OLSKRouteLanguages: ['en'],
	}];
};
