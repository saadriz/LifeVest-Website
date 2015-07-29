/**
 * Created by Marwen on 20/07/2015.
 */

function _calculateAge(birthday) { // birthday is a date
	var ageDifMs = Date.now() - birthday.getTime();
	var ageDate = new Date(ageDifMs); // miliseconds from epoch
	return Math.abs(ageDate.getUTCFullYear() - 1970);
}

function getAgeInterval(age) {
	var result = "";
	$.each(keyValueMapping, function(index, value) {
		if(age >= value.min && age <= value.max) {
			result = index;
		}
	});
	return result;
}

//read in a form's data and convert it to a key:value object
function getFormData(dom_query) {
	var out = {};
	var s_data = $(dom_query).serializeArray();
	console.debug(s_data);
	//transform into simple data/value object
	for (var i = 0; i < s_data.length; i++) {
		var record = s_data[i];
		out[record.name] = record.value;
	}
	return out;
}

function getSuggestedAccount(score) {
	var max = 0;
	var suggestion = "";
	$.each(score, function (index, value) {
		if (value >= max) {
			max = value;
			suggestion = index;
		}
	});
	return suggestion;
}

function calculateTotal(object, score) {
	$.each(object, function (index, value) {
		console.log(index);
		console.log(value);
		score.robo += scoreRules[index][value].robo;
		score.brokerage += scoreRules[index][value].brokerage;
		score.fa += scoreRules[index][value].fa;
		score.ria += scoreRules[index][value].ria;
	});
}

function calculateTotalScoreForAllCategories(score) {
	var result = 0;
	$.each(score, function(index, value) {
		result += value;
	});
	return result;
}

function prepareAnswer(tmpAnswers, answers) {
	$.each(tmpAnswers, function(index, value) {
		answers.push({
			related_question: index,
			value: value,
			text_value: scoreRules[index][value].textValue
		});
	});
}

$(function () {
	// score object
	var score = {
		ria: 0,
		fa: 0,
		robo: 0,
		brokerage: 0
	};
	var user = {

	};
	var urlServer = "http://localhost:3000";

	// form blocks
	var form_basic = $("#form_basic");
	var form_basic2 = $("#form_basic2");
	var form_basic3 = $("#form_basic3");
	var form_basic4 = $("#form_basic4");

	/**
	 * submit functions
	 */
	// get user information and store it in cookies
	var submitFirstStep = function () {
		user = getFormData($("form.form_basic"));
		user.birth_date =  user.year + "-" + user.month + "-" + user.day;
		user.year_of_birth = user.year;
		$.ajax({
			url: urlServer + "/user",
			data: user,
			crossDomain: true,
			dataType: "json",
			method: "POST"
		}).success(function (res) {
			user._id = res._id;
			form_basic.fadeOut();
			form_basic2.fadeIn();
		}).error(function (res) {
			console.error("Error inserting user informations.")
		});
	};
	// get the first form answers and store them in cookies
	var submitSecondStep = function () {

		//[
		//	{
		//		"related_question": "s1q1",
		//		"value":0,
		//		"text_value": "LOW"
		//	}
		//]

		calculateTotal(getFormData($("form.form_basic2")), score);
		var tmpAnswers = getFormData($("form.form_basic2"));
		var answers = [];
		prepareAnswer(tmpAnswers, answers);
		$.ajax({
			url: urlServer + "/send-answers",
			data:{
				"id": user._id,
				"answers":  JSON.stringify(answers),
				"total_score": calculateTotalScoreForAllCategories(score)
			},
			crossDomain: true,
			dataType: "json",
			method: "POST"
		}).success(function (res) {
			form_basic2.fadeOut();
			form_basic3.fadeIn();
		}).error(function (res) {
			console.error("Error inserting user informations.")
		});
	};
	// get the second form answers and store them in cookies
	var submitThirdStep = function () {
		calculateTotal(getFormData($("form.form_basic3")), score);
		var tmpAnswers = getFormData($("form.form_basic3"));
		var answers = [];
		prepareAnswer(tmpAnswers, answers);
		$.ajax({
			url: urlServer + "/send-answers",
			data:{
				"id": user._id,
				"answers":  JSON.stringify(answers),
				"total_score": calculateTotalScoreForAllCategories(score)
			},
			crossDomain: true,
			dataType: "json",
			method: "POST"
		}).success(function (res) {
			form_basic3.fadeOut();
			form_basic4.fadeIn();
		}).error(function (res) {
			console.error("Error inserting user informations.")
		});
	};
	// get the third form answers and store them in cookies
	// depend on calculated score redirect to the dedicated page
	var submitFourthStep = function () {
		calculateTotal(getFormData($("form.form_basic4")), score);
		var tmpAnswers = getFormData($("form.form_basic4"));
		var answers = [];
		prepareAnswer(tmpAnswers, answers);
		$.ajax({
			url: urlServer + "/send-answers",
			data:{
				"id": user._id,
				"answers":  JSON.stringify(answers),
				"total_score": calculateTotalScoreForAllCategories(score)
			},
			crossDomain: true,
			dataType: "json",
			method: "POST"
		}).success(function (res) {
			$(".form").fadeOut();
			$(".result").fadeIn();
			var radarData = {
				labels: ["Brokerage", "Financial advisor", "Institutional advisor", "Robo advisor"],
				datasets: [
					{
						label: "My First dataset",
						fillColor: "rgba(220,220,220,0.2)",
						strokeColor: "rgba(220,220,220,1)",
						pointColor: "rgba(220,220,220,1)",
						pointStrokeColor: "#fff",
						pointHighlightFill: "#fff",
						pointHighlightStroke: "rgba(220,220,220,1)",
						data: [score.brokerage, score.fa, score.ria, score.robo]
					}
				]
			};
			constructRadarGraph("radarChart", radarData);

			// age calculation
			var age = _calculateAge(new Date(user.birth_date));
			var interval = getAgeInterval(age);
			var doughnutData = [
				{
					value: allocationRules[interval]["Single Stocks"],
					color: "#7FD4FF",
					highlight: "#1ab394",
					label: "Single Stocks"
				},
				{
					value: allocationRules[interval]["US Stock ETFs"],
					color: "#FFAAAA",
					highlight: "#1ab394",
					label: "US Stock ETFs"
				},
				{
					value: allocationRules[interval]["Intl Developed Markets ETFs"],
					color: "#FF2AD4",
					highlight: "#1ab394",
					label: "Intl Developed Markets ETFs"
				},
				{
					value: allocationRules[interval]["Emerging Markets Stock ETFs"],
					color: "#7FFF2A",
					highlight: "#1ab394",
					label: "Emerging Markets Stock ETFs"
				},
				{
					value: allocationRules[interval]["Corporate Bond ETFs"],
					color: "#7F55FF",
					highlight: "#1ab394",
					label: "Corporate Bond ETFs"
				},
				{
					value: allocationRules[interval]["Govt and Municipal Bond ETFs"],
					color: "#AA00FF",
					highlight: "#1ab394",
					label: "Govt and Municipal Bond ETFs"
				},
				{
					value: allocationRules[interval]["Intl Bond ETFs"],
					color: "#D400FF",
					highlight: "#1ab394",
					label: "Intl Bond ETFs"
				}
			];
			constructRecomandedPortfolioGraph("doughnutChart", doughnutData);
			// redirection after submit
			switch (getSuggestedAccount(score)) {
				case "robo":
					$("#result_ROBO").fadeIn();
					break;
				case "ria":
					$("#result_RIA").fadeIn();
					break;
				case "brokerage":
					$("#result_PBA").fadeIn();
					break;
				case "fa":
					$("#result_IFA").fadeIn();
					break;
			}
		}).error(function (res) {
			console.error("Error inserting user informations.")
		});
	};

	// buttons event triggering
	$("#submitFirstStep").click(submitFirstStep);
	$("#submitSecondStep").click(submitSecondStep);
	$("#submitThirdStep").click(submitThirdStep);
	$("#submitFourthStep").click(submitFourthStep);
});


// Helper function generates html options for days, months and years dropdowns
function getBirthdayOptions(type, maxYear, shiftYear) {
	var html = '';
	if(!maxYear) {
		maxYear = 60;
	}
	if(!shiftYear) {
		shiftYear = 0;
	}

	switch (type) {
		case 'days':
			for (var i = 1; i < 32; i++) {
				html += '<option value="' + (i) + '">' + i + '</option>';
			}
			break;
		case 'months':
			var theMonths = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "Derember");
			for (var i = 0; i < 12; i++) {
				html += '<option value="' + (i+1) + '">' + theMonths[i] + '</option>';
			}
			break;
		case 'years':
			var currYear = new Date().getFullYear() - shiftYear;
			var startYear = new Date().getFullYear() - maxYear;

			while ( currYear >= startYear ) {
				html += '<option value="' + currYear + '">' + currYear + '</option>';
				currYear--;
			}
			break;
	}

	return html;
}

// Usage Example, with jQuery
$(document).ready(function () {
	$('#birthdate').html(
		'<select name="month" class="first form-control m-b">' +
		'<option value="" disabled="disabled" selected="selected">Month</option>' + getBirthdayOptions('months') +
		'</select>' +
		'<select name="day" class=" form-control m-b">' +
		'<option value="" disabled="disabled" selected="selected">Day</option>' + getBirthdayOptions('days') +
		'</select>' +
		'<select name="year" class="form-control m-b">' +
		'<option value="" disabled="disabled" selected="selected">Year</option>' + getBirthdayOptions('years') +
		'</select>');
});