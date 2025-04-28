import React, { useState } from 'react';
import { 
  HiPencil,
  HiMail,
  HiGlobe,
  HiLocationMarker,
  HiLink,
} from 'react-icons/hi';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useOutletContext } from 'react-router-dom';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');

  const { userData, loading, error } = useOutletContext();

  const profileData = {
    name: userData.name,
    title: 'Frontend Developer',
    email: userData.email,
    location: 'New York, USA',
    bio: 'Passionate frontend developer with 3 years of experience. Currently focused on mastering React and modern web development practices.',
    website: `${userData.firstName}${userData.lastName}.dev`,
    socialLinks: {
      github: `github.com/${userData.firstName}${userData.lastName}`,
      linkedin: `linkedin.com/in/${userData.firstName}${userData.lastName}`
    },
    skills: ['React', 'JavaScript', 'TypeScript', 'HTML/CSS', 'UI/UX']
  };

  const handleSave = () => {
    setIsEditing(false);
    setSaveStatus('Profile updated successfully!');
    setTimeout(() => setSaveStatus(''), 3000);
  };

  const handleAddSkill = () => {
    // Implement skill addition logic
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8">
      <div className="container mx-auto max-w-4xl">
        {/* Header Section */}
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
            <p className="text-sm sm:text-base text-gray-600">
              Manage your personal information and profile settings
            </p>
          </div>
          <Button 
            onClick={() => setIsEditing(!isEditing)}
            className="mt-4 sm:mt-0"
            variant={isEditing ? "secondary" : "default"}
          >
            <HiPencil className="w-4 h-4 mr-2" />
            {isEditing ? 'Cancel Editing' : 'Edit Profile'}
          </Button>
        </div>

        {saveStatus && (
          <Alert className="mb-6 bg-green-50 border-green-200">
            <AlertDescription className="text-green-800">
              {saveStatus}
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-6">
          {/* Profile Picture Card */}
          <Card>
            <CardHeader>
              <CardTitle>Profile Picture</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full bg-gray-200 mb-4 overflow-hidden">
                <img
                  src="https://www.pngmart.com/files/23/Profile-PNG-Photo.png"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              {isEditing && (
                <Button variant="outline">Change Photo</Button>
              )}
            </CardContent>
          </Card>

          {/* Personal Info Card */}
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <div className="flex-1">
                  <label className="text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <Input 
                    disabled={!isEditing}
                    defaultValue={profileData.name}
                  />
                </div>
                <div className="flex-1">
                  <label className="text-sm font-medium text-gray-700 mb-1">Title</label>
                  <Input 
                    disabled={!isEditing}
                    defaultValue={profileData.title}
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <div className="flex-1">
                  <label className="text-sm font-medium text-gray-700 mb-1">Email</label>
                  <div className="flex items-center space-x-2">
                    <HiMail className="text-gray-500" />
                    <Input 
                      disabled={!isEditing}
                      defaultValue={profileData.email}
                      type="email"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <label className="text-sm font-medium text-gray-700 mb-1">Location</label>
                  <div className="flex items-center space-x-2">
                    <HiLocationMarker className="text-gray-500" />
                    <Input 
                      disabled={!isEditing}
                      defaultValue={profileData.location}
                    />
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <label className="text-sm font-medium text-gray-700 mb-1">Bio</label>
                <Textarea 
                  disabled={!isEditing}
                  defaultValue={profileData.bio}
                  className="h-24"
                />
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1">Website</label>
                  <div className="flex items-center space-x-2">
                    <HiGlobe className="text-gray-500" />
                    <Input 
                      disabled={!isEditing}
                      defaultValue={profileData.website}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1">Social Links</label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <HiLink className="text-gray-500" />
                      <Input 
                        disabled={!isEditing}
                        defaultValue={profileData.socialLinks.github}
                        placeholder="GitHub URL"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <HiLink className="text-gray-500" />
                      <Input 
                        disabled={!isEditing}
                        defaultValue={profileData.socialLinks.linkedin}
                        placeholder="LinkedIn URL"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1">Skills</label>
                  <div className="flex flex-wrap gap-2">
                    {profileData.skills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                        {isEditing && (
                          <button className="ml-1 text-gray-500 hover:text-gray-700">×</button>
                        )}
                      </Badge>
                    ))}
                    {isEditing && (
                      <Button variant="outline" size="sm" onClick={handleAddSkill}>
                        Add Skill
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {isEditing && (
                <div className="mt-6">
                  <Button onClick={handleSave}>Save Changes</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;