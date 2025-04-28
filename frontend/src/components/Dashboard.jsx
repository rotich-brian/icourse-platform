import React, { useState, useEffect } from 'react';
import { 
  HiAcademicCap, 
  HiClock, 
  HiClipboardList, 
  HiSparkles, 
  HiTrendingUp, 
  HiLightBulb,
  HiMenu,
  HiX 
} from 'react-icons/hi';
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { useOutletContext } from 'react-router-dom';

const Dashboard = () => {

  const { userData, loading, error } = useOutletContext();

  const [activeTab, setActiveTab] = useState('courses');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const userdata = {
    name: 'Emma Johnson',
    learningGoals: [
      { id: 1, title: 'Master React Development', progress: 67, targetDate: '2024-08-30' },
      { id: 2, title: 'Learn Cybersecurity Basics', progress: 35, targetDate: '2024-10-15' }
    ],
    enrolledCourses: 5,
    completedCourses: 2,
    activeCourse: 'React for Beginners',
    activeProgress: 67,
    totalCertificates: 2,
    weeklyLearningTime: 8.5,
    streak: 12,
    recommendations: [
      { id: 1, title: 'Advanced React', category: 'Frontend', progress: 0, difficulty: 'Intermediate' },
      { id: 2, title: 'Cybersecurity Basics', category: 'Cybersecurity', progress: 0, difficulty: 'Beginner' },
      { id: 2, title: 'Introduction to Databases', category: 'Databases', progress: 0, difficulty: 'Beginner' },
    ],
    recentActivities: [
      { id: 1, action: 'Completed React Module', course: 'React for Beginners', date: '2 days ago' },
      { id: 2, action: 'Started Cybersecurity Course', course: 'Cybersecurity Basics', date: '5 days ago' },
    ]
  };

  // Mobile-friendly tab navigation
  const MobileTabNavigation = () => (
    <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <HiMenu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[400px] rounded-t-2xl">
        <SheetHeader className="mb-4">
          <SheetTitle>Select Dashboard Section</SheetTitle>
        </SheetHeader>
        <div className="grid gap-4">
          {['courses', 'goals', 'activity'].map((tab) => (
            <Button
              key={tab}
              variant={activeTab === tab ? 'default' : 'outline'}
              onClick={() => {
                setActiveTab(tab);
                setIsMobileMenuOpen(false);
              }}
              className="w-full capitalize"
            >
              {tab}
            </Button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8 lg:p-12">
      <div className="container mx-auto max-w-7xl">
        {/* Personalized Greeting */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8">
          <div className="mb-4 sm:mb-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {userData.name}!
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              Continue your learning journey today
            </p>
          </div>
          
          {/* Mobile Tab Navigation */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-4">
              <div className="flex items-center">
                <HiClock className="mr-2 text-indigo-600" />
                <span className="font-semibold">{userData.weeklyLearningTime}h</span>
              </div>
              <div className="flex items-center">
                <HiTrendingUp className="mr-2 text-green-600" />
                <span className="font-semibold">{userData.streak} Day Streak</span>
              </div>
            </div>
            <MobileTabNavigation />
          </div>
        </div>

        {/* Overview Cards - Responsive Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {[
            { 
              icon: HiAcademicCap, 
              color: 'text-indigo-600', 
              label: 'Enrolled Courses', 
              value: userData.enrolledCourses 
            },
            { 
              icon: HiClipboardList, 
              color: 'text-green-600', 
              label: 'Completed', 
              value: userData.completedCourses 
            },
            { 
              icon: HiSparkles, 
              color: 'text-yellow-500', 
              label: 'Certificates', 
              value: userData.totalCertificates 
            },
            { 
              icon: HiLightBulb, 
              color: 'text-pink-600', 
              label: 'Active Learning', 
              value: userData.activeCourse,
              progress: userData.activeProgress
            }
          ].map((card, index) => (
            <Card key={index} className="w-full hover:shadow-md transition-shadow">
              <CardContent className="flex flex-col items-center justify-center p-4 sm:p-6">
                <card.icon className={`text-2xl sm:text-4xl ${card.color} mb-2`} />
                <h3 className="text-sm sm:text-lg font-semibold text-gray-800 text-center mb-1">
                  {card.label}
                </h3>
                {card.progress !== undefined ? (
                  <>
                    <p className="text-sm sm:text-lg font-medium text-gray-600 text-center mb-2">
                      {card.value}
                    </p>
                    <Progress value={card.progress} className="w-full" />
                    <p className="mt-1 text-xs sm:text-sm text-gray-600">
                      {card.progress}% Complete
                    </p>
                  </>
                ) : (
                  <p className="text-xl sm:text-4xl font-bold" style={{ color: card.color }}>
                    {card.value}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs with Responsive Layout */}
        <div className="hidden sm:block">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="courses">Courses</TabsTrigger>
              <TabsTrigger value="goals">Learning Goals</TabsTrigger>
              <TabsTrigger value="activity">Recent Activity</TabsTrigger>
            </TabsList>

            <TabsContent value="courses">
            {/* Recommended Courses */}
            <div>
              <h2 className="mb-4 text-xl font-semibold text-gray-900">Recommended Courses</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {userData.recommendations.map((course) => (
                  <Card key={course.id} className="relative hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <Badge className="absolute top-2 right-2 bg-indigo-600 text-white">
                        {course.category}
                      </Badge>
                      <h3 className="mb-2 text-lg font-semibold text-gray-900">{course.title}</h3>
                      <Badge variant="outline" className="mb-2">{course.difficulty}</Badge>
                      <Progress value={course.progress} className="mb-2" />
                      <p className="mt-2 text-sm text-gray-600">{course.progress}% Complete</p>
                      <Button className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700">
                        Start Now
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="goals">
            {/* Learning Goals */}
            <div>
              <h2 className="mb-4 text-xl font-semibold text-gray-900">Learning Goals</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
                {userData.learningGoals.map((goal) => (
                  <Card key={goal.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <h3 className="mb-2 text-lg font-semibold text-gray-900">{goal.title}</h3>
                      <Progress value={goal.progress} className="mb-2" />
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>{goal.progress}% Complete</span>
                        <span>Target: {goal.targetDate}</span>
                      </div>
                      <Button variant="outline" className="mt-4 w-full">
                        View Goal Details
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="activity">
            {/* Recent Activity */}
            <div>
              <h2 className="mb-4 text-xl font-semibold text-gray-900">Recent Learning Activities</h2>
              <Card>
                <CardContent className="p-6">
                  {userData.recentActivities.map((activity) => (
                    <div key={activity.id} className="flex justify-between items-center border-b last:border-b-0 py-3">
                      <div>
                        <p className="font-semibold">{activity.action}</p>
                        <p className="text-sm text-gray-600">{activity.course}</p>
                      </div>
                      <Badge variant="outline">{activity.date}</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          </Tabs>
        </div>

        {/* Mobile Tabs Content */}
        <div className="sm:hidden">
          {activeTab === 'courses' && (
            <div>
              <h2 className="mb-4 text-xl font-semibold text-gray-900">Recommended Courses</h2>
              <div className="grid grid-cols-1 gap-4">
                {userData.recommendations.map((course) => (
                  <Card key={course.id} className="w-full">
                    <CardContent className="p-4">
                      <h3 className="mb-2 text-base font-semibold text-gray-900">
                        {course.title}
                      </h3>
                      <Badge className="mb-2 bg-indigo-600 text-white">
                        {course.category}
                      </Badge>
                      <Progress value={course.progress} className="mb-2" />
                      <Button className="mt-3 w-full bg-indigo-600 hover:bg-indigo-700">
                        Start Now
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'goals' && (
            <div>
              <h2 className="mb-4 text-xl font-semibold text-gray-900">Learning Goals</h2>
              <div className="grid grid-cols-1 gap-4">
                {userData.learningGoals.map((goal) => (
                  <Card key={goal.id} className="w-full">
                    <CardContent className="p-4">
                      <h3 className="mb-2 text-base font-semibold text-gray-900">
                        {goal.title}
                      </h3>
                      <Progress value={goal.progress} className="mb-2" />
                      <div className="flex justify-between text-xs text-gray-600 mb-3">
                        <span>{goal.progress}% Complete</span>
                        <span>Target: {goal.targetDate}</span>
                      </div>
                      <Button variant="outline" className="w-full">
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'activity' && (
            <div>
              <h2 className="mb-4 text-xl font-semibold text-gray-900">
                Recent Activities
              </h2>
              <Card>
                <CardContent className="p-4">
                  {userData.recentActivities.map((activity) => (
                    <div 
                      key={activity.id} 
                      className="flex justify-between items-center border-b last:border-b-0 py-3"
                    >
                      <div>
                        <p className="text-sm font-semibold">{activity.action}</p>
                        <p className="text-xs text-gray-600">{activity.course}</p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {activity.date}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;