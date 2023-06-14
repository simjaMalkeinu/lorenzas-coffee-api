class Product{
    nombre ='';
    cantidad = 0;
    caducidad ='';
    canmin = '';
    costo = '';
    precio_venta = '';
    unidad = '';
    insumos = [];

    constructor(producto){
        this.nombre = producto.nombre;
        this.cantidad = producto.cantidad;
        this.caducidad = producto.caducidad;
        this.canmin = producto.canmin;
        this.costo = producto.costo;
        this.precio_venta = producto.precio_venta;
        this.unidad = producto.unidad;
    }

}

export default Product;