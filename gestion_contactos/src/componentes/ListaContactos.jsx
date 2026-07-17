import TarjetaContacto from "./TarjetaContacto";

function ListaContactos({ contactos, onEditar, onEliminar }) {
  if (contactos.length === 0) {
    return <p className="lista-vacia">No se encontraron contactos.</p>;
  }

  return (
    <div className="contact-list">
      {contactos.map((contacto) => (
        <TarjetaContacto
          key={contacto.id}
          contacto={contacto}
          onEditar={onEditar}
          onEliminar={onEliminar}
        />
      ))}
    </div>
  );
}

export default ListaContactos;