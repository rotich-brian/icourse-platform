package models

import "go.mongodb.org/mongo-driver/bson/primitive"

// Course represents a user's course data with various attributes, including course information and user-specific data.
type Course struct {
	ID              primitive.ObjectID `bson:"_id,omitempty"`
	Title           string             `json:"title" bson:"title"`
	Category        string             `json:"category" bson:"category"`
	Type            string             `json:"type,omitempty" bson:"type,omitempty"` // Optional field for course type
	Image           string             `json:"image" bson:"image"`
	Price           float64            `json:"price" bson:"price"`
	OriginalPrice   *float64           `json:"originalPrice,omitempty" bson:"originalPrice,omitempty"` // Optional field for original price
	Discount        *float64           `json:"discount,omitempty" bson:"discount,omitempty"`           // Optional field for discount
	Status          string             `json:"status" bson:"status"`
	Instructor      string             `json:"instructor" bson:"instructor"`                               // Instructor name (from second model)
	Progress        int                `json:"progress" bson:"progress"`                                   // User's progress (from second model)
	LastAccessed    string             `json:"lastAccessed,omitempty" bson:"lastAccessed,omitempty"`       // Optional field for the last accessed date
	Duration        string             `json:"duration" bson:"duration"`                                   // Course duration (from second model)
	CompletionDate  string             `json:"completionDate,omitempty" bson:"completionDate,omitempty"`   // Optional field for completion date
	Grade           string             `json:"grade,omitempty" bson:"grade,omitempty"`                     // Optional field for grade
	Certificate     bool               `json:"certificate,omitempty" bson:"certificate,omitempty"`         // Optional field for certificate status
	ApplicationDate string             `json:"applicationDate,omitempty" bson:"applicationDate,omitempty"` // Optional field for application date
}
