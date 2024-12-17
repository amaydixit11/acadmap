// import { getCurrentUserProfile } from "@/lib/profile";
// import { ProfileModel } from "@/models/profile";
// import { useEffect, useState, useCallback } from "react";
// import { toast } from "./use-toast";
// import { ProfileField } from "@/types/profile";

// export function useProfile() {
//   const [isEditing, setIsEditing] = useState(false);
//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const [loading, setLoading] = useState(true);
//   const [profile, setProfile] = useState<ProfileModel | null>(null);
//   const [profileImage, setProfileImage] = useState<File | null>(null);
//   const [imagePreview, setImagePreview] = useState<string | null>(null);

//   // Fetch profile on component mount
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         setLoading(true);
//         const userProfile = await getCurrentUserProfile();
//         setProfile(userProfile);
//         setImagePreview(userProfile?.profile_image ?? null);
//       } catch (error) {
//         toast({
//           variant: "destructive",
//           title: "Profile Fetch Error",
//           description: "Unable to load profile. Please try again later.",
//         });
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, []);

//   // Validate a single field
//   const validateField = useCallback((field: ProfileField, value: string) => {
//     if (field.required && !value) {
//       return `${field.label} is required`;
//     }
//     if (field.validation && value && !field.validation(value)) {
//       return `Invalid ${field.label.toLowerCase()}`;
//     }
//     return "";
//   }, []);

//   // Handle image change with validation
//   const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       // Validate file size and type
//       const maxSize = 5 * 1024 * 1024; // 5MB
//       const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];

//       if (file.size > maxSize) {
//         toast({
//           variant: "destructive",
//           title: "Image Upload Error",
//           description: "File is too large. Maximum size is 5MB.",
//         });
//         return;
//       }

//       if (!allowedTypes.includes(file.type)) {
//         toast({
//           variant: "destructive",
//           title: "Image Upload Error",
//           description: "Invalid file type. Please upload JPEG, PNG, or GIF.",
//         });
//         return;
//       }

//       setProfileImage(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//     }
//   }, []);

//   // Remove profile image
//   const handleRemoveImage = useCallback(() => {
//     setProfileImage(null);
//     setImagePreview(null);
//   }, []);

//   // Validate entire profile
//   const validateProfile = useCallback((profileFields: ProfileField[]) => {
//     if (!profile) return false;

//     const newErrors: Record<string, string> = {};
    
//     profileFields.forEach((field) => {
//       const value = profile[field.key]?.toString() || "";
//       const error = validateField(field, value);
//       if (error) {
//         newErrors[field.key] = error;
//       }
//     });

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   }, [profile, validateField]);

//   // Save profile
//   const handleSave = useCallback(async (profileFields: ProfileField[]) => {
//     if (!profile) return;

//     // Validate profile first
//     if (!validateProfile(profileFields)) {
//       toast({
//         variant: "destructive",
//         title: "Validation Error",
//         description: "Please correct the highlighted fields.",
//       });
//       return;
//     }

//     try {
//       // Prepare profile data for update
//       const profileData = { ...profile };
      
//       // Handle profile image upload if a new image is selected
//       if (profileImage) {
//         const uploadedImageUrl = await uploadProfileImage(profileImage);
//         profileData.profile_image = uploadedImageUrl;
//       }

//       // Update profile
//     //   const updatedProfile = await updateUserProfile(profileData);
      
//     //   setProfile(updatedProfile);
//       setIsEditing(false);
//       setProfileImage(null);
      
//       toast({
//         title: "Profile Updated",
//         description: "Your profile has been successfully updated.",
//       });
//     } catch (error) {
//       toast({
//         variant: "destructive",
//         title: "Update Error",
//         description: "Failed to update profile. Please try again.",
//       });
//     }
//   }, [profile, profileImage, validateProfile]);

//   // Input change handler
//   const handleInputChange = useCallback((key: keyof ProfileModel, value: string) => {
//     if (!profile) return;

//     setProfile(prev => ({
//       ...prev!,
//       [key]: value
//     }));
//     setErrors(prev => ({
//       ...prev,
//       [key]: ""
//     }));
//   }, [profile]);

//   // Toggle editing mode
//   const toggleEditing = useCallback(() => {
//     setIsEditing(prev => !prev);
//     // Reset errors when exiting edit mode
//     if (isEditing) {
//       setErrors({});
//     }
//   }, [isEditing]);

//   return {
//     profile,
//     loading,
//     isEditing,
//     errors,
//     imagePreview,
//     profileImage,
//     setProfile,
//     handleInputChange,
//     handleSave,
//     handleImageChange,
//     handleRemoveImage,
//     toggleEditing,
//     validateField
//   };
// }

// // Simulated image upload function (replace with actual upload logic)
// async function uploadProfileImage(file: File): Promise<string> {
//   // In a real application, this would be an actual API call to upload the image
//   return URL.createObjectURL(file);
// }