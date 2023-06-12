class Insumo{
    id_insumo = '';
    nombre = '';
    costo = '';
    estado = '';
    cantidad = '';
    caducidad = '';
    unidad = '';

    constructor(insumo){
        this.id_insumo = insumo.id_insumo;
        this.nombre = insumo.nombre;
        this.costo = insumo.costo;
        this.estado = insumo.estado;
        this.cantidad = insumo.cantidad;
        this.caducidad = insumo.caducidad;
        this.unidad = insumo.unidad;
    }

}

export default Insumo;