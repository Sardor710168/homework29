const inputElement = document.querySelector(".task__input");
const buttonElement = document.querySelector(".add__button");
const taskListWrapper = document.querySelector(".task__list__wrapper");

const API_URL = "http://localhost:3000/tasks";

async function getTasks() {
  const res = await fetch(API_URL);
  return await res.json();
}

buttonElement.addEventListener("click", async () => {
  const value = inputElement.value.trim();
  if (value) {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ value }),
    });
    inputElement.value = "";
    renderTasks();
  }
});

taskListWrapper.addEventListener("click", async (event) => {
  const parent = event.target.closest(".task__card");
  if (!parent) return;
  const id = parent.dataset.id;

  if (event.target.classList.contains("delete__button")) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    renderTasks();
  }

  if (event.target.classList.contains("done__button")) {
    await fetch(`${API_URL}/${id}/done`, { method: "PATCH" });
    renderTasks();
  }

  if (event.target.classList.contains("edit__button")) {
    const newValue = prompt("Yangi qiymatni kiriting:");
    if (newValue) {
      await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value: newValue }),
      });
      renderTasks();
    }
  }
});

async function renderTasks() {
  const tasks = await getTasks();
  taskListWrapper.innerHTML = "";
  tasks.forEach((task) => {
    taskListWrapper.innerHTML += `
      <div class="task__card" data-id="${task.id}">
        <p style="text-decoration:${task.done ? "line-through" : "none"}">${task.value}</p>
        <div>
          <button class="button"><i class="fa-solid fa-check done__button"></i></button>
          <button class="button"><i class="fa-solid fa-pen edit__button"></i></button>
          <button class="button"><i class="fa-solid fa-trash delete__button"></i></button>
        </div>
      </div>
    `;
  });
}

renderTasks();
