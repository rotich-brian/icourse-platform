import React, { useState } from 'react';
import { 
  HiBell, 
  HiAcademicCap,
  HiColorSwatch,
  HiMail,
  HiClock,
  HiBookOpen,
  HiMenu,
  HiUser
} from 'react-icons/hi';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('learning');
  const [saveStatus, setSaveStatus] = useState('');

  const userSettings = {
    learning: {
      difficultyLevel: 'Intermediate',
      coursesPerWeek: 2,
      preferredTopics: ['Frontend', 'React', 'JavaScript'],
      showProgress: true,
      enableCommunityFeatures: true,
      learningReminders: true,
      dailyGoalHours: 2,
      preferredLearningTime: 'Morning'
    },
    notifications: {
      courseUpdates: true,
      newCourses: true,
      achievements: true,
      weeklyProgress: true,
      emailDigest: false,
      mentorMessages: true
    },
    accessibility: {
      fontSize: 'Medium',
      highContrast: false,
      reducedMotion: false,
      screenReader: false,
      captionsEnabled: true,
      textToSpeech: false
    }
  };

  const handleSave = (section) => {
    setSaveStatus(`${section} settings saved successfully!`);
    setTimeout(() => setSaveStatus(''), 3000);
  };

  const SettingsCard = ({ title, children }) => (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-900">{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );

  const SettingRow = ({ icon: Icon, label, children, description }) => (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 border-b last:border-b-0">
      <div className="flex items-start sm:items-center space-x-3 mb-2 sm:mb-0">
        <Icon className="w-5 h-5 text-gray-500 mt-1 sm:mt-0" />
        <div>
          <Label className="text-sm font-medium text-gray-900">{label}</Label>
          {description && (
            <p className="text-xs text-gray-500 mt-1">{description}</p>
          )}
        </div>
      </div>
      <div className="ml-8 sm:ml-0">{children}</div>
    </div>
  );

  const TabButton = ({ id, label, icon: Icon, isActive, onClick }) => (
    <button
      onClick={() => onClick(id)}
      className={`flex items-center space-x-2 w-full p-3 rounded-lg transition-colors
        ${isActive 
          ? 'bg-indigo-50 text-indigo-700 font-medium' 
          : 'text-gray-600 hover:bg-gray-50'
        }`}
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </button>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'learning':
        return (
          <SettingsCard title="Learning Preferences">
            <SettingRow 
              icon={HiAcademicCap} 
              label="Difficulty Level"
              description="Set your preferred course difficulty"
            >
              <Select defaultValue={userSettings.learning.difficultyLevel}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </SettingRow>
            
            <SettingRow 
              icon={HiClock} 
              label="Daily Learning Goal"
              description="Hours you want to dedicate to learning each day"
            >
              <Select defaultValue={userSettings.learning.dailyGoalHours}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={1}>1 hour</SelectItem>
                  <SelectItem value={2}>2 hours</SelectItem>
                  <SelectItem value={3}>3 hours</SelectItem>
                  <SelectItem value={4}>4+ hours</SelectItem>
                </SelectContent>
              </Select>
            </SettingRow>

            <SettingRow 
              icon={HiBookOpen} 
              label="Preferred Topics"
              description="Select your areas of interest"
            >
              <div className="flex gap-2 flex-wrap">
                {userSettings.learning.preferredTopics.map((topic) => (
                  <Badge key={topic} variant="secondary">
                    {topic}
                  </Badge>
                ))}
                <Button variant="outline" size="sm">Add More</Button>
              </div>
            </SettingRow>

            <SettingRow 
              icon={HiUser} 
              label="Community Features"
              description="Enable peer learning and discussions"
            >
              <Switch checked={userSettings.learning.enableCommunityFeatures} />
            </SettingRow>

            <div className="mt-6">
              <Button onClick={() => handleSave('Learning')}>
                Save Learning Settings
              </Button>
            </div>
          </SettingsCard>
        );

      case 'notifications':
        return (
          <SettingsCard title="Notification Preferences">
            <SettingRow 
              icon={HiBell} 
              label="Course Updates"
              description="Get notified about course content updates"
            >
              <Switch checked={userSettings.notifications.courseUpdates} />
            </SettingRow>
            
            <SettingRow 
              icon={HiBell} 
              label="Achievement Alerts"
              description="Notifications for completed milestones"
            >
              <Switch checked={userSettings.notifications.achievements} />
            </SettingRow>
            
            <SettingRow 
              icon={HiMail} 
              label="Weekly Email Digest"
              description="Receive weekly progress summary"
            >
              <Switch checked={userSettings.notifications.emailDigest} />
            </SettingRow>
            
            <SettingRow 
              icon={HiBell} 
              label="Mentor Messages"
              description="Get notified about mentor communications"
            >
              <Switch checked={userSettings.notifications.mentorMessages} />
            </SettingRow>

            <div className="mt-6">
              <Button onClick={() => handleSave('Notification')}>
                Save Notification Settings
              </Button>
            </div>
          </SettingsCard>
        );

      case 'accessibility':
        return (
          <SettingsCard title="Accessibility Settings">
            <SettingRow 
              icon={HiColorSwatch} 
              label="Font Size"
              description="Adjust the text size across the platform"
            >
              <Select defaultValue={userSettings.accessibility.fontSize}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Small">Small</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Large">Large</SelectItem>
                </SelectContent>
              </Select>
            </SettingRow>
            
            <SettingRow 
              icon={HiColorSwatch} 
              label="High Contrast"
              description="Increase color contrast for better visibility"
            >
              <Switch checked={userSettings.accessibility.highContrast} />
            </SettingRow>
            
            <SettingRow 
              icon={HiColorSwatch} 
              label="Reduced Motion"
              description="Minimize animations and transitions"
            >
              <Switch checked={userSettings.accessibility.reducedMotion} />
            </SettingRow>
            
            <SettingRow 
              icon={HiColorSwatch} 
              label="Captions"
              description="Enable captions for video content"
            >
              <Switch checked={userSettings.accessibility.captionsEnabled} />
            </SettingRow>

            <div className="mt-6">
              <Button onClick={() => handleSave('Accessibility')}>
                Save Accessibility Settings
              </Button>
            </div>
          </SettingsCard>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-sm sm:text-base text-gray-600">
            Customize your learning experience
          </p>
        </div>

        {saveStatus && (
          <Alert className="mb-6 bg-green-50 border-green-200">
            <AlertDescription className="text-green-800">
              {saveStatus}
            </AlertDescription>
          </Alert>
        )}

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Navigation */}
          <div className="md:w-64 flex-shrink-0">
            <nav className="space-y-1 bg-white p-4 rounded-lg shadow-sm">
              <TabButton
                id="learning"
                label="Learning"
                icon={HiAcademicCap}
                isActive={activeTab === 'learning'}
                onClick={setActiveTab}
              />
              <TabButton
                id="notifications"
                label="Notifications"
                icon={HiBell}
                isActive={activeTab === 'notifications'}
                onClick={setActiveTab}
              />
              <TabButton
                id="accessibility"
                label="Accessibility"
                icon={HiColorSwatch}
                isActive={activeTab === 'accessibility'}
                onClick={setActiveTab}
              />
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;