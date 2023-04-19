const APIURL = "https://api.github.com/users/";

const box = document.getElementById("box");
const searchBox = document.querySelector('#search');


const getUser = async (username) => {
  const response = await fetch(APIURL + username);
  const data = await response.json();
  console.log(data);
  const card = `
    <div class="main">
      <div>
        <img src="${data.avatar_url}" alt="Profile Pic" id="avatar"/>
      </div>
      <div class="userData">
        <h2 id="userName">${data.name}</h2>
        <p id="bio">${data.bio}</p>

        <ul class="info">
         <li> ${data.followers} <strong>Followers</strong></li>
         <li> ${data.following} <strong>Following</strong></li>
         <li>${data.public_repos} <strong>Repos</strong></li>
        </ul>

        <div class="repo-box" id="repos">
      
        </div>
      </div>
   </div>
    `;
  box.innerHTML = card;
  getRepos(username);
};

getUser("abhinav2-3");

const getRepos = async(username) =>{
    const response = await fetch(APIURL+username+"/repos");
    const data = await response.json();
    const repo_box = document.querySelector('.repo-box');
    data.forEach((item) => {
        const elem = document.createElement("a");
        elem.classList.add("repo");
        elem.href= item.html_url;
        elem.target = "_blank";
        elem.innerText = item.name;
        repo_box.appendChild(elem)
    });
}

const formSubmit = () =>{
    if(searchBox.value != ""){
        getUser(searchBox.value);
        searchBox.value = "";
    }
    return false;
}

searchBox.addEventListener("focusout",()=>{
    formSubmit();
})
/*
    <a href="#" class="repo" target="_blank">Repo 1</a>
    <a href="#" class="repo" target="_blank">Repo 2</a>
    <a href="#" class="repo" target="_blank">Repo 3</a>
*/