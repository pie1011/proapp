-- Supabase Database Schema for Pro Appliance Installation Quote System
-- Execute this SQL in your Supabase SQL editor

-- Create the quotes table
CREATE TABLE quotes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Client Information
    customer_name TEXT,
    email TEXT,
    phone_primary TEXT,
    phone_secondary TEXT,
    client_type TEXT,
    company_name TEXT,
    company_address TEXT,
    company_phone TEXT,
    
    -- Pre-install Assessment
    purchased TEXT,
    field_measure TEXT,
    
    -- Installation Address
    street TEXT,
    unit TEXT,
    city TEXT,
    zip TEXT,
    
    -- Services
    delivery TEXT,
    pickup_location TEXT,
    pickup_date TEXT,
    uninstall TEXT,
    haul_away TEXT,
    
    -- Site Details
    home_type TEXT,
    floor TEXT,
    stairs TEXT,
    stairs_number TEXT,
    stairs_turns TEXT,
    parking TEXT,
    parking_notes TEXT,
    gate_code TEXT,
    
    -- Project Details
    preferred_date TEXT,
    preferred_time TEXT[], -- Array of time preferences
    additional_details TEXT,
    
    -- Selected Appliances (JSON array of appliance names)
    selected_appliances JSONB DEFAULT '[]'::jsonb,
    
    -- Raw form data (complete backup)
    raw_form_data JSONB DEFAULT '{}'::jsonb,
    
    -- Processing metadata
    email_sent BOOLEAN DEFAULT FALSE,
    email_sent_at TIMESTAMP WITH TIME ZONE,
    processed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create appliance_details table for individual appliance information
CREATE TABLE appliance_details (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    quote_id UUID REFERENCES quotes(id) ON DELETE CASCADE,
    appliance_type TEXT NOT NULL, -- 'range', 'hood', 'dishwasher', etc.
    brand TEXT,
    model TEXT,
    notes TEXT,
    specifics TEXT[], -- Array of specific requirements/options
    additional_data JSONB DEFAULT '{}'::jsonb, -- For type-specific fields like pedestalModel
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create quote_files table for uploaded files
CREATE TABLE quote_files (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    quote_id UUID REFERENCES quotes(id) ON DELETE CASCADE,
    file_name TEXT NOT NULL,
    file_size INTEGER,
    file_type TEXT,
    storage_path TEXT NOT NULL, -- Path in Supabase Storage
    upload_order INTEGER, -- 1-5 for the 5 file slots
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_quotes_created_at ON quotes(created_at);
CREATE INDEX idx_quotes_email ON quotes(email);
CREATE INDEX idx_quotes_customer_name ON quotes(customer_name);
CREATE INDEX idx_appliance_details_quote_id ON appliance_details(quote_id);
CREATE INDEX idx_quote_files_quote_id ON quote_files(quote_id);

-- Enable Row Level Security (RLS) - Optional but recommended
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE appliance_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE quote_files ENABLE ROW LEVEL SECURITY;

-- Create policies for your Netlify Function to access data
-- These policies allow your service role key to perform all operations
CREATE POLICY "Service role can manage quotes" ON quotes
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role can manage appliance details" ON appliance_details
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role can manage quote files" ON quote_files
    FOR ALL USING (auth.role() = 'service_role');

-- Create a view for easy quote retrieval with all related data
CREATE VIEW quote_summary AS
SELECT 
    q.*,
    COALESCE(
        json_agg(
            json_build_object(
                'appliance_type', ad.appliance_type,
                'brand', ad.brand,
                'model', ad.model,
                'notes', ad.notes,
                'specifics', ad.specifics,
                'additional_data', ad.additional_data
            )
        ) FILTER (WHERE ad.id IS NOT NULL), 
        '[]'::json
    ) as appliance_details,
    COALESCE(
        json_agg(
            json_build_object(
                'file_name', qf.file_name,
                'file_size', qf.file_size,
                'file_type', qf.file_type,
                'storage_path', qf.storage_path,
                'upload_order', qf.upload_order
            ) ORDER BY qf.upload_order
        ) FILTER (WHERE qf.id IS NOT NULL),
        '[]'::json
    ) as files
FROM quotes q
LEFT JOIN appliance_details ad ON q.id = ad.quote_id
LEFT JOIN quote_files qf ON q.id = qf.quote_id
GROUP BY q.id;