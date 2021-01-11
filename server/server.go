package main

import (
	"fmt"
	"github.com/labstack/echo/v4"
	"net/http"
	"server/config"
)

func main() {
	e := echo.New()
	conf := config.ReadConfig()

	e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Hello, World!")
	})

	e.Logger.Fatal(e.Start(fmt.Sprintf("%s:%d", conf.App.Host, conf.App.Port)))
}
