
export default function ModalUser(params){
    var button = null;
    console.log(params.friendsState)


    if(!params.friendsState){
        button = <div class=" tlacitko col-4"><button class="btn btnPridat btn-success">Přidat</button></div>;
        
 }else{
       button = <div class="tlacitko col-4"><button class="btn btnOdebrat btn-gray">Přátelé</button></div>;
    }

    return(

        <div class="row w-100 userLine">
            <div class="col-8">{params.name}</div>
            {button}
            </div>

    );
}