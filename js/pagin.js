let params = window
    .location
    .search
    .replace('?', '')
    .split('&')
    .reduce(
        function(p, e) {
            var a = e.split('=');
            p[decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
            return p;
        }, {}
    );

const table = document.querySelector('.users'),

    limit = 5,

    empty = function() {
        table.innerHTML = '<p style="text-align: center;">no students</p>';
        pagin.innerHTML = '';
    },

    render = function(data) {

        let html = '';
        data.forEach(student => {
            html += '<div class="user"><div class="nick-name"><div class="nick">' + student.nick + '</div>';
            html += '<div class="name">' + student.name + ' ' + student.surname + '</div></div><div class="group-setting"><div class="setting">...</div><div class="group">Default group</div></div></div>';
        });

        table.innerHTML = html;
    },

    pagin = function(current, data) {
        let container = document.querySelector('.pagin');
        if (data.count > limit) {
            container.style.display = 'flex';
        }

        const prevButton = document.getElementById('button_prev');
        const nextButton = document.getElementById('button_next');
        let current_page = (params['p']) ? params['p'] : 1;

        let addEventListeners = function() {
            prevButton.addEventListener('click', prevPage);
            nextButton.addEventListener('click', nextPage);
        }

        let selectedPage = function() {
            let page_number = document.getElementById('page_number').getElementsByClassName('clickPageNumber');
            for (let i = 0; i < page_number.length; i++) {
                if (i == current_page - 1) {
                    page_number[i].classList.add('active');
                } else {
                    page_number[i].classList.remove('active');
                }
            }
        }

        let checkButtonOpacity = function() {
            current_page == 1 ? prevButton.style.display = 'none' : prevButton.style.display = 'block';
            current_page == numPages() ? nextButton.style.display = 'none' : nextButton.style.display = 'block';
        }

        let changePage = function(page) {
            render(data.students);
            checkButtonOpacity();
            selectedPage();
        }

        let prevPage = function() {
            if (current_page > 1) {
                current_page--;
                location.search = 'p=' + current_page;
                changePage(current_page);
            }
        }

        let nextPage = function() {
            if (current_page < numPages()) {
                current_page++;
                location.search = 'p=' + current_page;

                changePage(current_page);
            }
        }

        let clickPage = function() {
            document.addEventListener('click', function(e) {
                if (e.target.nodeName == "SPAN" && e.target.classList.contains("clickPageNumber")) {
                    current_page = e.target.textContent;
                    location.search = 'p=' + current_page;
                    changePage(current_page);
                }
            });
        }

        let pageNumbers = function() {
            let pageNumber = document.getElementById('page_number');
            pageNumber.innerHTML = "";

            for (let i = 1; i < numPages() + 1; i++) {
                pageNumber.innerHTML += "<span class='clickPageNumber'>" + i + "</span>";
            }
        }

        let numPages = function() {
            return Math.ceil(data.count / limit);
        }

        changePage(current_page);
        pageNumbers();
        selectedPage();
        clickPage();
        addEventListeners();
    },

    req = function(offset) {
        fetch('api/users?' + new URLSearchParams({
                p: offset
            }), {
                method: 'GET',

                header: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            }).then((response) => response.json())
            .then((data) => {
                if (data.count == 0) {
                    empty();
                } else {
                    pagin(offset, data);
                }

            }).catch((data) => {
                console.error(data.message);
            });
    };

req((params['p'] == 1) ? 0 : params['p']);