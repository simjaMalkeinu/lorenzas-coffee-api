class Registro {
  id_registro = "";
  rfc_usuario = "";
  id_operacion = "";

  constructor(registro) {
    this.id_registro = registro.id_registro;
    this.rfc_usuario = registro.rfc_usuario;
    this.id_operacion = registro.id_operacion;
  }
}

export default Registro;
