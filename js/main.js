const nav = document.querySelectorAll('.nav-list li');
const cube = document.querySelector('.box');
const section = document.querySelectorAll('.section');



const resumeLists = document.querySelectorAll('.resume-list');
const resumeBox = document.querySelectorAll('.resume-box');
const portfolioLists = document.querySelectorAll('.portfolio-list');
const portfolioLBox = document.querySelectorAll('.portfolio-box');



// navbar action and all section rotating when click navbar

nav.forEach((nav,idx)=>{
    nav.addEventListener('click' , ()=>{
        document.querySelector('.nav-list li.active').classList.remove('active')
        nav.classList.add('active');

        cube.style.transform = `rotateY(${idx * -90}deg)`;

        document.querySelector('.section.active').classList.remove('active')
        section[idx].classList.add('active');

        const array = Array.from(section);
        const arrSecs = array.slice(1, -1);
        arrSecs.forEach(arrSecs =>{
            if(arrSecs.classList.contains('active')){
                section[4].classList.add('action-contact');
                
            }
        });
        if(section[0].classList.contains('active')){
            section[4].classList.remove('action-contact')

        }
        
    })
})


// resume section when clicking tab-list

resumeLists.forEach((list,idx)=>{
    list.addEventListener('click' , ()=>{
        document.querySelector('.resume-list.active').classList.remove('active')
        list.classList.add('active');

        document.querySelector('.resume-box.active').classList.remove('active')
        resumeBox[idx].classList.add('active');
    })
})


// portfolio section wen clicking tab-list

portfolioLists.forEach((list,idx)=>{
    list.addEventListener('click' , ()=>{
        document.querySelector('.portfolio-list.active').classList.remove('active')
        list.classList.add('active');

        document.querySelector('.portfolio-box.active').classList.remove('active')
        portfolioLBox[idx].classList.add('active');

    })
})


// visibility  for contact action when reloading 

setTimeout(()=>{
    section[4].classList.remove('active')
}, 1500);