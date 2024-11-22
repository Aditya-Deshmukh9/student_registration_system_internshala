const studentsList = JSON.parse(localStorage.getItem("students")) || [];

function renderStudents() {
  const studentListElement = document.getElementById("studentList");
  studentListElement.innerHTML = "";

  // add row in studentsList
  studentsList.forEach((student, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
                    <td  class="border border-gray-300 px-4 py-2 text-center">${student.name}</td>
                    <td  class="border border-gray-300 px-4 py-2 text-center">${student.studentId}</td>
                    <td  class="border border-gray-300 px-4 py-2 text-center">${student.email}</td>
                    <td  class="border border-gray-300 px-4 py-2 text-center">${student.rollNo}</td>
                    <td  class="border border-gray-300 px-4 py-2 text-center">
                    <button class="reset-btn text-blue-600 hover:text-blue-800"  onclick="editStudent(${index})" >
                    <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                    </td>
                    <td  class="border border-gray-300 px-4 py-2 text-center">
                    <button class="delete-btn text-red-600 hover:text-red-800" onclick="deleteStudent(${index})" >
                    <i class="fa-solid fa-trash"></i>
                    </button>
                    </td>`;
    studentListElement.appendChild(row);
  });
}

// Function to add new student
function addStudent() {
  const name = document.getElementById("name").value.trim();
  const studentId = document.getElementById("studentId").value.trim();
  const studentEmail = document.getElementById("email").value.trim();
  const rollNo = document.getElementById("rollNo").value.trim();

  // Input validate
  if (!name || !studentId || !studentEmail || !rollNo) {
    alert("Please fill out all fields.");
    return;
  }

  // Validate name
  if (!/^[a-zA-Z\s]+$/.test(name)) {
    alert("Student name should contain only letters.");
    return;
  }

  // Validate email
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(studentEmail)) {
    alert("Please insert a valid email.");
    return;
  }

  // Validate studentId and rollNo (only numbers)
  if (!/^\d+$/.test(studentId) || !/^\d+$/.test(rollNo)) {
    alert("Student ID and Roll No should contain only numbers.");
    return;
  }

  // Add student to the list
  studentsList.push({
    name,
    studentId,
    email: studentEmail,
    rollNo,
  });

  // Update local storage
  localStorage.setItem("students", JSON.stringify(studentsList));

  renderStudents();
  // Clear input fields
  document.getElementById("name").value = "";
  document.getElementById("studentId").value = "";
  document.getElementById("email").value = "";
  document.getElementById("rollNo").value = "";

  // alert
  alert("Student added successfully");
}

// delete function
function deleteStudent(index) {
  if (confirm("Are you sure to want to delete this student?")) {
    studentsList.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(studentsList));
    renderStudents();
  }
}

// edit function
function editStudent(index) {
  const student = studentsList[index];

  document.getElementById("name").value = student.name;
  document.getElementById("studentId").value = student.studentId;
  document.getElementById("email").value = student.email;
  document.getElementById("rollNo").value = student.rollNo;

  deleteStudent(index); // Deleting after editing
}

window.onload = renderStudents;
