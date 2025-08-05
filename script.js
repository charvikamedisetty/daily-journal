const form = document.getElementById("journal-form");
const dateInput = document.getElementById("date");
const entryInput = document.getElementById("entry");
const entriesDiv = document.getElementById("entries");

function loadEntries() {
  const entries = JSON.parse(localStorage.getItem("journalEntries")) || [];
  entriesDiv.innerHTML = "";

  entries.forEach((entry, index) => {
    const div = document.createElement("div");
    div.classList.add("entry");

    const dateDiv = document.createElement("div");
    dateDiv.classList.add("entry-date");
    dateDiv.textContent = entry.date;

    const textDiv = document.createElement("div");
    textDiv.classList.add("entry-text");
    textDiv.textContent = entry.text;

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = () => deleteEntry(index);

    div.appendChild(dateDiv);
    div.appendChild(textDiv);
    div.appendChild(deleteBtn);

    entriesDiv.appendChild(div);
  });
}

function deleteEntry(index) {
  const entries = JSON.parse(localStorage.getItem("journalEntries")) || [];
  entries.splice(index, 1);
  localStorage.setItem("journalEntries", JSON.stringify(entries));
  loadEntries();
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const date = dateInput.value;
  const text = entryInput.value;

  const newEntry = { date, text };
  const entries = JSON.parse(localStorage.getItem("journalEntries")) || [];

  entries.push(newEntry);
  localStorage.setItem("journalEntries", JSON.stringify(entries));

  form.reset();
  loadEntries();
});

window.addEventListener("DOMContentLoaded", loadEntries);
