-- =============================================================================
-- VPPCompare Database Migration #4
-- =============================================================================
-- Run this entire file in the Supabase SQL Editor.
-- Adds price_installed_low column to batteries table with realistic
-- low-end installed prices for better ROI calculations.
--
-- Research basis for low-end prices:
--   Tesla Powerwall 3: $11,500 (Tesla direct install, no middleman markup)
--   Enphase IQ 5P:     $5,500  (competitive installer quote)
--   Enphase IQ 10T:    $7,800  (competitive installer quote)
--   Sonnen Core+:      $12,000 (direct or competitive quote)
--   FranklinWH aPower: $14,000 (competitive installer quote)
--   Generac PWRcell:   $12,000 (competitive installer quote)
-- =============================================================================

-- Step 1: Add the column
ALTER TABLE batteries ADD COLUMN IF NOT EXISTS price_installed_low INTEGER;

-- Step 2: Set low-end prices for each battery
UPDATE batteries SET price_installed_low = 11500 WHERE name = 'Tesla Powerwall 3';
UPDATE batteries SET price_installed_low = 5500  WHERE name = 'Enphase IQ 5P';
UPDATE batteries SET price_installed_low = 7800  WHERE name = 'Enphase IQ 10T';
UPDATE batteries SET price_installed_low = 12000 WHERE name = 'Sonnen Core+';
UPDATE batteries SET price_installed_low = 14000 WHERE name = 'FranklinWH aPower';
UPDATE batteries SET price_installed_low = 12000 WHERE name = 'Generac PWRcell';

-- =============================================================================
-- DONE! Verify:
-- =============================================================================
-- SELECT name, price_installed_low, price_installed,
--        price_installed - price_installed_low as savings
-- FROM batteries ORDER BY name;
