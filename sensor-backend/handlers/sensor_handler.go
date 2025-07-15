package handlers

import (
	"encoding/json"
	"net/http"
	"sensor-backend/models"

	"github.com/google/uuid"
)

// Sensores é uma slice exportada que representa todos os sensores em memória
var Sensores []models.Sensor

// GetSensores retorna a lista de sensores
func GetSensores(w http.ResponseWriter, r *http.Request) {
	json.NewEncoder(w).Encode(Sensores)
}

// CreateSensor adiciona um novo sensor à lista
func CreateSensor(w http.ResponseWriter, r *http.Request) {
	var novoSensor models.Sensor

	// Tenta decodificar o JSON enviado
	if err := json.NewDecoder(r.Body).Decode(&novoSensor); err != nil {
		http.Error(w, "Erro ao decodificar JSON", http.StatusBadRequest)
		return
	}

	// Validação: nome obrigatório
	if novoSensor.Nome == "" {
		http.Error(w, "O campo 'nome' é obrigatório", http.StatusBadRequest)
		return
	}

	// Gera um ID único se não estiver presente
	novoSensor.ID = uuid.New().String()

	// Adiciona à lista
	Sensores = append(Sensores, novoSensor)

	// Retorna o sensor criado
	json.NewEncoder(w).Encode(novoSensor)
}

// UpdateSensor atualiza um sensor existente
func UpdateSensor(w http.ResponseWriter, r *http.Request) {
	var sensorAtualizado models.Sensor
	if err := json.NewDecoder(r.Body).Decode(&sensorAtualizado); err != nil {
		http.Error(w, "Erro ao decodificar JSON", http.StatusBadRequest)
		return
	}

	for i, sensor := range Sensores {
		if sensor.ID == sensorAtualizado.ID {
			Sensores[i] = sensorAtualizado
			json.NewEncoder(w).Encode(sensorAtualizado)
			return
		}
	}

	http.Error(w, "Sensor não encontrado", http.StatusNotFound)
}

// DeleteSensor remove um sensor com base no ID
func DeleteSensor(w http.ResponseWriter, r *http.Request) {
	var sensorParaExcluir models.Sensor
	if err := json.NewDecoder(r.Body).Decode(&sensorParaExcluir); err != nil {
		http.Error(w, "Erro ao decodificar JSON", http.StatusBadRequest)
		return
	}

	for i, sensor := range Sensores {
		if sensor.ID == sensorParaExcluir.ID {
			Sensores = append(Sensores[:i], Sensores[i+1:]...)
			w.WriteHeader(http.StatusOK)
			return
		}
	}

	http.Error(w, "Sensor não encontrado", http.StatusNotFound)
}

func SettingSensor(w http.ResponseWriter, r *http.Request) {
	type ConfigRequest struct {
		ID        string  `json:"id"`
		Intervalo int     `json:"intervalo"`
		Ruido     float64 `json:"ruido"`
	}

	var cfg ConfigRequest
	if err := json.NewDecoder(r.Body).Decode(&cfg); err != nil {
		http.Error(w, "Erro ao decodificar JSON", http.StatusBadRequest)
		return
	}

	for i, sensor := range Sensores {
		if sensor.ID == cfg.ID {
			// Supondo que Sensor tenha campos Intervalo e Ruido
			Sensores[i].Intervalo = cfg.Intervalo
			Sensores[i].Ruido = cfg.Ruido
			w.WriteHeader(http.StatusOK)
			json.NewEncoder(w).Encode(Sensores[i])
			return
		}
	}

	http.Error(w, "Sensor não encontrado", http.StatusNotFound)
}
