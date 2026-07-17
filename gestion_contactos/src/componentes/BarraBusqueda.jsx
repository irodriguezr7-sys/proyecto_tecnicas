function BarraBusqueda({ valor, onCambiar }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        value={valor}
        onChange={(evento) => onCambiar(evento.target.value)}
        placeholder="🔍 Buscar contacto por su nombre:"
      />
    </div>
  );
}

export default BarraBusqueda;