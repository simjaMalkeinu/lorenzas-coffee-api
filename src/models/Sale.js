class Sale {
  idventa = "";
  fecha = "";
  id_registro = "";
  operacion = "";
  productos = [];
  total = "";

  constructor(sale) {
    this.idventa = sale.idventa;
    this.fecha = sale.fecha;
    this.id_registro = sale.id_registro;
    this.operacion = sale.operacion;
    this.total = sale.total;
  }
}

export default Sale;
