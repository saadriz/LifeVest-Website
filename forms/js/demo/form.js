/**
 * Created by Marwen on 20/07/2015.
 */

// TODO : need to create a helper function that store into cookies


$(function() {
	// score object
	var score = {
		robo: 0,
		brokerage: 0,
		fa: 0,
		ria: 0
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
	var submitFirstStep = function() {
		form_basic.fadeOut();
		form_basic2.fadeIn();
	};
	// get the first form answers and store them in cookies
	var submitSecondStep = function() {
		form_basic2.fadeOut();
		form_basic3.fadeIn();
	};
	// get the second form answers and store them in cookies
	var submitThirdStep = function() {
		form_basic3.fadeOut();
		form_basic4.fadeIn();
	};
	// get the third form answers and store them in cookies
	// depend on calculated score redirect to the dedicated page
	var submitFourthStep = function() {

	};

	// buttons event triggering
	$("#submitFirstStep").click(submitFirstStep);
	$("#submitSecondStep").click(submitSecondStep);
	$("#submitThirdStep").click(submitThirdStep);
	$("#submitFourthStep").click(submitFourthStep);
});