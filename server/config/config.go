package config

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"os"
	"path"

	"github.com/labstack/gommon/log"
)

const BaseConfigPath = "./config/"

type Config struct {
	App struct {
		Host string
		Port int
	}
	DB struct {
		Hostname string
		Port     int
		Username string
		Password string
		Database string
	}
}

func loadConfigFromFile(filePath string, config *Config) error {
	fileContent, err := ioutil.ReadFile(filePath)
	if err != nil {
		return err
	}
	err = json.Unmarshal(fileContent, &config)
	if err != nil {
		return err
	}
	return nil
}

func ReadConfig() Config {
	var config Config

	err := loadConfigFromFile(path.Join(BaseConfigPath, "base.json"), &config)
	if err != nil {
		panic(fmt.Sprintf("Can't read or load base config: %s", err))
	}

	if customConfigName := os.Getenv("config"); customConfigName != "" {
		err = loadConfigFromFile(path.Join(BaseConfigPath, fmt.Sprintf("%s.json", customConfigName)), &config)
		if err != nil {
			log.Warnf("Can't read or load custom config file %s: %s", customConfigName, err)
		}
	}
	return config
}
