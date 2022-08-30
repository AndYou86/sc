class nod {

    constructor(data) {
        this.data = data;
        this.render();
    }

    render() {

        let self = this,
            userNode = document.createElement('div'),
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

        nameNode.innerHTML = self.data.name + ' ' + self.data.surname;
        nickNode.innerHTML = self.data.nick;
        nickNameNode.append(nickNode, nameNode);
        settingNode.innerHTML = '...';
        groupNode.innerHTML = 'Default group';
        groupSettingNode.append(settingNode, groupNode);
        userNode.append(nickNameNode, groupSettingNode);

        return userNode;
    }
}