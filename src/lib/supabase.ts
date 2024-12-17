import { createClient } from "@/utils/supabase/server";

// Database functions

// Define a generic type for the record to be inserted/updated
interface Record {
  id: string;
  [key: string]: any; // Allows for dynamic keys for records
}

export const getAllRecords = async (table: string): Promise<Record[]> => {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase.from(table).select('*');
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error(`Error fetching data from ${table}:`, error);
    return [];
  }
};

export const getRecordById = async (table: string, id: string): Promise<Record | null> => {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase.from(table).select('*').eq('id', id).single();
    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error fetching record from ${table} by ID:`, error);
    return null;
  }
};

export const insertRecord = async (table: string, record: Record): Promise<Record | null> => {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase.from(table).insert([record]);
    if (error) throw error;
    return data ? data[0] : null;
  } catch (error) {
    console.error(`Error inserting record into ${table}:`, error);
    return null;
  }
};

export const updateRecord = async (
  table: string,
  id: string,
  record: Partial<Record>
): Promise<Record | null> => {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase.from(table).update(record).eq('id', id).single();
    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error updating record in ${table}:`, error);
    return null;
  }
};

export const deleteRecord = async (table: string, id: string): Promise<boolean> => {
  const supabase = await createClient();

  try {
    const { error } = await supabase.from(table).delete().eq('id', id);
    if (error) throw error;
    return true;
  } catch (error) {
    console.error(`Error deleting record from ${table}:`, error);
    return false;
  }
};
