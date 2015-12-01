$(document).ready(function() {

	var isOwner;
	var currentSet = 0;
	showBox();

	$('.success_main').hide();

	$('.sec5').hide();

	$.ajax({
		url: "/profile",
type: "POST", //send it through get method
data: { '_csrf':	$("#csrfToken").val()},
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
//showListBoxes();

function get_countries(){
	var country_list = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];

	$.each(country_list, function(val, text) {
		$('#country').append(
			$('<option></option>').val(val).html(text)
			);  
	});	
}


function createBoxAjax() {
	$.ajax({
		url: "/box/createBox",

type: "POST", //send it through get method
		data: { '_csrf':	$("#csrfToken").val()},

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
		data: { '_csrf':	$("#csrfToken").val()},
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
		data: { '_csrf':	$("#csrfToken").val()},
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
		data: { '_csrf':	$("#csrfToken").val()},
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

var data = {'_csrf':	$("#csrfToken").val(),'protein_trademark' : protein_trademark, 'carbo_trademark' : carbo_trademark, 'multivitamin_trademark' : multivitamin_trademark, 'creatine_trademark' : creatine_trademark, 'magnesium_trademark': magnesium_trademark, 'omega3_trademark': omega3_trademark};


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

var data = {'_csrf':	$("#csrfToken").val(),'shoe_trademark' : shoe_trademark, 'shoe_model' : shoe_model, 'hand_grips_trademark' : hand_grips_trademark, 'gloves_trademark' : gloves_trademark};

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




var data = {'_csrf':	$("#csrfToken").val(),'fran' : fran, 'helen' : helen, 'grace' : grace, 'fifth50' : fifth50, 'fightgonebad': fightgonebad, 'sprint400m': sprint400m, 'run5k': run5k};

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

var th = {'oldPassword': oldPassword, 'newPassword': newPassword,'_csrf':	$("#csrfToken").val()};

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
	data.append('_csrf',$("#csrfToken").val());
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
// 	if (request.readyState == 4) {¡
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

$('#adm_bx').on("click", function(){

	showListBoxes();
});

//search_box

$('#tags').on('input', function() {


	if($('#tags').val().length >= 3){

		var	input_txt = $('#tags').val();
		var data = {'query':input_txt,'_csrf':	$("#csrfToken").val()};
		var status;

		$.ajax({
			url: "/box/search",
			type: "POST",
			data: data,
			success: function(response) {

				if(response.status == "no_error"){

					$('.result_search_list').empty();

					for(var i=0;i< response.data.length;i++){
						if(response.data[i].following == true){
							status = "FOLLOWING";
						}else{
							status = "JOIN";
						}	
						var list = "<li id="+response.data[i].id+"><button class='btn_follow'>"+status+"</button><img src='"+response.data[i].boxPicture+"' alt=''/><strong>"+response.data[i].name+"</strong><br><small>Description: "+response.data[i].description+"</small><br><small>Tariffs: "+response.data[i].tariffs+"</small><br><small>City: "+response.data[i].city+"</small><br><small>Country: "+response.data[i].country+"</small><br><small>Address: "+response.data[i].address+"</small><br></li>";

						$('.result_search_list').append(list);
					}

				}

			},
			error: function(xhr) {}
		});
	}
});





$(".result_search_list").on("click","button",function(){

	var id = $(this).parent('li').attr("id");
	var data = {'id':id,'_csrf':	$("#csrfToken").val()};
	var $this = $(this);

	$.ajax({
		url: "/box/followAndUnfollowBox",
		type: "POST",
		data: data,
		success: function(response) {

			if(response.status == "followed"){
				$this.parent('li').children('button').text("FOLLOWING");
			}else if(response.status == "unfollowed"){
				$this.parent('li').children('button').text("JOIN");
			}
		},
		error: function(xhr) {}
	});

});

$('#list_members').on("click",function(){


	$.ajax({
		url: "/box/currentBox/members",
		type: "POST",
//data: data,
success: function(response) {

	if(response.status=="no_error"){
		$('.members-list').empty();

		for(var i=0;i< response.data.length;i++){
			isVerified = response.data[i].isVerified;

			if(!window.isOwner && isVerified)
				var list = "<li><img src="+response.data[i].profilePic+"><strong id="+response.data[i].id+">"+response.data[i].fullName+"</strong><small>, "+response.data[i].age+" años</small><span class='right_panel'><i class='fa fa-check green_v'></i><small>User verified</small><br></span><br><i style='color:#888' class='fa fa-map-marker'></i><small>"+response.data[i].country+"</small></li>";
			else if (!window.isOwner)
				var list = "<li><img src="+response.data[i].profilePic+"><strong id="+response.data[i].id+">"+response.data[i].fullName+"</strong><small>, "+response.data[i].age+" años</small><span class='right_panel'><i class='fa fa-remove red_v'></i><small>User not verified</small><br></span><br><i style='color:#888' class='fa fa-map-marker'></i><small>"+response.data[i].country+"</small></li>";

			else if(isVerified){
				var list = "<li><img src="+response.data[i].profilePic+"><strong id="+response.data[i].id+">"+response.data[i].fullName+"</strong><small>, "+response.data[i].age+" años</small><span class='right_panel'><i class='fa fa-check green_v'></i><small>User verified</small><br><button>KICK</button><button id='btn_unverify'>UNVERIFY</button></span><br><i style='color:#888' class='fa fa-map-marker'></i><small>"+response.data[i].country+"</small></li>";
			}else{
				var list = "<li><img src="+response.data[i].profilePic+"><strong id="+response.data[i].id+">"+response.data[i].fullName+"</strong><small>, "+response.data[i].age+" años</small><span class='right_panel'><i class='fa fa-remove red_v'></i><small>User not verified</small><br><button>KICK</button><button id='btn_verify'>VERIFY</button></span><br><i style='color:#888' class='fa fa-map-marker'></i><small>"+response.data[i].country+"</small></li>";
			}
			$('.members-list').append(list);
		}
	}
},
error: function(xhr) {}
});

});


$('.members-list').on('click','#btn_verify',function(){

	var $this = $(this);
	var id = $this.parents('li').find('strong').attr('id');
	var data = {'id':id,'_csrf':	$("#csrfToken").val()};

	$.ajax({
		url: "/box/user/verify",
		type: "POST",
		data: data,
		success: function(response) {

			if(response.status == 'no_error'){

				$this.parents('li').find('.right_panel i').removeClass('fa-remove').addClass('fa-check');
				$this.parents('li').find('.right_panel i').removeClass('red_v').addClass('green_v');
				$this.parents('li').find('.right_panel small').text("User verified");
				$this.parents('li').find('#btn_verify').attr('id','btn_unverify');
				$this.parents('li').find('#btn_verify').text("UNVERIFY");

			}
		},
		error: function(xhr) {}
	});
});


$('.members-list').on('click','#btn_unverify',function(){

	var $this = $(this);
	var id = $this.parents('li').find('strong').attr('id');
	var data = {'id':id,'_csrf':	$("#csrfToken").val()};

	$.ajax({
		url: "/box/user/unverify",
		type: "POST",
		data: data,
		success: function(response) {

			if(response.status == 'no_error'){

				$this.parents('li').find('.right_panel i').removeClass('fa-check').addClass('fa-remove');
				$this.parents('li').find('.right_panel i').removeClass('green_v').addClass('red_v');
				$this.parents('li').find('.right_panel small').text("User no verified");
				$this.parents('li').find('#btn_unverify').attr('id','btn_verify');
				$this.parents('li').find('#btn_verify').text("VERIFY");

			}
		},
		error: function(xhr) {}
	});
});
function showBox(){
	$.ajax({
		url: "/box/currentBox",
		type: "POST",
		data: { '_csrf':	$("#csrfToken").val()},
		success: function(response) {
			if(response.status == "no_error"){
				$('#picture_box').attr('src',response.box.boxPicture);
				$('#name_box').text(response.box.name);
				$('#members_box').text(response.box.members+" members");
//$('#description_box').text(response.box.description);
$('#description_box').text("Este bloque mostrará una breve información acerca del box");

$('#city_box').text(response.box.address+", "+response.box.city+" ("+response.box.country+") ");

if(response.box.isOwner){
	window.isOwner = true;
	$('.create_training').show();
}else{
	window.isOwner = false;
	$('.create_training').hide();
}

//tariffs

//address

}
},
error: function(xhr) {}
});
}

$('.current_box').on('click',function(){
	showBox();
});


$('#add').on('click',function(){
	currentExercise=0;
	currentSet++;

	console.log("add set"+currentSet);




	var set = '<li id="set'+currentSet+'"><div class="col_12"><div class="sets_tmp"></div><div class="exc"><div id="exercise"><div class="col_12"><p>Configure excercise</p>	</div><div class="col_8"><select id="input_select_'+currentExercise+'-'+currentSet+'"></select></div><div class="col_4 blank"></div><div class="col_12"><textarea class="txt-area" placeholder="Info (Optional)" id="input_info_exc"></textarea></div><div class="col_12" id="template_ex_'+currentExercise+'-'+currentSet+'"></div><div class="col_8"></div></li>';

//busca sets_tmp (Class)
var tmp_set = '<div class="col_8"><input type="text" value="SET #'+currentSet+'" id="input_set"></div><div class="col_4"></div></div><div class="col_6"><input type="text" placeholder="Time"/></div><div class="col_6"><input type="number" placeholder="Repeats" /></div><div class="col_12"><textarea class="txt-area" placeholder="Info (Optional)" id="input_info_set"></textarea></div>';


var btn = '<div class="col_4"><button id="add_exc">Add excercise</button><button id="remove_exc">Remove excercise</button></div>';

//apend set
//var set = '<li id="set"><div class="col_12"><div class="sets_tmp"></div><div class="exc"><div id="exercise_0"><div class="col_12"><p>Configure excercise</p>	</div><div class="col_8"><select id="input_select_'+currentExercise+'-'+currentSet+'"></select></div><div class="col_4"></div><div class="col_12"><textarea class="txt-area" placeholder="Info (Optional)" id="input_info_exc"></textarea></div><div class="col_12" id="template_ex_'+currentExercise+'-'+currentSet+'"></div><div class="col_8"></div><div class="col_4"><button id="add_exc">Add excercise</button><button id="remove_exc">Remove excercise</button></div></li>';

//busca sets_tmp (Class)
//var tmp_set = '<div class="col_8"><input type="text" value="SET #'+currentSet+'" id="input_set"></div><div class="col_4"></div></div><div class="col_6"><input type="text" placeholder="Time"/></div><div class="col_6"><input type="number" placeholder="Repeats" /></div><div class="col_12"><textarea class="txt-area" placeholder="Info (Optional)" id="input_info_set"></textarea></div>';

//apend set

$("#ul_training").append(set);
//el selector [1] deberia ser un this que haga referencia a ese elemento actual

var selector = $('#ul_training').find('.sets_tmp')[currentSet]

$(selector).append(tmp_set);
var place = $("#ul_training li")[currentSet];
$(place).append(btn);

addExerciseToList();

});

$('#remove').on('click',function(){
	if($( "#ul_training li" ).size() > 1){
		$('#ul_training li:last').remove();
		currentSet--;

	}
});
$('#ul_training').on('click','#add_exc',function(){
	var $this = $(this);	
	var template = $this.parents('li').find('.exc');
//var content = '<div id="exercise_0"><div class="col_12"></div><div class="col_8"><select><option id="one">Excercise</option></select></div><div class="col_4"></div><div class="col_12"><textarea class="txt-area" placeholder="Info (Optional)"></textarea></div><div class="col_12"><input type="number" placeholder="Name " disabled><input type="number" placeholder="Value"><strong>Kg/m</strong></div><div class="col_12 others"><input type="text" style="margin-left:40px;height:30px;" placeholder="Name others" disabled /><input type="number" style="height:30px;padding:0;padding-left:5px" placeholder="Value"><strong>Kg/m</strong></div></div>';
var content = '<div id="exercise"><div class="col_12"></div><div class="col_8"><select id="input_select_'+currentExercise+'-'+currentSet+'"></select></div><div class="col_4 blank"></div><div class="col_12"><textarea class="txt-area" placeholder="Info (Optional)" id="input_info_exc"></textarea></div><div class="col_12" id="template_ex_'+currentExercise+'-'+currentSet+'"></div>';
$(template).append(content);
addExerciseToList();

});

$('#ul_training').on('click','#remove_exc',function(){
	var query = $(this).parent().parent().find(".exc #exercise");

	if(query.length > 1){
		var selected = query[query.length-1];
		$(selected).remove();
		currentExercise--;
	}


});


var input_tmp=0;
var currentExercise=0;

var first = true;

$('.create_training').on('click',function(){



	var set = '<li id="set'+currentSet+'"><div class="col_12"><div class="sets_tmp"></div><div class="exc"><div id="exercise"><div class="col_12"><p>Configure excercise</p>	</div><div class="col_8"><select id="input_select_'+currentExercise+'-'+currentSet+'"></select></div><div class="col_4 blank"></div><div class="col_12"><textarea class="txt-area" placeholder="Info (Optional)" id="input_info_exc"></textarea></div><div class="col_12" id="template_ex_'+currentExercise+'-'+currentSet+'"></div><div class="col_8"></div></li>';
//busca sets_tmp (Class)
var tmp_set = '<div class="col_8"><input type="text" value="SET #'+currentSet+'" id="input_set"></div><div class="col_4"></div></div><div class="col_6"><input type="text" placeholder="Time"/></div><div class="col_6"><input type="number" placeholder="Repeats" /></div><div class="col_12"><textarea class="txt-area" placeholder="Info (Optional)" id="input_info_set"></textarea></div>';

var btn = '<div class="col_4"><button id="add_exc">Add excercise</button><button id="remove_exc">Remove excercise</button></div>';

//apend set

$("#ul_training").append(set);
$('#ul_training').find('.sets_tmp').append(tmp_set);

var place = $("#ul_training li")[currentSet];
$(place).append(btn);


if(first){
	$.ajax({
		url: "/trainings/getExerciseList",
type: "POST", //send it through get method
data: { '_csrf':	$("#csrfToken").val()},
success: function (response) {
	if(response.status == 'no_error'){
		window.exerciseList = response.data;
		addExerciseToList();
	}
},
error: function (xhr) {
}

});
}

else addExerciseToList();





});

function addExerciseToList(){
	var excercise_tmp = '<div class="col_12"><input type="text" placeholder="Name "  disabled><input type="number" placeholder="Value" ><strong>Kg/m</strong></div><div id="others_tmp"></div></div></div>';
//template others (others_tmp)
var other_tmp = '<div class="col_12 others" id="others_status"><input type="text" style="margin-left:40px;" placeholder="Name others" disabled /><input type="number" style="padding:0;padding-left:5px" placeholder="Value" ><strong>Kg/m</strong></div>';
$("#template_ex_"+currentExercise+'-'+currentSet).append(excercise_tmp);
for(var i=0;i< window.exerciseList.length;i++){
	$('#input_select_'+currentExercise+'-'+currentSet).append(
		$('<option></option>').val(i).html(window.exerciseList[i].exerciseName)
		);
}


$('#input_select_'+currentExercise+'-'+currentSet).change(function(){
	var selected_id =$(this).find("option:selected").attr("value");
	$(this).parents("div#exercise").find("#template_ex_"+$(this).attr("id").split("_")[2]+" #others_tmp").empty();
	$(this).parents("div#exercise").find("#template_ex_"+$(this).attr("id").split("_")[2]+" .col_12 input")[0].value = window.exerciseList[selected_id].exerciseName;
	$(this).parents("div#exercise").find("#template_ex_"+$(this).attr("id").split("_")[2]+" .col_12 strong")[0].textContent = window.exerciseList[selected_id].measure;

	for(var i=0;i< window.exerciseList[selected_id].others.length;i++) {
		$(this).parents("div#exercise").find("#template_ex_"+$(this).attr("id").split("_")[2]+" #others_tmp").append(other_tmp);
		$(this).parents("div#exercise").find("#template_ex_"+$(this).attr("id").split("_")[2]+" #others_tmp").children().last().find("input")[0].value = window.exerciseList[selected_id].others[i].name;
		$(this).parents("div#exercise").find("#template_ex_"+$(this).attr("id").split("_")[2]+" #others_tmp").children().last().find("strong")[0].textContent = window.exerciseList[selected_id].others[i].measure;

	}
});
currentExercise++;
first = false;


}



function sendTraining(){


	var send = {
		name:$("#input_training_name")[0].value,
		date:$("#input_date")[0].value,
		maxPeople : $("#input_max_people")[0].value,
		description : $("#input_textarea_training")[0].value,
		level: $("#input_level")[0].value,
		sets: [],
		'_csrf':	$("#csrfToken").val()
	};

	var setArray = [];
	for (var h=0;h<=currentSet;h++){
		setArray.push({
			name: $("#set"+h+" #input_set")[0].value,
			type: "default",
			time: $('#set'+h+' input')[1].value,
			repetitions: $('#set'+h+' input')[2].value,
			exercises : [],
			info: $("#set"+h+" #input_info_set")[0].value
		});
		numExercises = $("#set"+h+" .exc #exercise").length;
		var exercises = [];

		for(var i=0;i<numExercises;i++){
			var eid = $("#set"+h+" .exc #exercise")[i];
			otherValue = [];
			for(var j=0;j< $(eid).find("#others_tmp #others_status").length; j++){
				otherValue.push($(eid).find('#others_tmp #others_status input[type="number"]')[j].value)
			}
			exercises.push({
				exerciseId : window.exerciseList[parseInt($("#set"+h+" .exc #exercise .col_8 select option:selected")[i].value)].id,
				exerciseValue: $(eid).find('.col_12 .col_12 input[type="Number"]')[0].value,
				exerciseInfo: $(eid).find('#input_info_exc')[0].value,
				others : otherValue,
//wantToBePosted : true  (O false, este valor será el valor del checkbox y se deberá de coger como los otros
});
		}
		setArray[h].exercises = exercises;


	}
	send.sets =  setArray;
	$.ajax({
		url: "/trainings/addTraining",
type: "POST", //send it through get method
data: send,
//  data: data,
success: function(response) {
	alert("TODO OK");

},
error: function(xhr) {
//Algo falló
}
});
}
var option_val;

$('#date-t').change(function(){
	var quer = window.dateList[$("#date-t").find("option:selected").attr("value")].id;
	option_val = $("#date-t").find("option:selected").val();
//console.log(option_val);

$.ajax({
	url: "/trainings/getTraining",
type: "POST", //send it through get method
data:{query:quer,'_csrf':	$("#csrfToken").val()},
success: function(response) {


	$(".sets-data").remove()
	var trainingList = response.data;
	addTrainingToList(trainingList);


	addSetToList(trainingList);
},
error: function(xhr) {
//Algo falló
}
});

});

function addTrainingToList(trainingList){

	$('#name_info').text(trainingList.name);
	$('#info_info').text(trainingList.description);
	$('#level_info').text("Level: "+trainingList.level);
	$('#max_people_info').text("Max people: "+trainingList.maxPeople);

}

// var number_head = 0;

function addSetToList(trainingList){
//Template sets
for(var i=0;i< trainingList.sets.length;i++){
	var tmp_sets = '<div class="sets-data"><div class="col_12" style="background-color:#2d2b2a;padding:5px">'+trainingList.sets[i].name+'</div><div class="col_4"><p>Time: '+trainingList.sets[i].time+'</p></div><div class="col_4"><p>Repeats: '+trainingList.sets[i].repetitions+'</p></div><div class="col_12"><p>'+trainingList.sets[i].info+'</p></div></div>';
	$('#tmp-training').append(tmp_sets);
	var append = $("#tmp-training .sets-data")[$("#tmp-training .sets-data").length-1];
	var tmp_head_exc = '<div id="head_ex" class="col_12" style="background-color:#2d2b2a;padding:5px">Excercise</div>';

	$(append).append(tmp_head_exc)

//Exc
for(var j=0;j<trainingList.sets[i].exercises.length;j++){
	
	var tmp_exc = '<div class="exc-data"><div id="container-head"></div><div class="col_3"><p>'+trainingList.sets[i].exercises[j].exerciseName+'</p></div><div class="col_3"><p>'+trainingList.sets[i].exercises[j].value+' '+trainingList.sets[i].exercises[j].measure+'</p></div><div class="col_6"><p>'+trainingList.sets[i].exercises[j].info+'</p></div><div class="col_12 tp-others" style="font-weight:700"></div></div>';
	var pos = $("#tmp-training .sets-data")[$("#tmp-training .sets-data").length-1];

	$(pos).append(tmp_exc);	
	
	// if(number_head == 0){
		// number_head++;
	// }

//Others
for(var k=0;k<trainingList.sets[i].exercises[j].others.length;k++){
	var other_tmp = '<div class="col_2 others" id="others_status"><p>'+trainingList.sets[i].exercises[j].others[k].name+'</p></div><div class="col_10 others"><p>'+trainingList.sets[i].exercises[j].others[k].value+' <span style="color:#ec1717;>'+trainingList.sets[i].exercises[j].others[k].measure+'</span></p></div>';
	$('.tp-others').append(other_tmp);
}
}

}



}



$('#save_all').on('click',function(){
	sendTraining();

	var t_maxpeople = $('#input_max_people').val();
	var t_input_level = $('#input_level').val();
	var t_date = $('#input_date').val();
	var t_info = $('#input_textarea_training').val();

	var t_set = $('#input_set').val();
	var t_info_set = $('#input_info_set').val();
	var t_select = $('#input_select').val();
	var t_info_exc = $('#input_info_exc').val();

	var t_name_exc = $('input_name_exc').val();
	var t_value_exc = $('#input_value_exc').val();
	var t_input_measure = $('input_measure').text();

	var t_name_others = $('input_name_others').val();
	var t_value_others = $('input_value_others').val();
	var t_measure_others = $('input_measure_others').text();

	$.ajax({
		url: "/profile",
type: "POST", //send it through get method
data: { '_csrf':	$("#csrfToken").val()},
success: function(response) {




},
error: function(xhr) {
//Algo falló
}
});

});


function fillDate(dateList){

	for(var i=0;i< window.dateList.length;i++){
		$('#date-t').append(
			$('<option></option>').val(i).html(window.dateList[i].date)
			);
	}
}

function getTrainingDateList(){

	$.ajax({
		url: "/trainings/getTrainingList",
type: "POST", //send it through get method
data: { '_csrf':	$("#csrfToken").val()},
success: function(response) {

	window.dateList = response.data;
	fillDate(window.dateList);	

},
error: function(xhr) {
//Algo falló
}
});


}


$('#my_box').on('click',function(){
//Template training
var tmp_training = '<div class="training-data"><div class="col_12" style="background-color:#2d2b2a;padding:5px">INFO</div><div class="col_12 traing"><div class="col_4"><p id="name_info"></p></div><div class="col_4"><p id="level_info"></p></div><div class="col_4"><p id="max_people_info"></p></div><div class="col_12"><p id="info_info">Info</p></div></div></div>';

getTrainingDateList();

$('#tmp-training').append(tmp_training);

});
});
