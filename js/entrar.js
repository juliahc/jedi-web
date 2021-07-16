var url = 'https://qandf-bd.herokuapp.com/users';
var users = [];
var usuari_act;
var sesio_iniciada=false;

const inici = () => {
    $("#login-question").hide();
    $("#register-form").hide();
}

const borra_alertes = () => {
    $("#alerta-email-existeix").remove();
    $("#alerta-contras").remove();
    $("#alerta-login-incorrecte").remove();
    $("#alerta-login-noexisteix").remove();
    $("#register-ok").remove();
}
const borra_valors = () => {
    console.log("borro valors");
    $("#email").val('');
    $("#contra").val('');
    $("#email-reg").val('');
    $("#contra1").val('');
    $("#contra2").val('');
}

const change_to_login = async () => {
    borra_alertes();
    borra_valors();
    $("#login-form").show();
    $("#register-form").hide();
    $("#login-question").hide();
    $("#register-question").show(); 
}

const change_to_register = async () => {
    borra_alertes();
    borra_valors();
    $("#register-form").show();
    $("#login-form").hide();
    $("#register-question").hide(); 
    $("#login-question").show();
}

const existeix = (email) => {
    return users.find( u => u.email === email);
}

const login = async () => {
    borra_alertes();
    let email = $("#email").val();
    let contra = $("#contra").val();

    let u = existeix(email);
    if(u) {
        console.log("Login - Existeix email", u);
        if (contra === u.password) {
            console.log("Contrasenya correcte");
            sesio_iniciada=true;
            usuari_act=u;
            window.location.replace('../html/botiga.html');
        }
        else {
            console.log("Contrasenya incorrecte");
            $("#alerta-login-incorrecte").remove();
            $("#login-form").prepend(`
                    <div class="alert alert-warning alert-dismissible fade show" role="alert" id="alerta-login-incorrecte">
                        <strong>Alerta!</strong> Contrasenya incorrecta.
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
            `);
        }
    }
    else {
        console.log("Login - NO existeix email");
        $("#alerta-login-noexisteix").remove();
        $("#login-form").prepend(`
                <div class="alert alert-warning alert-dismissible fade show" role="alert" id="alerta-login-noexisteix">
                    <strong>Alerta!</strong> No existeix cap usuari amb aquest email.
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
        `);
    }
}

const register = async () => {
    borra_alertes();
    //event.preventDefault();
    let email = $("#email-reg").val();
    let contra1 = $("#contra1").val();
    let contra2 = $("#contra2").val();
    //mirar que email no exiosteixi encara
    if(existeix(email)) {
        //alerta email ja existeix
        $("#register-form").prepend(`
            <div class="alert alert-warning alert-dismissible fade show" role="alert" id="alerta-email-existeix">
                <strong>Alerta!</strong> Aquest email ja existeix
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `);
        console.log("ja existeix: ", email);
        return false;
    }
    //mirar que contraseñes iguals
    if(contra1 != contra2) {
        //alerta contras diferents
        $("#register-form").prepend(`
            <div class="alert alert-warning alert-dismissible fade show" role="alert" id="alerta-contras">
                <strong>Alerta!</strong> Les contrasenyes no coincideixen
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `);
        console.log("contras diferents");
        return false;
    }
    let user = {
        "email": email,
        "password": contra1
    }
    try {
        ( await axios.post(`${url}`, user));
        console.log("Tot ok");
    } catch (error) {
        console.log(err)
    }
    try {
        users =  ( await axios.get(`${url}`) ).data;
        console.log(users);
    } catch (error) {
        console.log(err);
    }
    borra_valors();
    $("#register-form").prepend(`
        <div class="alert alert-success" role="alert" id="register-ok">
            T'has registrat correctament! Inicia sessió per entrar a la botiga.
        </div>
    `);
}

$( window ).on("load", async () => {
    try {
        users =  ( await axios.get(`${url}`) ).data;
        console.log(users);
    } catch (error) {
        console.log(err)
    }
    inici();
    $("#btn-login-question").on("click", change_to_login);
    $("#btn-register-question").on("click", change_to_register);
    $("#login-form").on("submit", function(event) {
        event.preventDefault();
        login();
    });
    $("#register-form").on("submit", function(event) {
        event.preventDefault();
        register();
    });
})