import Filter from "./components/Filter";
import { ReactComponent as Logo } from './storage/images/astroLogo.svg';
import ParameterHandler from "./Handlers/ParameterHandler";
import RequestHandler from "./Handlers/RequestHandler";
import $ from 'jquery'
import { sha256 } from "js-sha256";
import UserController from "./Controllers/UserController";

const requestHandler = new RequestHandler();
const userController = new UserController();
function Login() {
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
                        </div>
                        <div class="card-text">

                            <div class="alert alert-danger alert-dismissible fade" id="wrongCredetials" role="alert">Špatné jméno nebo heslo.</div>
                            <form method="post" onSubmit={handleLogin}>
                                <div class="form-group">
                                    <label for="exampleInputEmail1">Jméno</label>
                                    <input type="text" class="form-control form-control-sm" name="SESSION_USER" id="loginUsername" aria-describedby="emailHelp" required></input>
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputPassword1">Heslo</label>
                                    <input type="password" class="form-control form-control-sm" name="PASSWORD" id="loginPassword" required></input>
                                </div>

                                <div className="text-center">
                                    Nemáte účet? Registrujte se<a class="text-center" href="../register"> zde
                                    </a>
                                </div>

                                <button type="submit" class="btn btn-edit btn-block">Přihlásit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );



}


function handleLogin(event) {
    event.preventDefault();

    let response = requestHandler.jSONrequester("User", [
        new ParameterHandler("username", $("#loginUsername").val()),
        new ParameterHandler("password", sha256($("#loginPassword").val()))
    ]);

    if (response.state == "WRONG") {
        $("#wrongCredetials").removeClass("fade");
        return;
    }
    
    userController.logIn(response.name, response.email, response.number, response.birth, response.id);


}




export default Login;