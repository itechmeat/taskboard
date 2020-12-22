package controllers

import (
	"net/http"

	"github.com/labstack/echo/v4"

	"server/model"
)

type UserHandler struct {
	User model.UserModel
}

func (h *UserHandler) SignUp(c echo.Context) error {
	return c.String(http.StatusOK, "Hello, World!")
}
