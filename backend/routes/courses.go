package routes

import (
	"context"
	"net/http"

	"icourse-backend/models"
	"icourse-backend/services"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func ListCourses(c *gin.Context) {
	collection := services.Client.Database("coursePlatform").Collection("courses")
	cursor, err := collection.Find(context.Background(), bson.M{})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error fetching courses"})
		return
	}
	var courses []models.Course
	if err = cursor.All(context.Background(), &courses); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error reading courses"})
		return
	}

	// Omit originalPrice and discount if they are 0
	for i := range courses {
		if courses[i].OriginalPrice != nil && *courses[i].OriginalPrice == 0 {
			courses[i].OriginalPrice = nil
		}
		if courses[i].Discount != nil && *courses[i].Discount == 0 {
			courses[i].Discount = nil
		}
	}

	c.JSON(http.StatusOK, courses)
}

// GetCourseDetails fetches and displays a specific course based on the provided ID
func GetCourseDetails(c *gin.Context) {
	id, err := primitive.ObjectIDFromHex(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid course ID"})
		return
	}
	collection := services.Client.Database("coursePlatform").Collection("courses")
	var course models.Course
	// Find course by its ObjectID
	err = collection.FindOne(context.Background(), bson.M{"_id": id}).Decode(&course)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Course not found"})
		return
	}

	// Omit originalPrice and discount if they are 0
	if course.OriginalPrice != nil && *course.OriginalPrice == 0 {
		course.OriginalPrice = nil
	}
	if course.Discount != nil && *course.Discount == 0 {
		course.Discount = nil
	}

	c.JSON(http.StatusOK, course)
}
