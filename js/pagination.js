class pagination {

    limit = 5;
    prevButton = document.createElement('span');
    nextButton = document.createElement('span');
    pageNumber = document.createElement('span');
    currentPage = 1;

    constructor(parent) {


        this.node = parent;

        this.count();
    }



    count() {
        let self = this;
        fetch('api/users?' + new URLSearchParams({
                p: self.currentPage
            }), {
                method: 'GET',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                redirect: 'follow',
                referrerPolicy: 'no-referrer'
            }).then(function(response) {
                return response.json();
            })
            .then(function(data) {
                self.render(data.count);
            });

    };


    render(count) {

        let self = this,
            countP = Math.ceil(count / self.limit);
        /*  if (countP == 1) {
             return;
         } */

        self.node.style.display = 'flex';
        self.clickHandler(countP);
        self.prevButton.classList.add('button_prev');
        self.prevButton.innerHTML = "&laquo; Prev";
        self.nextButton.classList.add('button_next');
        self.nextButton.innerHTML = "Next &raquo;";
        self.node.append(self.prevButton);
        self.node.append(self.pageNumbers(countP));
        self.node.append(self.nextButton);
        self.selectedPage();
        self.clickPage(countP);
        self.checkButtonShow(countP);
    }

    pageNumbers(count) {
        let self = this;
        let pageNumber = self.pageNumber,
            numPages = count;
        pageNumber.classList.add('page_number');
        pageNumber.innerHTML = "";

        for (let i = 1; i < numPages + 1; i++) {
            pageNumber.innerHTML += "<span class='clickPageNumber'>" + i + "</span>";
        }
        return pageNumber;
    }

    selectedPage() {
        let self = this;
        let pageNumber = self.pageNumber.getElementsByClassName('clickPageNumber');
        for (let i = 0; i < pageNumber.length; i++) {
            if (i == self.currentPage - 1) {
                pageNumber[i].classList.add('active');
            } else {
                pageNumber[i].classList.remove('active');
            }
        }
    }

    checkButtonShow(count) {
        let self = this;
        console.log();
        self.currentPage == 1 ? self.prevButton.style.display = 'none' : self.prevButton.style.display = 'block';
        self.currentPage == count ? self.nextButton.style.display = 'none' : self.nextButton.style.display = 'block';
    }

    clickPage(count) {
        let self = this;

        self.node.addEventListener('click', function(e) {
            if (e.target.nodeName == "SPAN" && e.target.classList.contains("clickPageNumber")) {
                self.currentPage = e.target.textContent;

            }
            if (e.target.nodeName == "SPAN" && e.target.classList.contains("button_prev")) {
                self.currentPage--;

            }
            if (e.target.nodeName == "SPAN" && e.target.classList.contains("button_next")) {
                self.currentPage++;

            }
            self.clickHandler(count);
        });
    }


    clickHandler(count) {
        let self = this;
        const state = { 'page_id': self.currentPage, 'user_id': localStorage.getItem("myId") };
        const title = document.title + 'page ' + self.currentPage;
        const url = self.currentPage;
        //history.pushState(state, title, url);
        location.hash = url + "#";
        this.selectedPage();
        this.checkButtonShow(count);
    }

    params() {
        window
            .location
            .search
            .replace('?', '')
            .split('&')
            .reduce(
                function(p, e) {
                    var a = e.split('=');
                    p[decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
                    this.currentPage = p;
                }, {}
            );
    }
}