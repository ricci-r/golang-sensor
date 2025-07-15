package main

import (
	"fmt"
	"log"
	"math/rand"
	"net/http"
	"sensor-backend/handlers"
	"sensor-backend/nats"
	"time"
)

func main() {
	// Inicializa conexão com o servidor NATS
	if err := nats.InitNATS(); err != nil {
		log.Fatalf("Erro ao conectar no NATS: %v", err)
	}

	// Inicia a rotina de simulação de leitura dos sensores
	iniciarSimulacaoLeituras()

	// Define rotas da API
	http.HandleFunc("/sensores", withOptions(handlers.GetSensores))
	http.HandleFunc("/sensores/create", withOptions(handlers.CreateSensor))
	http.HandleFunc("/sensores/update", withOptions(handlers.UpdateSensor))
	http.HandleFunc("/sensores/delete", withOptions(handlers.DeleteSensor))

	// Inicia o servidor HTTP
	fmt.Println("🚀 Servidor rodando na porta 8080...")
	log.Fatal(http.ListenAndServe(":8080", nil))
}

// Middleware para habilitar CORS e lidar com requisições OPTIONS
func withOptions(handlerFunc http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		enableCors(w)
		if r.Method == http.MethodOptions {
			return
		}
		handlerFunc(w, r)
	}
}

// Habilita CORS globalmente
func enableCors(w http.ResponseWriter) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
}

// Simula leitura periódica de sensores com ruído e possíveis erros
func iniciarSimulacaoLeituras() {
	go func() {
		for {
			for i := range handlers.Sensores {
				sensor := &handlers.Sensores[i]

				if sensor.Estado && sensor.Intervalo > 0 {
					// Gera valor com ruído
					delta := rand.Float64()*sensor.Ruido - sensor.Ruido/2
					sensor.Valor += delta

					// Simula erro de leitura (5% de chance)
					if rand.Float64() < 0.05 {
						sensor.Valor = -1 // ou outro valor inválido
						fmt.Println("⚠️  Erro simulado no sensor:", sensor.Nome)
					}

					// Publica atualização no canal NATS
					nats.PublicarAtualizacao("Leitura simulada: " + sensor.Nome)
				}
			}
			time.Sleep(2 * time.Second)
		}
	}()
}
