import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SensorTable from '../SensorTable';
import axios from 'axios';

jest.mock('axios');

describe('SensorTable', () => {
  it('deve renderizar a tabela com sensores', async () => {
    axios.get.mockResolvedValue({
      data: [
        { id: '1', nome: 'Sensor 1', tipo: 'temperatura', valor: 22.5, estado: true },
        { id: '2', nome: 'Sensor 2', tipo: 'pressao', valor: 101.3, estado: false },
      ]
    });

    render(<SensorTable />);

    expect(await screen.findByText('Sensor 1')).toBeInTheDocument();
    expect(screen.getByText('Sensor 2')).toBeInTheDocument();
    expect(screen.getByText('Ativo')).toBeInTheDocument();
    expect(screen.getByText('Inativo')).toBeInTheDocument();
  });

  it('deve filtrar sensores pelo nome', async () => {
    axios.get.mockResolvedValue({
      data: [{ id: '1', nome: 'Temp Sensor', tipo: 'temperatura', valor: 25.1, estado: true }]
    });

    render(<SensorTable />);

    const input = screen.getByPlaceholderText('Filtrar por nome...');
    fireEvent.change(input, { target: { value: 'Temp' } });

    await waitFor(() => {
      expect(screen.getByText('Temp Sensor')).toBeInTheDocument();
    });
  });
});
