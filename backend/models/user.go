package models

import "go.mongodb.org/mongo-driver/bson/primitive"

// LearningGoal represents a user's learning goal.
type LearningGoal struct {
	ID         int    `json:"id" bson:"id"`
	Title      string `json:"title" bson:"title"`
	Progress   int    `json:"progress" bson:"progress"`
	TargetDate string `json:"targetDate" bson:"targetDate"`
}

// Recommendation represents a course recommendation for the user.
type Recommendation struct {
	ID         int    `json:"id" bson:"id"`
	Title      string `json:"title" bson:"title"`
	Category   string `json:"category" bson:"category"`
	Progress   int    `json:"progress" bson:"progress"`
	Difficulty string `json:"difficulty" bson:"difficulty"`
}

// RecentActivity represents a user's recent activity.
type RecentActivity struct {
	ID     int    `json:"id" bson:"id"`
	Action string `json:"action" bson:"action"`
	Course string `json:"course" bson:"course"`
	Date   string `json:"date" bson:"date"`
}

// Event represents the event structure (applied and past events).
type Event struct {
	ID          int      `json:"id" bson:"id"`
	Title       string   `json:"title" bson:"title"`
	Date        string   `json:"date" bson:"date"`
	Time        string   `json:"time" bson:"time"`
	Location    string   `json:"location" bson:"location"`
	Category    string   `json:"category" bson:"category"`
	Price       string   `json:"price" bson:"price"`
	Speaker     string   `json:"speaker" bson:"speaker"`
	Spots       string   `json:"spots" bson:"spots"`
	Tags        []string `json:"tags" bson:"tags"`
	Status      string   `json:"status,omitempty" bson:"status,omitempty"`           // Optional for applied events
	Rating      float64  `json:"rating,omitempty" bson:"rating,omitempty"`           // Optional for past events
	Certificate bool     `json:"certificate,omitempty" bson:"certificate,omitempty"` // Optional for past events
}

// WeeklyProgress represents the hours spent learning each day of the week.
type WeeklyProgress struct {
	Day   string  `json:"day" bson:"day"`
	Hours float64 `json:"hours" bson:"hours"`
}

// Achievement represents a user's achievement.
type Achievement struct {
	ID          int    `json:"id" bson:"id"`
	Title       string `json:"title" bson:"title"`
	Description string `json:"description" bson:"description"`
	Date        string `json:"date" bson:"date"`
	Icon        string `json:"icon" bson:"icon"`
}

// Profile represents the user's profile data.
type Profile struct {
	Learning struct {
		CoursesCompleted   int     `json:"coursesCompleted" bson:"coursesCompleted"`
		CertificatesEarned int     `json:"certificatesEarned" bson:"certificatesEarned"`
		CurrentStreak      int     `json:"currentStreak" bson:"currentStreak"`
		TotalLearningHours float64 `json:"totalLearningHours" bson:"totalLearningHours"`
	} `json:"learning" bson:"learning"`
	CurrentCourses []struct {
		ID             int     `json:"id" bson:"id"`
		Title          string  `json:"title" bson:"title"`
		Progress       int     `json:"progress" bson:"progress"`
		TotalHours     float64 `json:"totalHours" bson:"totalHours"`
		CompletedHours float64 `json:"completedHours" bson:"completedHours"`
	} `json:"currentCourses" bson:"currentCourses"`
	Achievements []Achievement `json:"achievements" bson:"achievements"`
}

// User represents the user model in the database.
type User struct {
	ID                 primitive.ObjectID `bson:"_id,omitempty"`
	Email              string             `json:"email" bson:"email"`
	Password           string             `json:"password" bson:"password"`
	FirstName          string             `json:"first_name" bson:"first_name"`
	LastName           string             `json:"last_name" bson:"last_name"`
	Name               string             `json:"name" bson:"name"` // Combined name
	LearningGoals      []LearningGoal     `json:"learningGoals" bson:"learningGoals"`
	EnrolledCourses    int                `json:"enrolledCourses" bson:"enrolledCourses"`
	CompletedCourses   int                `json:"completedCourses" bson:"completedCourses"`
	ActiveCourse       string             `json:"activeCourse" bson:"activeCourse"`
	ActiveProgress     int                `json:"activeProgress" bson:"activeProgress"`
	TotalCertificates  int                `json:"totalCertificates" bson:"totalCertificates"`
	WeeklyLearningTime float64            `json:"weeklyLearningTime" bson:"weeklyLearningTime"`
	Streak             int                `json:"streak" bson:"streak"`
	Recommendations    []Recommendation   `json:"recommendations" bson:"recommendations"`
	RecentActivities   []RecentActivity   `json:"recentActivities" bson:"recentActivities"`
	AppliedEvents      []Event            `json:"appliedEvents" bson:"appliedEvents"`   // New field for events the user has applied for
	PastEvents         []Event            `json:"pastEvents" bson:"pastEvents"`         // New field for events the user has attended
	WeeklyProgress     []WeeklyProgress   `json:"weeklyProgress" bson:"weeklyProgress"` // New field for weekly learning progress
	Profile            Profile            `json:"profile" bson:"profile"`               // New field for user profile data
	Courses            struct {
		Enrolled   []Course `json:"enrolled" bson:"enrolled"`
		Applied    []Course `json:"applied" bson:"applied"`
		Continuing []Course `json:"continuing" bson:"continuing"`
		Finished   []Course `json:"finished" bson:"finished"`
	} `json:"courses" bson:"courses"` // New field for courses with different statuses
}
