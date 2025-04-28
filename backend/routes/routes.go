package routes

import (
	"net/http"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func RegisterRoutes() {

	// Set up router
	router := gin.Default()

	// router.Use(cors.Default())
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"},                   // Replace with your frontend origin
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}, // Ensure OPTIONS is allowed
		AllowHeaders:     []string{"Origin", "Authorization", "Content-Type"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	// Register routes here
	router.POST("/register", Register)
	router.POST("/login", Login)
	router.GET("/courses", ListCourses)
	router.GET("/courses/:id", GetCourseDetails)
	router.GET("/user", GetUserData)

	router.OPTIONS("*any", func(c *gin.Context) {
		c.AbortWithStatus(http.StatusOK) // This will handle the preflight request
	})

	// Start server
	router.Run(":3000")
}
