if(
    sessionStorage.getItem("loggedIn")
    !== "true"
) {

    window.location.href = "login.html";
}

const API_URL = "http://localhost:8080/students";

function showSection(section, element) {

    document.getElementById(
        "dashboardSection"
    ).style.display = "none";

    document.getElementById(
        "studentsSection"
    ).style.display = "none";

    document.getElementById(
        "statisticsSection"
    ).style.display = "none";

    document.querySelectorAll(".menu-item")
        .forEach(button => {

            button.classList.remove("active");
        });

    element.classList.add("active");

    if(section === "dashboard") {

        document.getElementById(
            "dashboardSection"
        ).style.display = "block";
    }

    if(section === "students") {

        document.getElementById(
            "studentsSection"
        ).style.display = "block";

        loadStudents();
    }

    if(section === "statistics") {

        document.getElementById(
            "statisticsSection"
        ).style.display = "block";

        loadStatistics();
    }
}

async function addStudent() {

    const student = {

        id: document.getElementById("id").value,

        name: document.getElementById("name").value,

        age: document.getElementById("age").value,

        course: document.getElementById("course").value,

        marks: document.getElementById("marks").value,

        department: document.getElementById("department").value,

        email: document.getElementById("email").value
    };
    if(
        !student.id ||
        !student.name ||
        !student.age ||
        !student.course ||
        !student.marks ||
        !student.department ||
        !student.email
    ) {
        alert("Please Fill All Fields");
        return;
    }
    try {

        const response = await fetch(API_URL, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(student)
        });

        if(response.ok) {

            alert("Student Added Successfully");

            clearForm();

            loadStudents();

            loadStatistics();

        } else {

            alert("Failed To Add Student");
        }

    } catch(error) {

        console.error(error);

        alert("Server Error");
    }
}

async function loadStudents() {

    try {

        const response = await fetch(API_URL);

        const students = await response.json();

        const table = document.getElementById(
            "studentTable"
        );

        table.innerHTML = "";

        students.forEach(student => {

            table.innerHTML += `

            <tr>
            
            <td>${student.id}</td>
            
            <td>${student.name}</td>
            
            <td>${student.age}</td>
            
            <td>${student.course}</td>
            
            <td>${student.marks}</td>
            
            <td>${student.department}</td>
            
            <td>${student.email}</td>
            
            <td class="text-center">

            <button
                class="delete-btn"
                onclick="deleteStudent(${student.id})">
        
                Delete
        
            </button>
        
        </td>
        
        </tr>
        `;
        });

    } catch(error) {

        console.error(error);

        alert("Cannot Load Students");
    }
}


async function deleteStudent(id) {

    const confirmDelete = confirm(
        "Are you sure to delete this student?"
    );

    if(!confirmDelete) {

        return;
    }

    try {

        await fetch(API_URL + "/" + id, {

            method: "DELETE"
        });

        alert("Student Deleted");

        loadStudents();

        loadStatistics();

    } catch(error) {

        console.error(error);

        alert("Delete Failed");
    }
}
async function loadStatistics() {

    try {

        const response = await fetch(API_URL);

        const students = await response.json();

        document.getElementById(
            "totalStudents"
        ).innerText = students.length;

        let totalMarks = 0;

        students.forEach(student => {

            totalMarks += Number(student.marks);
        });

        let averageMarks = 0;

        if(students.length > 0) {

            averageMarks =
                totalMarks / students.length;
        }

        document.getElementById(
            "averageMarks"
        ).innerText =
            averageMarks.toFixed(2);

        // TOTAL DEPARTMENTS

        const departments = new Set();

        students.forEach(student => {

            departments.add(student.department);
        });

        document.getElementById(
            "totalDepartments"
        ).innerText =
            departments.size;

    } catch(error) {

        console.error(error);

        alert("Statistics Load Failed");
    }
}
function clearForm() {

    document.getElementById("id").value = "";

    document.getElementById("name").value = "";

    document.getElementById("age").value = "";

    document.getElementById("course").value = "";

    document.getElementById("marks").value = "";

    document.getElementById("department").value = "";

    document.getElementById("email").value = "";
}

window.onload = () => {

    loadStudents();

    loadStatistics();
};
