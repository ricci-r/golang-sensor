// SensorForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

export default function SensorForm({ onClose }) {
  const [sensor, setSensor] = useState({
    nome: '',
    tipo: '',
    valor: '',
    estado: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSensor({
      ...sensor,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:8080/sensores/create', {
      ...sensor,
      valor: parseFloat(sensor.valor)
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Novo Sensor</h2>

        <input
          name="nome"
          placeholder="Nome"
          value={sensor.nome}
          onChange={handleChange}
          className="w-full border p-2 mb-2"
          required
        />

        <input
          name="tipo"
          placeholder="Tipo (ex: temperatura)"
          value={sensor.tipo}
          onChange={handleChange}
          className="w-full border p-2 mb-2"
          required
        />

        <input
          name="valor"
          placeholder="Valor"
          value={sensor.valor}
          onChange={handleChange}
          type="number"
          step="0.01"
          className="w-full border p-2 mb-2"
          required
        />

        <label className="flex items-center gap-2 mb-4">
          <input
            type="checkbox"
            name="estado"
            checked={sensor.estado}
            onChange={handleChange}
          />
          Ativo
        </label>

        <div className="flex justify-end gap-4">
          <button type="button" onClick={onClose} className="text-gray-600">Cancelar</button>
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Salvar</button>
        </div>
      </form>
    </div>
  );
}
