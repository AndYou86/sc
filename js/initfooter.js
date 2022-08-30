let table = document.querySelector('.users'),
    pagin = document.querySelector('.pagin'),
    student = new students(table),
    paginat = new pagination(pagin);
window.onpopstate = history.onpushstate = function(e) {
    let result = location.hash.match(/#(\d+)#/);
    new students(table, result[1]);
};