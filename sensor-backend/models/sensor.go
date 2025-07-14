package models

type Sensor struct {
	ID     string  `json:"id"`
	Nome   string  `json:"nome"`
	Tipo   string  `json:"tipo"`
	Valor  float64 `json:"valor"`
	Estado bool    `json:"estado"`
}
