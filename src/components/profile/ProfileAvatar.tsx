import { useProfileContext } from '@/context/ProfileContext'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { ImagePlus, X } from 'lucide-react';
import React from 'react'

const ProfileAvatar = () => {
    const { imagePreview, profile, isEditing, handleImageChange, handleRemoveImage } = useProfileContext();
    
    if (!profile) return null;

    return (
        <div className="relative group w-32 sm:w-40 md:w-48 aspect-square mx-auto">
            <div className="relative w-full h-full">
                <Avatar className="w-full h-full rounded-full shadow-md transition-all duration-300 group-hover:shadow-lg dark:shadow-xl/20">
                    <AvatarImage 
                        src={imagePreview || profile.profile_image} 
                        alt="Profile Picture" 
                        className="w-full h-full object-cover rounded-full"
                    />
                    <AvatarFallback className="w-full h-full flex items-center justify-center 
                        bg-primary/10 dark:bg-primary/20 
                        text-2xl sm:text-3xl md:text-4xl 
                        font-semibold 
                        text-primary/70 dark:text-primary/80 
                        rounded-full"
                    >
                        {profile.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
                
                {isEditing && (
                    <div className="absolute inset-0 flex items-center justify-center 
                        bg-black/40 dark:bg-black/60 
                        rounded-full 
                        opacity-0 group-hover:opacity-100 
                        transition-opacity duration-300 ease-in-out"
                    >
                        <div className="flex items-center space-x-2 sm:space-x-4">
                            <label 
                                htmlFor="profile-image-upload" 
                                className="cursor-pointer 
                                    bg-white/20 hover:bg-white/30 
                                    dark:bg-white/30 dark:hover:bg-white/40 
                                    p-2 sm:p-3 
                                    rounded-full 
                                    transition-all duration-200 ease-in-out 
                                    transform hover:scale-110"
                            >
                                <ImagePlus className="text-white h-5 w-5 sm:h-6 sm:w-6" />
                                <input 
                                    type="file" 
                                    id="profile-image-upload" 
                                    accept="image/*" 
                                    className="hidden" 
                                    onChange={handleImageChange}
                                />
                            </label>
                            
                            {imagePreview && (
                                <button 
                                    onClick={handleRemoveImage} 
                                    className="
                                        bg-red-500 dark:bg-red-600 
                                        rounded-full 
                                        p-2 sm:p-3 
                                        hover:bg-red-600 dark:hover:bg-red-700 
                                        transition-all duration-200 ease-in-out 
                                        transform hover:scale-110"
                                    aria-label="Remove image"
                                >
                                    <X className="text-white h-4 w-4 sm:h-5 sm:w-5" />
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProfileAvatar