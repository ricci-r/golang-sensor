import React, { useEffect, useState } from "react";
import SensorForm from "./SensorForm";
import SensorSimulationControls from "./SensorSimulationControls";
import axios from "axios";

export default function SensorTable() {
  const [sensores, setSensores] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [sensorEditado, setSensorEditado] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSensores = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get("http://localhost:8080/sensores");
      if (Array.isArray(res.data)) {
        setSensores(res.data);
      } else {
        setSensores([]);
        setError("Dados inválidos recebidos.");
      }
    } catch (err) {
      setError("Erro ao carregar sensores.");
      setSensores([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSensores();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Deseja remover este sensor?")) {
      await axios.delete("http://localhost:8080/sensores/delete", { data: { id } });
      fetchSensores();
    }
  };

  const handleEdit = (sensor) => {
    setSensorEditado(sensor);
    setShowForm(true);
  };

  const sensoresFiltrados = sensores.filter(
    (s) =>
      s &&
      s.nome &&
      s.nome.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Filtrar por nome..."
          className="border p-2 rounded w-1/2"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        />
        <button
          onClick={() => {
            setSensorEditado(null);
            setShowForm(true);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          + Novo Sensor
        </button>
      </div>

      {loading && <p className="text-center">Carregando sensores...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && sensoresFiltrados.length === 0 && (
        <p className="text-center">Nenhum sensor encontrado.</p>
      )}

      {!loading && !error && sensoresFiltrados.length > 0 && (
        <table className="w-full border mb-6">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Nome</th>
              <th className="border p-2">Tipo</th>
              <th className="border p-2">Valor</th>
              <th className="border p-2">Estado</th>
              <th className="border p-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {sensoresFiltrados.map((s) => (
              <React.Fragment key={s.id}>
                <tr className="text-center">
                  <td className="border p-2">{s.nome}</td>
                  <td className="border p-2">{s.tipo}</td>
                  <td className={`border p-2 ${s.valor < 0 ? 'text-red-600' : ''}`}>
                    {s.valor < 0 ? "Erro" : s.valor.toFixed(2)}
                  </td>
                  <td className="border p-2">{s.estado ? "Ativo" : "Inativo"}</td>
                  <td className="border p-2">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleEdit(s)}
                        className="text-blue-600"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(s.id)}
                        className="text-red-600"
                      >
                        Excluir
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td colSpan={5} className="border p-2 bg-gray-50">
                    <SensorSimulationControls sensor={s} onUpdated={fetchSensores} />
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      )}

      {showForm && (
        <SensorForm
          sensorToEdit={sensorEditado}
          onClose={() => {
            setShowForm(false);
            setSensorEditado(null);
            fetchSensores();
          }}
        />
      )}
    </div>
  );
}
