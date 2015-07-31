/**
 * Created by Marwen on 20/07/2015.
 */

function _calculateAge(year_of_birth) { // birthday is a date
	var ageDifMs = Date.now() - new Date(year_of_birth).getTime();
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
	var urlServer = "";

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
		user.year_of_birth = user.year;
		console.debug(user.year);
		$("#ss-form").validate({
			rules: {
				email: {
					required: true,
					email: true
				},
				year: {
					required: true
				}
			},
			messages: {
				email: {
					required: "Please enter a valid e-mail address",
					email: "Please enter a valid e-mail address"
				},
				year: {
					required: "Please select your year of birth"
				}
			}
		});
		if($("#ss-form").valid()) {
			$.ajax({
				url: urlServer + "/user/",
				data: user,
				dataType: "json",
				method: "POST"
			}).success(function (res) {
				user._id = res._id;
				form_basic.fadeOut();
				form_basic2.fadeIn();
				window.scrollTo(0, 0);
			}).error(function (res) {
				console.error("Error inserting user informations.")
			});
		}
	};
	// get the first form answers and store them in cookies
	var submitSecondStep = function () {
		calculateTotal(getFormData($("form.form_basic2")), score);
		var tmpAnswers = getFormData($("form.form_basic2"));
		var answers = [];
		prepareAnswer(tmpAnswers, answers);
		$.ajax({
			url: urlServer + "/send-answers/",
			data:{
				"id": user._id,
				"answers":  JSON.stringify(answers),
				"score":  JSON.stringify({
					total: calculateTotalScoreForAllCategories(score),
					brokerage: score.brokerage,
					ria: score.ria,
					fa: score.fa,
					robo: score.robo,
					result: getSuggestedAccount(score)
				})
			},
			dataType: "json",
			method: "POST"
		}).success(function (res) {
			form_basic2.fadeOut();
			form_basic3.fadeIn();
			window.scrollTo(0, 0);
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
			url: urlServer + "/send-answers/",
			data:{
				"id": user._id,
				"answers":  JSON.stringify(answers),
				"score":  JSON.stringify({
					total: calculateTotalScoreForAllCategories(score),
					brokerage: score.brokerage,
					ria: score.ria,
					fa: score.fa,
					robo: score.robo,
					result: getSuggestedAccount(score)
				})
			},
			dataType: "json",
			method: "POST"
		}).success(function (res) {
			form_basic3.fadeOut();
			form_basic4.fadeIn();
			window.scrollTo(0, 0);
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
			url: urlServer + "/send-answers/",
			data:{
				"id": user._id,
				"answers":  JSON.stringify(answers),
				"score": JSON.stringify({
					total: calculateTotalScoreForAllCategories(score),
					brokerage: score.brokerage,
					ria: score.ria,
					fa: score.fa,
					robo: score.robo,
					result: getSuggestedAccount(score)
				})
			},
			dataType: "json",
			method: "POST"
		}).success(function (res) {
			$(".form").fadeOut();
			$(".result").fadeIn();
			window.scrollTo(0, 0);
			var radarData = {
				labels: ["Brokerage", "Institutional FA", "RIA", "Robo-Advisor"],
				datasets: [
					{
						label: "My First dataset",
						fillColor: "rgba(26,179,148,0.2)",
                		strokeColor: "rgba(26,179,148,1)",
                		pointColor: "rgba(26,179,148,1)",
                		pointStrokeColor: "#fff",
                		pointHighlightFill: "#fff",
                		pointHighlightStroke: "rgba(151,187,205,1)",
						data: [score.brokerage, score.fa, score.ria, score.robo]
					}
				]
			};
			constructRadarGraph("radarChart", radarData);

			// age calculation
			var age = _calculateAge(user.year_of_birth);
			console.debug(age);
			var interval = getAgeInterval(age);
			var doughnutData = [
				{
					value: allocationRules[interval]["Single Stocks"],
					color: "#ce697e",
					highlight: "#1ab394",
					label: "Single Stocks"
				},
				{
					value: allocationRules[interval]["US Stock ETFs"],
					color: "#e1a3b0",
					highlight: "#1ab394",
					label: "US Stock ETFs"
				},
				{
					value: allocationRules[interval]["Intl Developed Markets ETFs"],
					color: "#ffc04d",
					highlight: "#1ab394",
					label: "Intl Developed Markets ETFs"
				},
				{
					value: allocationRules[interval]["Emerging Markets Stock ETFs"],
					color: "#d4a3e1",
					highlight: "#1ab394",
					label: "Emerging Markets Stock ETFs"
				},
				{
					value: allocationRules[interval]["Corporate Bond ETFs"],
					color: "#b5b8cf",
					highlight: "#1ab394",
					label: "Corporate Bond ETFs"
				},
				{
					value: allocationRules[interval]["Govt and Municipal Bond ETFs"],
					color: "#dedede",
					highlight: "#1ab394",
					label: "Govt and Municipal Bond ETFs"
				},
				{
					value: allocationRules[interval]["Intl Bond ETFs"],
					color: "#a3e1d4",
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
		maxYear = 85;
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
		'<select name="year" class="form-control m-b">' +
		'<option value="" disabled="disabled" selected="selected">Year</option>' + getBirthdayOptions('years') +
		'</select>');
});