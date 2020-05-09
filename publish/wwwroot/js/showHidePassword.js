$(".toggle-password").click(function() {

  $(this).toggleClass("fa-eye fa-eye-slash");
  var input = $($(this).attr("toggle"));
  if (input.attr("type") == "password") {
    input.attr("type", "text");
  } else {
    input.attr("type", "password");
  }
});

function forgotPassword() {
 document.getElementById('iniciarSesion').style.display='none';
 document.getElementById('recuperarPassword').style.display='block';
};
function backToLogin() {
 document.getElementById('iniciarSesion').style.visibility='block';
 document.getElementById('recuperarPassword').style.display='none';
};