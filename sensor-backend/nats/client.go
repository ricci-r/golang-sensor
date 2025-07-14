package nats

import (
	"fmt"

	"github.com/nats-io/nats.go"
)

var Conn *nats.Conn

func InitNATS() error {
	var err error
	Conn, err = nats.Connect(nats.DefaultURL) // nats://localhost:4222
	if err != nil {
		return fmt.Errorf("failed to connect to NATS: %w", err)
	}

	_, err = Conn.Subscribe("sensores.atualizar", func(m *nats.Msg) {
		fmt.Println("Mensagem recebida:", string(m.Data))
	})

	return err
}

func PublicarAtualizacao(msg string) {
	if Conn != nil {
		Conn.Publish("sensores.atualizar", []byte(msg))
	}
}
