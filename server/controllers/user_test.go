package controllers

import (
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/labstack/echo/v4"
)

func TestSignUp(t *testing.T) {
	e := echo.New()
	req := httptest.NewRequest(http.MethodGet, "/signup", nil)
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)
	h := &UserHandler{}

	if err := h.SignUp(c); err != nil {
		t.Errorf("get error: %s", err)
		return
	}

	want := "Hello, World!"
	got := rec.Body.String()
	if want != got {
		t.Errorf("want: %s got: %s", want, got)
	}
}
