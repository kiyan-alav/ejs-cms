"use strict";
const $ = document;
const modalPairs = [
    { trigger: "#add-discounts", modal: "#add-discounts-modal" },
    { trigger: "#add-course", modal: "#add-new-course-modal" },
    { trigger: "#edit-course", modal: "#edit-modal" },
    { trigger: "#delete-course", modal: "#delete-modal" },
];
const modals = [];
function showModal(modal) {
    modal.classList.add("visible");
}
function hideModal(modal) {
    modal.classList.remove("visible");
}
modalPairs.forEach(({ trigger, modal }) => {
    const btn = $.querySelector(trigger);
    const modalEl = $.querySelector(modal);
    if (!btn || !modalEl)
        return;
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
function getInput(id) {
    const el = document.getElementById(id);
    if (!(el instanceof HTMLInputElement)) {
        throw new Error(`${id} is not an input`);
    }
    return el;
}
document
    .querySelectorAll(".courses-btn-edit")
    .forEach((btn) => {
    btn.addEventListener("click", () => {
        var _a;
        const { id, title, price, teacher } = btn.dataset;
        getInput("edit-title").value = title !== null && title !== void 0 ? title : "";
        getInput("edit-price").value = price !== null && price !== void 0 ? price : "";
        getInput("edit-teacher").value = teacher !== null && teacher !== void 0 ? teacher : "";
        const form = document.getElementById("edit-course-form");
        form === null || form === void 0 ? void 0 : form.setAttribute("action", `/courses/${id}/edit`);
        (_a = document.getElementById("edit-modal")) === null || _a === void 0 ? void 0 : _a.classList.add("visible");
    });
});
/**
 * ! DELETE FORM
 */
document
    .querySelectorAll(".courses-btn-delete")
    .forEach((btn) => {
    btn.addEventListener("click", () => {
        var _a;
        const id = btn.dataset.id;
        const form = document.getElementById("delete-course-form");
        form === null || form === void 0 ? void 0 : form.setAttribute("action", `/courses/${id}/delete`);
        (_a = document.getElementById("delete-modal")) === null || _a === void 0 ? void 0 : _a.classList.add("visible");
    });
});
document.addEventListener("DOMContentLoaded", () => {
    var _a;
    const flash = document.getElementById("flash-data");
    if (!flash)
        return;
    const type = (_a = flash.dataset.type) !== null && _a !== void 0 ? _a : "success";
    const message = flash.dataset.message;
    if (!message)
        return;
    showToast(message, type);
});
function showToast(message, type = "success") {
    const toast = document.createElement("div");
    toast.classList.add("toast", `toast-${type}`);
    toast.innerText = message;
    document.body.appendChild(toast);
    // animation in
    setTimeout(() => {
        toast.classList.add("show");
    }, 50);
    // animation out
    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}
