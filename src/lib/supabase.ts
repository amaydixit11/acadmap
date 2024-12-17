import { createClient } from "@/utils/supabase/client";

// Database functions

// Define a generic type for the record to be inserted/updated
interface Record {
  [key: string]: any; // Allows for dynamic keys for records
}

export const getAllRecords = async (table: string): Promise<Record[]> => {
  const supabase = createClient();

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
  const supabase = createClient();

  try {
    const { data, error } = await supabase.from(table).select('*').eq('id', id).maybeSingle();
    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error fetching record from ${table} by ID:`, error);
    return null;
  }
};

export const insertRecord = async (table: string, record: Record): Promise<Record | null> => {
  console.log(`Inserting record into table: ${table}`);
  console.log("Record data to insert:", record);
  
  const supabase = createClient();
  console.log("Supabase client created.");

  try {
    console.log(`Attempting to insert record into table: ${table}`);
    const { data, error } = await supabase.from(table).insert(record);
    console.log("Supabase response:", { data, error });

    if (error) {
      console.error(`Error occurred while inserting into ${table}:`, error);
      throw error;
    }

    if (data) {
      console.log(`Record inserted successfully into ${table}:`, data[0]);
      return data[0];
    } else {
      console.log(`No data returned from insertion into ${table}`);
      return null;
    }
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
  const supabase = createClient();
  console.log(`[DEBUG] Preparing to update record in table '${table}' with ID '${id}'.`);
  console.log(`[DEBUG] Update payload:`, record);

  try {
    console.log(`[DEBUG] Sending update request to Supabase...`);
    const { data, error } = await supabase
      .from(table)
      .update(record)
      .eq('id', id)
      .maybeSingle();

    if (error) {
      console.error(`[ERROR] Failed to update record in table '${table}' for ID '${id}':`, error);
      return null;
    }

    console.log(`[DEBUG] Record updated successfully in table '${table}' for ID '${id}':`, data);
    return data;
  } catch (error) {
    console.error(`[ERROR] Exception while updating record in table '${table}' for ID '${id}':`, error);
    return null;
  }
};


export const deleteRecord = async (table: string, id: string): Promise<boolean> => {
  const supabase = createClient();

  try {
    const { error } = await supabase.from(table).delete().eq('id', id);
    if (error) throw error;
    return true;
  } catch (error) {
    console.error(`Error deleting record from ${table}:`, error);
    return false;
  }
};
