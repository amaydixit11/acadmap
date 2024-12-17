import { ProfilePageContent } from "@/components/profile/ProfilePageContent";
import { ProfileProvider } from "@/context/ProfileContext";

const ProfilePage = () => {
  return (
    <ProfileProvider>
      <ProfilePageContent />
    </ProfileProvider>
  )
}

export default ProfilePage;