import bcrypt from "bcryptjs";

class User {
    rfc = '';
    correo = '';
    nombre = '';
    apellido_paterno = '';
    apellido_materno = '';
    password = '';
    tipo = '';

  constructor(data){
    this.rfc = data.rfc;
    this.correo = data.correo;
    this.nombre = data.nombre;
    this.apellido_paterno = data.apellido_paterno;
    this.apellido_materno = data.apellido_materno;
    this.tipo = data.tipo;
  }

  encryptPassword = async function (password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  };

  matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };
}

export default User;