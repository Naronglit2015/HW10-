const userList = document.querySelector('.user-list');
const postInfo = document.querySelector('.post-info');

function createHTMLElement(tag, attributes, content) {
    const element = document.createElement(tag);

    if (attributes) {
        Object.keys(attributes).forEach(key => {
            element.setAttribute(key, attributes[key]);
        });
    }

    if (content) {
        element.textContent = content;
    }

    return element;
}

fetch('https://jsonplaceholder.typicode.com/users')
    .then(resp => resp.json())
    .then(data => {
        data.forEach(user => {
            const listItem = createHTMLElement('li', { 'user-id': user.id }, `Name: ${user.name} / Email: ${user.email}`);
            userList.appendChild(listItem);
        });
    })
    .then(() => {
        document.querySelector('.user-list').addEventListener('click', function (event) {
            const userId = event.target.getAttribute('user-id');

            if (userId) {
                fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
                    .then(resp => resp.json())
                    .then(posts => {
                        postInfo.innerHTML = '';
                        posts.forEach(post => {
                            const postItem = createHTMLElement('div', { class: 'post-item' });
                            const title = createHTMLElement('h2', {}, post.title);
                            const body = createHTMLElement('p', {}, post.body);

                            postItem.appendChild(title);
                            postItem.appendChild(body);
                            postInfo.appendChild(postItem);
                        });
                    });
            }
        });
    });
