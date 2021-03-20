exports.OLSKControllerRoutes = function() {
	return [{
		OLSKRoutePath: '/manifest.json',
		OLSKRouteMethod: 'get',
		OLSKRouteSignature: 'EMLManifestRoute',
		OLSKRouteFunction (req, res, next) {
			return res.json({
				name: 'Emoji Log',
				short_name: 'Emoji Log',
				start_url: res.locals.OLSKCanonical('EMLTrackRoute'),
				display: 'standalone',
				background_color: 'white',
				theme_color: 'white',
				icons: [{
					src: process.env.OLSK_LAYOUT_TOUCH_ICON_URL,
					sizes: '600x600',
					type: 'image/png',
					purpose: 'any maskable',
				}],
			});
		},
	}];
};
