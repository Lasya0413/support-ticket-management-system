USE support_ticket_db;

INSERT INTO users
(name, email, password_hash, role)
VALUES
('Agent One', 'agent@example.com', NULL, 'agent'),
('Agent Two', 'agent2@example.com', NULL, 'agent'),
('Customer One', 'customer@example.com', NULL, 'customer');