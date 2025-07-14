package handlers

import (
	"encoding/json"
	"net/http"

	"sensor-backend/models"
	"sensor-backend/nats"

	"github.com/google/uuid"
)

var sensores []models.Sensor

func GetSensores(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(sensores)
}

func CreateSensor(w http.ResponseWriter, r *http.Request) {
	var s models.Sensor
	json.NewDecoder(r.Body).Decode(&s)
	s.ID = uuid.New().String()
	sensores = append(sensores, s)
	nats.PublicarAtualizacao("Sensor criado: " + s.Nome)
	json.NewEncoder(w).Encode(s)
}
