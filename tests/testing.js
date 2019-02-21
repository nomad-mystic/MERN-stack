module.exports = {
	'Demo test Google' : function (browser) {
		browser
			.url('http://www.google.com')
			.waitForElementVisible('body')
			.setValue('input[type=text]', 'nightwatch')
			.waitForElementVisible('input[name=btnK]')
			.click('input[name=btnK]')
			.pause(1000)
			.assert.containsText('#main', 'Night Watch')
			.end();
	},
	'Test user can view login page': function(browser) {
		browser
			.url('http://localhost:')
	},
};
