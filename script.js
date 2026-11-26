
// Demo Rules (Placeholder Values)
const RULES = {
    "Minor-1": {
        att: 65,
        score: 0
    },

    "Minor-2": {
        att: 70,
        score: 20
    },

    "Endterm": {
        att: 75,
        score: 35
    }
};

// Array to store student objects
const students = [];

// Validate Student Details
function validate(s) {

    if (!s.name || !s.roll) {
        return "Name and roll number are required.";
    }

    if (isNaN(s.att) || s.att < 0 || s.att > 100) {
        return "Attendance must be between 0 and 100.";
    }

    if (isNaN(s.score) || s.score < 0 || s.score > 100) {
        return "Score must be between 0 and 100.";
    }

    return "";
}

// Check Exam Eligibility
function check(s) {

    const r = RULES[s.exam];

    if (s.att < r.att) {
        return "Not Eligible (attendance < " + r.att + "%)";
    }

    if (s.score < r.score) {
        return "Not Eligible (score < " + r.score + ")";
    }

    return "Eligible";
}

// Display Student Records
function render() {

    const tbody = document.getElementById("out");

    tbody.innerHTML = "";

    for (let i = 0; i < students.length; i++) {

        const s = students[i];

        const cls = s.status === "Eligible" ? "ok" : "no";

        tbody.innerHTML += `
            <tr>
                <td>${i + 1}</td>
                <td>${s.name}</td>
                <td>${s.roll}</td>
                <td>${s.att}%</td>
                <td>${s.score}</td>
                <td>${s.exam}</td>
                <td class="${cls}">${s.status}</td>
            </tr>
        `;
    }
}

// Add Button Click Event
document.getElementById("add").addEventListener("click", () => {

    // Get Input Values
    const v = id => document.getElementById(id).value;

    const s = {
        name: v("name").trim(),
        roll: v("roll").trim(),
        att: parseFloat(v("att")),
        score: parseFloat(v("marks")),
        exam: v("exam")
    };

    // Validate Input
    const msg = validate(s);

    document.getElementById("err").textContent = msg;

    if (msg) {
        return;
    }

    // Check Eligibility
    s.status = check(s);

    // Add Student to Array
    students.push(s);

    // Display Updated Table
    render();

});
