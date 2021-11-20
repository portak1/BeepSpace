
export default function ModalUser(params){

    return(

        <div class="row w-100 userLine">
            <div class="col-8">{params.name}</div>
            <div class=" tlacitko col-4"><button class="btn btnPridat btn-success">Přidat</button></div>
            <div class=" tlacitko col-4"><button class="btn btnOdebrat btn-gray">Přátelé</button></div>
        </div>

    );
}