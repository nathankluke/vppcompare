-- =============================================================================
-- VPPCompare Database Migration
-- =============================================================================
-- Run this entire file in the Supabase SQL Editor.
-- It creates new tables for batteries, incentives, and compatibility,
-- adds columns to the existing vpps table, and inserts seed data.
-- =============================================================================

-- =============================================
-- STEP 1: Create the batteries table
-- =============================================
CREATE TABLE IF NOT EXISTS batteries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  manufacturer TEXT NOT NULL,
  brand_key TEXT NOT NULL,
  capacity_kwh NUMERIC(5,1) NOT NULL,
  price_installed INTEGER NOT NULL,
  price_per_kwh NUMERIC(7,2) GENERATED ALWAYS AS (
    ROUND(price_installed::NUMERIC / NULLIF(capacity_kwh, 0), 2)
  ) STORED,
  is_modular BOOLEAN DEFAULT false,
  itc_eligible BOOLEAN DEFAULT true,
  notes TEXT,
  product_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE batteries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access for batteries"
  ON batteries FOR SELECT USING (true);

-- =============================================
-- STEP 2: Create the vpp_incentives table
-- =============================================
CREATE TABLE IF NOT EXISTS vpp_incentives (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  vpp_id UUID NOT NULL REFERENCES vpps(id) ON DELETE CASCADE,
  incentive_type TEXT NOT NULL CHECK (incentive_type IN ('purchase', 'ongoing')),
  name TEXT NOT NULL,
  description TEXT,
  amount_dollars NUMERIC(10,2),
  amount_rate NUMERIC(10,2),
  rate_unit TEXT,
  frequency TEXT CHECK (frequency IN ('one-time', 'per-event', 'monthly', 'seasonal', 'yearly')),
  estimated_annual_value NUMERIC(10,2),
  qualifying_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE vpp_incentives ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access for vpp_incentives"
  ON vpp_incentives FOR SELECT USING (true);

-- =============================================
-- STEP 3: Create the vpp_battery_compatibility junction table
-- =============================================
CREATE TABLE IF NOT EXISTS vpp_battery_compatibility (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  vpp_id UUID NOT NULL REFERENCES vpps(id) ON DELETE CASCADE,
  battery_id UUID NOT NULL REFERENCES batteries(id) ON DELETE CASCADE,
  is_recommended BOOLEAN DEFAULT false,
  compatibility_notes TEXT,
  UNIQUE(vpp_id, battery_id)
);

ALTER TABLE vpp_battery_compatibility ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access for vpp_battery_compatibility"
  ON vpp_battery_compatibility FOR SELECT USING (true);

-- =============================================
-- STEP 4: Add new columns to existing vpps table
-- =============================================
ALTER TABLE vpps ADD COLUMN IF NOT EXISTS has_purchase_incentive BOOLEAN DEFAULT false;
ALTER TABLE vpps ADD COLUMN IF NOT EXISTS has_ongoing_incentive BOOLEAN DEFAULT false;
ALTER TABLE vpps ADD COLUMN IF NOT EXISTS incentive_summary TEXT;
ALTER TABLE vpps ADD COLUMN IF NOT EXISTS program_model TEXT DEFAULT 'standard';

-- =============================================
-- STEP 5: Insert battery products
-- =============================================
INSERT INTO batteries (name, manufacturer, brand_key, capacity_kwh, price_installed, is_modular, itc_eligible, notes, product_url) VALUES
('Tesla Powerwall 3', 'Tesla', 'Tesla Powerwall', 13.5, 15400, false, true, 'Best $/kWh value. Most widely supported by VPP programs.', 'https://www.tesla.com/powerwall'),
('Enphase IQ 5P', 'Enphase', 'Enphase', 5.0, 7500, true, true, 'Modular and stackable. Great for smaller homes.', 'https://enphase.com/homeowners/home-battery'),
('Enphase IQ 10T', 'Enphase', 'Enphase', 10.0, 10000, true, true, 'Modular. Good mid-range capacity.', 'https://enphase.com/homeowners/home-battery'),
('Sonnen Core+', 'Sonnen', 'Sonnen', 10.0, 16000, false, true, 'Premium German engineering. Long warranty.', 'https://sonnenusa.com'),
('FranklinWH aPower', 'FranklinWH', 'Franklin', 13.6, 17750, false, true, 'After 30% ITC: ~$12,425. Smart whole-home management.', 'https://www.franklinwh.com'),
('Generac PWRcell', 'Generac', 'Generac', 9.0, 18000, true, true, 'Modular system. Strong installer network.', 'https://www.generac.com/for-homeowners/clean-energy/pwrcell');

-- =============================================
-- STEP 6: Insert VPP incentives
-- =============================================
-- Tesla VPP (DSGS) - ongoing only
INSERT INTO vpp_incentives (vpp_id, incentive_type, name, description, amount_dollars, frequency, estimated_annual_value) VALUES
('371d3812-1e39-426c-9159-630bd469972f', 'ongoing', 'Per-Event VPP Payments', 'Earn payments each time your Powerwall supports the grid during peak demand events.', NULL, 'per-event', 500);

-- Xcel Energy Renewable Battery Connect - BOTH purchase + ongoing
INSERT INTO vpp_incentives (vpp_id, incentive_type, name, description, amount_dollars, frequency, estimated_annual_value, qualifying_notes) VALUES
('e35cb484-8696-44c7-bd04-b0617119ce7c', 'purchase', 'New Battery Rebate', 'Up to $5,000 rebate for installing a new qualifying battery system.', 5000, 'one-time', NULL, 'Must install new battery. Amount varies: $350/kW standard, $800/kW income-qualified.'),
('e35cb484-8696-44c7-bd04-b0617119ce7c', 'ongoing', 'Annual VPP Payment', 'Receive $100 per year for participating in the VPP program.', 100, 'yearly', 100, NULL);

-- Sunrun CalReady VPP - BOTH
INSERT INTO vpp_incentives (vpp_id, incentive_type, name, description, amount_dollars, frequency, estimated_annual_value) VALUES
('fd53a702-5994-4d30-b4d5-740fd326d0d8', 'purchase', 'Battery Enrollment Bonus', '$150 one-time payment when you enroll your battery.', 150, 'one-time', NULL),
('fd53a702-5994-4d30-b4d5-740fd326d0d8', 'ongoing', 'Seasonal Rewards', 'Earn rewards during peak demand season (June-October, up to 100 hours).', NULL, 'seasonal', 350);

-- Green Mountain Power BYOD - ongoing only
INSERT INTO vpp_incentives (vpp_id, incentive_type, name, description, amount_dollars, frequency, estimated_annual_value) VALUES
('a9f82eea-4850-4e1a-83f0-29cd0649d75f', 'ongoing', 'Monthly Bill Credit', 'Receive monthly bill credits for participating in the bring-your-own-device program.', NULL, 'monthly', 400);

-- ConnectedSolutions - BOTH
INSERT INTO vpp_incentives (vpp_id, incentive_type, name, description, amount_rate, rate_unit, frequency, estimated_annual_value, qualifying_notes) VALUES
('0a08ee16-480e-4055-b028-63caa3fd8463', 'purchase', '0% Financing Available', 'Qualify for 0% interest HEAT Loan financing on new battery installation.', NULL, NULL, 'one-time', NULL, 'Through Mass Save HEAT Loan program.'),
('0a08ee16-480e-4055-b028-63caa3fd8463', 'ongoing', 'Performance Payments', 'Earn $275 per kW of battery capacity. Average participant earns ~$1,500/year.', 275, '$/kW', 'seasonal', 1500, 'Payment locked for 5 summers.');

-- Sonnen Wattsmart - ongoing only
INSERT INTO vpp_incentives (vpp_id, incentive_type, name, description, amount_dollars, frequency, estimated_annual_value) VALUES
('bb1fdaf0-e995-4bb9-b7c3-741ddbeef570', 'ongoing', 'Monthly VPP Credits', 'Earn monthly credits for grid support during peak demand periods.', NULL, 'monthly', 450);

-- Base Power VPP - install model
INSERT INTO vpp_incentives (vpp_id, incentive_type, name, description, amount_dollars, frequency, estimated_annual_value, qualifying_notes) VALUES
('388a4467-d17d-4b3f-a0bb-169b2041158a', 'purchase', 'Free Battery Installation', 'Base Power installs and maintains a battery at your home at no upfront cost.', 0, 'one-time', NULL, 'Battery owned by Base Power. Low monthly service fee.'),
('388a4467-d17d-4b3f-a0bb-169b2041158a', 'ongoing', 'Grid Services Revenue Share', 'Earn a share of revenue from grid services provided by your battery.', NULL, 'monthly', 300);

-- NRG / Renew Home VPP - ongoing only
INSERT INTO vpp_incentives (vpp_id, incentive_type, name, description, amount_dollars, frequency, estimated_annual_value) VALUES
('29cfd641-8643-476a-be91-b86edc84baf2', 'ongoing', 'Per-Event Compensation', 'Get paid for each grid support event your battery participates in.', NULL, 'per-event', 400);

-- Haven Energy VPP - ongoing only
INSERT INTO vpp_incentives (vpp_id, incentive_type, name, description, amount_dollars, frequency, estimated_annual_value) VALUES
('1b51dbc1-e3f9-4d43-8094-ee2ce9cbfbbf', 'ongoing', 'VPP Participation Payments', 'Earn payments for allowing your battery to support the grid.', NULL, 'per-event', 350);

-- Tesla SMUD VPP - ongoing only
INSERT INTO vpp_incentives (vpp_id, incentive_type, name, description, amount_dollars, amount_rate, rate_unit, frequency, estimated_annual_value) VALUES
('3f0f15b9-d1b1-4886-b207-c6e7c79d6ea8', 'ongoing', 'SMUD VPP Credits', 'Earn bill credits when your Powerwall supports the SMUD grid.', NULL, 2.0, '$/event', 'per-event', 450);

-- SOLRITE + Sonnen Battery VPP - ongoing only
INSERT INTO vpp_incentives (vpp_id, incentive_type, name, description, amount_dollars, frequency, estimated_annual_value) VALUES
('bd2f5079-2332-4de6-903c-8e36bd6d7920', 'ongoing', 'VPP Revenue Sharing', 'Share in the revenue generated by grid support services.', NULL, 'monthly', 300);

-- Sunrun + PG&E SAVE VPP - ongoing only
INSERT INTO vpp_incentives (vpp_id, incentive_type, name, description, amount_dollars, frequency, estimated_annual_value) VALUES
('e611fb7b-db4f-4975-b445-f0378bf1fb2c', 'ongoing', 'SAVE Program Payments', 'Earn payments through the PG&E SAVE program for emergency grid support.', NULL, 'per-event', 400);

-- =============================================
-- STEP 7: Update VPP flags
-- =============================================
-- Xcel - has both
UPDATE vpps SET has_purchase_incentive = true, has_ongoing_incentive = true, incentive_summary = 'Up to $5,000 rebate + $100/yr VPP payments', program_model = 'standard' WHERE id = 'e35cb484-8696-44c7-bd04-b0617119ce7c';

-- ConnectedSolutions - has both
UPDATE vpps SET has_purchase_incentive = true, has_ongoing_incentive = true, incentive_summary = '0% financing + ~$1,500/yr performance payments', program_model = 'standard' WHERE id = '0a08ee16-480e-4055-b028-63caa3fd8463';

-- Sunrun CalReady - has both
UPDATE vpps SET has_purchase_incentive = true, has_ongoing_incentive = true, incentive_summary = '$150 bonus + seasonal rewards (~$350/yr)', program_model = 'standard' WHERE id = 'fd53a702-5994-4d30-b4d5-740fd326d0d8';

-- Base Power - has both (install model)
UPDATE vpps SET has_purchase_incentive = true, has_ongoing_incentive = true, incentive_summary = 'Free battery install + revenue sharing (~$300/yr)', program_model = 'install' WHERE id = '388a4467-d17d-4b3f-a0bb-169b2041158a';

-- Tesla VPP - ongoing only
UPDATE vpps SET has_purchase_incentive = false, has_ongoing_incentive = true, incentive_summary = 'Per-event payments (~$500/yr)', program_model = 'standard' WHERE id = '371d3812-1e39-426c-9159-630bd469972f';

-- Green Mountain Power - ongoing only
UPDATE vpps SET has_purchase_incentive = false, has_ongoing_incentive = true, incentive_summary = 'Monthly bill credits (~$400/yr)', program_model = 'standard' WHERE id = 'a9f82eea-4850-4e1a-83f0-29cd0649d75f';

-- Sonnen Wattsmart - ongoing only
UPDATE vpps SET has_purchase_incentive = false, has_ongoing_incentive = true, incentive_summary = 'Monthly VPP credits (~$450/yr)', program_model = 'standard' WHERE id = 'bb1fdaf0-e995-4bb9-b7c3-741ddbeef570';

-- NRG / Renew Home - ongoing only
UPDATE vpps SET has_purchase_incentive = false, has_ongoing_incentive = true, incentive_summary = 'Per-event compensation (~$400/yr)', program_model = 'standard' WHERE id = '29cfd641-8643-476a-be91-b86edc84baf2';

-- Haven Energy - ongoing only
UPDATE vpps SET has_purchase_incentive = false, has_ongoing_incentive = true, incentive_summary = 'VPP participation payments (~$350/yr)', program_model = 'standard' WHERE id = '1b51dbc1-e3f9-4d43-8094-ee2ce9cbfbbf';

-- Tesla SMUD - ongoing only
UPDATE vpps SET has_purchase_incentive = false, has_ongoing_incentive = true, incentive_summary = 'SMUD bill credits (~$450/yr)', program_model = 'standard' WHERE id = '3f0f15b9-d1b1-4886-b207-c6e7c79d6ea8';

-- SOLRITE + Sonnen - ongoing only
UPDATE vpps SET has_purchase_incentive = false, has_ongoing_incentive = true, incentive_summary = 'Revenue sharing (~$300/yr)', program_model = 'standard' WHERE id = 'bd2f5079-2332-4de6-903c-8e36bd6d7920';

-- Sunrun PG&E SAVE - ongoing only
UPDATE vpps SET has_purchase_incentive = false, has_ongoing_incentive = true, incentive_summary = 'SAVE program payments (~$400/yr)', program_model = 'standard' WHERE id = 'e611fb7b-db4f-4975-b445-f0378bf1fb2c';

-- =============================================
-- STEP 8: Insert battery compatibility links
-- We need to reference the battery IDs, so we use a subquery approach
-- =============================================

-- Tesla VPP (DSGS) → Tesla Powerwall (recommended)
INSERT INTO vpp_battery_compatibility (vpp_id, battery_id, is_recommended) VALUES
('371d3812-1e39-426c-9159-630bd469972f', (SELECT id FROM batteries WHERE name = 'Tesla Powerwall 3'), true);

-- Xcel Energy → Tesla Powerwall, Enphase, Sonnen, Franklin, Generac
INSERT INTO vpp_battery_compatibility (vpp_id, battery_id, is_recommended, compatibility_notes) VALUES
('e35cb484-8696-44c7-bd04-b0617119ce7c', (SELECT id FROM batteries WHERE name = 'Tesla Powerwall 3'), true, 'Up to $4,025 rebate for Powerwall'),
('e35cb484-8696-44c7-bd04-b0617119ce7c', (SELECT id FROM batteries WHERE name = 'Enphase IQ 5P'), false, NULL),
('e35cb484-8696-44c7-bd04-b0617119ce7c', (SELECT id FROM batteries WHERE name = 'Enphase IQ 10T'), false, NULL),
('e35cb484-8696-44c7-bd04-b0617119ce7c', (SELECT id FROM batteries WHERE name = 'Sonnen Core+'), false, NULL),
('e35cb484-8696-44c7-bd04-b0617119ce7c', (SELECT id FROM batteries WHERE name = 'FranklinWH aPower'), false, NULL),
('e35cb484-8696-44c7-bd04-b0617119ce7c', (SELECT id FROM batteries WHERE name = 'Generac PWRcell'), false, NULL);

-- Sunrun CalReady → Tesla Powerwall (recommended), Enphase
INSERT INTO vpp_battery_compatibility (vpp_id, battery_id, is_recommended) VALUES
('fd53a702-5994-4d30-b4d5-740fd326d0d8', (SELECT id FROM batteries WHERE name = 'Tesla Powerwall 3'), true),
('fd53a702-5994-4d30-b4d5-740fd326d0d8', (SELECT id FROM batteries WHERE name = 'Enphase IQ 10T'), false);

-- Green Mountain Power → Tesla Powerwall, Enphase, Sonnen
INSERT INTO vpp_battery_compatibility (vpp_id, battery_id, is_recommended) VALUES
('a9f82eea-4850-4e1a-83f0-29cd0649d75f', (SELECT id FROM batteries WHERE name = 'Tesla Powerwall 3'), true),
('a9f82eea-4850-4e1a-83f0-29cd0649d75f', (SELECT id FROM batteries WHERE name = 'Enphase IQ 10T'), false),
('a9f82eea-4850-4e1a-83f0-29cd0649d75f', (SELECT id FROM batteries WHERE name = 'Sonnen Core+'), false);

-- ConnectedSolutions → Tesla Powerwall, Enphase, Sonnen, Franklin, Generac
INSERT INTO vpp_battery_compatibility (vpp_id, battery_id, is_recommended) VALUES
('0a08ee16-480e-4055-b028-63caa3fd8463', (SELECT id FROM batteries WHERE name = 'Tesla Powerwall 3'), true),
('0a08ee16-480e-4055-b028-63caa3fd8463', (SELECT id FROM batteries WHERE name = 'Enphase IQ 5P'), false),
('0a08ee16-480e-4055-b028-63caa3fd8463', (SELECT id FROM batteries WHERE name = 'Enphase IQ 10T'), false),
('0a08ee16-480e-4055-b028-63caa3fd8463', (SELECT id FROM batteries WHERE name = 'Sonnen Core+'), false),
('0a08ee16-480e-4055-b028-63caa3fd8463', (SELECT id FROM batteries WHERE name = 'FranklinWH aPower'), false),
('0a08ee16-480e-4055-b028-63caa3fd8463', (SELECT id FROM batteries WHERE name = 'Generac PWRcell'), false);

-- Sonnen Wattsmart → Sonnen (recommended only)
INSERT INTO vpp_battery_compatibility (vpp_id, battery_id, is_recommended) VALUES
('bb1fdaf0-e995-4bb9-b7c3-741ddbeef570', (SELECT id FROM batteries WHERE name = 'Sonnen Core+'), true);

-- NRG / Renew Home → Tesla Powerwall, Enphase
INSERT INTO vpp_battery_compatibility (vpp_id, battery_id, is_recommended) VALUES
('29cfd641-8643-476a-be91-b86edc84baf2', (SELECT id FROM batteries WHERE name = 'Tesla Powerwall 3'), true),
('29cfd641-8643-476a-be91-b86edc84baf2', (SELECT id FROM batteries WHERE name = 'Enphase IQ 10T'), false);

-- Haven Energy → Tesla Powerwall, Enphase, Franklin
INSERT INTO vpp_battery_compatibility (vpp_id, battery_id, is_recommended) VALUES
('1b51dbc1-e3f9-4d43-8094-ee2ce9cbfbbf', (SELECT id FROM batteries WHERE name = 'Tesla Powerwall 3'), true),
('1b51dbc1-e3f9-4d43-8094-ee2ce9cbfbbf', (SELECT id FROM batteries WHERE name = 'Enphase IQ 10T'), false),
('1b51dbc1-e3f9-4d43-8094-ee2ce9cbfbbf', (SELECT id FROM batteries WHERE name = 'FranklinWH aPower'), false);

-- Tesla SMUD → Tesla Powerwall (only)
INSERT INTO vpp_battery_compatibility (vpp_id, battery_id, is_recommended) VALUES
('3f0f15b9-d1b1-4886-b207-c6e7c79d6ea8', (SELECT id FROM batteries WHERE name = 'Tesla Powerwall 3'), true);

-- SOLRITE + Sonnen → Sonnen (only)
INSERT INTO vpp_battery_compatibility (vpp_id, battery_id, is_recommended) VALUES
('bd2f5079-2332-4de6-903c-8e36bd6d7920', (SELECT id FROM batteries WHERE name = 'Sonnen Core+'), true);

-- Sunrun PG&E SAVE → Tesla Powerwall, Enphase
INSERT INTO vpp_battery_compatibility (vpp_id, battery_id, is_recommended) VALUES
('e611fb7b-db4f-4975-b445-f0378bf1fb2c', (SELECT id FROM batteries WHERE name = 'Tesla Powerwall 3'), true),
('e611fb7b-db4f-4975-b445-f0378bf1fb2c', (SELECT id FROM batteries WHERE name = 'Enphase IQ 10T'), false);

-- =============================================
-- DONE! Verify everything worked:
-- =============================================
-- SELECT name, capacity_kwh, price_installed, price_per_kwh FROM batteries;
-- SELECT v.name, i.incentive_type, i.name as incentive, i.estimated_annual_value FROM vpp_incentives i JOIN vpps v ON v.id = i.vpp_id;
-- SELECT v.name as vpp, b.name as battery, c.is_recommended FROM vpp_battery_compatibility c JOIN vpps v ON v.id = c.vpp_id JOIN batteries b ON b.id = c.battery_id;
