import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export const addToWaitlist = async (email, themePreference = 'video') => {
  if (!supabase) {
    console.warn('Supabase not configured - simulating success');
    return { success: true, data: { email } };
  }

  try {
    // Direkt einfügen - Supabase wirft Fehler bei Duplicate (UNIQUE constraint)
    const { data, error } = await supabase
      .from('waitlist')
      .insert([{
        email: email.toLowerCase(),
        theme_preference: themePreference,
        source: 'coming-soon-page',
      }])
      .select();

    if (error) {
      // Duplicate Email Error (UNIQUE violation)
      if (error.code === '23505') {
        return { success: false, error: 'Diese E-Mail ist bereits auf der Warteliste.' };
      }
      throw error;
    }
    
    return { success: true, data };
  } catch (error) {
    console.error('Waitlist error:', error);
    return { success: false, error: error.message };
  }
};

export const getWaitlist = async (onlyConfirmed = true) => {
  if (!supabase) {
    console.warn('Supabase not configured');
    return { success: false, data: [], error: 'Supabase nicht konfiguriert' };
  }

  try {
    let query = supabase
      .from('waitlist')
      .select('*');
    
    // Nur bestätigte Einträge holen (Double Opt-In)
    if (onlyConfirmed) {
      query = query.eq('confirmed', true);
    }
    
    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Get waitlist error:', error);
    return { success: false, data: [], error: error.message };
  }
};

export const updateWaitlistEntry = async (id, updates) => {
  if (!supabase) {
    return { success: false, error: 'Supabase nicht konfiguriert' };
  }

  try {
    const { data, error } = await supabase
      .from('waitlist')
      .update(updates)
      .eq('id', id)
      .select();

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Update error:', error);
    return { success: false, error: error.message };
  }
};

export const deleteWaitlistEntry = async (id) => {
  if (!supabase) {
    return { success: false, error: 'Supabase nicht konfiguriert' };
  }

  try {
    const { error } = await supabase
      .from('waitlist')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Delete error:', error);
    return { success: false, error: error.message };
  }
};

// Double Opt-In: E-Mail bestätigen
export const confirmWaitlistEntry = async (token, email) => {
  if (!supabase) {
    return { success: false, error: 'Supabase nicht konfiguriert' };
  }

  try {
    // Zuerst prüfen ob Eintrag existiert und Status
    let query = supabase.from('waitlist').select('*');
    
    if (token) {
      query = query.eq('id', token);
    } else if (email) {
      query = query.eq('email', email.toLowerCase());
    }
    
    const { data: existing, error: findError } = await query.single();
    
    if (findError || !existing) {
      return { success: false, error: 'Eintrag nicht gefunden.' };
    }
    
    // Bereits bestätigt?
    if (existing.confirmed) {
      return { success: true, alreadyConfirmed: true };
    }
    
    // Bestätigen
    const { error: updateError } = await supabase
      .from('waitlist')
      .update({ confirmed: true })
      .eq('id', existing.id);
    
    if (updateError) throw updateError;
    
    return { success: true, alreadyConfirmed: false };
  } catch (error) {
    console.error('Confirm error:', error);
    return { success: false, error: error.message };
  }
};

/*
  SUPABASE SQL - ERWEITERT FÜR DOUBLE OPT-IN:
  
  -- Basis-Tabelle erstellen (falls noch nicht vorhanden)
  CREATE TABLE IF NOT EXISTS waitlist (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    theme_preference VARCHAR(50) DEFAULT 'video',
    source VARCHAR(100) DEFAULT 'coming-soon-page',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    contacted BOOLEAN DEFAULT FALSE,
    notes TEXT,
    confirmed BOOLEAN DEFAULT FALSE
  );

  -- Falls Tabelle schon existiert, Spalte hinzufügen:
  ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS confirmed BOOLEAN DEFAULT FALSE;

  -- Row Level Security
  ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;
  
  -- Policies (falls noch nicht vorhanden)
  CREATE POLICY "Allow anonymous inserts" ON waitlist
    FOR INSERT WITH CHECK (true);
    
  CREATE POLICY "Allow read all" ON waitlist
    FOR SELECT USING (true);
    
  CREATE POLICY "Allow update all" ON waitlist
    FOR UPDATE USING (true);
    
  CREATE POLICY "Allow delete all" ON waitlist
    FOR DELETE USING (true);
*/
