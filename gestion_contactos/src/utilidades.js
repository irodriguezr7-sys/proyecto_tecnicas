export function generarNuevoId(contactos) {
  let maxId = 0;
  let i = 0;
  while (i < contactos.length) {
    if (contactos[i].id > maxId) {
      maxId = contactos[i].id;
    }
    i++;
  }
  return maxId + 1;
}

export function esNombreValido(nombre) {
  const partes = nombre.trim().split(" ");

  if (partes.length !== 4) {
    return false;
  }

  for (let i = 0; i < partes.length; i++) {
    if (partes[i].length < 2) {
      return false;
    }
  }

  return true;
}

export function validarCorreo(correo) {
  const correoNormalizado = correo.trim().toLowerCase();

  let cantidadArrobas = 0;
  for (let i = 0; i < correoNormalizado.length; i++) {
    if (correoNormalizado[i] === "@") {
      cantidadArrobas++;
    }
  }
  if (cantidadArrobas !== 1) {
    return false;
  }

  if (!correoNormalizado.endsWith("@gmail.com")) {
    return false;
  }

  const indiceArroba = correoNormalizado.indexOf("@");
  const usuario = correoNormalizado.substring(0, indiceArroba);

  if (usuario.length < 5) {
    return false;
  }

  return true;
}

export function esTelefonoValido(telefono) {
  if (telefono.length !== 10) {
    return false;
  }
  if (telefono[0] !== "0" || telefono[1] !== "9") {
    return false;
  }

  for (let i = 0; i < telefono.length; i++) {
    const caracter = telefono[i];
    if (caracter < "0" || caracter > "9") {
      return false;
    }
  }
  return true;
}

export function esCargoValido(cargo) {
  return cargo.trim().length >= 2;
}