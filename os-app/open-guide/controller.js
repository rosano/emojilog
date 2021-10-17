const EMLTrackTimerLogic = require('../sub-journals/submodules/EMLTrackTimer/ui-logic.js');

exports.OLSKControllerRoutes = function () {
	return [{
		OLSKRoutePath: '/guide',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'EMLGuideRoute',
		OLSKRouteFunction(req, res, next) {
			return res.OLSKExpressLayoutRender(require('path').join(__dirname, 'ui-view'), {
				EMLGuideContent: res.OLSKMarkdownContent(require('path').join(__dirname, `text-${ res.locals.OLSKSharedPageCurrentLanguage }.md`), Object.assign({
					EMLTrackRoute: res.locals.OLSKCanonical('EMLTrackRoute'),
				}, Object.keys(EMLTrackTimerLogic).filter(function (e) {
					return e.match(/EMLTrackTimerFrame[A-Z]/)
				}).reduce(function (coll, item) {
					return Object.assign(coll, {
						[`EMLTrackTimerLines:${ item }`]: EMLTrackTimerLogic.EMLTrackTimerLines()[EMLTrackTimerLogic[item]()],
					});
				}, {}))),
			});
		},
		_OLSKRouteLanguageCodes: ['en'],
	}];
};
