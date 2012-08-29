/*
Zachery Hernandez
8/30/2012
Get It Back
https://github.com/AlucardFair/AVF/CRUD
*/

//**************************************** Start of Home Page ****************************************//
$('#home').on('pageinit', function() {
	console.log("Home Page Loaded!");
});

//**************************************** Start of About Page ****************************************//
$('#about').on('pageinit', function() {
	console.log("About Page Loaded!");
});

//**************************************** Start of About App Page ****************************************//
$('#aboutApp').on('pageinit', function() {
	console.log("About App Page Loaded!");
});

//**************************************** Start of DateBox Page ****************************************//
$('#jqmdb').on('pageinit', function() {
	console.log("jQM DateBox Page Loaded!");
});

//**************************************** Start of Form Page ****************************************//
$('#addItem').on('pageinit', function() {
	console.log("Form Page Loaded!")

	// After Validation, Save Data to Local Storage //
	function saveData() {
		
		// After Save, Alert User with a Dailog //
		$.mobile.changePage( "#dialogAlert", {
		    transition: "pop",
		    reverse: false,
		    changeHash: false
		});

		// When #alertDialog Loads, Target ID, Clear the Div and Append the Following Save Alert //
		// In A listview with an Anchor Leading to #viewData //
		$('#alert').empty();
		$('#alert').append($('<li>').append($('<a href="#viewData" id="saveAlertLink" data-icon="rightarrow"></a>')
			.append($('<img src="save.png" class="iconImg" />' +
				'<h4>Hooray!</h4>' +
				'<p>Your Loan Has Been Saved!</p>')
		)));
		// Refresh The Dialog listview to Ensure Proper View //
		$('#alert').listview("refresh");
	};

	// Validate Form Using jquery.validate.min.js //
	function validate() {
		$('#loanForm').validate({
			invalidHandler: function(form, validator) {
				// If Errors Are Present, Alert User with a Dailog //
				$.mobile.changePage( "#dialogAlert", {
				    transition: "pop",
				    reverse: true,
				    changeHash: true
				});

				// When #alertDialog Loads, Target ID, Clear the Div and Append the Following Error Alert //
				// In A listview //
				$('#alert').empty();
				$('#alert').append($('<li>').append($('<img src="error.png" class="iconImg" />' +
					'<h4>OOPS!</h4>' +
					'<p>Please fill out all required fields before saving.</p>')
				));
				// Refresh The Dialog listview to Ensure Proper View //
				$('#alert').listview("refresh");
			},
			submitHandler: function() {
				saveData();
			}
		})
	};

	// Call Functions //
	$('#saveData').on("click", validate);

});

//*************************************** Start of Dialog Alert Page ***************************************//
$('#dialogAlert').on('pageshow', function() {
	console.log("Dialog Alert Page Loaded!");
});

//**************************************** Start of View Data Page ****************************************//
$('#viewData').on('pageshow', function() {
	console.log("View Data Page Loaded!");
});

//**************************************** Start of Construction Page ****************************************//
$('#underConstruction').on('pageinit', function() {
	console.log("Construction Page Loaded!");
});