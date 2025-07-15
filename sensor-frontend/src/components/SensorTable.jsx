import React, { useEffect, useState } from 'react';
import SensorForm from './SensorForm';
import axios from 'axios';

export default function SensorTable() {
  const [sensores, setSensores] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSensores = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get('http://localhost:8080/sensores');
      if (Array.isArray(res.data)) {
        setSensores(res.data);
      } else {
        setSensores([]);
        setError('Dados recebidos inválidos.');
      }
    } catch (err) {
      setError('Erro ao carregar sensores.');
      setSensores([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSensores();
  }, []);

  const sensoresFiltrados = (sensores || []).filter(
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
          onClick={() => setShowForm(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          + Novo Sensor
        </button>
      </div>

      {loading && <p className='text-center'>Carregando sensores...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && sensoresFiltrados.length === 0 && (
        <p className='text-center'>Nenhum sensor encontrado.</p>
      )}

      {!loading && !error && sensoresFiltrados.length > 0 && (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Nome</th>
              <th className="border p-2">Tipo</th>
              <th className="border p-2">Valor</th>
              <th className="border p-2">Estado</th>
            </tr>
          </thead>
          <tbody>
            {sensoresFiltrados.map((s) => (
              <tr key={s.id} className="text-center">
                <td className="border p-2">{s.nome}</td>
                <td className="border p-2">{s.tipo}</td>
                <td className="border p-2">{s.valor}</td>
                <td className="border p-2">{s.estado ? 'Ativo' : 'Inativo'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showForm && (
        <SensorForm
          onClose={() => {
            setShowForm(false);
            fetchSensores();
          }}
        />
      )}
    </div>
  );
}
