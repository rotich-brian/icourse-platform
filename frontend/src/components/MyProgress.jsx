import React from 'react';
import { 
  HiAcademicCap, 
  HiClock, 
  HiBadgeCheck,
  HiLightningBolt,
  HiChartBar,
} from 'react-icons/hi';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useOutletContext } from 'react-router-dom';

const MyProgress = () => {

  const { userData, loading, error } = useOutletContext();

  console.log(userData.weeklyProgress)

  // const weeklyProgressData = [
  //   { day: 'Mon', hours: 2.5 },
  //   { day: 'Tue', hours: 1.8 },
  //   { day: 'Wed', hours: 3.2 },
  //   { day: 'Thu', hours: 2.1 },
  //   { day: 'Fri', hours: 2.8 },
  //   { day: 'Sat', hours: 4.5 },
  //   { day: 'Sun', hours: 1.5 }
  // ];
  const weeklyProgressData = userData.weeklyProgress

  console.log(userData.profile)

  // const profileData = {
  //   learning: {
  //     coursesCompleted: 12,
  //     certificatesEarned: 5,
  //     currentStreak: 15,
  //     totalLearningHours: 156
  //   },
  //   currentCourses: [
  //     { id: 1, title: 'Advanced React Patterns', progress: 75, totalHours: 20, completedHours: 15 },
  //     { id: 2, title: 'TypeScript Masterclass', progress: 45, totalHours: 15, completedHours: 6.75 }
  //   ],
  //   achievements: [
  //     { id: 1, title: 'React Master', description: '100% completion of React path', date: '2024-02-15', icon: '🏆' },
  //     { id: 2, title: '30-Day Streak', description: 'Consistent learning for 30 days', date: '2024-01-30', icon: '🔥' },
  //     { id: 3, title: 'Quick Learner', description: 'Completed 5 courses in one month', date: '2023-12-20', icon: '⚡' }
  //   ]
  // };

  const profileData = userData.profile;

  const StatCard = ({ icon: Icon, label, value }) => (
    <Card className="flex-1">
      <CardContent className="p-4 flex flex-col items-center text-center">
        <Icon className="w-6 h-6 text-indigo-600 mb-2" />
        <p className="text-sm text-gray-600 mb-1">{label}</p>
        <p className="text-xl font-semibold text-gray-900">{value}</p>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8">
      <div className="container mx-auto max-w-6xl">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">My Progress</h1>
          <p className="text-sm sm:text-base text-gray-600">
            Track your learning journey and course progress
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">


            {/* Current Courses */}
            <Card>
              <CardHeader>
                <CardTitle>Current Courses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">

                  { profileData.currentCourses.length > 0 ? profileData.currentCourses.map((course) => (
                    <div key={course.id} className="border-b last:border-b-0 pb-4 last:pb-0">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 gap-2">
                        <h3 className="font-medium text-gray-900">{course.title}</h3>
                        <Badge variant="secondary">
                          {course.completedHours}/{course.totalHours} hours
                        </Badge>
                      </div>
                      <Progress value={course.progress} className="mb-2" />
                      <p className="text-sm text-gray-600">{course.progress}% Complete</p>
                    </div>
                  )) : <div> No courses enrolled</div>}
                </div>
              </CardContent>
            </Card>

            {/* Weekly Progress Graph */}
            <Card>
              <CardHeader>
                <CardTitle>Weekly Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={weeklyProgressData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="day" 
                        tick={{ fill: '#6B7280' }}
                      />
                      <YAxis 
                        tick={{ fill: '#6B7280' }}
                        label={{ 
                          value: 'Hours', 
                          angle: -90, 
                          position: 'insideLeft',
                          style: { fill: '#6B7280' }
                        }}
                      />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="hours" 
                        stroke="#4F46E5" 
                        strokeWidth={2}
                        dot={{ fill: '#4F46E5', strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Learning Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Learning Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <StatCard
                    icon={HiAcademicCap}
                    label="Courses Completed"
                    value={profileData.learning.coursesCompleted}
                  />
                  <StatCard
                    icon={HiBadgeCheck}
                    label="Certificates"
                    value={profileData.learning.certificatesEarned}
                  />
                  <StatCard
                    icon={HiLightningBolt}
                    label="Current Streak"
                    value={`${profileData.learning.currentStreak} days`}
                  />
                  <StatCard
                    icon={HiClock}
                    label="Learning Hours"
                    value={profileData.learning.totalLearningHours}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  { profileData.achievements.length > 0 ? profileData.achievements.map((achievement) => (
                    <div 
                      key={achievement.id}
                      className="flex items-start space-x-3 border-b last:border-b-0 pb-4 last:pb-0"
                    >
                      <div className="text-2xl">{achievement.icon}</div>
                      <div>
                        <h4 className="font-medium text-gray-900">{achievement.title}</h4>
                        <p className="text-sm text-gray-600">{achievement.description}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Earned on {new Date(achievement.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  )) : <div> No achievements enroll to get started</div>}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProgress;