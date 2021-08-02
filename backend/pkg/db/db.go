package db

import (
	"context"
	"fmt"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type DBController struct {
	client *mongo.Client
}

const dbURL = "mongodb://127.0.0.1"
const dbPORT = "27017"
const dbName = "todo_app"
const collection = "todo"

type Todo struct {
	ID          primitive.ObjectID `bson:"_id,omitempty" json:"id,omitempty"`
	Description string             `bson:"description" json:"description"`
	Responsible string             `bson:"responsible" json:"responsible"`
	Priority    string             `bson:"priority" json:"priority"`
	Completed   bool               `bson:"completed" json:"completed"`
}

func (dc *DBController) SetClient() error {
	if dc.client == nil {
		client, err := mongo.NewClient(options.Client().ApplyURI(fmt.Sprintf("%s:%s", dbURL, dbPORT)))
		if err != nil {
			return err
		}
		ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
		err = client.Connect(ctx)
		if err != nil {
			return err
		}
		err = client.Ping(context.TODO(), nil)
		if err != nil {
			return err
		}
		dc.client = client
	}
	return nil
}

func (dc *DBController) GetTodoList() ([]Todo, error) {
	todoClient := dc.getTodoCollection(dbName, collection)
	cursor, err := todoClient.Find(context.TODO(), bson.D{})
	if err != nil {
		log.Println(err)
		return nil, err
	}
	var result []Todo
	if err = cursor.All(context.TODO(), &result); err != nil {
		return nil, err
	}
	return result, nil
}

func (dc *DBController) InsertTodo(todo Todo) error {
	todoClient := dc.getTodoCollection(dbName, collection)
	_, err := todoClient.InsertOne(context.TODO(), todo)
	if err != nil {
		return err
	}
	return nil
}

func (dc *DBController) UpdateTodo(todo Todo) error {
	todoClient := dc.getTodoCollection(dbName, collection)
	filter := bson.M{"_id": todo.ID}
	updateTodo := bson.M{
		"$set": todo,
	}
	_, err := todoClient.UpdateOne(context.TODO(), filter, updateTodo)
	return err
}

func (dc *DBController) getTodoCollection(db string, colName string) *mongo.Collection {
	return dc.client.Database(db).Collection(colName)
}
