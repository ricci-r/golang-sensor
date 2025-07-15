package handlers

import (
	"encoding/json"
	"net/http"
	"sensor-backend/models"
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
	if err := json.NewDecoder(r.Body).Decode(&novoSensor); err != nil {
		http.Error(w, "Erro ao decodificar JSON", http.StatusBadRequest)
		return
	}
	Sensores = append(Sensores, novoSensor)
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
