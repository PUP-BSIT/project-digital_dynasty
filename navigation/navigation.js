document.addEventListener('DOMContentLoaded', () => {
    const burger = document.getElementById('burger');
    const sidebar = document.getElementById('sidebar');
    const content = document.getElementById('content');

    burger.addEventListener('click', () => {
        sidebar.classList.toggle('active');
        content.classList.toggle('shift');
    });
});
