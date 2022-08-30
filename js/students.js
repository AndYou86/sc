class students {

    constructor(parent, currentPage = 0) {
        this.node = parent;
        this.currentPage = currentPage;
        this.render();
    }

    render() {
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
                self.node.innerHTML = '';
                data.students.forEach(student => {
                    let userNode = document.createElement('div'),
                        nickNameNode = document.createElement('div'),
                        nameNode = document.createElement('div'),
                        nickNode = document.createElement('div'),
                        groupSettingNode = document.createElement('div'),
                        settingNode = document.createElement('div'),
                        groupNode = document.createElement('div');

                    userNode.classList.add('user');
                    nickNameNode.classList.add('nick-name');
                    nameNode.classList.add('name');
                    nickNode.classList.add('nick');
                    groupSettingNode.classList.add('group-setting');
                    settingNode.classList.add('setting');
                    groupNode.classList.add('group');

                    nameNode.innerHTML = student.name + ' ' + student.surname;
                    nickNode.innerHTML = student.nick;
                    nickNameNode.append(nickNode, nameNode);
                    settingNode.innerHTML = '...';
                    groupNode.innerHTML = 'Default group';
                    groupSettingNode.append(settingNode, groupNode);
                    userNode.append(nickNameNode, groupSettingNode);
                    self.node.append(userNode);
                });

            });
    }
}