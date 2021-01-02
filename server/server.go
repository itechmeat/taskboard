package main

import (
	"context"
	"fmt"
	"github.com/labstack/echo/v4"
	"github.com/labstack/gommon/log"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"net/http"
	"server/config"
	"server/model"
	"time"
)

func main() {
	e := echo.New()
	conf := config.ReadConfig()

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	client, err := mongo.Connect(ctx, options.Client().ApplyURI(fmt.Sprintf(
		"mongodb://%s", conf.DB.Hostname,
	)))
	if err != nil {
		panic(err)
	}
	defer cancel()
	defer client.Disconnect(ctx)

	fmt.Println(conf.DB.Username, conf.DB.Password, conf.DB.Hostname, conf.DB.Port)

	db := client.Database(conf.DB.Database)
	user := model.User{
		Name:  "John Doe",
		Email: "test@exmaple.com",
	}

	insertedId := ""
	insertResult, err := db.Collection("users").InsertOne(ctx, user)
	if err != nil {
		log.Warnf("Can't insert user: %s", err)
	} else {
		insertedId = insertResult.InsertedID.(primitive.ObjectID).String()
	}

	e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Inserted ID: "+insertedId)
	})
	e.Logger.Fatal(e.Start(":1323"))
}
