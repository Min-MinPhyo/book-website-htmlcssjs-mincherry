searchForm = document.querySelector('.search-form');

document.querySelector('#search-btn').onclick = () =>{
  searchForm.classList.toggle('active');
}

let loginForm = document.querySelector('.login-form-container');

document.querySelector('#login-btn').onclick = () =>{
  loginForm.classList.toggle('active');
}

document.querySelector('#close-login-btn').onclick = () =>{
  loginForm.classList.remove('active');
}

window.onscroll = () =>{

  searchForm.classList.remove('active');

  if(window.scrollY > 80){
    document.querySelector('.header .header-2').classList.add('active');
  }else{
    document.querySelector('.header .header-2').classList.remove('active');
  }

}

window.onload = () =>{

  if(window.scrollY > 80){
    document.querySelector('.header .header-2').classList.add('active');
  }else{
    document.querySelector('.header .header-2').classList.remove('active');
  }

  fadeOut();

}

function loader(){
  document.querySelector('.loader-container').classList.add('active');
}

function fadeOut(){
  setTimeout(loader, 4000);
}

var swiper = new Swiper(".books-slider", {
  loop:true,
  centeredSlides: true,
  autoplay: {
    delay: 9500,
    disableOnInteraction: false,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

var swiper = new Swiper(".featured-slider", {
  spaceBetween: 10,
  loop:true,
  centeredSlides: true,
  autoplay: {
    delay: 9500,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    450: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    },
    1024: {
      slidesPerView: 4,
    },
  },
});

var swiper = new Swiper(".arrivals-slider", {
  spaceBetween: 10,
  loop:true,
  centeredSlides: true,
  autoplay: {
    delay: 9500,
    disableOnInteraction: false,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

var swiper = new Swiper(".reviews-slider", {
  spaceBetween: 10,
  grabCursor:true,
  loop:true,
  centeredSlides: true,
  autoplay: {
    delay: 9500,
    disableOnInteraction: false,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

var swiper = new Swiper(".blogs-slider", {
  spaceBetween: 10,
  grabCursor:true,
  loop:true,
  centeredSlides: true,
  autoplay: {
    delay: 9500,
    disableOnInteraction: false,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});
/*This section for menu */
$(document).ready(function () {
  $(".home").click(function () {
      $("#starBtn").show();
      $(".table").hide();
      $("#dict").hide();
      $("#reviews").hide();
      $("#contact").hide();
      $("#video").hide();
 });
 $(".leacture").click(function () {
      $("#starBtn").hide();
      $("#dict").hide();
      $(".table").show();
      $("#reviews").hide();
      $("#contact").hide();
      $("#video").hide();

 });
 $(".dict").click(function () {
  $("#starBtn").hide();
  $("#dict").show();
  $(".table").hide();
  $("#reviews").hide();
  $("#contact").hide();
  $("#video").hide();
});
$(".reviews").click(function () {
  $("#starBtn").hide();
  $("#dict").hide();
  $(".table").hide();
  $("#reviews").show();
  $("#contact").hide();
  $("#video").hide();
});
$(".contact").click(function () {
  $("#contact").show();
  $("#starBtn").hide();
  $("#dict").hide();
  $(".table").hide();
  $("#reviews").hide();
  $("#video").hide();
  
});
$(".video").click(function () {
  $("#video").show();
  $("#contact").hide();
  $("#starBtn").hide();
  $("#dict").hide();
  $(".table").hide();
  $("#reviews").hide();
 
  
});


});
/* this section for table*/
function openLink(evt, animName) {
  var i, x, tablinks;
  x = document.getElementsByClassName("book");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < x.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" w3-red", "");
  }
  document.getElementById(animName).style.display = "block";
  evt.currentTarget.className += " w3-red";
}
    
/* Dictonary */
const input = document.getElementById('input');
const search_btn = document.getElementById('search_btn');
const apiKey = '0c5a6843-1c09-4215-ad57-fcfc378b2f65';
const not_found = document.querySelector('.not_found');
const defination_box = document.querySelector('.def');
const audio_box = document.querySelector('.audio');


search_btn.addEventListener('click', e => {
    e.preventDefault();

    const word = input.value;
    if (word === "") {
        alert('Please type a word');
        return;
    }

    dataGet(word);

    audio_box.innerHTML = "";
    not_found.innerText = "";
    defination_box.innerText = "";
});

async function dataGet(word) {
    const response = await fetch(`https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${apiKey}`);
    const data = await response.json();
    console.log(data);

    if (!data.length) {
        not_found.innerText = 'No result found';
        return;
    }

    if (typeof data[0] === 'string') { // if result is suggestions
        let heading = document.createElement('h3');
        heading.innerText = 'Did you mean?';
        not_found.appendChild(heading);

        data.forEach(element => {
            let suggestion = document.createElement('span');
            suggestion.classList.add('suggested');
            suggestion.innerText = element;
            not_found.appendChild(suggestion);
        })
        return;
    }

    let defination = data[0].shortdef[0];// find the result
    defination_box.innerText = defination;

    let sound_name = data[0].hwi.prs[0].sound.audio;
    if (sound_name) { // if sound is available
        soundRender(sound_name);
    }
}

function soundRender(sound_name) {
    let sub_folder = sound_name.charAt(0);
    let sound_src = `https://media.merriam-webster.com/soundc11/${sub_folder}/${sound_name}.wav?key=${apiKey}`;

    let aud = document.createElement('audio');
    aud.src = sound_src;
    aud.controls = true;
    audio_box.appendChild(aud)
}
