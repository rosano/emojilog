exports.OLSKControllerRoutes = function() {
	return [{
		OLSKRoutePath: '/stub/EMLTrackTimer',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'EMLTrackTimerStubRoute',
		OLSKRouteFunction (req, res, next) {
			return res.OLSKExpressLayoutRender(require('path').join(__dirname, 'stub-view'));
		},
	}];
};
