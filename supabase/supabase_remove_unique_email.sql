-- Remove unique constraint on email in clients table
-- This allows one client (email) to have multiple order/lead entries
ALTER TABLE clients DROP CONSTRAINT IF EXISTS clients_email_key;
