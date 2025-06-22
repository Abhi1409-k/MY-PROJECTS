// Mock data for demonstration purposes
const mockUsers = {
    professors: [
        { 
            id: "prof1", 
            username: "professor1", 
            password: "pass123", 
            name: "Dr. Amit Singh", 
            department: "Computer Science Department",
            subjects: ["cs101", "cs201", "cs301", "cs401", "cs501"] 
        },
        { 
            id: "prof2", 
            username: "professor2", 
            password: "prof456", 
            name: "Dr. Priya Sharma", 
            department: "Computer Science Department",
            subjects: ["cs201", "cs301", "cs401", "cs501", "cs101"] 
        },
        { 
            id: "prof3", 
            username: "professor3", 
            password: "faculty789", 
            name: "Dr. Rajesh Kumar", 
            department: "Information Technology Department",
            subjects: ["cs101", "cs301", "cs401", "cs501", "cs201"] 
        },
        { 
            id: "prof4", 
            username: "professor4", 
            password: "teacher321", 
            name: "Dr. Sunita Verma", 
            department: "Information Technology Department",
            subjects: ["cs101", "cs201", "cs401", "cs501", "cs301"] 
        },
        { 
            id: "prof5", 
            username: "professor5", 
            password: "faculty555", 
            name: "Dr. Vikram Mehta", 
            department: "Computer Science Department",
            subjects: ["cs201", "cs301", "cs401", "cs501", "cs101"] 
        }
    ],
    students: [
        { 
            id: "std1", 
            username: "student1", 
            password: "pass123", 
            name: "Rahul Gupta", 
            regNo: "CSE/2025/001",
            branch: "Computer Science Engineering", 
            semester: "6th Semester",
            courses: ["cs101", "cs201", "cs301", "cs401", "cs501"] 
        },
        { 
            id: "std2", 
            username: "student2", 
            password: "stud456", 
            name: "Anjali Sharma", 
            regNo: "CSE/2025/002",
            branch: "Computer Science Engineering", 
            semester: "6th Semester",
            courses: ["cs101", "cs301", "cs401", "cs501", "cs201"] 
        },
        { 
            id: "std3", 
            username: "student3", 
            password: "learner789", 
            name: "Vivek Patel", 
            regNo: "IT/2025/001",
            branch: "Information Technology", 
            semester: "6th Semester",
            courses: ["cs201", "cs301", "cs401", "cs501", "cs101"] 
        },
        { 
            id: "std4", 
            username: "student4", 
            password: "pupil321", 
            name: "Neha Singh", 
            regNo: "IT/2025/002",
            branch: "Information Technology", 
            semester: "6th Semester",
            courses: ["cs101", "cs201", "cs401", "cs501", "cs301"] 
        },
        { 
            id: "std5", 
            username: "student5", 
            password: "scholar555", 
            name: "Arjun Reddy", 
            regNo: "CSE/2025/003",
            branch: "Computer Science Engineering", 
            semester: "6th Semester",
            courses: ["cs101", "cs201", "cs301", "cs401", "cs501"] 
        }
    ]
};

// Mock attendance data with timestamps
let attendanceData = {
    "cs101": {
        "2025-04-10": {
            "std1": { status: true, time: "09:15:22" },
            "std2": { status: true, time: "09:10:45" },
            "std4": { status: false, time: null },
            "std5": { status: true, time: "09:08:37" }
        },
        "2025-04-12": {
            "std1": { status: true, time: "09:12:18" },
            "std2": { status: false, time: null },
            "std4": { status: true, time: "09:22:05" },
            "std5": { status: true, time: "09:05:51" }
        }
    },
    "cs201": {
        "2025-04-11": {
            "std1": { status: true, time: "10:15:22" },
            "std3": { status: true, time: "10:12:45" },
            "std4": { status: true, time: "10:05:19" },
            "std5": { status: false, time: null }
        }
    },
    "cs301": {
        "2025-04-10": {
            "std1": { status: true, time: "14:05:22" },
            "std2": { status: false, time: null },
            "std3": { status: true, time: "14:12:41" },
            "std5": { status: true, time: "14:08:37" }
        }
    },
    "cs401": {
        "2025-04-13": {
            "std1": { status: true, time: "11:15:22" },
            "std2": { status: true, time: "11:10:45" },
            "std3": { status: false, time: null },
            "std5": { status: true, time: "11:08:37" }
        }
    },
    "cs501": {
        "2025-04-14": {
            "std1": { status: true, time: "13:15:22" },
            "std2": { status: true, time: "13:10:45" },
            "std3": { status: true, time: "13:12:41" },
            "std4": { status: false, time: null }
        }
    }
};

// Global state
let currentUser = null;
let currentRole = null;

// DOM elements - Common elements
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const currentUserElement = document.getElementById('current-user');
const logoutBtn = document.getElementById('logout-btn');
const notification = document.getElementById('notification');

// DOM elements - Attendance marking section
const registrationInput = document.getElementById('registration-no');
const attendanceSubjectSelect = document.getElementById('attendance-subject');
const markAttendanceBtn = document.getElementById('mark-attendance-btn');
const studentProfile = document.getElementById('student-profile');
const profileName = document.getElementById('profile-name');
const profileId = document.getElementById('profile-id');
const profileBranch = document.getElementById('profile-branch');
const profileSemester = document.getElementById('profile-semester');
const attendanceStatus = document.getElementById('attendance-status');

// DOM elements - Student section
const studentLoginPanel = document.getElementById('student-login-panel');
const studentDashboard = document.getElementById('student-dashboard');
const studentUsernameInput = document.getElementById('student-username');
const studentPasswordInput = document.getElementById('student-password');
const studentLoginBtn = document.getElementById('student-login-btn');
const studentProfileName = document.getElementById('student-profile-name');
const studentProfileId = document.getElementById('student-profile-id');
const studentProfileBranch = document.getElementById('student-profile-branch');
const studentProfileSemester = document.getElementById('student-profile-semester');
const studentCourseSelect = document.getElementById('student-course-select');
const attendanceDetailsList = document.getElementById('attendance-details-list');

// DOM elements - Professor section
const professorLoginPanel = document.getElementById('professor-login-panel');
const professorDashboard = document.getElementById('professor-dashboard');
const professorUsernameInput = document.getElementById('professor-username');
const professorPasswordInput = document.getElementById('professor-password');
const professorLoginBtn = document.getElementById('professor-login-btn');
const professorProfileName = document.getElementById('professor-profile-name');
const professorProfileId = document.getElementById('professor-profile-id');
const professorProfileDepartment = document.getElementById('professor-profile-department');
const courseSelect = document.getElementById('course-select');
const dateSelect = document.getElementById('date-select');
const loadStudentsBtn = document.getElementById('load-students-btn');
const studentList = document.getElementById('student-list');
const saveAttendanceBtn = document.getElementById('save-attendance-btn');
const statsTotal = document.getElementById('stats-total');
const statsPresent = document.getElementById('stats-present');
const statsAbsent = document.getElementById('stats-absent');
const statsRate = document.getElementById('stats-rate');

// Initialize the date to today
dateSelect.valueAsDate = new Date();

// Initialize the application
function init() {
    // Setup event listeners
    setupTabListeners();
    setupLogoutListener();
    setupMarkAttendanceListener();
    setupStudentLoginListener();
    setupProfessorLoginListener();
    setupCourseSelectListener();
    setupLoadStudentsListener();
    setupSaveAttendanceListener();
    
    // Initialize subject selection dropdowns with 5 subjects
    initializeSubjectDropdowns();
}

// Initialize subject selection dropdowns
function initializeSubjectDropdowns() {
    const subjects = [
        { value: "cs101", text: "CS101 - Introduction to Programming" },
        { value: "cs201", text: "CS201 - Data Structures" },
        { value: "cs301", text: "CS301 - Database Systems" },
        { value: "cs401", text: "CS401 - Artificial Intelligence" },
        { value: "cs501", text: "CS501 - Web Development" }
    ];
    
    // Update attendance subject dropdown
    attendanceSubjectSelect.innerHTML = '<option value="">-- Select Subject --</option>';
    subjects.forEach(subject => {
        const option = document.createElement('option');
        option.value = subject.value;
        option.textContent = subject.text;
        attendanceSubjectSelect.appendChild(option);
    });
}

// Tab handling
function setupTabListeners() {
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            
            // Check access permissions based on login status
            if (tabId === 'student-section' && currentRole !== 'student') {
                if (currentUser) {
                    showNotification('Please login as a student to access this section', true);
                    return;
                }
            }
            
            if (tabId === 'professor-section' && currentRole !== 'professor') {
                if (currentUser) {
                    showNotification('Please login as a professor to access this section', true);
                    return;
                }
            }
            
            // Update active tab
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            button.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// Logout functionality
function setupLogoutListener() {
    logoutBtn.addEventListener('click', () => {
        currentUser = null;
        currentRole = null;
        currentUserElement.textContent = 'Not logged in';
        logoutBtn.style.display = 'none';
        
        // Reset panels
        studentLoginPanel.style.display = 'block';
        studentDashboard.style.display = 'none';
        professorLoginPanel.style.display = 'block';
        professorDashboard.style.display = 'none';
        studentProfile.style.display = 'none';
        
        // Clear inputs
        registrationInput.value = '';
        attendanceSubjectSelect.value = '';
        studentUsernameInput.value = '';
        studentPasswordInput.value = '';
        professorUsernameInput.value = '';
        professorPasswordInput.value = '';
        
        // Switch to attendance panel
        tabButtons[0].click();
        
        showNotification('You have been logged out');
    });
}

// Mark attendance functionality
function setupMarkAttendanceListener() {
    markAttendanceBtn.addEventListener('click', () => {
        const regNo = registrationInput.value;
        const subject = attendanceSubjectSelect.value;
        
        if (!regNo) {
            showNotification('Please enter registration number', true);
            return;
        }
        
        if (!subject) {
            showNotification('Please select a subject', true);
            return;
        }
        
        // Find student by registration number
        const student = mockUsers.students.find(s => s.regNo === regNo);
        
        if (!student) {
            showNotification('Invalid registration number', true);
            return;
        }
        
        // Check if student is enrolled in this subject
        if (!student.courses.includes(subject)) {
            showNotification('You are not enrolled in this subject', true);
            return;
        }
        
        // Display student profile
        displayStudentProfile(student);
        
        // Mark attendance for today
        markAttendanceForToday(student, subject);
    });
}

// Display student profile in the attendance section
function displayStudentProfile(student) {
    profileName.textContent = student.name;
    profileId.textContent = `Registration Number: ${student.regNo}`;
    profileBranch.textContent = `Branch: ${student.branch}`;
    profileSemester.textContent = `Semester: ${student.semester}`;
    
    studentProfile.style.display = 'block';
}

// Mark attendance for today
function markAttendanceForToday(student, subject) {
    const today = new Date().toISOString().split('T')[0];
    const currentTime = new Date().toLocaleTimeString('en-US', { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
    });
    
    // Check if already marked attendance
    if (attendanceData[subject] && 
        attendanceData[subject][today] && 
        attendanceData[subject][today][student.id]) {
        
        attendanceStatus.innerHTML = `
            <h4>Attendance Already Marked</h4>
            <p>You have already marked your attendance for today at ${attendanceData[subject][today][student.id].time}</p>
        `;
        attendanceStatus.className = 'attendance-status warning';
        return;
    }
    
    // Initialize the course and date in attendance data if not exists
    if (!attendanceData[subject]) {
        attendanceData[subject] = {};
    }
    
    if (!attendanceData[subject][today]) {
        attendanceData[subject][today] = {};
    }
    
    // Mark attendance as present
    attendanceData[subject][today][student.id] = { status: true, time: currentTime };
    
    // Show success message
    attendanceStatus.innerHTML = `
        <h4>Attendance Marked Successfully</h4>
        <p>Subject: ${getCourseFullName(subject)}</p>
        <p>Date: ${formatDate(today)}</p>
        <p>Time: ${currentTime}</p>
    `;
    attendanceStatus.className = 'attendance-status success';
    
    console.log('Updated Attendance Data:', attendanceData);
}

// Student login functionality
function setupStudentLoginListener() {
    studentLoginBtn.addEventListener('click', () => {
        const username = studentUsernameInput.value;
        const password = studentPasswordInput.value;
        
        if (!username || !password) {
            showNotification('Please enter username and password', true);
            return;
        }
        
        // Check credentials
        const student = mockUsers.students.find(s => s.username === username && s.password === password);
        
        if (student) {
            // Login successful
            currentUser = student;
            currentRole = 'student';
            currentUserElement.textContent = `${student.name} (Student)`;
            logoutBtn.style.display = 'inline-block';
            
            // Switch to student dashboard
            studentLoginPanel.style.display = 'none';
            studentDashboard.style.display = 'block';
            
            // Load student dashboard
            loadStudentDashboard(student);
            
            showNotification(`Welcome, ${student.name}!`);
        } else {
            showNotification('Invalid username or password', true);
        }
    });
}

// Professor login functionality
function setupProfessorLoginListener() {
    professorLoginBtn.addEventListener('click', () => {
        const username = professorUsernameInput.value;
        const password = professorPasswordInput.value;
        
        if (!username || !password) {
            showNotification('Please enter username and password', true);
            return;
        }
        
        // Check credentials
        const professor = mockUsers.professors.find(p => p.username === username && p.password === password);
        
        if (professor) {
            // Login successful
            currentUser = professor;
            currentRole = 'professor';
            currentUserElement.textContent = `${professor.name} (Professor)`;
            logoutBtn.style.display = 'inline-block';
            
            // Switch to professor dashboard
            professorLoginPanel.style.display = 'none';
            professorDashboard.style.display = 'block';
            
            // Load professor dashboard
            loadProfessorDashboard(professor);
            
            showNotification(`Welcome, ${professor.name}!`);
        } else {
            showNotification('Invalid username or password', true);
        }
    });
}

// Load student dashboard
function loadStudentDashboard(student) {
    // Display student info
    studentProfileName.textContent = student.name;
    studentProfileId.textContent = `Registration Number: ${student.regNo}`;
    studentProfileBranch.textContent = `Branch: ${student.branch}`;
    studentProfileSemester.textContent = `Semester: ${student.semester}`;
    
    // Calculate attendance percentages
    calculateAttendancePercentages(student);
    
    // Setup course select with 5 subjects
    const subjects = [
        { value: "cs101", text: "CS101 - Introduction to Programming" },
        { value: "cs201", text: "CS201 - Data Structures" },
        { value: "cs301", text: "CS301 - Database Systems" },
        { value: "cs401", text: "CS401 - Artificial Intelligence" },
        { value: "cs501", text: "CS501 - Web Development" }
    ];
    
    studentCourseSelect.innerHTML = '<option value="">-- Select Subject --</option>';
    subjects.forEach(subject => {
        if (student.courses.includes(subject.value)) {
            const option = document.createElement('option');
            option.value = subject.value;
            option.textContent = subject.text;
            studentCourseSelect.appendChild(option);
        }
    });
}

// Setup course select listener for student dashboard
function setupCourseSelectListener() {
    studentCourseSelect.addEventListener('change', () => {
        if (!currentUser || currentRole !== 'student') return;
        
        const selectedCourse = studentCourseSelect.value;
        if (selectedCourse) {
            loadAttendanceDetails(currentUser, selectedCourse);
        } else {
            attendanceDetailsList.innerHTML = '';
        }
    });
}

// Calculate attendance percentages
function calculateAttendancePercentages(student) {
    const subjects = ["cs101", "cs201", "cs301", "cs401", "cs501"];
    
    subjects.forEach(course => {
        const elementId = `${course}-attendance`;
        const element = document.getElementById(elementId);
        
        if (!element) {
            console.error(`Element with ID '${elementId}' not found!`);
            return;
        }
        
        const courseAttendance = attendanceData[course] || {};
        const dates = Object.keys(courseAttendance);
        
        if (dates.length === 0) {
            element.textContent = 'N/A';
            return;
        }
        
        let present = 0;
        let total = 0;
        
        dates.forEach(date => {
            if (student.id in courseAttendance[date]) {
                total++;
                if (courseAttendance[date][student.id].status) {
                    present++;
                }
            }
        });
        
        const percentage = total === 0 ? 'N/A' : `${Math.round((present / total) * 100)}%`;
        element.textContent = percentage;
    });
}

// Load detailed attendance for a course
function loadAttendanceDetails(student, course) {
    const courseAttendance = attendanceData[course] || {};
    const dates = Object.keys(courseAttendance).sort();
    
    // Clear previous data
    attendanceDetailsList.innerHTML = '';
    
    if (dates.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = '<td colspan="3">No attendance records found</td>';
        attendanceDetailsList.appendChild(row);
        return;
    }
    
    dates.forEach(date => {
        if (student.id in courseAttendance[date]) {
            const record = courseAttendance[date][student.id];
            const status = record.status;
            const time = record.time || 'N/A';
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${formatDate(date)}</td>
                <td>${time}</td>
                <td>${status ? '<span style="color: #27ae60;">Present</span>' : '<span style="color: #e74c3c;">Absent</span>'}</td>
            `;
            attendanceDetailsList.appendChild(row);
        }
    });
}

// Load professor dashboard
function loadProfessorDashboard(professor) {
    // Display professor info
    professorProfileName.textContent = professor.name;
    professorProfileId.textContent = `Professor ID: ${professor.id}`;
    professorProfileDepartment.textContent = professor.department;
    
    // Setup course select with 5 subjects
    const subjects = [
        { value: "cs101", text: "CS101 - Introduction to Programming" },
        { value: "cs201", text: "CS201 - Data Structures" },
        { value: "cs301", text: "CS301 - Database Systems" },
        { value: "cs401", text: "CS401 - Artificial Intelligence" },
        { value: "cs501", text: "CS501 - Web Development" }
    ];
    
    courseSelect.innerHTML = '<option value="">-- Select Subject --</option>';
    subjects.forEach(subject => {
        if (professor.subjects.includes(subject.value)) {
            const option = document.createElement('option');
            option.value = subject.value;
            option.textContent = subject.text;
            courseSelect.appendChild(option);
        }
    });
}

// Setup load students listener
function setupLoadStudentsListener() {
    loadStudentsBtn.addEventListener('click', () => {
        if (!currentUser || currentRole !== 'professor') return;
        
        const course = courseSelect.value;
        const date = dateSelect.value;
        
        if (!course) {
            showNotification('Please select a subject', true);
            return;
        }
        
        if (!date) {
            showNotification('Please select a date', true);
            return;
        }
        
        // Get students enrolled in this course
        const studentsInCourse = mockUsers.students.filter(student => 
            student.courses.includes(course)
        );
        
        // Clear previous list
        studentList.innerHTML = '';
        
        // Create attendance list
        studentsInCourse.forEach(student => {
            const attendanceRecord = attendanceData[course]?.[date]?.[student.id];
            const isPresent = attendanceRecord ? attendanceRecord.status : false;
            const timeMarked = attendanceRecord ? attendanceRecord.time : 'N/A';
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${student.regNo}</td>
                <td>${student.name}</td>
                <td>${timeMarked}</td>
                <td>${isPresent ? 
                    '<span style="color: #27ae60;">Present</span>' : 
                    '<span style="color: #e74c3c;">Absent</span>'}
                </td>
                <td>
                    <button class="action-btn mark-present" data-student-id="${student.id}">Mark Present</button>
                    <button class="action-btn mark-absent" data-student-id="${student.id}">Mark Absent</button>
                </td>
            `;
            studentList.appendChild(row);
        });
        
        // Add event listeners to action buttons
        document.querySelectorAll('.mark-present').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const studentId = e.target.getAttribute('data-student-id');
                updateAttendance(course, date, studentId, true);
            });
        });
        
        document.querySelectorAll('.mark-absent').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const studentId = e.target.getAttribute('data-student-id');
                updateAttendance(course, date, studentId, false);
            });
        });
        
        // Update statistics
        updateAttendanceStatistics(course, date);
        
        // Show the table if there are students
        if (studentsInCourse.length > 0) {
            saveAttendanceBtn.style.display = 'block';
        } else {
            studentList.innerHTML = '<tr><td colspan="5">No students enrolled in this subject</td></tr>';
            saveAttendanceBtn.style.display = 'none';
        }
    });
}

// Update attendance by professor
function updateAttendance(course, date, studentId, isPresent) {
    // Initialize the course and date in attendance data if not exists
    if (!attendanceData[course]) {
        attendanceData[course] = {};
    }
    
    if (!attendanceData[course][date]) {
        attendanceData[course][date] = {};
    }
    
    // Get current time if marking present
    const currentTime = isPresent ? new Date().toLocaleTimeString('en-US', { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
    }) : null;
    
    // Update attendance
    attendanceData[course][date][studentId] = { status: isPresent, time: currentTime };
    
    // Update UI
    const studentRow = document.querySelector(`button[data-student-id="${studentId}"]`).closest('tr');
    studentRow.cells[2].textContent = currentTime || 'N/A';
    studentRow.cells[3].innerHTML = isPresent ? 
        '<span style="color: #27ae60;">Present</span>' : 
        '<span style="color: #e74c3c;">Absent</span>';
    
    // Update statistics
    updateAttendanceStatistics(course, date);
    
    showNotification(`Attendance ${isPresent ? 'marked as present' : 'marked as absent'}`);
}

// Update attendance statistics
function updateAttendanceStatistics(course, date) {
    const courseData = attendanceData[course]?.[date] || {};
    const studentIds = Object.keys(courseData);
    let presentCount = 0;
    
    studentIds.forEach(id => {
        if (courseData[id].status) {
            presentCount++;
        }
    });
    
    const totalStudents = mockUsers.students.filter(s => s.courses.includes(course)).length;
    const absentCount = totalStudents - presentCount;
    const attendanceRate = totalStudents === 0 ? 0 : Math.round((presentCount / totalStudents) * 100);
    
    statsTotal.textContent = totalStudents;
    statsPresent.textContent = presentCount;
    statsAbsent.textContent = absentCount;
    statsRate.textContent = `${attendanceRate}%`;
}

// Save attendance changes
function setupSaveAttendanceListener() {
    saveAttendanceBtn.addEventListener('click', () => {
        if (!currentUser || currentRole !== 'professor') return;
        
        const course = courseSelect.value;
        const date = dateSelect.value;
        
        if (!course || !date) {
            showNotification('Please select subject and date', true);
            return;
        }
        
        showNotification('Attendance data saved successfully');
        
        // For demonstration, log the data
        console.log('Updated Attendance Data:', attendanceData);
    });
}

// Helper function to format date
function formatDate(dateString) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

// Helper function to get full course name
function getCourseFullName(courseCode) {
    const courses = {
        'cs101': 'CS101 - Introduction to Programming',
        'cs201': 'CS201 - Data Structures',
        'cs301': 'CS301 - Database Systems',
        'cs401': 'CS401 - Artificial Intelligence',
        'cs501': 'CS501 - Web Development'
    };
    return courses[courseCode] || courseCode;
}

// Show notification
function showNotification(message, isError = false) {
    notification.textContent = message;
    notification.className = 'notification';
    
    if (isError) {
        notification.classList.add('error');
    }
    
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Initialize the application
init();