-- Schema cafeteria
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `cafeteria` DEFAULT CHARACTER SET utf8 ;
USE `cafeteria` ;

-- -----------------------------------------------------
-- Table `cafeteria`.`empleado`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cafeteria`.`empleado` (
  `id_empleado` INT NOT NULL AUTO_INCREMENT,
  `correo` VARCHAR(45) NULL,
  `contraseña` VARCHAR(45) NULL,
  `nombre` VARCHAR(45) NULL,
  `apellido_paterno` VARCHAR(45) NULL,
  `apellido_materno` VARCHAR(45) NULL,
  `tipo_empleado` VARCHAR(45) NULL,
  PRIMARY KEY (`id_empleado`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cafeteria`.`reporte`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cafeteria`.`reporte` (
  `id_reporte` INT NOT NULL AUTO_INCREMENT,
  `mes` INT NULL,
  `fecha_expedicion` DATE NULL,
  `empleado` INT NULL,
  PRIMARY KEY (`id_reporte`),
  INDEX `reporte_empleado_idx` (`empleado` ASC) VISIBLE,
  CONSTRAINT `reporte_empleado`
    FOREIGN KEY (`empleado`)
    REFERENCES `cafeteria`.`empleado` (`id_empleado`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cafeteria`.`insumo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cafeteria`.`insumo` (
  `id_insumo` INT NOT NULL,
  `nombre` VARCHAR(45) NULL,
  `precio_venta` FLOAT NULL,
  `precio_compra` FLOAT NULL,
  `estado` VARCHAR(45) NULL,
  `cantidad` FLOAT NULL,
  `caducidad` DATE NULL,
  PRIMARY KEY (`id_insumo`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cafeteria`.`producto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cafeteria`.`producto` (
  `id_producto` INT NOT NULL AUTO_INCREMENT,
  `insumo` INT NULL,
  `nombre` VARCHAR(45) NULL,
  `caducidad` DATE NULL,
  `cantidad` FLOAT NULL,
  `estado` VARCHAR(45) NULL,
  `precio_compra` FLOAT NULL,
  `precio_venta` FLOAT NULL,
  PRIMARY KEY (`id_producto`),
  INDEX `producto_insumo_idx` (`insumo` ASC) VISIBLE,
  CONSTRAINT `producto_insumo`
    FOREIGN KEY (`insumo`)
    REFERENCES `cafeteria`.`insumo` (`id_insumo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cafeteria`.`registro`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cafeteria`.`registro` (
  `id_registro` INT NOT NULL AUTO_INCREMENT,
  `id_producto` INT NULL,
  `tipo_registro` VARCHAR(45) NULL,
  `id_empleado` INT NULL,
  PRIMARY KEY (`id_registro`),
  INDEX `registro_producto_idx` (`id_producto` ASC) VISIBLE,
  INDEX `registro_empleado_idx` (`id_empleado` ASC) VISIBLE,
  CONSTRAINT `registro_producto`
    FOREIGN KEY (`id_producto`)
    REFERENCES `cafeteria`.`producto` (`id_producto`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `registro_empleado`
    FOREIGN KEY (`id_empleado`)
    REFERENCES `cafeteria`.`empleado` (`id_empleado`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
COMMENT = 're';


-- -----------------------------------------------------
-- Table `cafeteria`.`remision`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cafeteria`.`remision` (
  `id_remision` INT NOT NULL AUTO_INCREMENT,
  `id_provedor` INT NULL,
  `id_lista_productos` INT NULL,
  `fecha_expedicion` DATE NULL,
  `estado` VARCHAR(45) NULL,
  `fecha_confirmacion` DATE NULL,
  `id_registro` INT NULL,
  PRIMARY KEY (`id_remision`),
  INDEX `reporte_remision_idx` (`id_registro` ASC) VISIBLE,
  CONSTRAINT `registro_remision`
    FOREIGN KEY (`id_registro`)
    REFERENCES `cafeteria`.`registro` (`id_registro`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cafeteria`.`proveedor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cafeteria`.`proveedor` (
  `id_proveedor` INT NOT NULL AUTO_INCREMENT,
  `nombre_empresa` VARCHAR(45) NULL,
  `telefono` INT NULL,
  `correo` VARCHAR(45) NULL,
  PRIMARY KEY (`id_proveedor`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cafeteria`.`lista_productos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cafeteria`.`lista_productos` (
  `id_lista_productos` INT NOT NULL AUTO_INCREMENT,
  `producto` INT NULL,
  `insumo` INT NULL,
  `cantidad` FLOAT NULL,
  PRIMARY KEY (`id_lista_productos`),
  INDEX `producto_lista-productos_idx` (`producto` ASC) VISIBLE,
  INDEX `insumo_lista-producto_idx` (`insumo` ASC) VISIBLE,
  CONSTRAINT `producto_lista-productos`
    FOREIGN KEY (`producto`)
    REFERENCES `cafeteria`.`producto` (`id_producto`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `insumo_lista-producto`
    FOREIGN KEY (`insumo`)
    REFERENCES `cafeteria`.`insumo` (`id_insumo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cafeteria`.`compra`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cafeteria`.`compra` (
  `id_compra` INT NOT NULL AUTO_INCREMENT,
  `id_proveedor` INT NULL,
  `lista_productos` INT NULL,
  `total` FLOAT NULL,
  `fecha_expedicion` DATE NULL,
  `id_registro` INT NULL,
  PRIMARY KEY (`id_compra`),
  INDEX `registro_compra_idx` (`id_registro` ASC) VISIBLE,
  INDEX `compra_proveedor_idx` (`id_proveedor` ASC) VISIBLE,
  INDEX `compra_lista-productos_idx` (`lista_productos` ASC) VISIBLE,
  CONSTRAINT `registro_compra`
    FOREIGN KEY (`id_registro`)
    REFERENCES `cafeteria`.`registro` (`id_registro`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `compra_proveedor`
    FOREIGN KEY (`id_proveedor`)
    REFERENCES `cafeteria`.`proveedor` (`id_proveedor`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `compra_lista-productos`
    FOREIGN KEY (`lista_productos`)
    REFERENCES `cafeteria`.`lista_productos` (`id_lista_productos`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cafeteria`.`venta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cafeteria`.`venta` (
  `id_venta` INT NOT NULL AUTO_INCREMENT,
  `fecha` DATE NULL,
  `id_registro` INT NULL,
  `id_lista_producto` INT NULL,
  PRIMARY KEY (`id_venta`),
  INDEX `registro_venta_idx` (`id_registro` ASC) VISIBLE,
  INDEX `lista-producto_venta_idx` (`id_lista_producto` ASC) VISIBLE,
  CONSTRAINT `registro_venta`
    FOREIGN KEY (`id_registro`)
    REFERENCES `cafeteria`.`registro` (`id_registro`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `lista-producto_venta`
    FOREIGN KEY (`id_lista_producto`)
    REFERENCES `cafeteria`.`lista_productos` (`id_lista_productos`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cafeteria`.`ticket`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cafeteria`.`ticket` (
  `id_ticket` INT NOT NULL AUTO_INCREMENT,
  `venta` INT NULL,
  `lista_productos` INT NULL,
  `fecha` DATE NULL,
  `ubicacion` VARCHAR(45) NULL,
  `total` FLOAT NULL,
  PRIMARY KEY (`id_ticket`),
  INDEX `venta_ticket_idx` (`venta` ASC) VISIBLE,
  INDEX `venta_lista-productos_idx` (`lista_productos` ASC) VISIBLE,
  CONSTRAINT `venta_ticket`
    FOREIGN KEY (`venta`)
    REFERENCES `cafeteria`.`venta` (`id_venta`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `venta_lista-productos`
    FOREIGN KEY (`lista_productos`)
    REFERENCES `cafeteria`.`lista_productos` (`id_lista_productos`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cafeteria`.`factura`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cafeteria`.`factura` (
  `PK_RFC` VARCHAR(45) NOT NULL,
  `venta` INT NULL,
  `lista_productos` INT NULL,
  `CUE` VARCHAR(45) NULL,
  `nombre` VARCHAR(45) NULL,
  `apellido_paterno` VARCHAR(45) NULL,
  `apellido_materno` VARCHAR(45) NULL,
  `IVA` FLOAT NULL,
  `total` FLOAT NULL,
  PRIMARY KEY (`PK_RFC`),
  INDEX `ticket_factura_idx` (`venta` ASC) VISIBLE,
  INDEX `factura_ticket-productos_idx` (`lista_productos` ASC) VISIBLE,
  CONSTRAINT `ticket_factura`
    FOREIGN KEY (`venta`)
    REFERENCES `cafeteria`.`venta` (`id_venta`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `factura_ticket-productos`
    FOREIGN KEY (`lista_productos`)
    REFERENCES `cafeteria`.`lista_productos` (`id_lista_productos`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;