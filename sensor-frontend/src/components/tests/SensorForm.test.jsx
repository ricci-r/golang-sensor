import { render, screen, fireEvent } from '@testing-library/react';
import SensorForm from '../SensorForm';
import axios from 'axios';

jest.mock('axios');

describe('SensorForm', () => {
  const onCloseMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('preenche e envia o formulário com sucesso', async () => {
    axios.post.mockResolvedValueOnce({ data: {} });

    render(<SensorForm onClose={onCloseMock} />);

    fireEvent.change(screen.getByPlaceholderText('Nome'), { target: { value: 'Sensor Teste' } });
    fireEvent.change(screen.getByPlaceholderText('Tipo (ex: temperatura)'), { target: { value: 'temperatura' } });
    fireEvent.change(screen.getByPlaceholderText('Valor'), { target: { value: '25.5' } });
    fireEvent.click(screen.getByLabelText('Ativo'));

    fireEvent.click(screen.getByText('Salvar'));

    expect(axios.post).toHaveBeenCalledWith(
      'http://localhost:8080/sensores/create',
      expect.objectContaining({
        nome: 'Sensor Teste',
        tipo: 'temperatura',
        valor: 25.5,
        estado: false,
      })
    );

    expect(onCloseMock).toHaveBeenCalled();
  });

  it('chama onClose ao clicar em Cancelar', () => {
    render(<SensorForm onClose={onCloseMock} />);

    fireEvent.click(screen.getByText('Cancelar'));

    expect(onCloseMock).toHaveBeenCalled();
  });

  it('mantém estado inicial corretamente', () => {
    render(<SensorForm onClose={onCloseMock} />);
    expect(screen.getByPlaceholderText('Nome').value).toBe('');
    expect(screen.getByPlaceholderText('Tipo (ex: temperatura)').value).toBe('');
    expect(screen.getByPlaceholderText('Valor').value).toBe('');
    expect(screen.getByLabelText('Ativo').checked).toBe(true);
  });

  it('trata falha ao enviar o formulário (simulação)', async () => {
    axios.post.mockRejectedValueOnce(new Error('Erro de rede'));

    render(<SensorForm onClose={onCloseMock} />);

    fireEvent.change(screen.getByPlaceholderText('Nome'), { target: { value: 'Falha Sensor' } });
    fireEvent.change(screen.getByPlaceholderText('Tipo (ex: temperatura)'), { target: { value: 'falha' } });
    fireEvent.change(screen.getByPlaceholderText('Valor'), { target: { value: '1' } });
    fireEvent.click(screen.getByText('Salvar'));

    // onClose ainda pode ser chamado ou não — depende do seu comportamento. Aqui assumimos que não.
    expect(onCloseMock).not.toHaveBeenCalled();
  });
});
