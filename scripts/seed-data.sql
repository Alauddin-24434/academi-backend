-- Insert sample faculties
INSERT INTO "faculties" (id, name, code, description) VALUES
('faculty_1', 'Faculty of Engineering', 'ENG', 'Engineering and Technology'),
('faculty_2', 'Faculty of Business', 'BUS', 'Business Administration'),
('faculty_3', 'Faculty of Science', 'SCI', 'Pure and Applied Sciences');

-- Insert sample departments
INSERT INTO "departments" (id, name, code, "facultyId") VALUES
('dept_1', 'Computer Science & Engineering', 'CSE', 'faculty_1'),
('dept_2', 'Electrical & Electronic Engineering', 'EEE', 'faculty_1'),
('dept_3', 'Business Administration', 'BBA', 'faculty_2'),
('dept_4', 'Mathematics', 'MATH', 'faculty_3');

-- Insert sample academic sessions
INSERT INTO "academic_sessions" (id, name, "startDate", "endDate") VALUES
('session_1', '2023-24', '2023-01-01', '2023-12-31'),
('session_2', '2024-25', '2024-01-01', '2024-12-31');

-- Insert sample payment types
INSERT INTO "payment_types" (id, name, description, amount) VALUES
('payment_type_1', 'Admission Fee', 'One-time admission fee', 5000.00),
('payment_type_2', 'Tuition Fee', 'Semester tuition fee', 15000.00),
('payment_type_3', 'Library Fee', 'Annual library fee', 1000.00),
('payment_type_4', 'Lab Fee', 'Laboratory usage fee', 2000.00);
