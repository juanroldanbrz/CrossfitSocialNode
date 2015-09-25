/**
 * Created by root on 16/09/15.
 */
 function validateLoginForm() {
    var username = $("#login input")[0].value;
    var password = $("#login input")[1].value;
    if (username == null || username == "") {
        alert("Username must be filled out");
        return false;
    }
    if (password == null || password == "") {
        alert("Password must be filled out");
        return false;
    }
}

function registerValidateForm() {
    var username = $("#login input")[0].value;
    var password = $("#login input")[1].value;

    if (username == null || username == "") {
        alert("Username must be filled out");
        return false;
    }
    if (password == null || password == "") {
        alert("Password must be filled out");
        return false;
    }
}

function contactValidateForm(){

    var name = $('.form_contact input')[0].value;
    var email = $('.form_contact input')[1].value;
    var txt = $('.form_contact textarea')[0].value;

    if (name == null || name == "") {
        alert("Name and Surname must be filled out");
        return false;
    }

    if (email == null || email == "") {
        alert("Email must be filled out");
        return false;
    }

    if (txt == null || txt == "") {
        alert("Textarea must be filled out");
        return false;
    }
}

function newsletterValidateForm(){
    var news = $('#newsletter input')[0].value;
    if(news == null || news == ""){
       alert("Email must be filled out");
       return false;   
   }
}