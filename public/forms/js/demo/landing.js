/**
 * Created by Marwen on 08/08/2015.
 */

$(function () {
		$("#signup_form").submit(function () {
			return false;
		});
		$("#get_early_access_button").click(function () {
			$.ajax({
				url: "/early-access/",
				data: {
					email: $("#email").val()
				},
				dataType: "json",
				method: "POST"
			}).success(function (res) {
				// save user mail
				// redirect to index
				console.log("you have access");
				window.location.href = "/index.html";
				$.cookie('lifvest-email', $("#email").val(), { expires: 365 });
			}).error(function (res) {
				console.error("Error inserting user informations.")
			});
		});
});
