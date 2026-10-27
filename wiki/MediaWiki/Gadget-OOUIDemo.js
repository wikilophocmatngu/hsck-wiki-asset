// Title of the demo page, including the namespace.
var demoPageName = "WHSCK:OOUI_demo";

// Because the ResourceLoader refuses to load scripts that use ES6 features,
// the code of the gadget is on the following page and is loaded separately here.
var codePageName = "MediaWiki:Gadget-OOUIDemo/core.js";

if (mw.config.get('wgPageName') === demoPageName.replace(/ /g, '_')) {
	mw.loader.load(mw.config.get('wgScript') + '?' + $.param({ title: codePageName, action: 'raw', ctype: 'text/javascript' }));
}
