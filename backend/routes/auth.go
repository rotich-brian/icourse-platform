package routes

import (
	"context"
	"fmt"
	"net/http"
	"time"

	"icourse-backend/models"
	"icourse-backend/services"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"golang.org/x/crypto/bcrypt"
)

var jwtSecret = []byte("your-secret-key")

func Register(c *gin.Context) {
	var input struct {
		Email     string `json:"email" binding:"required,email"`
		Password  string `json:"password" binding:"required"`
		FirstName string `json:"first_name"`
		LastName  string `json:"last_name"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Hash the password before storing it
	hashedPassword, _ := bcrypt.GenerateFromPassword([]byte(input.Password), bcrypt.DefaultCost)

	// Initialize the new user with the provided values and default values for other fields
	user := models.User{
		Email:              input.Email,
		Password:           string(hashedPassword),
		FirstName:          input.FirstName,                        // First Name
		LastName:           input.LastName,                         // Last Name
		Name:               input.FirstName + " " + input.LastName, // Combined Name
		LearningGoals:      []models.LearningGoal{},                // Empty Learning Goals list
		EnrolledCourses:    0,                                      // Default to 0
		CompletedCourses:   0,                                      // Default to 0
		ActiveCourse:       "",                                     // Default to none
		ActiveProgress:     0,                                      // Default progress to 0
		TotalCertificates:  0,                                      // Default certificates to 0
		WeeklyLearningTime: 0.0,                                    // Default weekly time to 0
		Streak:             0,                                      // Default streak to 0
		Recommendations: []models.Recommendation{
			{ID: 1, Title: "Advanced React", Category: "Frontend", Progress: 0, Difficulty: "Intermediate"},
			{ID: 2, Title: "Cybersecurity Basics", Category: "Cybersecurity", Progress: 0, Difficulty: "Beginner"},
			{ID: 3, Title: "Introduction to Databases", Category: "Databases", Progress: 0, Difficulty: "Beginner"},
		}, // Default Recommendations
		RecentActivities: []models.RecentActivity{}, // Empty activities list
		AppliedEvents:    []models.Event{},          // Empty applied events list
		PastEvents:       []models.Event{},          // Empty past events list
		WeeklyProgress: []models.WeeklyProgress{
			{Day: "Mon", Hours: 0},
			{Day: "Tue", Hours: 0},
			{Day: "Wed", Hours: 0},
			{Day: "Thur", Hours: 0},
			{Day: "Fri", Hours: 0},
			{Day: "Sat", Hours: 0},
			{Day: "Sun", Hours: 0},
		}, // Empty weekly progress list
		Profile: models.Profile{
			Learning: struct {
				CoursesCompleted   int     `json:"coursesCompleted" bson:"coursesCompleted"`
				CertificatesEarned int     `json:"certificatesEarned" bson:"certificatesEarned"`
				CurrentStreak      int     `json:"currentStreak" bson:"currentStreak"`
				TotalLearningHours float64 `json:"totalLearningHours" bson:"totalLearningHours"`
			}{
				CoursesCompleted:   0,
				CertificatesEarned: 0,
				CurrentStreak:      0,
				TotalLearningHours: 0.0,
			},
			CurrentCourses: []struct {
				ID             int     `json:"id" bson:"id"`
				Title          string  `json:"title" bson:"title"`
				Progress       int     `json:"progress" bson:"progress"`
				TotalHours     float64 `json:"totalHours" bson:"totalHours"`
				CompletedHours float64 `json:"completedHours" bson:"completedHours"`
			}{},
			Achievements: []models.Achievement{},
		}, // Default profile
		Courses: struct {
			Enrolled   []models.Course `json:"enrolled" bson:"enrolled"`
			Applied    []models.Course `json:"applied" bson:"applied"`
			Continuing []models.Course `json:"continuing" bson:"continuing"`
			Finished   []models.Course `json:"finished" bson:"finished"`
		}{
			Enrolled:   []models.Course{},
			Applied:    []models.Course{},
			Continuing: []models.Course{},
			Finished:   []models.Course{},
		}, // Empty courses
	}

	// Insert the new user into the database
	collection := services.Client.Database("coursePlatform").Collection("users")
	_, err := collection.InsertOne(context.Background(), user)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Registration failed"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Registration successful"})
}

func Login(c *gin.Context) {
	var credentials struct {
		Email    string `json:"email" binding:"required,email"`
		Password string `json:"password" binding:"required"`
	}

	if err := c.ShouldBindJSON(&credentials); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}

	// Check if user exists in the database using the provided email
	collection := services.Client.Database("coursePlatform").Collection("users")
	var user models.User
	err := collection.FindOne(context.Background(), bson.M{"email": credentials.Email}).Decode(&user)
	if err != nil || bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(credentials.Password)) != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
		return
	}

	// Generate JWT token for the logged-in user
	expirationTime := time.Now().Add(time.Hour * 72)
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"userID": user.ID.Hex(), // Add user ID to the token payload
		"exp":    expirationTime.Unix(),
	})
	tokenString, err := token.SignedString(jwtSecret)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not generate token"})
		return
	}

	// Prepare the response object
	response := gin.H{
		"token":  tokenString,
		"userID": user.ID.Hex(),
		"exp":    expirationTime.Unix(),
		"userData": gin.H{
			"email":              user.Email,
			"firstName":          user.FirstName,
			"lastName":           user.LastName,
			"name":               user.Name,
			"learningGoals":      user.LearningGoals,
			"enrolledCourses":    user.EnrolledCourses,
			"completedCourses":   user.CompletedCourses,
			"activeCourse":       user.ActiveCourse,
			"activeProgress":     user.ActiveProgress,
			"totalCertificates":  user.TotalCertificates,
			"weeklyLearningTime": user.WeeklyLearningTime,
			"streak":             user.Streak,
			"recommendations":    user.Recommendations,
			"recentActivities":   user.RecentActivities,
		},
	}

	// Return the response
	c.JSON(http.StatusOK, response)
}

func GetUserData(c *gin.Context) {
	// Retrieve the JWT token from the Authorization header
	tokenString := c.GetHeader("Authorization")
	if tokenString == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Authorization token is required"})
		return
	}

	// Parse and validate the token
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return jwtSecret, nil
	})

	if err != nil || !token.Valid {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid or expired token"})
		return
	}

	// Extract the user ID from the token claims
	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok || !token.Valid {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token claims"})
		return
	}

	userID, ok := claims["userID"].(string)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid user ID in token"})
		return
	}

	// Query the database to find the user by ID
	collection := services.Client.Database("coursePlatform").Collection("users")
	var user models.User
	err = collection.FindOne(context.Background(), bson.M{"_id": services.ObjectIDFromHex(userID)}).Decode(&user)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	// Return all the user data
	c.JSON(http.StatusOK, gin.H{
		"userID":             user.ID.Hex(),
		"email":              user.Email,
		"firstName":          user.FirstName,
		"lastName":           user.LastName,
		"name":               user.Name,
		"learningGoals":      user.LearningGoals,
		"enrolledCourses":    user.EnrolledCourses,
		"completedCourses":   user.CompletedCourses,
		"activeCourse":       user.ActiveCourse,
		"activeProgress":     user.ActiveProgress,
		"totalCertificates":  user.TotalCertificates,
		"weeklyLearningTime": user.WeeklyLearningTime,
		"streak":             user.Streak,
		"recommendations":    user.Recommendations,
		"recentActivities":   user.RecentActivities,
		"appliedEvents":      user.AppliedEvents,
		"pastEvents":         user.PastEvents,
		"weeklyProgress":     user.WeeklyProgress,
		"profile":            user.Profile,
		"courses":            user.Courses,
	})
}
