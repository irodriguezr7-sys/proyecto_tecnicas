function TarjetaContacto({ contacto, onEditar, onEliminar }) {
  return (
    <div className="contact-item">
      <div className="contact-info">
        <p className="contact-nombre">{contacto.nombre}</p>
        <p className="contact-detalle"><strong>Cargo:</strong> {contacto.cargo}</p>
        <p className="contact-detalle"><strong>Correo Electrónico:</strong> {contacto.correo}</p>
        <p className="contact-detalle"><strong>Número de teléfono:</strong> {contacto.telefono}</p>
      </div>
      <div className="contact-acciones">
        <button className="boton-editar" onClick={() => onEditar(contacto)}>
          Editar
        </button>
        <button className="boton-eliminar" onClick={() => onEliminar(contacto)}>
          Eliminar
        </button>
      </div>
    </div>
  );
}

export default TarjetaContacto;