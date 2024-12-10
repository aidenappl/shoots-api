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
-- Alice: 180, 200, 195, 210
INSERT INTO screen_times (user_id, submitted_time, inserted_at)
SELECT u.id, 180, '2024-01-07'::timestamp FROM users u, groups g WHERE u.email='alice@example.com' AND g.name='Fitness Group';
INSERT INTO screen_times (user_id, submitted_time, inserted_at)
SELECT u.id, 200, '2024-01-14'::timestamp FROM users u, groups g WHERE u.email='alice@example.com' AND g.name='Fitness Group';
INSERT INTO screen_times (user_id, submitted_time, inserted_at)
SELECT u.id, 195, '2024-01-21'::timestamp FROM users u, groups g WHERE u.email='alice@example.com' AND g.name='Fitness Group';
INSERT INTO screen_times (user_id, submitted_time, inserted_at)
SELECT u.id, 210, '2024-01-28'::timestamp FROM users u, groups g WHERE u.email='alice@example.com' AND g.name='Fitness Group';

-- Bob: 240, 220, 230, 250
INSERT INTO screen_times (user_id, submitted_time, inserted_at)
SELECT u.id, 240, '2024-01-07'::timestamp FROM users u, groups g WHERE u.email='bob@example.com' AND g.name='Fitness Group';
INSERT INTO screen_times (user_id, submitted_time, inserted_at)
SELECT u.id, 220, '2024-01-14'::timestamp FROM users u, groups g WHERE u.email='bob@example.com' AND g.name='Fitness Group';
INSERT INTO screen_times (user_id, submitted_time, inserted_at)
SELECT u.id, 230, '2024-01-21'::timestamp FROM users u, groups g WHERE u.email='bob@example.com' AND g.name='Fitness Group';
INSERT INTO screen_times (user_id, submitted_time, inserted_at)
SELECT u.id, 250, '2024-01-28'::timestamp FROM users u, groups g WHERE u.email='bob@example.com' AND g.name='Fitness Group';

-- Cathrine: 320, 310, 330, 340
INSERT INTO screen_times (user_id, submitted_time, inserted_at)
SELECT u.id, 320, '2024-01-07'::timestamp FROM users u, groups g WHERE u.email='cathrine@example.com' AND g.name='Fitness Group';
INSERT INTO screen_times (user_id, submitted_time, inserted_at)
SELECT u.id, 310, '2024-01-14'::timestamp FROM users u, groups g WHERE u.email='cathrine@example.com' AND g.name='Fitness Group';
INSERT INTO screen_times (user_id, submitted_time, inserted_at)
SELECT u.id, 330, '2024-01-21'::timestamp FROM users u, groups g WHERE u.email='cathrine@example.com' AND g.name='Fitness Group';
INSERT INTO screen_times (user_id, submitted_time, inserted_at)
SELECT u.id, 340, '2024-01-28'::timestamp FROM users u, groups g WHERE u.email='cathrine@example.com' AND g.name='Fitness Group';

-- Derek: 150, 160, 155, 170
INSERT INTO screen_times (user_id, submitted_time, inserted_at)
SELECT u.id, 150, '2024-01-07'::timestamp FROM users u, groups g WHERE u.email='derek@example.com' AND g.name='Fitness Group';
INSERT INTO screen_times (user_id, submitted_time, inserted_at)
SELECT u.id, 160, '2024-01-14'::timestamp FROM users u, groups g WHERE u.email='derek@example.com' AND g.name='Fitness Group';
INSERT INTO screen_times (user_id, submitted_time, inserted_at)
SELECT u.id, 155, '2024-01-21'::timestamp FROM users u, groups g WHERE u.email='derek@example.com' AND g.name='Fitness Group';
INSERT INTO screen_times (user_id, submitted_time, inserted_at)
SELECT u.id, 170, '2024-01-28'::timestamp FROM users u, groups g WHERE u.email='derek@example.com' AND g.name='Fitness Group';

------------------------------------------------------------
-- Hacker Club (Eve, Frank, Gina, Harry)
-- Eve: 320, 310, 330, 315
INSERT INTO screen_times (user_id, submitted_time, inserted_at)
SELECT u.id, 320, '2024-01-07'::timestamp FROM users u, groups g WHERE u.email='eve@example.com' AND g.name='Hacker Club';
INSERT INTO screen_times (user_id, submitted_time, inserted_at)
SELECT u.id, 310, '2024-01-14'::timestamp FROM users u, groups g WHERE u.email='eve@example.com' AND g.name='Hacker Club';
INSERT INTO screen_times (user_id, submitted_time, inserted_at)
SELECT u.id, 330, '2024-01-21'::timestamp FROM users u, groups g WHERE u.email='eve@example.com' AND g.name='Hacker Club';
INSERT INTO screen_times (user_id, submitted_time, inserted_at)
SELECT u.id, 315, '2024-01-28'::timestamp FROM users u, groups g WHERE u.email='eve@example.com' AND g.name='Hacker Club';

-- Frank: 200, 205, 195, 210
INSERT INTO screen_times (user_id, submitted_time, inserted_at)
SELECT u.id, 200, '2024-01-07'::timestamp FROM users u, groups g WHERE u.email='frank@example.com' AND g.name='Hacker Club';
INSERT INTO screen_times (user_id, submitted_time, inserted_at)
SELECT u.id, 205, '2024-01-14'::timestamp FROM users u, groups g WHERE u.email='frank@example.com' AND g.name='Hacker Club';
INSERT INTO screen_times (user_id, submitted_time, inserted_at)
SELECT u.id, 195, '2024-01-21'::timestamp FROM users u, groups g WHERE u.email='frank@example.com' AND g.name='Hacker Club';
INSERT INTO screen_times (user_id, submitted_time, inserted_at)
SELECT u.id, 210, '2024-01-28'::timestamp FROM users u, groups g WHERE u.email='frank@example.com' AND g.name='Hacker Club';

-- Gina: 240, 230, 250, 245
INSERT INTO screen_times (user_id, submitted_time, inserted_at)
SELECT u.id, 240, '2024-01-07'::timestamp FROM users u, groups g WHERE u.email='gina@example.com' AND g.name='Hacker Club';
INSERT INTO screen_times (user_id, submitted_time, inserted_at)
SELECT u.id, 230, '2024-01-14'::timestamp FROM users u, groups g WHERE u.email='gina@example.com' AND g.name='Hacker Club';
INSERT INTO screen_times (user_id, submitted_time, inserted_at)
SELECT u.id, 250, '2024-01-21'::timestamp FROM users u, groups g WHERE u.email='gina@example.com' AND g.name='Hacker Club';
INSERT INTO screen_times (user_id, submitted_time, inserted_at)
SELECT u.id, 245, '2024-01-28'::timestamp FROM users u, groups g WHERE u.email='gina@example.com' AND g.name='Hacker Club';

-- Harry: 150, 145, 160, 155
INSERT INTO screen_times (user_id, submitted_time, inserted_at)
SELECT u.id, 150, '2024-01-07'::timestamp FROM users u, groups g WHERE u.email='harry@example.com' AND g.name='Hacker Club';
INSERT INTO screen_times (user_id, submitted_time, inserted_at)
SELECT u.id, 145, '2024-01-14'::timestamp FROM users u, groups g WHERE u.email='harry@example.com' AND g.name='Hacker Club';
INSERT INTO screen_times (user_id, submitted_time, inserted_at)
SELECT u.id, 160, '2024-01-21'::timestamp FROM users u, groups g WHERE u.email='harry@example.com' AND g.name='Hacker Club';
INSERT INTO screen_times (user_id, submitted_time, inserted_at)
SELECT u.id, 155, '2024-01-28'::timestamp FROM users u, groups g WHERE u.email='harry@example.com' AND g.name='Hacker Club';

------------------------------------------------------------
-- Anonymous Group (Ivan, Jane, Karl, Lisa)
-- Ivan: 120, 150, 135, 160
INSERT INTO screen_times (user_id, submitted_time, inserted_at)
SELECT u.id, 120, '2024-01-07'::timestamp FROM users u, groups g WHERE u.email='ivan@example.com' AND g.name='Anonymous Group';
INSERT INTO screen_times (user_id, submitted_time, inserted_at)
SELECT u.id, 150, '2024-01-14'::timestamp FROM users u, groups g WHERE u.email='ivan@example.com' AND g.name='Anonymous Group';
INSERT INTO screen_times (user_id, submitted_time, inserted_at)
SELECT u.id, 135, '2024-01-21'::timestamp FROM users u, groups g WHERE u.email='ivan@example.com' AND g.name='Anonymous Group';
INSERT INTO screen_times (user_id, submitted_time, inserted_at)
SELECT u.id, 160, '2024-01-28'::timestamp FROM users u, groups g WHERE u.email='ivan@example.com' AND g.name='Anonymous Group';

-- Jane: 240, 220, 250, 230
INSERT INTO screen_times (user_id, submitted_time, inserted_at)
SELECT u.id, 240, '2024-01-07'::timestamp FROM users u, groups g WHERE u.email='jane@example.com' AND g.name='Anonymous Group';
INSERT INTO screen_times (user_id, submitted_time, inserted_at)
SELECT u.id, 220, '2024-01-14'::timestamp FROM users u, groups g WHERE u.email='jane@example.com' AND g.name='Anonymous Group';
INSERT INTO screen_times (user_id, submitted_time, inserted_at)
SELECT u.id, 250, '2024-01-21'::timestamp FROM users u, groups g WHERE u.email='jane@example.com' AND g.name='Anonymous Group';
INSERT INTO screen_times (user_id, submitted_time, inserted_at)
SELECT u.id, 230, '2024-01-28'::timestamp FROM users u, groups g WHERE u.email='jane@example.com' AND g.name='Anonymous Group';

-- Karl: 180, 200, 190, 210
INSERT INTO screen_times (user_id, submitted_time, inserted_at)
SELECT u.id, 180, '2024-01-07'::timestamp FROM users u, groups g WHERE u.email='karl@example.com' AND g.name='Anonymous Group';
INSERT INTO screen_times (user_id, submitted_time, inserted_at)
SELECT u.id, 200, '2024-01-14'::timestamp FROM users u, groups g WHERE u.email='karl@example.com' AND g.name='Anonymous Group';
INSERT INTO screen_times (user_id, submitted_time, inserted_at)
SELECT u.id, 190, '2024-01-21'::timestamp FROM users u, groups g WHERE u.email='karl@example.com' AND g.name='Anonymous Group';
INSERT INTO screen_times (user_id, submitted_time, inserted_at)
SELECT u.id, 210, '2024-01-28'::timestamp FROM users u, groups g WHERE u.email='karl@example.com' AND g.name='Anonymous Group';

-- Lisa: 300, 320, 310, 330
INSERT INTO screen_times (user_id, submitted_time, inserted_at)
SELECT u.id, 300, '2024-01-07'::timestamp FROM users u, groups g WHERE u.email='lisa@example.com' AND g.name='Anonymous Group';
INSERT INTO screen_times (user_id, submitted_time, inserted_at)
SELECT u.id, 320, '2024-01-14'::timestamp FROM users u, groups g WHERE u.email='lisa@example.com' AND g.name='Anonymous Group';
INSERT INTO screen_times (user_id, submitted_time, inserted_at)
SELECT u.id, 310, '2024-01-21'::timestamp FROM users u, groups g WHERE u.email='lisa@example.com' AND g.name='Anonymous Group';
INSERT INTO screen_times (user_id, submitted_time, inserted_at)
SELECT u.id, 330, '2024-01-28'::timestamp FROM users u, groups g WHERE u.email='lisa@example.com' AND g.name='Anonymous Group';

------------------------------------------------------------
-- Gamer Squad (Mike, Nina, Oscar, Paula)
-- Mike: 180, 200, 150, 210
INSERT INTO screen_times (user_id, submitted_time, inserted_at)
SELECT u.id, 180, '2024-01-07'::timestamp FROM users u, groups g WHERE u.email='mike@example.com' AND g.name='Gamer Squad';
INSERT INTO screen_times (user_id, submitted_time, inserted_at)
SELECT u.id, 200, '2024-01-14'::timestamp FROM users u, groups g WHERE u.email='mike@example.com' AND g.name='Gamer Squad';
INSERT INTO screen_times (user_id, submitted_time, inserted_at)
SELECT u.id, 150, '2024-01-21'::timestamp FROM users u, groups g WHERE u.email='mike@example.com' AND g.name='Gamer Squad';
INSERT INTO screen_times (user_id, submitted_time, inserted_at)
SELECT u.id, 210, '2024-01-28'::timestamp FROM users u, groups g WHERE u.email='mike@example.com' AND g.name='Gamer Squad';

-- Nina: 240, 250, 230, 260
INSERT INTO screen_times (user_id, submitted_time, inserted_at)
SELECT u.id, 240, '2024-01-07'::timestamp FROM users u, groups g WHERE u.email='nina@example.com' AND g.name='Gamer Squad';
INSERT INTO screen_times (user_id, submitted_time, inserted_at)
SELECT u.id, 250, '2024-01-14'::timestamp FROM users u, groups g WHERE u.email='nina@example.com' AND g.name='Gamer Squad';
INSERT INTO screen_times (user_id, submitted_time, inserted_at)
SELECT u.id, 230, '2024-01-21'::timestamp FROM users u, groups g WHERE u.email='nina@example.com' AND g.name='Gamer Squad';
INSERT INTO screen_times (user_id, submitted_time, inserted_at)
SELECT u.id, 260, '2024-01-28'::timestamp FROM users u, groups g WHERE u.email='nina@example.com' AND g.name='Gamer Squad';

-- Oscar: 300, 290, 310, 280
INSERT INTO screen_times (user_id, submitted_time, inserted_at)
SELECT u.id, 300, '2024-01-07'::timestamp FROM users u, groups g WHERE u.email='oscar@example.com' AND g.name='Gamer Squad';
INSERT INTO screen_times (user_id, submitted_time, inserted_at)
SELECT u.id, 290, '2024-01-14'::timestamp FROM users u, groups g WHERE u.email='oscar@example.com' AND g.name='Gamer Squad';
INSERT INTO screen_times (user_id, submitted_time, inserted_at)
SELECT u.id, 310, '2024-01-21'::timestamp FROM users u, groups g WHERE u.email='oscar@example.com' AND g.name='Gamer Squad';
INSERT INTO screen_times (user_id, submitted_time, inserted_at)
SELECT u.id, 280, '2024-01-28'::timestamp FROM users u, groups g WHERE u.email='oscar@example.com' AND g.name='Gamer Squad';

-- Paula: 140, 130, 150, 160
INSERT INTO screen_times (user_id, submitted_time, inserted_at)
SELECT u.id, 140, '2024-01-07'::timestamp FROM users u, groups g WHERE u.email='paula@example.com' AND g.name='Gamer Squad';
INSERT INTO screen_times (user_id, submitted_time, inserted_at)
SELECT u.id, 130, '2024-01-14'::timestamp FROM users u, groups g WHERE u.email='paula@example.com' AND g.name='Gamer Squad';
INSERT INTO screen_times (user_id, submitted_time, inserted_at)
SELECT u.id, 150, '2024-01-21'::timestamp FROM users u, groups g WHERE u.email='paula@example.com' AND g.name='Gamer Squad';
INSERT INTO screen_times (user_id, submitted_time, inserted_at)
SELECT u.id, 160, '2024-01-28'::timestamp FROM users u, groups g WHERE u.email='paula@example.com' AND g.name='Gamer Squad';