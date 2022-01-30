'use strict';

var assert = require('assert');
var async = require('async');
var fs = require('fs');
var path = require('path');

var tutils = require('./tutils');
var _describe = tutils._describe;
var _it = tutils._it;
var bup = tutils.bup;


_describe('helper functions', function() {
	_it('abbrevs', function() {
		assert.deepStrictEqual(
			bup.extradata.abbrevs({}),
			['', '']
		);
		assert.deepStrictEqual(
			bup.extradata.abbrevs({
				team_abbrevs: ['T1', 'T2'],
			}),
			['T1', 'T2']
		);

		// built-in
		assert.deepStrictEqual(
			bup.extradata.abbrevs({
				team_names: ['SC Union Lüdinghausen', 'TV Refrath'],
			}),
			['SCU', 'TVR']
		);
		assert.deepStrictEqual(
			bup.extradata.abbrevs({
				team_names: ['1.BV Mülheim', 'BC Hohenlimburg'],
			}),
			['BVM', 'BCH']
		);
		assert.deepStrictEqual(
			bup.extradata.abbrevs({
				team_names: ['STC Blau-Weiss Solingen', 'SG Ddorf-Unterrath'],
			}),
			['STC', 'SGU']
		);
		assert.deepStrictEqual(
			bup.extradata.abbrevs({
				team_names: ['BV Mülheim 2', 'TV Refrath 2'],
			}),
			['BVM', 'TVR']
		);

		// autogenerated
		assert.deepStrictEqual(
			bup.extradata.abbrevs({
				team_names: ['TSV Neuhausen-Nymphenburg', 'BC Bischmisheim'],
			}),
			['NEU', 'BIS']
		);
		assert.deepStrictEqual(
			bup.extradata.abbrevs({
				team_names: ['TSV Trittau', '1.BC Beuel'],
			}),
			['TRI', 'BEU']
		);
	});

	_it('color', function() {
		assert(!bup.extradata.get_color('FoOBAR'));
		assert(bup.extradata.get_color('BC Bischmisheim 2'));
		assert(bup.extradata.get_color('1. BC Sbr.-Bischmisheim 1'));
		assert(bup.extradata.get_color('TV Refrath 2'));
		assert(bup.extradata.get_color('1.BC Beuel 2'));
	});

	var expect_logos = {
		'SV Fun-Ball Dortelweil': 'svfunballdortelweil',
		'1.BC Beuel': 'bcbeuel',
		'1.BV Mülheim': 'bvmuelheim',
		'SC Union Lüdinghausen': 'unionluedinghausen',
		'1.BC Sbr.-Bischmisheim': 'bcbsaarbruecken',
		'TSV Trittau': 'tsvtrittau',
		'TV Refrath': 'tvrefrath',
		'TSV Neuhausen-Nymphenburg': 'tsvneuhausen',
		'1.BC Wipperfeld': 'bcwipperfeld',
		'TSV 1906 Freystadt': 'tsvfreystadt',
		'TSV Trittau 2': 'tsvtrittau',
		'Blau-Weiss Wittorf-NMS': 'wittorfneumuenster',
		'Hamburg Horner TV': 'hamburghornertv',
		'TV Refrath 2': 'tvrefrath',
		'1.BC Beuel 2': 'bcbeuel',
		'VfB/SC Peine': 'vfbscpeine',
		'1.BV Mülheim 2': 'bvmuelheim',
		'BC Hohenlimburg': 'bchohenlimburg',
		'SG EBT Berlin': 'sgebtberlin',
		'STC Blau-Weiss Solingen': 'stcblauweisssolingen',
		'1.BC Sbr.-Bischmisheim 2': 'bcbsaarbruecken',
		'TV 1884 Marktheidenfeld': 'tvmarktheidenfeld',
		'TV Dillingen': 'tvdillingen',
		'SV GutsMuths Jena': 'svgutsmuthsjena',
		'TuS Wiebelskirchen': 'tuswiebelskirchen',
		'TSV Neubiberg/Ottobrunn 1920': 'tsvneubibergottobrunn',
		'BSpfr. Neusatz': 'bspfrneusatz',
		'SG Schorndorf': 'sgschorndorf',
		'VfB Friedrichshafen': 'vfbfriedrichshafen',
		'SV Fischbach': 'svfischbach',
		'TuS Schwanheim ': 'tusschwanheim',
		'1. BV Maintal': 'bvmaintal',
		'SV Berliner Brauereien': 'berlinerbrauereien',
		'1. CfB Köln': 'cfbkoeln',
	};

	_it('logo associations', function() {
		assert(!bup.extradata.team_logo('FoOBAR'));

		for (var team_name in expect_logos) {
			var logo_name = expect_logos[team_name];
			assert.deepStrictEqual(
				bup.extradata.team_logo(team_name),
				'div/logos/' + logo_name + '.svg');
		}
	});

	_it('logo files present', function(done) {
		var logo_names = Object.values(expect_logos);
		var root_dir = path.dirname(__dirname);

		async.each(logo_names, function(logo_name, cb) {
			var rel_fn = path.join('div', 'logos', logo_name + '.svg');
			var logo_fn = path.join(root_dir, rel_fn);
			fs.stat(logo_fn, function(err, stat) {
				if (err) {
					return cb(err);
				}
				assert(stat.size > 100);
				cb();
			});
		}, done);
	});
});
