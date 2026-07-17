import { useState, useEffect } from "react";
import {
  esNombreValido,
  validarCorreo,
  esTelefonoValido,
  esCargoValido,
} from "../utilidades";

function FormularioContacto({ contactoEditando, onGuardar, onActualizar, onCancelar }) {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [cargo, setCargo] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (contactoEditando) {
      setNombre(contactoEditando.nombre);
      setCorreo(contactoEditando.correo);
      setTelefono(contactoEditando.telefono);
      setCargo(contactoEditando.cargo);
      setError("");
    } else {
      limpiarFormulario();
    }
  }, [contactoEditando]);

  function limpiarFormulario() {
    setNombre("");
    setCorreo("");
    setTelefono("");
    setCargo("");
    setError("");
  }

  function manejarEnvio(evento) {
    evento.preventDefault();

    const nombreLimpio = nombre.trim();
    const correoLimpio = correo.trim();
    const telefonoLimpio = telefono.trim();
    const cargoLimpio = cargo.trim();

    if (nombreLimpio === "" || correoLimpio === "" || telefonoLimpio === "" || cargoLimpio === "") {
      setError("Todos los campos son obligatorios.");
      return;
    }
    if (!esNombreValido(nombreLimpio)) {
      setError("El nombre debe tener 2 nombres y 2 apellidos (mínimo 2 caracteres cada uno).");
      return;
    }
    if (!validarCorreo(correoLimpio)) {
      setError("El correo debe ser @gmail.com y el usuario debe tener mínimo 5 caracteres.");
      return;
    }
    if (!esTelefonoValido(telefonoLimpio)) {
      setError("El teléfono debe iniciar en 09 y tener 10 dígitos. Ej: 0991776118");
      return;
    }
    if (!esCargoValido(cargoLimpio)) {
      setError("El cargo debe tener mínimo 2 caracteres.");
      return;
    }

    const datosContacto = {
      nombre: nombreLimpio,
      correo: correoLimpio,
      telefono: telefonoLimpio,
      cargo: cargoLimpio,
    };

    if (contactoEditando) {
      onActualizar(contactoEditando.id, datosContacto);
    } else {
      onGuardar(datosContacto);
    }

    limpiarFormulario();
  }

  return (
    <form className="contact-form" onSubmit={manejarEnvio}>
      <h2>{contactoEditando ? "Editar contacto" : "Nuevo contacto"}</h2>

      {error && <p className="mensaje-error">{error}</p>}

      <div className="campo-formulario">
        <label>Nombre completo (2 nombres y 2 apellidos)</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Ej: Juan Carlos Pérez López"
        />
      </div>

      <div className="campo-formulario">
        <label>Cargo</label>
        <input
          type="text"
          value={cargo}
          onChange={(e) => setCargo(e.target.value)}
          placeholder="Ej: Desarrollador de Software"
        />
      </div>

      <div className="campo-formulario">
        <label>Correo electrónico (@gmail.com)</label>
        <input
          type="text"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          placeholder="Ej: ivageo@gmail.com"
        />
      </div>

      <div className="campo-formulario">
        <label>Teléfono (inicia en 09, 10 dígitos)</label>
        <input
          type="text"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          placeholder="Ej: 0991776118"
        />
      </div>

      <div className="botones-formulario">
        <button type="submit">{contactoEditando ? "Actualizar" : "Guardar"}</button>
        <button type="button" className="boton-cancelar" onClick={onCancelar}>
          Cancelar
        </button>
      </div>
    </form>
  );
}

export default FormularioContacto;