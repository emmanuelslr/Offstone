-- Table prospects for Offstone tracking integration
-- This table stores prospect data from the /merci form submission

CREATE TABLE IF NOT EXISTS prospects (
  -- Primary fields
  email TEXT NOT NULL PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  phone_raw TEXT,
  phone_e164 TEXT,
  capacite_investissement TEXT,
  
  -- UTM tracking fields
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_term TEXT,
  utm_content TEXT,
  
  -- Submission metadata
  submitted_at TIMESTAMPTZ NOT NULL,
  ip INET,
  user_agent TEXT,
  
  -- Marketing consent
  consentement_marketing BOOLEAN DEFAULT FALSE,
  
  -- HubSpot integration fields
  hs_contact_id TEXT,
  hs_deal_id TEXT,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_prospects_email ON prospects(email);
CREATE INDEX IF NOT EXISTS idx_prospects_submitted_at ON prospects(submitted_at);
CREATE INDEX IF NOT EXISTS idx_prospects_hs_contact_id ON prospects(hs_contact_id);
CREATE INDEX IF NOT EXISTS idx_prospects_utm_source ON prospects(utm_source);
CREATE INDEX IF NOT EXISTS idx_prospects_utm_campaign ON prospects(utm_campaign);

-- Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at on row updates
DROP TRIGGER IF EXISTS update_prospects_updated_at ON prospects;
CREATE TRIGGER update_prospects_updated_at
    BEFORE UPDATE ON prospects
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Grant necessary permissions (adjust as needed for your setup)
-- GRANT SELECT, INSERT, UPDATE ON prospects TO your_app_user;
-- GRANT USAGE ON SEQUENCE prospects_id_seq TO your_app_user;

-- Add comments for documentation
COMMENT ON TABLE prospects IS 'Stores prospect data from Offstone website forms';
COMMENT ON COLUMN prospects.email IS 'Primary key - prospect email address';
COMMENT ON COLUMN prospects.phone_raw IS 'Original phone number as entered by user';
COMMENT ON COLUMN prospects.phone_e164 IS 'Normalized phone number in E.164 format';
COMMENT ON COLUMN prospects.capacite_investissement IS 'Investment capacity range (e.g., 100_500k)';
COMMENT ON COLUMN prospects.submitted_at IS 'When the form was submitted (ISO8601 format)';
COMMENT ON COLUMN prospects.hs_contact_id IS 'HubSpot contact ID after sync';
COMMENT ON COLUMN prospects.hs_deal_id IS 'HubSpot deal ID after workflow trigger';
COMMENT ON COLUMN prospects.consentement_marketing IS 'Marketing consent status';

















