import React, { useState } from "react";
import axios from "axios";
import { API } from "../api/iot-sensor";

export default function SensorSimulationControls({ sensor, onUpdated }) {
  const [intervalo, setIntervalo] = useState(sensor.intervalo || 2);
  const [ruido, setRuido] = useState(sensor.ruido || 1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sucesso, setSucesso] = useState(false);
  const [sensorAtualizado, setSensorAtualizado] = useState(null);

  const handleSimulacao = async () => {
    setLoading(true);
    setError(null);
    setSucesso(false);

    try {
      const res = await axios.post(`${API}/sensores/setting`, {
        id: sensor.id,
        intervalo: Number(intervalo),
        ruido: Number(ruido),
      });

      console.log("Sensor atualizado:", res.data);
      setSensorAtualizado(res.data);
      setSucesso(true);
      onUpdated && onUpdated();
    } catch (err) {
      console.error(err);
      setError("Erro ao configurar simulação.");
    } finally {
      setLoading(false);
      setTimeout(() => {
        setSucesso(false);
        setSensorAtualizado(null);
      }, 4000);
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
          {loading ? "Salvando..." : "Aplicar"}
        </button>
      </div>

      {/* Mensagem de sucesso */}
      {sucesso && sensorAtualizado && (
        <div className="text-green-600 text-sm mt-1">
          ✅ Configuração aplicada: intervalo {sensorAtualizado.intervalo}s, ruído {sensorAtualizado.ruido}
        </div>
      )}

      {/* Mensagem de erro */}
      {error && <div className="text-red-600 text-sm mt-1">{error}</div>}
    </div>
  );
}
