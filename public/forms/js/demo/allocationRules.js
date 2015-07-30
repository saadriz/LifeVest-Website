/**
 * Created by Marwen on 27/07/2015.
 */

var keyValueMapping = {
	"0-27": {
		min: 0,
		max: 27
	},
	"28-32": {
		min: 28,
		max: 32
	},
	"33-37": {
		min: 33,
		max: 37
	},
	"38-42": {
		min: 38,
		max: 42
	},
	"43-47": {
		min: 43,
		max: 47
	},
	"48-52": {
		min: 48,
		max: 52
	},
	"53-57": {
		min: 53,
		max: 57
	},
	"58-63": {
		min: 58,
		max: 63
	},
	"64+": {
		min: 64,
		max: 150
	}
};

var allocationRules = {
	"0-27": {
		"Single Stocks": 20,
		"US Stock ETFs": 20,
		"Intl Developed Markets ETFs": 20,
		"Emerging Markets Stock ETFs": 20,
		"Corporate Bond ETFs": 10,
		"Govt and Municipal Bond ETFs": 8,
		"Intl Bond ETFs": 2
	},
	"28-32": {
		"Single Stocks": 18,
		"US Stock ETFs": 22,
		"Intl Developed Markets ETFs": 18,
		"Emerging Markets Stock ETFs": 18,
		"Corporate Bond ETFs": 10,
		"Govt and Municipal Bond ETFs": 10,
		"Intl Bond ETFs": 4
	},
	"33-37": {
		"Single Stocks": 16,
		"US Stock ETFs": 22,
		"Intl Developed Markets ETFs": 16,
		"Emerging Markets Stock ETFs": 16,
		"Corporate Bond ETFs": 12,
		"Govt and Municipal Bond ETFs": 14,
		"Intl Bond ETFs": 4
	},
	"38-42": {
		"Single Stocks": 14,
		"US Stock ETFs": 22,
		"Intl Developed Markets ETFs": 15,
		"Emerging Markets Stock ETFs": 15,
		"Corporate Bond ETFs": 12,
		"Govt and Municipal Bond ETFs": 18,
		"Intl Bond ETFs": 4
	},
	"43-47": {
		"Single Stocks": 12,
		"US Stock ETFs": 22,
		"Intl Developed Markets ETFs": 14,
		"Emerging Markets Stock ETFs": 14,
		"Corporate Bond ETFs": 12,
		"Govt and Municipal Bond ETFs": 22,
		"Intl Bond ETFs": 4
	},
	"48-52": {
		"Single Stocks": 10,
		"US Stock ETFs": 22,
		"Intl Developed Markets ETFs": 12,
		"Emerging Markets Stock ETFs": 12,
		"Corporate Bond ETFs": 12,
		"Govt and Municipal Bond ETFs": 27,
		"Intl Bond ETFs": 5
	},
	"53-57": {
		"Single Stocks": 8,
		"US Stock ETFs": 22,
		"Intl Developed Markets ETFs": 10,
		"Emerging Markets Stock ETFs": 10,
		"Corporate Bond ETFs": 12,
		"Govt and Municipal Bond ETFs": 33,
		"Intl Bond ETFs": 5
	},
	"58-63": {
		"Single Stocks": 6,
		"US Stock ETFs": 22,
		"Intl Developed Markets ETFs": 10,
		"Emerging Markets Stock ETFs": 10,
		"Corporate Bond ETFs": 12,
		"Govt and Municipal Bond ETFs": 35,
		"Intl Bond ETFs": 5
	},
	"64+": {
		"Single Stocks": 4,
		"US Stock ETFs": 22,
		"Intl Developed Markets ETFs": 10,
		"Emerging Markets Stock ETFs": 9,
		"Corporate Bond ETFs": 12,
		"Govt and Municipal Bond ETFs": 38,
		"Intl Bond ETFs": 5
	}
};