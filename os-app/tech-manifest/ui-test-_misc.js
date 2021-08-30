const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('EMLManifest_Misc', function () {

	it('sends json', async function () {
		browser.assert.deepEqual(await (await browser.fetch('http://localhost' + kDefaultRoute.OLSKRoutePath)).json(), {
			name: 'Emoji Log',
			short_name: 'Emoji Log',
			start_url: require('../open-track/controller.js').OLSKControllerRoutes().shift().OLSKRoutePath,
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
	});

});
