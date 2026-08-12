
import { getAdminProfileData } from "@/features/mis-cuyes/profile/services/profile.service";
import ProfileClient from "./ProfileClient";

export default async function PerfilPage() {
  const profile = await getAdminProfileData();

  return (
    <ProfileClient
      initialProfile={profile}
    />
  );
}