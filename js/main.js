
let table = document.getElementById('table')
let adData = (data, tr) => tr.appendChild(document.createElement('th')).innerText = data;
let adTag = (data, tr) => tr.appendChild(document.createElement('th')).innerHTML = data;
let tr = table.appendChild(document.createElement('tr'));
adTag('<div id = "name"> Name</div>', tr)
adTag('<div id = "user-name"> User-name</div>', tr)
adTag('<div id = "email"> Email</div>', tr)
adTag('<div id = "web-site"> Web-site</div>', tr)
fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(res => res.map(res => {

        let tr = table.appendChild(document.createElement('tr'))
        let e = tr.appendChild(document.createElement('th'))
        e.innerText = res.name

        adData(res.username, tr);
        adData(res.email, tr);
        adData(res.website, tr);
        adTag('<button  onclick = "deleteUser()">Delete</button>', tr);
        e.onclick = function getFiniteValue() {
            console.log();
            let wrapperDiv = document.body.appendChild(document.createElement('div'));
            wrapperDiv.className = 'add-wrapper'
            let closeWrapper = wrapperDiv.appendChild(document.createElement('img'))
            closeWrapper.className = 'close'
            closeWrapper.onclick = () => wrapperDiv.remove();
            var handledFlag = 'temp__isAlreadyHandled__';

            getProp(res);

            function getProp(res, stack) {
                var propertyPath;

                for (var prop in res) {
                    if (typeof (res[prop]) === 'object') {
                        if (!res[prop][handledFlag]) {
                            Object.defineProperty(res[prop], handledFlag, {
                                value: true,
                                writable: false,
                                configurable: true
                            });

                            if (!stack)
                                propertyPath = 'rootObject.' + prop
                            else
                                propertyPath = stack + '.' + prop;
                            getProp(res[prop], propertyPath);
                        } else {
                            propertyPath = stack + '.' + prop;

                        }
                        delete res[prop][handledFlag]
                    } else {
                        let div = wrapperDiv.appendChild(document.createElement('div'))
                        div.className = 'add-info'
                        div.appendChild(document.createElement('span')).innerText = prop + ':';
                        div.appendChild(document.createElement('span')).innerText = res[prop];
                    }
                }
            }
        }


    }
    ))



let name = document.getElementById('name');
let username = document.getElementById('user-name');
let email = document.getElementById('email');
let webSite = document.getElementById('web-site');

let but6 = document.body.appendChild(document.createElement('button'))
but6.className = 'newUser'
but6.innerText = 'Add new user'

name.onclick = () => {
    let sortedRows = Array.from(table.rows)


        .sort((rowA, rowB) => rowA.cells[0].innerHTML > rowB.cells[0].innerHTML ? 1 : -1);
    console.log('sortedRows: ', sortedRows);
    table.append(...sortedRows);
}

username.onclick = () => {
    let sortedRows = Array.from(table.rows)

        .sort((rowA, rowB) => rowA.cells[1].innerHTML > rowB.cells[1].innerHTML ? 1 : -1);

    table.append(...sortedRows);
}

email.onclick = () => {
    let sortedRows = Array.from(table.rows)

        .sort((rowA, rowB) => rowA.cells[2].innerHTML > rowB.cells[2].innerHTML ? 1 : -1);

    table.append(...sortedRows);
}

webSite.onclick = () => {
    let sortedRows = Array.from(table.rows)

        .sort((rowA, rowB) => rowA.cells[3].innerHTML > rowB.cells[3].innerHTML ? 1 : -1);

    table.append(...sortedRows);
}
function deleteUser(e) {
    ((event.target).parentNode.parentNode).remove();
}

but6.onclick = () => {
    document.getElementById('create-user').style.display = 'flex'
}
document.getElementById('add-new-user').onclick = () => {
    
    event.preventDefault()
    let tr = table.appendChild(document.createElement('tr'))
    adData(document.getElementById('new-name').value, tr)
    adData(document.getElementById('new-user-name').value, tr)
    adData(document.getElementById('new-email').value, tr)
    adData(document.getElementById('new-web-site').value, tr)
    adTag('<button  onclick = "deleteUser()">Delete</button>', tr);
    function clearData(id) {
        document.getElementById(id).value = '';
    }
    document.getElementById('create-user').style.display = 'none';

    clearData('new-name');
    clearData('new-user-name');
    clearData('new-email');
    clearData('new-web-site');
}
document.getElementById('close').onclick = () => {
    event.preventDefault()
    document.getElementById('create-user').style.display = 'none';

    clearData('new-name');
    clearData('new-user-name');
    clearData('new-email');
    clearData('new-web-site');
}




