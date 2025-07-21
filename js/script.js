
document.addEventListener("DOMContentLoaded", function () {
    function openCollapseFromHash() {
        const hash = window.location.hash;
        if (hash) {
            const button = document.querySelector(`button${hash}`);
            if (button && button.classList.contains('categoriaBoton')) {
                const collapseTarget = button.getAttribute('data-bs-target');
                if (collapseTarget) {
                    const collapseElement = document.querySelector(collapseTarget);
                    const bsCollapse = new bootstrap.Collapse(collapseElement, {
                        toggle: false
                    });
                    bsCollapse.show();
                }
            }
        }
    }
    openCollapseFromHash();
    window.addEventListener("hashchange", openCollapseFromHash);
});
