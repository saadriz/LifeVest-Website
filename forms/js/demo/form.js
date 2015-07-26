/**
 * Created by Marwen on 20/07/2015.
 */

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
		$.ajax({
			url: "http://localhost:3000/user",
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
			url: "http://localhost:3000/send-answers",
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
			url: "http://localhost:3000/send-answers",
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
			url: "http://localhost:3000/send-answers",
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

			var doughnutData = [
				{
					value: 70,
					color: "#a3e1d4",
					highlight: "#1ab394",
					label: "Stocks"
				},
				{
					value: 20,
					color: "#dedede",
					highlight: "#1ab394",
					label: "Cash"
				},
				{
					value: 10,
					color: "#b5b8cf",
					highlight: "#1ab394",
					label: "Bonds"
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