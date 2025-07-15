// SensorSimulationControls.jsx
import React, { useState } from 'react';
import axios from 'axios';

export default function SensorSimulationControls({ sensor, onUpdated }) {
  const [intervalo, setIntervalo] = useState(sensor.intervalo || 2);
  const [ruido, setRuido] = useState(sensor.ruido || 1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sucesso, setSucesso] = useState(false);

  const handleSimulacao = async () => {
    setLoading(true);
    setError(null);
    setSucesso(false);

    try {
      await axios.post('http://localhost:8080/sensores/configurar', {
        id: sensor.id,
        intervalo: Number(intervalo),
        ruido: Number(ruido),
      });
      setSucesso(true);
      onUpdated && onUpdated();
    } catch (err) {
      setError('Erro ao configurar simulação.');
    } finally {
      setLoading(false);
      setTimeout(() => setSucesso(false), 3000);
    }
  };

  return (
    <div className="p-4 border rounded bg-white shadow-sm mb-2">
      <h3 className="font-semibold mb-2 text-sm text-gray-700">
        Configurar Simulação
      </h3>

      <div className="flex items-center gap-2 mb-2">
        <label className="text-sm">Intervalo (s):</label>
        <input
          type="number"
          value={intervalo}
          onChange={(e) => setIntervalo(e.target.value)}
          className="border p-1 w-20 text-sm"
        />

        <label className="text-sm">Ruído:</label>
        <input
          type="number"
          step="0.1"
          value={ruido}
          onChange={(e) => setRuido(e.target.value)}
          className="border p-1 w-20 text-sm"
        />

        <button
          onClick={handleSimulacao}
          disabled={loading}
          className="bg-green-500 text-white px-3 py-1 rounded text-sm"
        >
          {loading ? 'Salvando...' : 'Aplicar'}
        </button>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}
      {sucesso && <p className="text-green-600 text-sm">Configuração aplicada!</p>}
    </div>
  );
}
