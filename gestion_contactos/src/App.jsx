import { useState } from "react";
import FormularioContacto from "./componentes/FormularioContacto";
import ListaContactos from "./componentes/ListaContactos";
import BarraBusqueda from "./componentes/BarraBusqueda";
import { generarNuevoId } from "./utilidades";
import "./App.css";

const contactosIniciales = [
  {
    id: 1,
    nombre: "Iván Geovanny Rodríguez Ron",
    correo: "ivageo@gmail.com",
    telefono: "0991776118",
    cargo: "Desarrollador de Software",
  },
  {
    id: 2,
    nombre: "Jordy Jeremias Rodriguez Veintimilla",
    correo: "jordyrv@gmail.com",
    telefono: "0998848485",
    cargo: "Desarrollador de Interfaz",
  },
  {
    id: 3,
    nombre: "Jeremy David Muriel León",
    correo: "murielj@gmail.com",
    telefono: "0973578476",
    cargo: "Desarrollador Web",
  },
];

function App() {
  const [contactos, setContactos] = useState(contactosIniciales);
  const [busqueda, setBusqueda] = useState("");
  const [contactoEditando, setContactoEditando] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [contactoAEliminar, setContactoAEliminar] = useState(null);

  function abrirNuevoContacto() {
    setContactoEditando(null);
    setMostrarFormulario(true);
  }

  function cerrarFormulario() {
    setContactoEditando(null);
    setMostrarFormulario(false);
  }

  function agregarContacto(nuevoContacto) {
    const id = generarNuevoId(contactos);
    setContactos([...contactos, { id, ...nuevoContacto }]);
    cerrarFormulario();
  }

  function actualizarContacto(id, datosActualizados) {
    const contactosActualizados = contactos.map((contacto) => {
      if (contacto.id === id) {
        return { id, ...datosActualizados };
      }
      return contacto;
    });
    setContactos(contactosActualizados);
    cerrarFormulario();
  }

  function pedirConfirmacionEliminar(contacto) {
    setContactoAEliminar(contacto);
  }

  function cancelarEliminacion() {
    setContactoAEliminar(null);
  }

  function confirmarEliminacion() {
    const contactosRestantes = contactos.filter(
      (contacto) => contacto.id !== contactoAEliminar.id
    );
    setContactos(contactosRestantes);

    if (contactoEditando && contactoEditando.id === contactoAEliminar.id) {
      cerrarFormulario();
    }
    setContactoAEliminar(null);
  }

  function iniciarEdicion(contacto) {
    setContactoEditando(contacto);
    setMostrarFormulario(true);
  }

  const contactosFiltrados = contactos.filter((contacto) =>
    contacto.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="app-container">
      <div className="encabezado">
        <h1> Agenda de Contactos</h1>
        <button className="boton-nuevo" onClick={abrirNuevoContacto}>
          ➕ Nuevo contacto
        </button>
      </div>

      <BarraBusqueda valor={busqueda} onCambiar={setBusqueda} />

      <ListaContactos
        contactos={contactosFiltrados}
        onEditar={iniciarEdicion}
        onEliminar={pedirConfirmacionEliminar}
      />

      {mostrarFormulario && (
        <div className="fondo-modal" onClick={cerrarFormulario}>
          <div className="ventana-modal" onClick={(e) => e.stopPropagation()}>
            <FormularioContacto
              contactoEditando={contactoEditando}
              onGuardar={agregarContacto}
              onActualizar={actualizarContacto}
              onCancelar={cerrarFormulario}
            />
          </div>
        </div>
      )}

      {contactoAEliminar && (
        <div className="fondo-modal" onClick={cancelarEliminacion}>
          <div className="ventana-confirmacion" onClick={(e) => e.stopPropagation()}>
            <h3>Eliminar contacto</h3>
            <p>
              ¿Seguro que deseas eliminar a{" "}
              <strong>{contactoAEliminar.nombre}</strong>?
            </p>
            <div className="botones-confirmacion">
              <button className="boton-confirmar-eliminar" onClick={confirmarEliminacion}>
                Sí, eliminar
              </button>
              <button className="boton-cancelar" onClick={cancelarEliminacion}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
