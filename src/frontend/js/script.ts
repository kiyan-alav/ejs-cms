const $ = document;

/**
 * ! MODAL SCRIPT
 */

type ModalMap = {
  trigger: string;
  modal: string;
};

const modalPairs: ModalMap[] = [
  { trigger: "#add-discounts", modal: "#add-discounts-modal" },
  { trigger: "#add-course", modal: "#add-new-course-modal" },
  { trigger: "#edit-course", modal: "#edit-modal" },
  { trigger: "#delete-course", modal: "#delete-modal" },
];

const modals: HTMLElement[] = [];

function showModal(modal: HTMLElement) {
  modal.classList.add("visible");
}
function hideModal(modal: HTMLElement) {
  modal.classList.remove("visible");
}

modalPairs.forEach(({ trigger, modal }) => {
  const btn = $.querySelector<HTMLElement>(trigger);
  const modalEl = $.querySelector<HTMLElement>(modal);

  if (!btn || !modalEl) return;

  modals.push(modalEl);

  btn.addEventListener("click", () => showModal(modalEl));
});

window.addEventListener("keydown", (e) => {
  if (e.code === "Escape") {
    modals.forEach((modal) => {
      if (modal.classList.contains("visible")) {
        hideModal(modal);
      }
    });
  }
});

/**
 * ! EDIT FORM INITIAL VALUE
 */

function getInput(id: string): HTMLInputElement {
  const el = document.getElementById(id);
  if (!(el instanceof HTMLInputElement)) {
    throw new Error(`${id} is not an input`);
  }
  return el;
}

document
  .querySelectorAll<HTMLButtonElement>(".courses-btn-edit")
  .forEach((btn) => {
    btn.addEventListener("click", () => {
      const { id, title, price, teacher } = btn.dataset;

      getInput("edit-title").value = title ?? "";
      getInput("edit-price").value = price ?? "";
      getInput("edit-teacher").value = teacher ?? "";

      const form = document.getElementById("edit-course-form");
      form?.setAttribute("action", `/courses/${id}/edit`);

      document.getElementById("edit-modal")?.classList.add("visible");
    });
  });

/**
 * ! DELETE FORM
 */

document
  .querySelectorAll<HTMLButtonElement>(".courses-btn-delete")
  .forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;

      const form = document.getElementById("delete-course-form");
      form?.setAttribute("action", `/courses/${id}/delete`);

      document.getElementById("delete-modal")?.classList.add("visible");
    });
  });

/**
 * ! TOAST
 */

type ToastType = "success" | "error";

document.addEventListener("DOMContentLoaded", () => {
  const flash = document.getElementById("flash-data");

  if (!flash) return;

  const type = (flash.dataset.type as ToastType) ?? "success";
  const message = flash.dataset.message;

  if (!message) return;

  showToast(message, type);
});

function showToast(message: string, type: ToastType = "success"): void {
  const toast: HTMLDivElement = document.createElement("div");

  toast.classList.add("toast", `toast-${type}`);
  toast.innerText = message;

  document.body.appendChild(toast);

  // animation in
  setTimeout((): void => {
    toast.classList.add("show");
  }, 50);

  // animation out
  setTimeout((): void => {
    toast.classList.remove("show");

    setTimeout((): void => {
      toast.remove();
    }, 300);
  }, 3000);
}
