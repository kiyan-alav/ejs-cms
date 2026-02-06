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
