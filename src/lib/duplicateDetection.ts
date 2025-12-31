/**
 * Utility for detecting duplicate files using SHA-256 hashing
 */

/**
 * Calculate SHA-256 hash of a file
 */
export async function hashFile(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

/**
 * Check if a file hash already exists in the database
 */
export async function checkDuplicateHash(
  hash: string,
  supabaseClient: any
): Promise<{ isDuplicate: boolean; existingResource?: any }> {
  try {
    const { data, error } = await supabaseClient
      .from('resource_hashes')
      .select('resource_id, file_name, uploaded_at')
      .eq('hash', hash)
      .single();

    if (error && error.code !== 'PGRST116') {
      // PGRST116 = no rows found, which is expected for non-duplicates
      console.error('Error checking duplicate:', error);
      return { isDuplicate: false };
    }

    if (data) {
      return {
        isDuplicate: true,
        existingResource: data,
      };
    }

    return { isDuplicate: false };
  } catch (err) {
    console.error('Error in duplicate check:', err);
    return { isDuplicate: false };
  }
}

/**
 * Register a file hash after successful upload
 */
export async function registerFileHash(
  hash: string,
  resourceId: string,
  fileName: string,
  userId: string,
  supabaseClient: any
): Promise<boolean> {
  try {
    const { error } = await supabaseClient
      .from('resource_hashes')
      .insert({
        hash,
        resource_id: resourceId,
        file_name: fileName,
        uploaded_by: userId,
      } as any);

    if (error) {
      console.error('Error registering hash:', error);
      return false;
    }

    return true;
  } catch (err) {
    console.error('Error in hash registration:', err);
    return false;
  }
}

/**
 * Hook-friendly wrapper for duplicate detection
 */
export function createDuplicateChecker(supabaseClient: any) {
  return {
    async checkFile(file: File) {
      const hash = await hashFile(file);
      const result = await checkDuplicateHash(hash, supabaseClient);
      return { hash, ...result };
    },
    async registerFile(hash: string, resourceId: string, fileName: string, userId: string) {
      return registerFileHash(hash, resourceId, fileName, userId, supabaseClient);
    },
  };
}
