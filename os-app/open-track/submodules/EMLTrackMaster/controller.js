exports.OLSKControllerRoutes = function() {
	return [{
		OLSKRoutePath: '/stub/EMLTrackMaster',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'EMLTrackMasterStubRoute',
		OLSKRouteFunction (req, res, next) {
			return res.OLSKExpressLayoutRender(require('path').join(__dirname, 'stub-view'));
		},
		OLSKRouteLanguageCodes: ['en', 'fr', 'es', 'pt'],
	}];
};
