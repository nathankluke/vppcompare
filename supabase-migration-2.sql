-- =============================================================================
-- VPPCompare Database Migration #2
-- =============================================================================
-- Run this entire file in the Supabase SQL Editor.
-- It adds:
--   1. buyer_only flag (moves Xcel RBC to "I Need a Battery" only)
--   2. Fixes Xcel battery compatibility (Tesla + Enphase only)
--   3. flexibility_rating + flexibility_details columns
--   4. Sets flexibility ratings for all 12 VPP programs
-- =============================================================================

-- =============================================
-- PART 1: Buyer-Only Flag
-- =============================================
-- Xcel Energy Renewable Battery Connect only accepts NEW battery installations
-- with a new interconnection request. Existing battery owners cannot join.

ALTER TABLE vpps ADD COLUMN IF NOT EXISTS buyer_only BOOLEAN DEFAULT false;

UPDATE vpps SET buyer_only = true
WHERE id = 'e35cb484-8696-44c7-bd04-b0617119ce7c';

-- =============================================
-- PART 2: Fix Xcel Battery Compatibility
-- =============================================
-- Per program docs, only Tesla and Enphase batteries are eligible.
-- Remove Sonnen, FranklinWH, and Generac from compatibility.

DELETE FROM vpp_battery_compatibility
WHERE vpp_id = 'e35cb484-8696-44c7-bd04-b0617119ce7c'
AND battery_id IN (
  SELECT id FROM batteries WHERE manufacturer IN ('Sonnen', 'FranklinWH', 'Generac')
);

UPDATE vpps
SET battery_brands_supported = ARRAY['Tesla Powerwall', 'Enphase']
WHERE id = 'e35cb484-8696-44c7-bd04-b0617119ce7c';

-- =============================================
-- PART 3: Flexibility Rating Columns
-- =============================================
-- flexibility_rating: 'low', 'medium', or 'high'
-- flexibility_details: tooltip text explaining the rating for each program

ALTER TABLE vpps ADD COLUMN IF NOT EXISTS flexibility_rating TEXT DEFAULT 'medium';
ALTER TABLE vpps ADD COLUMN IF NOT EXISTS flexibility_details TEXT;

-- =============================================
-- PART 4: Set Flexibility Ratings for All Programs
-- =============================================

-- HIGH: User can set backup reserve, opt out of events in-app, suspend participation
-- Tesla VPP (DSGS)
UPDATE vpps SET flexibility_rating = 'high',
  flexibility_details = 'Set your own backup reserve, opt out of individual events, and suspend participation anytime via the Tesla app.'
WHERE id = '371d3812-1e39-426c-9159-630bd469972f';

-- Xcel Energy Renewable Battery Connect
UPDATE vpps SET flexibility_rating = 'high',
  flexibility_details = '40% backup reserve guaranteed. Opt out of events or suspend participation via the Tesla or Enphase app.'
WHERE id = 'e35cb484-8696-44c7-bd04-b0617119ce7c';

-- ConnectedSolutions
UPDATE vpps SET flexibility_rating = 'high',
  flexibility_details = 'Set your own backup reserve, opt out of individual events, and suspend participation via app.'
WHERE id = '0a08ee16-480e-4055-b028-63caa3fd8463';

-- Tesla SMUD VPP
UPDATE vpps SET flexibility_rating = 'high',
  flexibility_details = 'Set your own backup reserve, opt out of individual events, and suspend participation via the Tesla app.'
WHERE id = '3f0f15b9-d1b1-4886-b207-c6e7c79d6ea8';

-- MEDIUM: Some control (email opt-out, fixed reserve) but not full in-app control
-- Sunrun CalReady VPP
UPDATE vpps SET flexibility_rating = 'medium',
  flexibility_details = 'Fixed 20% backup reserve during events. Opt out of CalReady anytime by email.'
WHERE id = 'fd53a702-5994-4d30-b4d5-740fd326d0d8';

-- NRG / Renew Home VPP
UPDATE vpps SET flexibility_rating = 'medium',
  flexibility_details = 'Adjustable backup reserve. Can opt out of events via app.'
WHERE id = '29cfd641-8643-476a-be91-b86edc84baf2';

-- Haven Energy VPP
UPDATE vpps SET flexibility_rating = 'medium',
  flexibility_details = 'Adjustable backup reserve. Can opt out of events.'
WHERE id = '1b51dbc1-e3f9-4d43-8094-ee2ce9cbfbbf';

-- Sunrun + PG&E SAVE VPP
UPDATE vpps SET flexibility_rating = 'medium',
  flexibility_details = 'Fixed 20% backup reserve. Can opt out by email. Sunrun manages dispatch timing.'
WHERE id = 'e611fb7b-db4f-4975-b445-f0378bf1fb2c';

-- LOW: Provider controls battery, limited opt-out, long-term commitments
-- Green Mountain Power BYOD
UPDATE vpps SET flexibility_rating = 'low',
  flexibility_details = '10-year enrollment. GMP controls dispatch. Batteries recharged before severe weather.'
WHERE id = 'a9f82eea-4850-4e1a-83f0-29cd0649d75f';

-- Sonnen Wattsmart
UPDATE vpps SET flexibility_rating = 'low',
  flexibility_details = 'Sonnen manages dispatch. Limited user control. Contact provider to adjust.'
WHERE id = 'bb1fdaf0-e995-4bb9-b7c3-741ddbeef570';

-- Base Power VPP
UPDATE vpps SET flexibility_rating = 'low',
  flexibility_details = 'Base Power owns the battery. They control dispatch. Contact provider to discuss.'
WHERE id = '388a4467-d17d-4b3f-a0bb-169b2041158a';

-- SOLRITE + Sonnen Battery VPP
UPDATE vpps SET flexibility_rating = 'low',
  flexibility_details = 'Sonnen manages dispatch. Limited user control. Contact provider to adjust.'
WHERE id = 'bd2f5079-2332-4de6-903c-8e36bd6d7920';

-- =============================================
-- DONE! Verify:
-- =============================================
-- SELECT name, buyer_only, flexibility_rating, flexibility_details FROM vpps;
-- SELECT v.name, b.name as battery FROM vpp_battery_compatibility c JOIN vpps v ON v.id = c.vpp_id JOIN batteries b ON b.id = c.battery_id WHERE v.name LIKE '%Xcel%';
