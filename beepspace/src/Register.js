import Filter from "./components/Filter";
import { ReactComponent as Logo } from './storage/images/astroLogo.svg';
import $ from 'jquery'
import RequestHandler from "./Handlers/RequestHandler";
import sha256 from "js-sha256";
import ParameterHandler from "./Handlers/ParameterHandler";
const requestHandler = new RequestHandler();

function Register() {
    return (

        <div className="loginApp">
            <Filter filterColor="#000000" backgroundImage="https://images.hdqwalls.com/download/astronaut-waving-hand-minimal-4k-du-1280x800.jpg"></Filter>
            <div class="global-container justify-content-center mx-auto">
                <div class="card card-login login-form">
                    <div class="card-body">
                        <a class="navbar-brand-login text-center" href="">
                            <div class="mx-auto beepLogo"><Logo></Logo></div>

                        </a>
                        <div class="text-center">
                            <h1><div class="row mx-auto text-center"><div className="beep ml-auto">Beep</div><div className="mr-auto">Space</div></div></h1>
                            <h3><div class="row mx-auto mt-5 text-center"><div className="ml-auto mr-2">Registrovat </div><div className="mr-auto">se</div></div></h3>
                        </div>
                        <div class="card-text">
                            <div class="alert alert-danger alert-dismissible fade" id="userExists" role="alert">Uživatel Již existuje</div>
                            <div class="alert alert-danger alert-dismissible fade" id="emptyCredentials" role="alert">Vynechané jméno nebo heslo.</div>
                            <div class="alert alert-danger alert-dismissible fade" id="wrongPass" role="alert">Hesla se neshododují</div>

                            <form method="post" onSubmit={handleThis}>
                               
                                <div class="form-group">
                                    <label for="exampleInputUsername1">Uživatelské jméno</label>
                                    <input type="text" class="form-control form-control-sm" name="USER" id="exampleInputUsername1" required></input>
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputEmail1">E-mail</label>
                                    <input type="text" class="form-control form-control-sm" name="EMAIL" id="exampleInputEmail1" aria-describedby="emailHelp" required></input>
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputPassword1">Heslo</label>
                                    <input type="password" class="form-control form-control-sm" name="PASSWORD" id="exampleInputPassword1" required></input>
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputPassword2">Potvrdit heslo</label>
                                    <input type="password" class="form-control form-control-sm" name="CONFIRM_PASSWORD" id="exampleInputPassword2" required></input>
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputNumber1">Telefonní číslo</label>
                                    <input type="number" class="form-control form-control-sm" name="USER" id="exampleInputNumber1" required></input>
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputDate">Datum narození</label>
                                    <input type="date" class="form-control form-control-sm" name="DATUM" id="exampleInputDate" required></input>
                                </div>

                                <div className="text-center">
                                    Již máte účet? Přihlašte se<a class="text-center" href="../login"> zde
                                    </a>
                                </div>

                                <button type="submit" class="btn btn-edit btn-block">Registrovat</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );



}

function handleThis(event) {
    event.preventDefault();


    if ($("#exampleInputPassword1").val() != $("#exampleInputPassword2").val()) {
        $("#wrongPass").removeClass("fade");
        return;
    }
    let response = requestHandler.jSONrequester("User", [
        new ParameterHandler("username", $("#exampleInputUsername1").val()),
        new ParameterHandler("password", sha256($("#exampleInputPassword1").val())),
        new ParameterHandler("email", $("#exampleInputEmail1").val()),
        new ParameterHandler("number", $("#exampleInputNumber1").val()),
        new ParameterHandler("birth", $("#exampleInputDate").val()),
        new ParameterHandler("type", "REGISTRATION")
    ]);
    if (response.state == "USER_EXIST") {
        $("#userExists").removeClass("fade");
        return;
    }


    relocate("/login")
}


function relocate(location) {
    window.location.replace(location);

}





export default Register;