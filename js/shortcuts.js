var shortcuts = (function() {
'use strict';

function ui_init(s) {
	Mousetrap.bind('x', function() {
		if (s.initialized && !s.match.finish_confirmed) {
			control.ui_show_exception_dialog();
		}
	});
	Mousetrap.bind('m', function() {
		if (s.ui.displaymode_visible) {
			settings.toggle_displaymode();
			return;
		}
		if (s.initialized) {
			settings.show();
		}

	});
	Mousetrap.bind('shift+n', function() {
		netstats.show();
	});
	Mousetrap.bind('shift+a', function() {
		if (s.initialized) {
			stats.show();
		}
	});
	Mousetrap.bind('e', function() {
		if (s.initialized) {
			editmode.enter();
		}
	});
	Mousetrap.bind('a', function() {
		s.settings.show_pronounciation = ! s.settings.show_pronounciation;
		if (s.initialized) {
			render.ui_render(state);
		}
		settings.store(state);
	});
	Mousetrap.bind('v', function() {
		editevent.show();
	});
	Mousetrap.bind('s', function() {
		if (s.ui.displaymode_visible) {
			settings.toggle_displaymode();
			return;
		}
		scoresheet.show();
	});
	Mousetrap.bind('shift+s', function() {
		scoresheet.event_show();
	});
	Mousetrap.bind('shift+e', function() {
		i18n.ui_update_state(state, 'en');
	});
	Mousetrap.bind('shift+d', function() {
		i18n.ui_update_state(state, 'de');
	});
	Mousetrap.bind('shift+j', function() {
		importexport.export_json(state);
	});
	Mousetrap.bind('shift+i', function() {
		importexport.import_json(state);
	});
	Mousetrap.bind('shift+x', function() {
		importexport.send_export(state);
	});
	Mousetrap.bind('shift+a', function() {
		displaymode.show();
	});
	Mousetrap.bind('shift+u', function() {
		displaymode.hide();
	});
	Mousetrap.bind('enter', function() {
		if (s.ui.displaymode_visible) {
			settings.toggle_displaymode();
		}
	});
	Mousetrap.bind('space', function() {
		if (s.ui.displaymode_visible) {
			settings.toggle_displaymode();
		}
	});
}

return {
	ui_init: ui_init,
};

})();

/*@DEV*/
if ((typeof module !== 'undefined') && (typeof require !== 'undefined')) {
	var control = require('./control');
	var displaymode = require('./displaymode');
	var editevent = require('./editevent');
	var editmode = require('./editmode');
	var i18n = require('./i18n');
	var importexport = require('./importexport');
	var netstats = require('./netstats');
	var render = require('./render');
	var scoresheet = require('./scoresheet');
	var settings = require('./settings');
	var stats = require('./stats');

	module.exports = shortcuts;
}
/*/@DEV*/