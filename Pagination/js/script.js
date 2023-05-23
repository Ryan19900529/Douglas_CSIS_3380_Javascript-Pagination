//**---------fetch data from json---------------- */
fetch('../database.json')
.then((response) => response.json())
.then((obj) => {
  const objs = document.querySelector('.contact-list');
  let userCounter = 0;
  objs.innerHTML = '';

  obj.forEach(element => {
    const listItem = document.createElement('li');
    const name = element.name;
    const joined = element.joined;
    const email = element.email;
    const img = document.createElement('img');
    img.src = element.image;

    listItem.classList.add('contact-item', 'cf');
    listItem.innerHTML = 
      `
        <div class="contact-details">
          <img class="avatar" src=${img.src}>
          <h3>${name}</h3>
          <span class="email">${email}</span>
        </div>
        <div class="joined-details">
          <span class="date">Joined ${joined}</span>
        </div>
      `
    objs.append(listItem);
    userCounter++;
  });

  const totalUser = document.querySelector('h3');
  totalUser.innerText = `Total: ${userCounter}`; 
  
  /**--------pagination code------------ */
  const usersPerPage = 10;
  const paginationSection = document.querySelector('.pagination');
  const totalPages = Math.ceil(obj.length/usersPerPage);
  let currentPage = 1;

  for (let i = 1; i <= totalPages; i++){
    const pageLink = document.createElement('a');
    pageLink.href = '#';
    pageLink.innerHTML = i;

    pageLink.addEventListener('click', () => {
      currentPage = i;
      displayUsers(currentPage);
    });
    paginationSection.appendChild(pageLink);
  }

  const displayUsers = (page) => {
    const startIndex = (page - 1) * usersPerPage;
    const endIndex = startIndex + usersPerPage;
    const items = document.querySelectorAll('.contact-item');
    for (let i = 0; i < items.length; i++){
      if(i >= startIndex && i< endIndex){
        items[i].classList.add('active');
      } else {
        items[i].classList.remove('active');
      }
    }
  };

  displayUsers(currentPage);
  
}).catch(function(error){
  console.error("Something went wrong!");
  console.error(error);
});

