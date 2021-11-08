import { ReactComponent as Logo } from '.././storage/images/astroLogo.svg';
import SidebarUser from './smallComponents/sidebarUser';
import UserController from '../Controllers/UserController';
const userController = new UserController();
function Sidebar(props) {
    return (
        <aside id="sidebar" class="nano">
            <div class="nano-content">
                <div class="row text-center mx-auto">
                <div class="col crossIconCol"><i class="fas fa-times crossIcon"></i></div>
                </div>
                <div class="row text-center mx-auto">

                    <div class="col text-center">
                        
                            <a class="navbar-brand-login text-center" href="">
                        <div class="mx-auto beepLogo"><Logo></Logo></div>

                    </a><br></br><h1>BeepSpace</h1>
                    </div>
                </div>
                <menu class="menu-segment">
                    <ul>
                        <li class="active"><a href="#">Test<span></span></a></li>
                        <li><a href="#">Test</a></li>
                        <li><a href="#">Test</a></li>
                        <li><a href="#">Test</a></li>
                        <li><a href="#">Test</a></li>
                    </ul>
                </menu>
                <div class="separator"></div>
                <div class="menu-segment">
                    <ul class="labels">
                        <li class="title">Role <span class="icon">+</span></li>
                        <li><a href="#">role2 <span class="ball pink"></span></a></li>
                        <li><a href="#">role3 <span class="ball green"></span></a></li>
                        <li><a href="#">role4 <span class="ball blue"></span></a></li>
                    </ul>
                </div>
                <div class="separator"></div>
                <div class="menu-segment">
                    <ul class="chat">
                        <li class="title">Chat <span class="icon">+</span></li>
                        <SidebarUser user={userController.getUser().username} reciever="petrPepega"/>
                        <li><a href="#"><span class="ball pink"></span>Jan Mráz</a></li>
                        <li><a href="#"><span class="ball blue"></span>Daniel Seiner</a></li>
                        <li><a href="#" class="italic-link">zobrazit offline list</a></li>
                    </ul>
                </div>
                <div class="bottom-padding"></div>
            </div>
        </aside>
    );

}


export default Sidebar;


