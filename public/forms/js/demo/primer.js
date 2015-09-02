/**
 * Created by Marwen on 30/08/2015.
 */

$(function () {
	$(document).on("click", ".launch_educational_tool", function () {
		var saving = parseFloat($(".saving").val());
		var inflation_rate = 3;
		var invenstment_returns = 7;
		var number_of_year = parseInt($('.number_of_year').val());
		var not_invested_purchasing_power,
			not_invested_paper_value,
			invested_purchasing_power,invested_paper_value;

		$(".modal-body .saving").text( "$" + saving );
		$(".modal-body #number_of_year").text( number_of_year );
		$(".modal-body #inflation_rate").text( inflation_rate + "%" );
		$(".modal-body #investment_returns").text( invenstment_returns + "%" );

		not_invested_paper_value = saving;
		not_invested_purchasing_power = Math.round(not_invested_paper_value / Math.pow(1+inflation_rate/100,number_of_year));
		$(".modal-body .not_invested_paper_value").text("$" + not_invested_paper_value);
		$(".modal-body .not_invested_purchasing_power").text("$" + not_invested_purchasing_power);

		invested_paper_value = Math.round(saving*Math.pow(1+invenstment_returns/100,number_of_year));
		invested_purchasing_power = Math.round(invested_paper_value/Math.pow(1+(inflation_rate/100),number_of_year));
		$(".modal-body .invested_paper_value").text("$" + invested_paper_value);
		$(".modal-body .invested_purchasing_power").text("$" + invested_purchasing_power);
	});
});