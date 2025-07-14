package main

import (
	"fmt"
	"log"
	"net/http"
	"sensor-backend/handlers"
	"sensor-backend/nats"
)

func enableCors(w http.ResponseWriter) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
}

func main() {
	err := nats.InitNATS()
	if err != nil {
		log.Fatalf("Erro ao conectar no NATS: %v", err)
	}

	http.HandleFunc("/sensores", func(w http.ResponseWriter, r *http.Request) {
		enableCors(w)
		if r.Method == http.MethodOptions {
			return
		}
		handlers.GetSensores(w, r)
	})

	http.HandleFunc("/sensores/create", func(w http.ResponseWriter, r *http.Request) {
		enableCors(w)
		if r.Method == http.MethodOptions {
			return
		}
		handlers.CreateSensor(w, r)
	})

	fmt.Println("Servidor rodando na porta 8080...")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
