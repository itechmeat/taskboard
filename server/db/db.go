package db

import (
	"fmt"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"golang.org/x/net/context"

	"server/config"
)

func New() *mongo.Database {
	conf := config.ReadConfig()

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	client, err := mongo.Connect(ctx, options.Client().ApplyURI(fmt.Sprintf(
		"mongodb://%s", conf.DB.Hostname,
	)))
	defer client.Disconnect(ctx)

	if err != nil {
		panic(err)
	}

	return client.Database(conf.DB.Database)
}
