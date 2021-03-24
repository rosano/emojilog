exports.OLSKControllerUseLivereload = function () {
	return process.env.NODE_ENV === 'development';
};

exports.OLSKControllerRoutes = function () {
	return [{
		OLSKRoutePath: '/guide',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'EMLGuideRoute',
		OLSKRouteFunction(req, res, next) {
			return res.OLSKExpressLayoutRender(require('path').join(__dirname, 'ui-view'), {
				EMLGuideContent: res.OLSKMarkdownContent(require('path').join(__dirname, `text.${ res.locals.OLSKSharedPageCurrentLanguage }.md`), {
					EMLTrackRoute: res.locals.OLSKCanonical('EMLTrackRoute'),
				}),
			});
		},
		_OLSKRouteLanguageCodes: ['en'],
	}];
};
