// menu principal navegacion //
const displayMenu = document.querySelectorAll(".show-display");
const navMenu = document.querySelectorAll(".nav-btn");
navMenu.forEach((menu, index) => {
    menu.addEventListener("click", () => {
        displayMenu.forEach((display) => (display.style.display = "none"));
        navMenu.forEach((border)=>{border.classList.remove('border-bottom')});
        navMenu.forEach((border)=>{border.style.textShadow='none'});
        displayMenu[index].style.display = "block";
        navMenu[index].classList.add('border-bottom');
        navMenu[index].style.textShadow='0 0 25px #ff8c00';
    });
});

// menu navegacion clases //
const years = document.querySelectorAll(".years");
const courses = document.querySelectorAll(".courses");
years.forEach((currentYear, index) => {
    currentYear.addEventListener("click", () => {
        courses.forEach((course) => (course.style.display = "none"));
        years.forEach((yearColor) => (yearColor.style.border = "none"));
        courses[index].style.display = "flex";
        years[index].style.borderBottom = "2px solid gold";
    });
});

// user image ///

// user details change //
const userDetailsChange = document.querySelector('.user-change');
const detailsChangecancel = document.querySelector('.cancel-btn');
const userDetailsContainer = document.querySelector('.user-details-container');
const userDetails = document.querySelector('.user-details');
const userClose = document.querySelector('.user-close');
userClose.addEventListener("click", ()=>{userDetails.style.display = 'none'});
userDetailsChange.addEventListener("click", ()=>{userDetailsContainer.style.transform = 'translateX(-250px)'});
detailsChangecancel.addEventListener("click", (e)=>{
    e.preventDefault();
    userDetailsContainer.style.transform = 'translateX(0)';
});

// register user details //
const registerName = document.querySelector('.register-name');
const registerEmail = document.querySelector('.register-email');
const registerPassword = document.querySelector('.register-password');
const regConPassword = document.querySelector('.register-c-password');
const userRegister = document.querySelector('.register-btn');
const userLogin = document.querySelector('.login-btn');
const userName = document.querySelector('.user-name');
const userEmail = document.querySelector('.user-email');
const userHouse = document.querySelector('.user-house');
const changeBtn = document.querySelector('.change-btn');
const userLogout = document.querySelector('.user-logout');
const userRemove = document.querySelector('.user-remove');
let storedData = [];
let storedDataDeAltered;
let storedDataAltered;
let logOrUser;
userRegister.addEventListener('click', (e) =>{
    e.preventDefault();
    if(registerPassword.value === regConPassword.value){
        storedData.unshift({
            name : registerName.value,
            email : registerEmail.value,
            password : regConPassword.value,
            house:null,
            color:null,
            image:null,
        })
        registerName.value = registerEmail.value = registerPassword.value = regConPassword.value = '';
        loginForm.style.display='none';
        localStorage.setItem('trfa', true);
        storedDataAltered = JSON.stringify(storedData);
        localStorage.setItem('user', storedDataAltered);
        window.location.reload();
    }if(registerPassword.value != regConPassword.value){
        alert('La contraseña no es correcta')
    }
});
let trueFalse = localStorage.trfa;
if(trueFalse == 'true' && localStorage.user){
    storedDataDeAltered = JSON.parse(localStorage.getItem('user'));
    storedData=[...storedDataDeAltered];
    userName.innerText = storedData[0].name;
    userEmail.innerText = storedData[0].email;
    document.querySelector('.change-name').value = storedData[0].name;
    document.querySelector('.chage-email').value = storedData[0].email;
}if(localStorage.user){
    storedDataDeAltered = JSON.parse(localStorage.getItem('user'))
    storedData = [...storedDataDeAltered];
}

// user login///
userLogin.addEventListener('click', (e)=>{
    e.preventDefault();
    if(storedData.length>0){
        Array.prototype.move = function(from,to){
            this.splice(to, 0, this.splice(from, 1)[0]);
        }
        const loginEmail = document.querySelector('.login-email');
        const loginPassword = document.querySelector('.login-password');
        const loginIndex = storedData.findIndex((element)=>{
            return element.email === loginEmail.value && element.password === loginPassword.value;
        })
        localStorage.setItem('trfa', true);
        if(loginIndex > 0){
            storedData.move(loginIndex, 0);
            storedDataAltered = JSON.stringify(storedData);
            localStorage.setItem('user', storedDataAltered);
        }
        window.location.reload();
    }
    if(storedData.length == 0){
        alert('Cuenta no registrada.')
    }
})

// change user details //
const prevPassword = document.querySelector('.previous-password');
let index = storedData.findIndex((element) => {return element.name == userName.innerText});
changeBtn.addEventListener('click', (e) =>{
    e.preventDefault();
    if(storedData[0] && storedData[index].password == prevPassword.value){
        storedData[index].name = document.querySelector('.change-name').value;
        storedData[index].email = document.querySelector('.change-email').value;

        if(document.querySelector('.change-password').value === document.querySelector('.change-c-password').value){
            storedData[index].password = document.querySelector('.change-password').value;
        }else{
            alert('La contraseña no coincide.');
        }
        storedDataAltered = JSON.stringify(storedData);
        localStorage.setItem('user', storedDataAltered);
        storedDataDeAltered = JSON.parse(localStorage.getItem('user'));
        storedData = [...storedDataDeAltered];
        window.location.reload();
        userDetailsContainer.style.transform = 'translateX(0)';
    }else{
        alert('Contraseña incorrecta.');
    }
})

// logout user//
userLogout.addEventListener('click', () =>{
    localStorage.setItem('trfa', false);
    window.location.reload();
})

// remove user
userRemove.addEventListener('click', () =>{
    const removeIndex = storedData.findIndex((element) =>{
        return element.name === userName.innerText && element.email === userEmail.innerText
    })
    storedData.splice(removeIndex,1);
    localStorage.setItem('trfa', false);
    storedDataAltered = JSON.stringify(storedData);
    localStorage.setItem('user', storedDataAltered);
    storedDataDeAltered = JSON.parse(localStorage.getItem('user'));
    storedData = [...storedDataDeAltered];
    window.location.reload();
})

// login register form
const user = document.querySelector('.user');
const formOverlay = document.querySelector('.form-overlay');
const loginForm = document.querySelector('.form-for-login');
const formContainer = document.querySelector('.form-container');
const loginHeading = document.querySelector('.login-heading');
const registerHeading = document.querySelector('.register-heading');
user.addEventListener('click',()=>{
    if(trueFalse=='true'){
      userDetails.style.display='block';
    }else if(trueFalse=='false'||!trueFalse){
      loginForm.style.display='block';
    }
})
formOverlay.addEventListener('click',()=>{loginForm.style.display='none'})
loginHeading.addEventListener('click',()=>{
  formContainer.style.transform='translateX(0)';
  loginHeading.style.borderBottom='2px solid gold';
  registerHeading.style.borderBottom='none';
})
registerHeading.addEventListener('click',()=>{
  formContainer.style.transform='translateX(-350px)';
  loginHeading.style.borderBottom='none';
  registerHeading.style.borderBottom='2px solid gold';
})
// character api calling function
const staff = document.querySelector(".staffs");

const staffsApi = function () {
  fetch(`https://hp-api.onrender.com/api/characters/staff`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      data.forEach(function (charData) {
        const elImg = document.createElement("img");
        elImg.setAttribute("alt", charData.name);
        if (charData.image) {
          elImg.setAttribute("src", charData.image);
        } else if (!charData.image && charData.gender === "male") {
          elImg.setAttribute("src", "img/male1.png");
        } else if (!charData.image && charData.gender === "female") {
          elImg.setAttribute("src", "img/female.png");
        } else {
          elImg.setAttribute("src", "img/unknown.png");
        }
        const cards = document.createElement("div");
        cards.classList.add("cards");
        // name
        const elName = document.createElement("h2");
        elName.innerText = `${charData.name}`;
        // house
        const elSpecies = document.createElement("h3");
        elSpecies.innerText = `${charData.species}`;
        // appending
        document.querySelector(".hogwartsStaff").appendChild(cards);
        cards.appendChild(elImg);
        cards.appendChild(elName);
        cards.appendChild(elSpecies);
      });
    });
};

// houses api calling
const houseCards = document.querySelector(".houses-in-hogwarts");
// const houseImages = ['img/griffindor.png','img/ravenclaw.png','img/hufflepuff.png','img/slytherin.png']
// const housesApi = function () {
//   fetch("https://wizard-world-api.herokuapp.com/houses")
//     .then((res) => {
//       return res.json();
//     })
//     .then((data) => {
//       // console.log(data);
//       data.forEach((el,index) => {
//         // traits.forEach((data,index)=>{headsData=data[index].traits[index]});
//         const houseCards = document.createElement('div');
//         houseCards.classList.add('house-cards');
//         const htmlHouses = `<div class= "img"><img src="${houseImages[index]}" alt="houses"></div><div class = "house-details"><div class="details">Name :<span>${el.name}</span></div><div class= "details">Founder :<span>${el.founder}</span></div><div class="details">Animal :<span>${el.animal}</span></div><div class="details">Element :<span>${el.element}</span></div><div class="details">Ghost :<span>${el.ghost}</span></div><div class="details">Common Room :<span>${el.commonRoom}</span></div><div class="details">House Colours :<span>${el.houseColours}</span></div></div>`;
//         document.querySelector('.house-container').appendChild(houseCards);
//         houseCards.innerHTML = htmlHouses;
//       });
//     });
// };

// all characters in hogwarts 
const allCharacters = document.querySelector('.characters');
let charNames = '';
const allHogwartsCharecters = document.querySelector(".characters-inhogwarts");
const allHogwartsTypes = document.querySelector(".types-inhogwarts");
const charactersAll = function(){
  fetch(`https://hp-api.herokuapp.com/api/characters`)
  .then(res=> {return res.json()})
  .then(data=>{
    data.forEach(function (charData) {
      const elImg = document.createElement("img");
      elImg.setAttribute("alt", charData.name);
      if (charData.image) {
        elImg.setAttribute("src", charData.image);
      } else if (!charData.image && charData.gender === "male") {
        elImg.setAttribute("src", "img/male1.png");
      } else if (!charData.image && charData.gender === "female") {
        elImg.setAttribute("src", "img/female.png");
      }
      const cards = document.createElement("div");
      cards.classList.add("cards");
      // name
      const elName = document.createElement("h2");
      elName.innerText = `${charData.name}`;
      // house
      const elSpecies = document.createElement("h3");
      elSpecies.innerText = `${charData.species}`;
      // appending
      allHogwartsCharecters.appendChild(cards);
      cards.appendChild(elImg);
      cards.appendChild(elName);
      cards.appendChild(elSpecies);
    });
  // charNames = data.map(data =>{return data.name})
  // charNames.forEach(names=>{
  //   const nameSpan = document.createElement('span')
  //   const body = document.querySelector('body');
  //   nameSpan.innerText=names;
  //   body.appendChild(nameSpan)
  // })
  })
}

// type of characters in hogwarts
const charactersTypes = function(types){
  fetch(`https://hp-api.onrender.com/api/charactershouse/:house${types}`)
  .then(res=> {return res.json()})
  .then(data=>{
    data.forEach(function (charData) {
      const elImg = document.createElement("img");
      elImg.setAttribute("alt", charData.name);
      if (charData.image) {
        elImg.setAttribute("src", charData.image);
      } else if (!charData.image && charData.gender === "male") {
        elImg.setAttribute("src", "img/male1.png");
      } else if (!charData.image && charData.gender === "female") {
        elImg.setAttribute("src", "img/female.png");
      }
      const cards = document.createElement("div");
      cards.classList.add("cards");
      // name
      const elName = document.createElement("h2");
      elName.innerText = `${charData.name}`;
      // house
      const elSpecies = document.createElement("h3");
      elSpecies.innerText = `${charData.species}`;
      // appending
      allHogwartsTypes.appendChild(cards);
      cards.appendChild(elImg);
      cards.appendChild(elName);
      cards.appendChild(elSpecies);
    });
  })
}
// click function for staffs api call /////////////////
staff.addEventListener("click", staffsApi());

// click function for houses api call//////////////////
// houseCards.addEventListener("click", housesApi());

// click function for characters api call ////////////
const charTypes = document.getElementById('char-type');
allCharacters.addEventListener('click', charactersAll())
charTypes.addEventListener('change',function(){
  if(charTypes.value == 'all'){
    allHogwartsCharecters.style.display = 'flex';
    allHogwartsTypes.style.display = 'none';
    allHogwartsTypes.innerHTML = '';
    charactersAll()
  }else if (charTypes.value != 'all'){
    allHogwartsCharecters.style.display = 'none';
    allHogwartsTypes.style.display = 'flex';
    allHogwartsTypes.innerHTML = '';
    charactersTypes(charTypes.value);
  }
})

const sortBtn = document.querySelector('.sort-btn');
const sortQuiz = document.querySelector('.sorting');
const userSorting = document.querySelector('.user-sorting');
// sorting function /////////////////////////
const closeQuiz = document.querySelectorAll('.close-quiz')
sortBtn.addEventListener('click',()=>{
  if(trueFalse=='true'){
    sortQuiz.style.display='block';
    document.querySelector('.houses-in-hogwarts').style.overflow = 'hidden';
  }if(trueFalse=='false'||!trueFalse){
    loginForm.style.display='block';
  }
});
userSorting.addEventListener('click',()=>{houseCards.style.display='block'});
// close quiz function 
closeQuiz.forEach(close=>{
  close.addEventListener('click',function(){
    sortQuiz.style.display='none';
    document.querySelector('.houses-in-hogwarts').style.overflowY = 'scroll';
  })
})

// const quizValue = document.querySelectorAll('.quiz-input');
const quizValue = document.querySelectorAll('.quiz-input')
const sortSubmit = document.querySelector('.sort-submit');
let values=[];
let newValue;
let houseReveal;
let color;
sortSubmit.addEventListener('click',function(){
  quizValue.forEach((input)=>{
    if(input.checked){
      values.push(Number(input.value))
    }
  })
  newValue = values.reduce((prev,curr)=>{ return prev+curr },0)
  const length = newValue.length<8;
  if(newValue>=100 && newValue<=170 && !length){
    houseReveal = 'hufflepuff';
    color = 'yellow'
  }if(newValue>170 && newValue<=250 && !length){
    houseReveal = 'ravenclaw'
    color= 'blue'
  }if(newValue>250 && newValue<=330 && !length){
    houseReveal = 'gryffindor'
    color = 'red'
  }if(newValue>330 && newValue<=400 && !length){
    houseReveal = 'slytherin'
    color = 'green';
  }
  houseRevealFunction(houseReveal,color);
})

const selectedHouse = document.createElement('div')
const userBox = document.querySelector('.user-box');
const houseRevealFunction = (house,color)=>{
  if(house){
    storedData[0].house = house;
    storedData[0].color = color;
    storedDataAltered = JSON.stringify(storedData);
    localStorage.setItem('user',storedDataAltered);
    window.location.reload();
  }else if(!house){
    sortQuiz.style.display='flex';
    alert('answer all the quiestions')
  }
}
if(trueFalse=='true' && localStorage.user && storedData[0].house){
  selectedHouse.classList.add('selected-house');
  const houseName = document.createElement('h1');
  houseName.classList.add('house-name');
  houseName.style.color = storedData[0].color;
  houseName.innerText=storedData[0].house;
  userHouse.innerHTML=storedData[0].house;
  userHouse.style.color = storedData[0].color;
  selectedHouse.style.backgroundImage =`linear-gradient(rgba(0, 0, 0, 0.7),rgba(0, 0, 0, 0.7)),url(img/${storedData[0].house}bg.jfif)`
  houseCards.appendChild(selectedHouse);
  selectedHouse.appendChild(houseName);
  sortQuiz.style.display='none';
}

// profile picture 
document.getElementById('upload-img').addEventListener('change',function(){
  const reader = new FileReader();
  reader.addEventListener('load',()=>{
    storedData[0].image = reader.result
    storedDataAltered = JSON.stringify(storedData);
    localStorage.setItem('user',storedDataAltered);
  })
  reader.readAsDataURL(this.files[0]);
  window.location.reload();
})
if(trueFalse=='true'&&storedData[0].image){
  document.getElementById('profile-pic').setAttribute('src', storedData[0].image);
  document.getElementById('logo').setAttribute('src', storedData[0].image);
  document.getElementById('profile-pic').style.display = 'block';
}