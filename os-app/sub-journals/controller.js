exports.OLSKControllerRoutes = function() {
	return [{
		OLSKRoutePath: '/stub/EMLTrackJournals',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'EMLTrackJournalsStubRoute',
		OLSKRouteFunction (req, res, next) {
			return res.OLSKExpressLayoutRender(require('path').join(__dirname, 'stub-view'));
		},
		OLSKRouteLanguageCodes: ['en', 'fr', 'es', 'pt'],
	}];
};
