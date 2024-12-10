------------------------------------------------------------
-- Insert Groups (4 groups)
------------------------------------------------------------
INSERT INTO groups (name, code, stake, screen_time_goal) VALUES 
('Fitness Group', 'FIT2024', 100.00, 60),
('Hacker Club', 'HCK2024', 200.50, 120),
('Anonymous Group', 'ANY2024', 300.00, 90),
('Gamer Squad', 'GAME2025', 150.00, 45);

------------------------------------------------------------
-- Insert Users (16 users total, 4 per group)
------------------------------------------------------------
-- Fitness Group Users (4)
INSERT INTO users (email, name, updated_at) VALUES 
('alice@example.com', 'Alice Wonderland', NOW()),
('bob@example.com', 'Bob OReilly', NOW()),
('cathrine@example.com', 'Cathrine Johnson', NOW()),
('derek@example.com', 'Derek Miller', NOW());

-- Hacker Club Users (4)
INSERT INTO users (email, name, updated_at, profile_picture) VALUES
('eve@example.com', 'Eve Harper', NOW(), 'https://safe.com/eve.png'),
('frank@example.com', 'Frank Brown', NOW(), 'https://safe.com/frank.png'),
('gina@example.com', 'Gina Smith', NOW(), 'https://safe.com/gina.png'),
('harry@example.com', 'Harry Wilson', NOW(), 'https://safe.com/harry.png');

-- Anonymous Group Users (4)
INSERT INTO users (email, name, updated_at, profile_picture) VALUES
('ivan@example.com', 'Ivan Davis', NOW(), 'https://safe.com/ivan.png'),
('jane@example.com', 'Jane Lee', NOW(), 'https://safe.com/jane.png'),
('karl@example.com', 'Karl White', NOW(), 'https://safe.com/karl.png'),
('lisa@example.com', 'Lisa Johnson', NOW(), 'https://safe.com/lisa.png');

-- Gamer Squad Users (4)
INSERT INTO users (email, name, updated_at, profile_picture) VALUES
('mike@example.com', 'Mike Green', NOW(), 'https://safe.com/mike.png'),
('nina@example.com', 'Nina Black', NOW(), 'https://safe.com/nina.png'),
('oscar@example.com', 'Oscar Hill', NOW(), 'https://safe.com/oscar.png'),
('paula@example.com', 'Paula Young', NOW(), 'https://safe.com/paula.png');

------------------------------------------------------------
-- Insert Authentications for each user
------------------------------------------------------------
-- Fitness Group Auth
INSERT INTO authentications (user_id, password, google_id, github_id)
SELECT id, 'alice_pass', 'alice_google', 'alice_github' FROM users WHERE email='alice@example.com';
INSERT INTO authentications (user_id, password, google_id, github_id)
SELECT id, 'bob_pass', 'bob_google', 'bob_github' FROM users WHERE email='bob@example.com';
INSERT INTO authentications (user_id, password, google_id, github_id)
SELECT id, 'cathrine_pass', 'cathrine_google', 'cathrine_github' FROM users WHERE email='cathrine@example.com';
INSERT INTO authentications (user_id, password, google_id, github_id)
SELECT id, 'derek_pass', 'derek_google', 'derek_github' FROM users WHERE email='derek@example.com';

-- Hacker Club Auth
INSERT INTO authentications (user_id, password, google_id, github_id)
SELECT id, 'eve_pass', 'eve_google', 'eve_github' FROM users WHERE email='eve@example.com';
INSERT INTO authentications (user_id, password, google_id, github_id)
SELECT id, 'frank_pass', 'frank_google', 'frank_github' FROM users WHERE email='frank@example.com';
INSERT INTO authentications (user_id, password, google_id, github_id)
SELECT id, 'gina_pass', 'gina_google', 'gina_github' FROM users WHERE email='gina@example.com';
INSERT INTO authentications (user_id, password, google_id, github_id)
SELECT id, 'harry_pass', 'harry_google', 'harry_github' FROM users WHERE email='harry@example.com';

-- Anonymous Group Auth
INSERT INTO authentications (user_id, password, google_id, github_id)
SELECT id, 'ivan_pass', 'ivan_google', 'ivan_github' FROM users WHERE email='ivan@example.com';
INSERT INTO authentications (user_id, password, google_id, github_id)
SELECT id, 'jane_pass', 'jane_google', 'jane_github' FROM users WHERE email='jane@example.com';
INSERT INTO authentications (user_id, password, google_id, github_id)
SELECT id, 'karl_pass', 'karl_google', 'karl_github' FROM users WHERE email='karl@example.com';
INSERT INTO authentications (user_id, password, google_id, github_id)
SELECT id, 'lisa_pass', 'lisa_google', 'lisa_github' FROM users WHERE email='lisa@example.com';

-- Gamer Squad Auth
INSERT INTO authentications (user_id, password, google_id, github_id)
SELECT id, 'mike_pass', 'mike_google', 'mike_github' FROM users WHERE email='mike@example.com';
INSERT INTO authentications (user_id, password, google_id, github_id)
SELECT id, 'nina_pass', 'nina_google', 'nina_github' FROM users WHERE email='nina@example.com';
INSERT INTO authentications (user_id, password, google_id, github_id)
SELECT id, 'oscar_pass', 'oscar_google', 'oscar_github' FROM users WHERE email='oscar@example.com';
INSERT INTO authentications (user_id, password, google_id, github_id)
SELECT id, 'paula_pass', 'paula_google', 'paula_github' FROM users WHERE email='paula@example.com';

------------------------------------------------------------
-- Assign Users to Groups (4 per group)
------------------------------------------------------------
-- Fitness Group = 'Fitness Group'
INSERT INTO user_groups (user_id, group_id)
SELECT u.id, g.id FROM users u, groups g
WHERE u.email='alice@example.com' AND g.name='Fitness Group';
INSERT INTO user_groups (user_id, group_id)
SELECT u.id, g.id FROM users u, groups g
WHERE u.email='bob@example.com' AND g.name='Fitness Group';
INSERT INTO user_groups (user_id, group_id)
SELECT u.id, g.id FROM users u, groups g
WHERE u.email='cathrine@example.com' AND g.name='Fitness Group';
INSERT INTO user_groups (user_id, group_id)
SELECT u.id, g.id FROM users u, groups g
WHERE u.email='derek@example.com' AND g.name='Fitness Group';

-- Hacker Club = 'Hacker Club'
INSERT INTO user_groups (user_id, group_id)
SELECT u.id, g.id FROM users u, groups g
WHERE u.email='eve@example.com' AND g.name='Hacker Club';
INSERT INTO user_groups (user_id, group_id)
SELECT u.id, g.id FROM users u, groups g
WHERE u.email='frank@example.com' AND g.name='Hacker Club';
INSERT INTO user_groups (user_id, group_id)
SELECT u.id, g.id FROM users u, groups g
WHERE u.email='gina@example.com' AND g.name='Hacker Club';
INSERT INTO user_groups (user_id, group_id)
SELECT u.id, g.id FROM users u, groups g
WHERE u.email='harry@example.com' AND g.name='Hacker Club';

-- Anonymous Group = 'Anonymous Group'
INSERT INTO user_groups (user_id, group_id)
SELECT u.id, g.id FROM users u, groups g
WHERE u.email='ivan@example.com' AND g.name='Anonymous Group';
INSERT INTO user_groups (user_id, group_id)
SELECT u.id, g.id FROM users u, groups g
WHERE u.email='jane@example.com' AND g.name='Anonymous Group';
INSERT INTO user_groups (user_id, group_id)
SELECT u.id, g.id FROM users u, groups g
WHERE u.email='karl@example.com' AND g.name='Anonymous Group';
INSERT INTO user_groups (user_id, group_id)
SELECT u.id, g.id FROM users u, groups g
WHERE u.email='lisa@example.com' AND g.name='Anonymous Group';

-- Gamer Squad = 'Gamer Squad'
INSERT INTO user_groups (user_id, group_id)
SELECT u.id, g.id FROM users u, groups g
WHERE u.email='mike@example.com' AND g.name='Gamer Squad';
INSERT INTO user_groups (user_id, group_id)
SELECT u.id, g.id FROM users u, groups g
WHERE u.email='nina@example.com' AND g.name='Gamer Squad';
INSERT INTO user_groups (user_id, group_id)
SELECT u.id, g.id FROM users u, groups g
WHERE u.email='oscar@example.com' AND g.name='Gamer Squad';
INSERT INTO user_groups (user_id, group_id)
SELECT u.id, g.id FROM users u, groups g
WHERE u.email='paula@example.com' AND g.name='Gamer Squad';

------------------------------------------------------------
-- Insert Multiple Weeks of Screen Times for each User
-- 4 Weeks of submissions (one per week) for each user.
-- Example weeks: '2024-01-07', '2024-01-14', '2024-01-21', '2024-01-28'
------------------------------------------------------------

-- Fitness Group: Alice, Bob, Cathrine, Derek
-- Alice: 45.5, 46.0, 44.0, 47.5
INSERT INTO screen_times (user_id, submitted_time, group_id, inserted_at)
SELECT u.id, 45.5, g.id, '2024-01-07'::timestamp FROM users u, groups g WHERE u.email='alice@example.com' AND g.name='Fitness Group';
INSERT INTO screen_times (user_id, submitted_time, group_id, inserted_at)
SELECT u.id, 46.0, g.id, '2024-01-14'::timestamp FROM users u, groups g WHERE u.email='alice@example.com' AND g.name='Fitness Group';
INSERT INTO screen_times (user_id, submitted_time, group_id, inserted_at)
SELECT u.id, 44.0, g.id, '2024-01-21'::timestamp FROM users u, groups g WHERE u.email='alice@example.com' AND g.name='Fitness Group';
INSERT INTO screen_times (user_id, submitted_time, group_id, inserted_at)
SELECT u.id, 47.5, g.id, '2024-01-28'::timestamp FROM users u, groups g WHERE u.email='alice@example.com' AND g.name='Fitness Group';

-- Bob: 30.0, 32.0, 29.5, 31.0
INSERT INTO screen_times (user_id, submitted_time, group_id, inserted_at)
SELECT u.id, 30.0, g.id, '2024-01-07'::timestamp FROM users u, groups g WHERE u.email='bob@example.com' AND g.name='Fitness Group';
INSERT INTO screen_times (user_id, submitted_time, group_id, inserted_at)
SELECT u.id, 32.0, g.id, '2024-01-14'::timestamp FROM users u, groups g WHERE u.email='bob@example.com' AND g.name='Fitness Group';
INSERT INTO screen_times (user_id, submitted_time, group_id, inserted_at)
SELECT u.id, 29.5, g.id, '2024-01-21'::timestamp FROM users u, groups g WHERE u.email='bob@example.com' AND g.name='Fitness Group';
INSERT INTO screen_times (user_id, submitted_time, group_id, inserted_at)
SELECT u.id, 31.0, g.id, '2024-01-28'::timestamp FROM users u, groups g WHERE u.email='bob@example.com' AND g.name='Fitness Group';

-- Cathrine: 90.0, 85.0, 88.0, 92.0
INSERT INTO screen_times (user_id, submitted_time, group_id, inserted_at)
SELECT u.id, 90.0, g.id, '2024-01-07'::timestamp FROM users u, groups g WHERE u.email='cathrine@example.com' AND g.name='Fitness Group';
INSERT INTO screen_times (user_id, submitted_time, group_id, inserted_at)
SELECT u.id, 85.0, g.id, '2024-01-14'::timestamp FROM users u, groups g WHERE u.email='cathrine@example.com' AND g.name='Fitness Group';
INSERT INTO screen_times (user_id, submitted_time, group_id, inserted_at)
SELECT u.id, 88.0, g.id, '2024-01-21'::timestamp FROM users u, groups g WHERE u.email='cathrine@example.com' AND g.name='Fitness Group';
INSERT INTO screen_times (user_id, submitted_time, group_id, inserted_at)
SELECT u.id, 92.0, g.id, '2024-01-28'::timestamp FROM users u, groups g WHERE u.email='cathrine@example.com' AND g.name='Fitness Group';

-- Derek: 15.0, 14.5, 16.0, 15.5
INSERT INTO screen_times (user_id, submitted_time, group_id, inserted_at)
SELECT u.id, 15.0, g.id, '2024-01-07'::timestamp FROM users u, groups g WHERE u.email='derek@example.com' AND g.name='Fitness Group';
INSERT INTO screen_times (user_id, submitted_time, group_id, inserted_at)
SELECT u.id, 14.5, g.id, '2024-01-14'::timestamp FROM users u, groups g WHERE u.email='derek@example.com' AND g.name='Fitness Group';
INSERT INTO screen_times (user_id, submitted_time, group_id, inserted_at)
SELECT u.id, 16.0, g.id, '2024-01-21'::timestamp FROM users u, groups g WHERE u.email='derek@example.com' AND g.name='Fitness Group';
INSERT INTO screen_times (user_id, submitted_time, group_id, inserted_at)
SELECT u.id, 15.5, g.id, '2024-01-28'::timestamp FROM users u, groups g WHERE u.email='derek@example.com' AND g.name='Fitness Group';

------------------------------------------------------------
-- Hacker Club (Eve, Frank, Gina, Harry)
-- Eve: 999.9, 990.0, 1002.0, 995.5
INSERT INTO screen_times (user_id, submitted_time, group_id, inserted_at)
SELECT u.id, 999.9, g.id, '2024-01-07'::timestamp FROM users u, groups g WHERE u.email='eve@example.com' AND g.name='Hacker Club';
INSERT INTO screen_times (user_id, submitted_time, group_id, inserted_at)
SELECT u.id, 990.0, g.id, '2024-01-14'::timestamp FROM users u, groups g WHERE u.email='eve@example.com' AND g.name='Hacker Club';
INSERT INTO screen_times (user_id, submitted_time, group_id, inserted_at)
SELECT u.id, 1002.0, g.id, '2024-01-21'::timestamp FROM users u, groups g WHERE u.email='eve@example.com' AND g.name='Hacker Club';
INSERT INTO screen_times (user_id, submitted_time, group_id, inserted_at)
SELECT u.id, 995.5, g.id, '2024-01-28'::timestamp FROM users u, groups g WHERE u.email='eve@example.com' AND g.name='Hacker Club';

-- Frank: 200.0, 205.0, 199.0, 210.0
INSERT INTO screen_times (user_id, submitted_time, group_id, inserted_at)
SELECT u.id, 200.0, g.id, '2024-01-07'::timestamp FROM users u, groups g WHERE u.email='frank@example.com' AND g.name='Hacker Club';
INSERT INTO screen_times (user_id, submitted_time, group_id, inserted_at)
SELECT u.id, 205.0, g.id, '2024-01-14'::timestamp FROM users u, groups g WHERE u.email='frank@example.com' AND g.name='Hacker Club';
INSERT INTO screen_times (user_id, submitted_time, group_id, inserted_at)
SELECT u.id, 199.0, g.id, '2024-01-21'::timestamp FROM users u, groups g WHERE u.email='frank@example.com' AND g.name='Hacker Club';
INSERT INTO screen_times (user_id, submitted_time, group_id, inserted_at)
SELECT u.id, 210.0, g.id, '2024-01-28'::timestamp FROM users u, groups g WHERE u.email='frank@example.com' AND g.name='Hacker Club';

-- Gina: 75.0, 70.0, 80.0, 77.5
INSERT INTO screen_times (user_id, submitted_time, group_id, inserted_at)
SELECT u.id, 75.0, g.id, '2024-01-07'::timestamp FROM users u, groups g WHERE u.email='gina@example.com' AND g.name='Hacker Club';
INSERT INTO screen_times (user_id, submitted_time, group_id, inserted_at)
SELECT u.id, 70.0, g.id, '2024-01-14'::timestamp FROM users u, groups g WHERE u.email='gina@example.com' AND g.name='Hacker Club';
INSERT INTO screen_times (user_id, submitted_time, group_id, inserted_at)
SELECT u.id, 80.0, g.id, '2024-01-21'::timestamp FROM users u, groups g WHERE u.email='gina@example.com' AND g.name='Hacker Club';
INSERT INTO screen_times (user_id, submitted_time, group_id, inserted_at)
SELECT u.id, 77.5, g.id, '2024-01-28'::timestamp FROM users u, groups g WHERE u.email='gina@example.com' AND g.name='Hacker Club';

-- Harry: 0.0, 5.0, 2.5, 10.0
INSERT INTO screen_times (user_id, submitted_time, group_id, inserted_at)
SELECT u.id, 0.0, g.id, '2024-01-07'::timestamp FROM users u, groups g WHERE u.email='harry@example.com' AND g.name='Hacker Club';
INSERT INTO screen_times (user_id, submitted_time, group_id, inserted_at)
SELECT u.id, 5.0, g.id, '2024-01-14'::timestamp FROM users u, groups g WHERE u.email='harry@example.com' AND g.name='Hacker Club';
INSERT INTO screen_times (user_id, submitted_time, group_id, inserted_at)
SELECT u.id, 2.5, g.id, '2024-01-21'::timestamp FROM users u, groups g WHERE u.email='harry@example.com' AND g.name='Hacker Club';
INSERT INTO screen_times (user_id, submitted_time, group_id, inserted_at)
SELECT u.id, 10.0, g.id, '2024-01-28'::timestamp FROM users u, groups g WHERE u.email='harry@example.com' AND g.name='Hacker Club';

------------------------------------------------------------
-- Anonymous Group (Ivan, Jane, Karl, Lisa)
-- Ivan: 10.0, 12.0, 9.5, 11.0
INSERT INTO screen_times (user_id, submitted_time, group_id, inserted_at)
SELECT u.id, 10.0, g.id, '2024-01-07'::timestamp FROM users u, groups g WHERE u.email='ivan@example.com' AND g.name='Anonymous Group';
INSERT INTO screen_times (user_id, submitted_time, group_id, inserted_at)
SELECT u.id, 12.0, g.id, '2024-01-14'::timestamp FROM users u, groups g WHERE u.email='ivan@example.com' AND g.name='Anonymous Group';
INSERT INTO screen_times (user_id, submitted_time, group_id, inserted_at)
SELECT u.id, 9.5, g.id, '2024-01-21'::timestamp FROM users u, groups g WHERE u.email='ivan@example.com' AND g.name='Anonymous Group';
INSERT INTO screen_times (user_id, submitted_time, group_id, inserted_at)
SELECT u.id, 11.0, g.id, '2024-01-28'::timestamp FROM users u, groups g WHERE u.email='ivan@example.com' AND g.name='Anonymous Group';

-- Jane: 999.0, 995.0, 1005.0, 990.0
INSERT INTO screen_times (user_id, submitted_time, group_id, inserted_at)
SELECT u.id, 999.0, g.id, '2024-01-07'::timestamp FROM users u, groups g WHERE u.email='jane@example.com' AND g.name='Anonymous Group';
INSERT INTO screen_times (user_id, submitted_time, group_id, inserted_at)
SELECT u.id, 995.0, g.id, '2024-01-14'::timestamp FROM users u, groups g WHERE u.email='jane@example.com' AND g.name='Anonymous Group';
INSERT INTO screen_times (user_id, submitted_time, group_id, inserted_at)
SELECT u.id, 1005.0, g.id, '2024-01-21'::timestamp FROM users u, groups g WHERE u.email='jane@example.com' AND g.name='Anonymous Group';
INSERT INTO screen_times (user_id, submitted_time, group_id, inserted_at)
SELECT u.id, 990.0, g.id, '2024-01-28'::timestamp FROM users u, groups g WHERE u.email='jane@example.com' AND g.name='Anonymous Group';

-- Karl: 33.3, 35.0, 34.0, 32.5
INSERT INTO screen_times (user_id, submitted_time, group_id, inserted_at)
SELECT u.id, 33.3, g.id, '2024-01-07'::timestamp FROM users u, groups g WHERE u.email='karl@example.com' AND g.name='Anonymous Group';
INSERT INTO screen_times (user_id, submitted_time, group_id, inserted_at)
SELECT u.id, 35.0, g.id, '2024-01-14'::timestamp FROM users u, groups g WHERE u.email='karl@example.com' AND g.name='Anonymous Group';
INSERT INTO screen_times (user_id, submitted_time, group_id, inserted_at)
SELECT u.id, 34.0, g.id, '2024-01-21'::timestamp FROM users u, groups g WHERE u.email='karl@example.com' AND g.name='Anonymous Group';
INSERT INTO screen_times (user_id, submitted_time, group_id, inserted_at)
SELECT u.id, 32.5, g.id, '2024-01-28'::timestamp FROM users u, groups g WHERE u.email='karl@example.com' AND g.name='Anonymous Group';

-- Lisa: 120.0, 125.0, 115.0, 130.0
INSERT INTO screen_times (user_id, submitted_time, group_id, inserted_at)
SELECT u.id, 120.0, g.id, '2024-01-07'::timestamp FROM users u, groups g WHERE u.email='lisa@example.com' AND g.name='Anonymous Group';
INSERT INTO screen_times (user_id, submitted_time, group_id, inserted_at)
SELECT u.id, 125.0, g.id, '2024-01-14'::timestamp FROM users u, groups g WHERE u.email='lisa@example.com' AND g.name='Anonymous Group';
INSERT INTO screen_times (user_id, submitted_time, group_id, inserted_at)
SELECT u.id, 115.0, g.id, '2024-01-21'::timestamp FROM users u, groups g WHERE u.email='lisa@example.com' AND g.name='Anonymous Group';
INSERT INTO screen_times (user_id, submitted_time, group_id, inserted_at)
SELECT u.id, 130.0, g.id, '2024-01-28'::timestamp FROM users u, groups g WHERE u.email='lisa@example.com' AND g.name='Anonymous Group';

------------------------------------------------------------
-- Gamer Squad (Mike, Nina, Oscar, Paula)
-- Mike: 8.0, 9.0, 7.5, 10.0
INSERT INTO screen_times (user_id, submitted_time, group_id, inserted_at)
SELECT u.id, 8.0, g.id, '2024-01-07'::timestamp FROM users u, groups g WHERE u.email='mike@example.com' AND g.name='Gamer Squad';
INSERT INTO screen_times (user_id, submitted_time, group_id, inserted_at)
SELECT u.id, 9.0, g.id, '2024-01-14'::timestamp FROM users u, groups g WHERE u.email='mike@example.com' AND g.name='Gamer Squad';
INSERT INTO screen_times (user_id, submitted_time, group_id, inserted_at)
SELECT u.id, 7.5, g.id, '2024-01-21'::timestamp FROM users u, groups g WHERE u.email='mike@example.com' AND g.name='Gamer Squad';
INSERT INTO screen_times (user_id, submitted_time, group_id, inserted_at)
SELECT u.id, 10.0, g.id, '2024-01-28'::timestamp FROM users u, groups g WHERE u.email='mike@example.com' AND g.name='Gamer Squad';

-- Nina: 60.0, 62.0, 58.0, 65.0
INSERT INTO screen_times (user_id, submitted_time, group_id, inserted_at)
SELECT u.id, 60.0, g.id, '2024-01-07'::timestamp FROM users u, groups g WHERE u.email='nina@example.com' AND g.name='Gamer Squad';
INSERT INTO screen_times (user_id, submitted_time, group_id, inserted_at)
SELECT u.id, 62.0, g.id, '2024-01-14'::timestamp FROM users u, groups g WHERE u.email='nina@example.com' AND g.name='Gamer Squad';
INSERT INTO screen_times (user_id, submitted_time, group_id, inserted_at)
SELECT u.id, 58.0, g.id, '2024-01-21'::timestamp FROM users u, groups g WHERE u.email='nina@example.com' AND g.name='Gamer Squad';
INSERT INTO screen_times (user_id, submitted_time, group_id, inserted_at)
SELECT u.id, 65.0, g.id, '2024-01-28'::timestamp FROM users u, groups g WHERE u.email='nina@example.com' AND g.name='Gamer Squad';

-- Oscar: 120.5, 119.0, 123.0, 118.0
INSERT INTO screen_times (user_id, submitted_time, group_id, inserted_at)
SELECT u.id, 120.5, g.id, '2024-01-07'::timestamp FROM users u, groups g WHERE u.email='oscar@example.com' AND g.name='Gamer Squad';
INSERT INTO screen_times (user_id, submitted_time, group_id, inserted_at)
SELECT u.id, 119.0, g.id, '2024-01-14'::timestamp FROM users u, groups g WHERE u.email='oscar@example.com' AND g.name='Gamer Squad';
INSERT INTO screen_times (user_id, submitted_time, group_id, inserted_at)
SELECT u.id, 123.0, g.id, '2024-01-21'::timestamp FROM users u, groups g WHERE u.email='oscar@example.com' AND g.name='Gamer Squad';
INSERT INTO screen_times (user_id, submitted_time, group_id, inserted_at)
SELECT u.id, 118.0, g.id, '2024-01-28'::timestamp FROM users u, groups g WHERE u.email='oscar@example.com' AND g.name='Gamer Squad';

-- Paula: 22.2, 20.0, 25.0, 23.5
INSERT INTO screen_times (user_id, submitted_time, group_id, inserted_at)
SELECT u.id, 22.2, g.id, '2024-01-07'::timestamp FROM users u, groups g WHERE u.email='paula@example.com' AND g.name='Gamer Squad';
INSERT INTO screen_times (user_id, submitted_time, group_id, inserted_at)
SELECT u.id, 20.0, g.id, '2024-01-14'::timestamp FROM users u, groups g WHERE u.email='paula@example.com' AND g.name='Gamer Squad';
INSERT INTO screen_times (user_id, submitted_time, group_id, inserted_at)
SELECT u.id, 25.0, g.id, '2024-01-21'::timestamp FROM users u, groups g WHERE u.email='paula@example.com' AND g.name='Gamer Squad';
INSERT INTO screen_times (user_id, submitted_time, group_id, inserted_at)
SELECT u.id, 23.5, g.id, '2024-01-28'::timestamp FROM users u, groups g WHERE u.email='paula@example.com' AND g.name='Gamer Squad';