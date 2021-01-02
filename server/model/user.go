package model

import "go.mongodb.org/mongo-driver/bson/primitive"

type User struct {
	ID        primitive.ObjectID `bson:"_id,omitempty"`
	Email     string             `bson:"email,omitempty"`
	Name      string             `bson:"name,omitempty"`
	Password  string             `bson:"password,omitempty"`
	CreatedAt primitive.DateTime `bson:"created_at,omitempty"`
	UpdatedAt primitive.DateTime `bson:"updated_at,omitempty"`
}
