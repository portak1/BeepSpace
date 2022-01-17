import UserController from "../Controllers/UserController";


const userController = new UserController();
export default function UserListUser(props){


    const handleChange = () => userController.getUser().username == props.user ? null : props.handleInputUser(props.user);

    return(
        <div className="text-center userListUser">
            <a onClick={handleChange}><h5 >{props.user}</h5></a>
        </div>
    );    
    
}