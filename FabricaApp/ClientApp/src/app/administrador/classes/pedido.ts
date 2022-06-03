import { Producto } from "./producto";
import { Usuario } from "./usuario";

export class Pedido {
    id: number = 0;
    idUsuario?: number;
    idProducto?: number;
    pdVrUnit?: number;
    pedCant?: number;
    subTot?: number;
    pedIVA?: number;
    pedTotal?: number;

    usuario?: Usuario;
    producto?: Producto
}