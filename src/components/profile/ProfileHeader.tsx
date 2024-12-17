import React from 'react'
import { CardDescription, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Edit2, Save } from 'lucide-react'
import { useProfileContext } from '@/context/ProfileContext'
import { profileFields } from '@/types/profile'

const ProfileHeader = () => {
    const { isEditing, handleSave, toggleEditing} = useProfileContext()

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
      <div className="space-y-2">
        <CardTitle className="text-2xl sm:text-3xl font-bold text-primary dark:text-primary-light">
          Profile Settings
        </CardTitle>
        <CardDescription className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
          Manage and update your personal information
        </CardDescription>
      </div>
      <Button
        variant={isEditing ? "default" : "outline"}
        size="lg"
        onClick={() => isEditing ? handleSave(profileFields) : toggleEditing()}
        className="w-full sm:w-auto transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2">
        {isEditing ? (
          <>
            <Save className="h-4 w-4 sm:h-5 sm:w-5" /> 
            <span className="text-sm sm:text-base">Save Changes</span>
          </>
        ) : (
          <>
            <Edit2 className="h-4 w-4 sm:h-5 sm:w-5" /> 
            <span className="text-sm sm:text-base">Edit Profile</span>
          </>
        )}
      </Button>
    </div>
  )
}

export default ProfileHeader