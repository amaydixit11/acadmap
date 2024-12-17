import { useProfileContext } from '@/context/ProfileContext';
import { profileFields } from '@/types/profile'
import React from 'react'
import { Textarea } from '../ui/textarea';
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
  } from "@/components/ui/select";
import { Input } from '../ui/input';

const ProfileForm = () => {
    const { profile, isEditing, handleInputChange, errors } = useProfileContext();
    if (!profile) return null;

  return (
    <div className="grid md:grid-cols-2 gap-6">
    {profileFields.map((field) => (
      <div key={field.key} className="space-y-2">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 text-primary">
            <field.icon />
          </div>
          {isEditing ? (
            field.component === "textarea" ? (
              <Textarea
                value={profile[field.key]?.toString() || ""}
                onChange={(e) => handleInputChange(field.key, e.target.value)}
                className={`flex-1 ${errors[field.key] ? 'border-red-500' : ''}`}
                placeholder={`Enter your ${field.label.toLowerCase()}`}
              />
            ) : field.component === "select" ? (
              <Select 
                value={profile[field.key]?.toString() || ""}
                onValueChange={(value) => handleInputChange(field.key, value)}
              >
                <SelectTrigger className={`flex-1 ${errors[field.key] ? 'border-red-500' : ''}`}>
                  <SelectValue placeholder={`Select ${field.label}`} />
                </SelectTrigger>
                <SelectContent>
                  {field.options?.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Input
                type={field.type || "text"}
                value={profile[field.key]?.toString() || ""}
                onChange={(e) => handleInputChange(field.key, e.target.value)}
                className={`flex-1 ${errors[field.key] ? 'border-red-500' : ''}`}
                placeholder={`Enter your ${field.label.toLowerCase()}`}
              />
            )
          ) : (
            <div className="flex-1">
              <p className="text-sm font-medium text-muted-foreground">{field.label}</p>
              <p className="font-semibold">{profile[field.key]?.toString() || '-'}</p>
            </div>
          )}
        </div>
        {errors[field.key] && (
          <p className="text-sm text-red-500 ml-12">{errors[field.key]}</p>
        )}
      </div>
    ))}
  </div>
  )
}

export default ProfileForm
