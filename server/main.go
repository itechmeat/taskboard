package main

import (
	"fmt"

	"github.com/labstack/echo/v4"

	"server/config"
	"server/controllers"
	"server/db"
	"server/model"
)

func main() {
	app := echo.New()
	database := db.New()

	userHandler := &controllers.UserHandler{User: model.UserModel{DB: database}}
	user := app.Group("/user")
	user.GET("/signup", userHandler.SignUp)

	conf := config.ReadConfig()
	app.Logger.Fatal(app.Start(fmt.Sprintf("%s:%d", conf.App.Host, conf.App.Port)))
}
