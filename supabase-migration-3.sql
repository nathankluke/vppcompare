-- =============================================================================
-- VPPCompare Database Migration #3
-- =============================================================================
-- Run this entire file in the Supabase SQL Editor.
-- It adds:
--   1. Tesla Electric VPP (ERCOT Texas) — new program
--   2. Tesla GVEC VPP (Texas co-op) — new program
--   3. Dominion Energy Virginia VPP Pilot — new program (coming soon)
--   4. Updates ConnectedSolutions to list all participating utilities
--   5. Updates existing program data based on latest research
-- =============================================================================

-- =============================================
-- PART 1: Tesla Electric VPP (ERCOT / Texas)
-- =============================================
-- Tesla's own VPP program for ERCOT market. Existing Powerwall owners in
-- CenterPoint (Houston) and Oncor (Dallas) service areas can participate.
-- Compensation via monthly credits + sellback credits.

INSERT INTO vpps (
  id, name, provider, description, signup_bonus, feed_in_rate,
  controlled_load_discount, battery_brands_supported, solar_required,
  battery_required, states_available, website_url, logo_url,
  has_purchase_incentive, has_ongoing_incentive, incentive_summary,
  program_model, buyer_only, flexibility_rating, flexibility_details
) VALUES (
  'b7e1a3f0-9c2d-4e5f-8a1b-c3d4e5f6a7b8',
  'Tesla Electric VPP (ERCOT)',
  'Tesla',
  'Tesla''s VPP for the Texas ERCOT market. Powerwall owners in CenterPoint (Houston) and Oncor (Dallas) areas earn monthly credits by supporting the grid during peak demand. Tesla aggregates enrolled Powerwalls and bids into the ERCOT wholesale energy market.',
  0, NULL, NULL,
  ARRAY['Tesla Powerwall'],
  false, true,
  ARRAY['TX'],
  'https://www.tesla.com/support/energy/virtual-power-plant/tesla-electric',
  NULL,
  false, true,
  '$10–$33/mo per Powerwall + sellback credits',
  'standard', false, 'high',
  'Set your own backup reserve in the Tesla app. VPP never discharges below your reserve. Opt out or leave anytime.'
);

-- Tesla Electric VPP ongoing incentive
INSERT INTO vpp_incentives (vpp_id, incentive_type, name, description, amount_dollars, frequency, estimated_annual_value)
VALUES (
  'b7e1a3f0-9c2d-4e5f-8a1b-c3d4e5f6a7b8',
  'ongoing',
  'Monthly VPP Credits',
  'Earn $10–$33 per Powerwall on your monthly electric bill, plus sellback credits for energy exported to the grid.',
  NULL, 'monthly', 250
);

-- Battery compatibility for Tesla Electric VPP
INSERT INTO vpp_battery_compatibility (vpp_id, battery_id, is_recommended, compatibility_notes)
SELECT 'b7e1a3f0-9c2d-4e5f-8a1b-c3d4e5f6a7b8', id, true, 'Powerwall 2, Powerwall+, and Powerwall 3 all eligible'
FROM batteries WHERE manufacturer = 'Tesla';

-- =============================================
-- PART 2: Tesla GVEC VPP (Texas Co-op)
-- =============================================
-- Partnership with Guadalupe Valley Electric Cooperative.
-- Very lucrative: $2,530 signup incentive + $862.50/yr ongoing for PW3.

INSERT INTO vpps (
  id, name, provider, description, signup_bonus, feed_in_rate,
  controlled_load_discount, battery_brands_supported, solar_required,
  battery_required, states_available, website_url, logo_url,
  has_purchase_incentive, has_ongoing_incentive, incentive_summary,
  program_model, buyer_only, flexibility_rating, flexibility_details
) VALUES (
  'c8f2b4a1-0d3e-5f6a-9b2c-d4e5f6a7b8c9',
  'Tesla GVEC VPP',
  'Tesla / GVEC',
  'Partnership between Tesla and Guadalupe Valley Electric Cooperative (GVEC) in Texas. One of the most lucrative VPP programs in the US with a large signup incentive and strong ongoing annual payments based on Powerwall capacity.',
  2530, NULL, NULL,
  ARRAY['Tesla Powerwall'],
  false, true,
  ARRAY['TX'],
  'https://www.tesla.com/support/energy/virtual-power-plant/gvec',
  NULL,
  true, true,
  '$2,530 signup + $862/yr per Powerwall 3',
  'standard', false, 'high',
  'Set your own backup reserve in the Tesla app. VPP never discharges below your reserve. Opt out or leave anytime.'
);

-- Tesla GVEC signup incentive
INSERT INTO vpp_incentives (vpp_id, incentive_type, name, description, amount_dollars, amount_rate, rate_unit, frequency, estimated_annual_value, qualifying_notes)
VALUES (
  'c8f2b4a1-0d3e-5f6a-9b2c-d4e5f6a7b8c9',
  'purchase',
  'Enrollment Incentive',
  'Up to $220/kW initial enrollment incentive. $2,530 for a Powerwall 3 installed after Jan 1, 2025. $862.50 for PW3 installed before 2025, $375 for PW2.',
  2530, 220, '$/kW', 'one-time', NULL,
  'Larger incentive requires 5-year participation commitment. Amount varies by Powerwall model and install date.'
);

-- Tesla GVEC ongoing incentive
INSERT INTO vpp_incentives (vpp_id, incentive_type, name, description, amount_dollars, amount_rate, rate_unit, frequency, estimated_annual_value)
VALUES (
  'c8f2b4a1-0d3e-5f6a-9b2c-d4e5f6a7b8c9',
  'ongoing',
  'Annual VPP Payments',
  '$75/kW in ongoing annual incentives paid as monthly bill credits. $862.50/yr for Powerwall 3, $375/yr for Powerwall 2.',
  NULL, 75, '$/kW', 'yearly', 862
);

-- Battery compatibility for Tesla GVEC VPP
INSERT INTO vpp_battery_compatibility (vpp_id, battery_id, is_recommended, compatibility_notes)
SELECT 'c8f2b4a1-0d3e-5f6a-9b2c-d4e5f6a7b8c9', id, true, 'PW3: $2,530 signup + $862.50/yr. PW2: $375 signup + $375/yr.'
FROM batteries WHERE manufacturer = 'Tesla';

-- =============================================
-- PART 3: Dominion Energy Virginia VPP Pilot
-- =============================================
-- State-mandated 450MW VPP pilot (HB 2346, signed May 2025).
-- Pilot filed with SCC. Residential battery incentives of 15MW+.
-- No detailed compensation yet — marking as "coming soon".

INSERT INTO vpps (
  id, name, provider, description, signup_bonus, feed_in_rate,
  controlled_load_discount, battery_brands_supported, solar_required,
  battery_required, states_available, website_url, logo_url,
  has_purchase_incentive, has_ongoing_incentive, incentive_summary,
  program_model, buyer_only, flexibility_rating, flexibility_details
) VALUES (
  'd9a3c5b2-1e4f-6a7b-0c3d-e5f6a7b8c9d0',
  'Dominion Energy VPP Pilot',
  'Dominion Energy',
  'Virginia''s first state-mandated VPP pilot (450MW). Dominion Energy is developing residential, commercial, and industrial programs with at least 15MW of residential battery incentives. Customers can enroll directly or through third-party aggregators. Pilot filed with the Virginia SCC.',
  NULL, NULL, NULL,
  ARRAY['Tesla Powerwall', 'Enphase', 'Sonnen', 'SolarEdge', 'Generac', 'Franklin'],
  false, true,
  ARRAY['VA'],
  'https://www.dominionenergy.com/virginia/save-energy/virtual-power-plant',
  NULL,
  true, true,
  'Coming soon — 450MW pilot with residential battery incentives',
  'standard', false, 'medium',
  'Customers stay in control. VPP works within pre-set limits. Opt in or out of specific events. Full details pending SCC approval.'
);

-- Dominion placeholder incentives (details TBD)
INSERT INTO vpp_incentives (vpp_id, incentive_type, name, description, amount_dollars, frequency, estimated_annual_value, qualifying_notes)
VALUES (
  'd9a3c5b2-1e4f-6a7b-0c3d-e5f6a7b8c9d0',
  'purchase',
  'Residential Battery Incentive',
  'Dominion is required to incentivize at least 15MW of residential battery installations. Specific amounts pending SCC approval.',
  NULL, 'one-time', NULL,
  'Program details being finalized through Virginia SCC stakeholder process. Expected to launch by mid-2026.'
),
(
  'd9a3c5b2-1e4f-6a7b-0c3d-e5f6a7b8c9d0',
  'ongoing',
  'VPP Participation Credits',
  'Earn credits or payments for participating in grid support events. Compensation structure pending SCC approval.',
  NULL, 'per-event', 200,
  'Estimated based on comparable programs. Actual rates will be set by the Virginia SCC.'
);

-- Battery compatibility for Dominion VPP (broad support expected)
INSERT INTO vpp_battery_compatibility (vpp_id, battery_id, is_recommended, compatibility_notes)
SELECT 'd9a3c5b2-1e4f-6a7b-0c3d-e5f6a7b8c9d0', id, false, 'Broad battery support expected. Specific brands pending program launch.'
FROM batteries;

-- =============================================
-- PART 4: Update ConnectedSolutions description
-- =============================================
-- Expand to mention all participating utilities

UPDATE vpps
SET description = 'New England''s premier VPP program offered through National Grid, Eversource, Cape Light Compact, Unitil, Liberty Utilities, and RI Energy. Pay-for-performance model pays $225–$275/kW during summer peak events. One of the highest-earning residential VPP programs in the US.',
    battery_brands_supported = ARRAY['Tesla Powerwall', 'Enphase', 'Sonnen', 'SolarEdge', 'Generac', 'Franklin']
WHERE id = '0a08ee16-480e-4055-b028-63caa3fd8463';

-- =============================================
-- PART 5: Update Tesla VPP (DSGS) to clarify it's the CA program
-- =============================================

UPDATE vpps
SET name = 'Tesla VPP (California)',
    description = 'Tesla''s utility-partnership VPP programs in California. Powerwall owners earn per-event payments when their battery supports the grid during peak demand. Available through DSGS, PG&E ELRP, and other California utility partnerships.',
    states_available = ARRAY['CA']
WHERE id = '371d3812-1e39-426c-9159-630bd469972f';

-- =============================================
-- DONE! Verify:
-- =============================================
-- SELECT name, provider, states_available, buyer_only, flexibility_rating FROM vpps ORDER BY name;
-- SELECT v.name, i.name as incentive, i.estimated_annual_value FROM vpp_incentives i JOIN vpps v ON v.id = i.vpp_id ORDER BY v.name;
