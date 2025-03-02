document.addEventListener("DOMContentLoaded", function () {
  const togglePassword = document.getElementById("togglePassword");
  const passwordInput = document.getElementById("floatingPassword");
  const eyeIcon = document.getElementById("eyeIcon");
  var btnDeny = document.getElementById("btnDeny");
  var btnAccept = document.getElementById("btnAccept");

  // Mostrar u ocultar contraseña al hacer clic en el ícono de ojito
  if (togglePassword && passwordInput && eyeIcon) {
    togglePassword.addEventListener("click", () => {
      // Alternar entre texto y contraseña
      const isPassword = passwordInput.getAttribute("type") === "password";
      passwordInput.setAttribute("type", isPassword ? "text" : "password");

      // Cambiar el ícono
      eyeIcon.classList.toggle("bi-eye");
      eyeIcon.classList.toggle("bi-eye-slash");
    });
  }

  // Cookies
  function setCookie(name, value, days) {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }

  function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i].trim();
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  function eraseCookie(name) {
    document.cookie =
      name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  }

  function cookieConsent() {
    if (!getCookie("allowCookies")) {
      var toastEl = document.querySelector(".toast");
      if (toastEl) {
        var toast = new bootstrap.Toast(toastEl, { autohide: false }); //hace que el toast no se cierre solo
        toast.show();
      }
    }
  }

  // Ejecutar al cargar la página para comprobar si ya se aceptaron las cookies
  cookieConsent();

  // Agregar eventos solo si los botones existen
  btnDeny = document.getElementById("btnDeny");
  btnAccept = document.getElementById("btnAccept");

  if (btnDeny) {
    btnDeny.addEventListener("click", () => {
      eraseCookie("allowCookies");
      var toastEl = document.querySelector(".toast");
      if (toastEl) {
        var toast = bootstrap.Toast.getInstance(toastEl);
        toast.hide();
      }
    });
  }

  if (btnAccept) {
    btnAccept.addEventListener("click", () => {
      setCookie("allowCookies", "1", 7);
      var toastEl = document.querySelector(".toast");
      if (toastEl) {
        var toast = bootstrap.Toast.getInstance(toastEl);
        toast.hide();
      }
    });
  }

  // Botón de reseteo solo si existe en la página
  const btnReset = document.getElementById("btnReset");
  if (btnReset) {
    btnReset.addEventListener("click", () => {
      eraseCookie("allowCookies");
      var toastEl = document.querySelector(".toast");
      if (toastEl) {
        var toast = new bootstrap.Toast(toastEl);
        toast.show();
      }
    });
  }

  /*funciones para cargar detalle servicio*/
  if (window.jQuery) {
    console.log("jQuery cargado correctamente.");

    // Mostrar detalles del servicio
    $(".info").click(function () {
      var target = $(this).data("target"); //determinar que tarjeta se ha pulsado
      $("#servicios")
        .addClass("flex-mode ocultar-tarjetas")
        .find(".detalles-servicio")
        .removeClass("show");
      $(target).addClass("show").css("width", "100%"); // Muestra el detalle seleccionado
    });

    // Ocultar detalles y volver al grid
    $(".cerrar-info").click(function () {
      $("#servicios")
        .removeClass("flex-mode ocultar-tarjetas") // Vuelve al grid y muestra las tarjetas
        .find(".detalles-servicio") // Busca todos los detalles
        .removeClass("show"); // Oculta el detalle visible
    });
  } else {
    console.log("jQuery no está cargando");
  }

  /* boton subir */
  var btnSubir = $("#btnSubir");

  $(window).scroll(function () {
    if ($(window).scrollTop() > 300) {
      btnSubir.fadeIn(); //btn desaparece al subir
    } else {
      btnSubir.fadeOut(); //btn aparece al hacer scroll hacia abajo
    }
  });

  btnSubir.click(function () {
    $("html, body").animate({ scrollTop: 0 }, "slow"); //cuando lo pulsas sube suavemente
  });

  //comprobacion de campos vacios en login y contacto
  $("input, textarea").on("blur", function () {
    console.log("test");
    if ($(this).val().trim() === "") {
      $(this).css({
        border: "2px solid #e91f1f",
      });
      $(this).siblings(".error-message").show(); //muestra mensaje de error
    } else {
      $(this).css({
        border: "",
        "background-color": "",
      });
      $(this).siblings(".error-message").hide(); //oculta mensaje de error
    }
  });

  //boton deshabilitado hasta que haya email y contraseña
  //login
  const $emailInput = $("#floatingInput");
  const $passwordInput = $("#floatingPassword");
  const $submitButton = $(".btn-login");
  //contacto
  const $nombre = $("#nombre");
  const $email = $("#email");
  const $telefono = $("#telefono");
  const $mensaje = $("#mensaje");
  const $contactoBtn = $("#btn-contacto");

  // Función login
  function checkLogin() {
    const emailValue = $emailInput.val().trim(); // valor de email
    const passwordValue = $passwordInput.val().trim(); // valor de pwd

    // Habilita el botón
    if (emailValue !== "" && passwordValue !== "") {
      $submitButton.prop("disabled", false); // Habilita el botón
    } else {
      $submitButton.prop("disabled", true); // Deshabilita el botón
    }
  }

  // Función contacto
  function checkInputs() {
    const nombreValue = $nombre.val().trim(); // valor de nombre
    const emailValue = $email.val().trim(); // valor de email
    const telefonoValue = $telefono.val().trim(); // valor de teléfono
    const mensajeValue = $mensaje.val().trim(); // valor de mensaje

    // Habilita el botón
    if (
      nombreValue !== "" &&
      emailValue !== "" &&
      telefonoValue !== "" &&
      mensajeValue !== ""
    ) {
      $contactoBtn.prop("disabled", false); // Habilita el botón
    } else {
      $contactoBtn.prop("disabled", true); // Deshabilita el botón
    }
  }

  //mostrar confirmación de envio de mensaje
  $contactoBtn.click(function (e) {
    const $mensajeEnviado = $(".enviado"); //mensaje de confirmación
    e.preventDefault();

    if (!$contactoBtn.prop("disabled")) {
      $("#formulario-contacto").fadeOut(); //oculta el formulario
      $mensajeEnviado.fadeIn();
      setTimeout(function () {
        $mensajeEnviado.fadeOut();
      }, 5000); //mensaje de confirmación desaparece después de 5 segundos
    }
  });

  // Escucha los eventos de cambio en los campos de entrada
  $emailInput.on("input", checkLogin);
  $passwordInput.on("input", checkLogin);
  $nombre.on("input", checkInputs);
  $email.on("input", checkInputs);
  $telefono.on("input", checkInputs);
  $mensaje.on("input", checkInputs);
});
