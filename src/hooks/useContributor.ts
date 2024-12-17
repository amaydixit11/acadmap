import { useState, useEffect, useCallback } from "react";
import { getAllRecords, getRecordById } from "@/lib/supabase";
import { ProfileModel } from "@/models/profile";

// Custom hook to fetch profiles
export function useContributor(id?: string) {
  const [profiles, setProfiles] = useState<ProfileModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedProfile, setSelectedProfile] = useState<ProfileModel | null>(null);
  const [selectedProfileName, setSelectedProfileName] = useState<string | null>(null);

  // Fetch all profiles from the database
  const fetchProfiles = useCallback(async () => {
    setLoading(true);
    setError(null); // Clear previous errors

    try {
      const fetchedProfiles: ProfileModel[] = await getAllRecords('profiles') as ProfileModel[];
      setProfiles(fetchedProfiles);
    } catch (err: any) {
      console.error("Error fetching profiles:", err);
      setError(err.message || "Failed to load profiles.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch profiles on mount
  useEffect(() => {
    fetchProfiles();
  }, [fetchProfiles]);

  // Fetch a single profile by ID
  const getProfileNameById = useCallback(async (id: string): Promise<string> => {
    setLoading(true);
    setError(null); // Clear previous errors

    try {
      const profile = await getRecordById('profiles', id);
      if (profile) {
        console.log("Profile name:", profile.name);
        return profile.name;
      } else {
        setError(`Profile with ID ${id} not found.`);
        return id; // Return ID if profile not found
      }
    } catch (err: any) {
      console.error("Error fetching profile:", err);
      setError(err.message || "Failed to load profile.");
      return id; // Return ID in case of an error
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const fetchUserName = async (id: string) => {
      const name = await getProfileNameById(id);
    //   setSelectedProfile(name);
      setSelectedProfileName(name);
    };
    if (id) fetchUserName(id);
  }, [id]);

  return { profiles, loading, error, getProfileNameById, selectedProfile, selectedProfileName };
}