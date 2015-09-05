$(document).ready(function() {

	$('.success_main').hide();
	
	$('.sec5').hide();
	
	$.ajax({
		url: "/profile",
			  type: "POST", //send it through get method
			  // data: data,
			  processData: false,
			  contentType: false,
			  success: function(response) {


			  	if(response.status == "no_error"){
			  		$('.img_aside').attr('src',response.profilePic);
			  		$('#bd_txt').val(response.birthdate);
			  		$('#email_txt').val(response.email);
			  		$('#phone_txt').val(response.phone);
			  		$('#credits_txt').val(response.credit);

			  		if($('#credits_txt').val() == 0)
			  			$('#credits_txt').val("Sorry , you have no credit");

			  	}else{
			  		$('#bd_txt').val("");
			  		$('#email_txt').val("");
			  		$('#phone_txt').val("");
			  		$('#credits_txt').val("");
			  	}

			  },
			  error: function(xhr) {
			  	//Algo falló
			  }
			});
	createBoxAjax();

	function get_countries(){
		var country_list = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];
		
		$.each(country_list, function(val, text) {
			$('select').append(
				$('<option></option>').val(val).html(text)
				);  
		});
	}

	function createBoxAjax() {
		$.ajax({
			url: "/box/createBox",
			type: "POST", //send it through get method
			//data: th,

			success: function (response) {
				if (response.status == 'success') {
					get_countries();
					$('.success_main').show();
					$('.sec5').hide();
				} else if (response.status == 'error') {
					$('.success_main').hide();
					$('.sec5').show();
					$('.sec5 small').text(response.error);
				} else {
					$('.success_main').hide();
					$('.sec5').show();
					$('.sec5 small').text("Unknown error");
				}
			},
			error: function (xhr) {
			}

		});
	}

	$('#modal-8 button').on("click", function(){
		$('#modal-8').removeClass('md-show');
		$('#modal-8').addClass('md-hide');
	});


	$( ".suplements a" ).on( "click", function() {

		$.ajax({
			url: "/profile/suplements",
			  type: "POST", //send it through get method
			  // data: data,
			  processData: false,
			  contentType: false,
			  success: function(response) {


			  	if(response.status == "no_error"){
			  		$('#protein_trademark').val(response.protein_trademark);
			  		$('#carbo_trademark').val(response.carbo_trademark);
			  		$('#multivitamin_trademark').val(response.multivitamin_trademark);
			  		$('#creatine_trademark').val(response.creatine_trademark);
			  		$('#magnesium_trademark').val(response.magnesium_trademark);
			  		$('#omega3_trademark').val(response.omega3_trademark);

			  	}else{
			  		$('#protein_trademark').val("");
			  		$('#carbo_trademark').val("");
			  		$('#multivitamin_trademark').val("");
			  		$('#creatine_trademark').val("");
			  		$('#magnesium_trademark').val("");
			  		$('#omega3_trademark').val("");
			  		
			  	}

			  },
			  error: function(xhr) {
			  	//Algo falló
			  }
			});
	});


$( ".benchmark a" ).on( "click", function() {

	$.ajax({
		url: "/profile/benchmark",
			  type: "POST", //send it through get method
			  // data: data,
			  processData: false,
			  contentType: false,
			  success: function(response) {


			  	if(response.status == "no_error"){
			  		$('#fran_txt').val(response.fran);
			  		$('#helen_txt').val(response.helen);
			  		$('#grace_txt').val(response.grace);
			  		$('#fifth50_txt').val(response.fifth50);
			  		$('#fightgonebad_txt').val(response.fightgonebad);
			  		$('#sprint400m_txt').val(response.sprint400m);
			  		$('#run5k_txt').val(response.run5k);

			  	}else{
			  		
			  		$('#fran_txt').val("");
			  		$('#helen_txt').val("");
			  		$('#grace_txt').val("");
			  		$('#fifth50_txt').val("");
			  		$('#fightgonebad_txt').val("");
			  		$('#sprint400m_txt').val("");
			  		$('#run5k_txt').val("");
			  	}

			  },
			  error: function(xhr) {
			  	//Algo falló
			  }
			});
});



$( ".clothes a" ).on( "click", function() {

	$.ajax({
		url: "/profile/clothes",
			  type: "POST", //send it through get method
			  // data: data,
			  processData: false,
			  contentType: false,
			  success: function(response) {


			  	if(response.status == "no_error"){
			  		$('#shoe_trademark').val(response.shoe_trademark);
			  		$('#shoe_model').val(response.shoe_model);
			  		$('#hand_grips_trademark').val(response.hand_grips_trademark);
			  		$('#gloves_trademark').val(response.gloves_trademark);
			  	}else{
			  		$('#shoe_trademark').val("");
			  		$('#shoe_model').val("");
			  		$('#hand_grips_trademark').val("");
			  		$('#gloves_trademark').val("");
			  	}

			  },
			  error: function(xhr) {
			  	
			  }
			});

});

	//Buttons

	$('#more_info form button').on( "click", function(){
		//alert();
		var birthdate = $('#bd_txt').val();
		var email = $('#email_txt').val();
		var phone = $('#phone_txt').val();
		var credits = $('#credits_txt').val();
		
		var file = $('#fileToUpload')[0].files[0];
		var data = new FormData();
		data.append('profilePic',file);
		data.append('birthdate',birthdate);
		data.append('email',email);
		data.append('phone',phone);

		var request = new XMLHttpRequest();
		request.open("POST", "/profile/edit");
		request.onreadystatechange = function (aEvt) {
			if (request.readyState == 4) {
				if(request.status == 200)
					location.reload();
			}
		};

		request.send(data);

	});

	$('#suplements form button').on( "click", function(){
		//alert();
		
		var protein_trademark = $('#protein_trademark').val();
		var carbo_trademark = $('#carbo_trademark').val();
		var multivitamin_trademark = $('#multivitamin_trademark').val();
		var creatine_trademark = $('#creatine_trademark').val();
		var magnesium_trademark = $('#magnesium_trademark').val();
		var omega3_trademark = $('#omega3_trademark').val();

		var data = {'protein_trademark' : protein_trademark, 'carbo_trademark' : carbo_trademark, 'multivitamin_trademark' : multivitamin_trademark, 'creatine_trademark' : creatine_trademark, 'magnesium_trademark': magnesium_trademark, 'omega3_trademark': omega3_trademark};

		$.ajax({
			url: "/profile/suplements/edit",
			  type: "POST", //send it through get method
			  data: data,
			  
			  success: function(response) {
			  	//alert(response);
			  },
			  error: function(xhr) {
			  	//Algo falló
			  	//alert(xhr);
			  }

			});
	});





	$('#clothes form button').on( "click", function(){
		//alert();
		var shoe_trademark = $('#shoe_trademark').val();
		var shoe_model = $('#shoe_model').val();
		var hand_grips_trademark = $('#hand_grips_trademark').val();
		var gloves_trademark = $('#gloves_trademark').val();

		var data = {'shoe_trademark' : shoe_trademark, 'shoe_model' : shoe_model, 'hand_grips_trademark' : hand_grips_trademark, 'gloves_trademark' : gloves_trademark};

		$.ajax({
			url: "/profile/clothes/edit",
			  type: "POST", //send it through get method
			  data: data,
			  
			  success: function(response) {
			  	//alert(response);
			  },
			  error: function(xhr) {
			  	//Algo falló
			  	//alert(xhr);
			  }

			});
	});



	$('#benchmark form button').on( "click", function(){
		//alert();
		var fran = $('#fran_txt').val();
		var helen = $('#helen_txt').val();
		var grace = $('#grace_txt').val();
		var fifth50 = $('#fifth50_txt').val();
		var fightgonebad = $('#fightgonebad_txt').val();
		var sprint400m = $('#sprint400m_txt').val();
		var run5k = $('#run5k_txt').val();




		var data = {'fran' : fran, 'helen' : helen, 'grace' : grace, 'fifth50' : fifth50, 'fightgonebad': fightgonebad, 'sprint400m': sprint400m, 'run5k': run5k};

		$.ajax({
			url: "/profile/benchmark/edit",
			  type: "POST", //send it through get method
			  data: data,
			  
			  success: function(response) {
			  	//alert(response);
			  },
			  error: function(xhr) {
			  	//Algo falló
			  	//alert(xhr);
			  }

			});
	});



	$('#edit button').on( "click", function(){
		//alert();
		var oldPassword = $('#oldPassword').val();
		var newPassword = $('#newPassword').val();
		var newPassword2 = $('#newPassword2').val();

		var th = {'oldPassword': oldPassword, 'newPassword': newPassword};

		$.ajax({
			url: "/profile/change_password",
			  type: "POST", //send it through get method
			  data: th,
			  
			  success: function(response) {
			  	if(response.status == 'no_error') {
			  		$('#modal-8').addClass('md-show');
			  		$('#modal-8 h3').text('Password Changed!')
			  		$('#modal-8 #error').text('Your password has been changed');
			  		
			  	}else{
			  		$('#modal-8').addClass('md-show');
			  		$('#modal-8 h3').text('Oops!! There is an error!')
			  		$('#modal-8 #error').text('Please, Try it again later');

			  	}
			  },
			  error: function(xhr) {
			  	$('#modal-8').addClass('md-show');
			  	$('#modal-8 h3').text('Oops!! There is an error!')
			  	$('#modal-8 #error').text('Please, Try it again later');
			  	
			  }

			});
	});

$('.create_box').on("click",function(){

	createBoxAjax();

});

$('#create').on("click",function(){
	
	var name_txt = $('#name').val();
	var city = $('#city').val();
	var tariffs = $('#tariffs').val();
	var address = $('#address').val();
	var boxPicture = $('#fileToUpload').val();
	var description = $('#description').val();
	var country = $('#country').val();
	var file = $('#fileToUpload')[0].files[0];
	var data = new FormData();

	data.append('boxPicture',file);
	data.append('name',name_txt);
	data.append('city',city);
	data.append('tariffs',tariffs);
	data.append('address',address);
	data.append('country',country);
	data.append('description',description);



	// var request = new XMLHttpRequest();
	// request.open("POST", "/box/createBox/newBox");
	// request.onreadystatechange = function (aEvt) {
	// 	if (request.readyState == 4) {
	// 		if(request.status == 200)
	// 		a=5;
	// 			//location.reload();
	// 	}
	// };
	// request.send(data);


	$.ajax({
			url: "/box/createBox/newBox",
			  type: "POST", //send it through get method
			  data: data,
			  
			  processData: false,
			  contentType: false,
			  
			  success: function(response) {
			  	if(response.status == 'no_error') {
			  		// $('#modal-8').addClass('md-show');
			  		// $('#modal-8 h3').text('Password Changed!')
			  		// $('#modal-8 #error').text('Your password has been changed');
			  		alert("NO HAY ERRORES");
			  	}else{
			  		// $('#modal-8').addClass('md-show');
			  		// $('#modal-8 h3').text('Oops!! There is an error!')
			  		// $('#modal-8 #error').text('Please, Try it again later');
alert("no");
			  	}
			  },
			  error: function(xhr) {
				  alert("NADA");
			  	// $('#modal-8').addClass('md-show');
			  	// $('#modal-8 h3').text('Oops!! There is an error!')
			  	// $('#modal-8 #error').text('Please, Try it again later');
			  	
			  }

			});

});


//search_box

$('#tags').on('input', function() {

	
	if($('#tags').val().length >= 3){

		var	input_txt = $('#tags').val();
		var data = {'query':input_txt};

		$.ajax({
			url: "/box/search",
			type: "POST",
			data: data,
			success: function(response) {

				if(response.status == "no_error"){
					
					$('.result_search_list').empty();

					for(var i=0;i< response.data.length;i++){
						
					var list = "<li><img src='"+response.data[i].boxPicture+"' alt=''/><strong>"+response.data[i].name+"</strong><br><small>Description: "+response.data[i].description+"</small><br><small>Tariffs: "+response.data[i].tariffs+"</small><br><small>City: "+response.data[i].city+"</small><br><small>Country: "+response.data[i].country+"</small><br><small>Address: "+response.data[i].address+"</small><br></li>";

					$('.result_search_list').append(list);
				}

			}

		},
		error: function(xhr) {}
	});
	}
});

/*$('#search_box button').on('click', function() {
	var data = {'email':email};

	$.ajax({
		url: "/admin/search/email",
			  type: "POST", //send it through get method
			  data: data,
			  
			  success: function(response) {
			  	//alert(response.status);
			  	if(response.status == "no_error"){
			  		$('.no_user').addClass('hide');
			  		$('.result_search').removeClass('hide');
			  		
			  		if(response.isOwner == true){
			  			$('.result_search input[type="checkbox"]').attr('checked',true);
			  			$('.content').text('YES');
			  		}else{
			  			$('.result_search input[type="checkbox"]').attr('checked',false);
			  			$('.content').text('NO');
			  		}

			  		$('#username').text(response.username);
			  		$('#email').text(response.email);
			  		$('#bday').text(response.birthdate);
			  		$('#phone').text(response.phone);
			  		$('#country').text(response.country);
			  		$('#numBox').text(response.numBox);
			  		$('#maxBox').val(response.maxBox);

			  		$('.result_search img').attr('src',response.profilePic);

			  	}
			  },
			  error: function(xhr) {}
			});
});

*/


});