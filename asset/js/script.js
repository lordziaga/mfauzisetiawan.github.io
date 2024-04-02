'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });




// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
// const filterItems = document.querySelectorAll("[data-filter-item]");

// const filterFunc = function (selectedValue) {

//   for (let i = 0; i < filterItems.length; i++) {

//     if (selectedValue === "all") {
//       filterItems[i].classList.add("active");
//     } else if (selectedValue === filterItems[i].dataset.category) {
//       filterItems[i].classList.add("active");
//     } else {
//       filterItems[i].classList.remove("active");
//     }

//   }

// }

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}


// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}

// document.addEventListener('DOMContentLoaded', function () {
//   // Mendapatkan semua tombol filter
//   const filterButtons = document.querySelectorAll('[data-filter-btn]');
//   const projects = document.querySelectorAll('.project-item');

//   // Fungsi untuk filter proyek berdasarkan kategori
//   function filterProjects(category) {
//     projects.forEach(project => {
//       if (category === 'All' || project.dataset.category.toLowerCase() === category.toLowerCase()) {
//         project.style.display = ''; // Tampilkan proyek
//       } else {
//         project.style.display = 'none'; // Sembunyikan proyek yang tidak sesuai
//       }
//     });
//   }

//   // Event listener untuk tombol filter
//   filterButtons.forEach(button => {
//     button.addEventListener('click', function () {
//       const category = this.textContent.trim(); // Mendapatkan teks kategori dan membersihkan spasi ekstra
//       filterProjects(category);

//       // Mengatur kelas 'active' untuk tombol filter yang aktif
//       filterButtons.forEach(btn => btn.classList.remove('active'));
//       this.classList.add('active');
//     });
//   });

//   // Event listener untuk item dropdown filter
//   const filterSelectItems = document.querySelectorAll('[data-select-item]');
//   filterSelectItems.forEach(item => {
//     item.addEventListener('click', function () {
//       const category = this.textContent.trim(); // Mendapatkan teks kategori dan membersihkan spasi ekstra
//       filterProjects(category);

//       // Mengatur teks kategori yang dipilih pada dropdown
//       const selectValue = document.querySelector('[data-select-value]');
//       selectValue.textContent = category;

//       // Event listener untuk tombol dropdown
//       selectButton.addEventListener('click', function () {
//         const selectList = document.querySelector('.select-list');
//         selectList.style.display = selectList.style.display === 'none' ? 'block' : 'none';
//       });

//       // Menutup dropdown setelah memilih(opsional)
//       const selectList = document.querySelector('.select-list');
//       selectList.style.display = 'none';
//     });
//   });
// });

document.addEventListener('DOMContentLoaded', function () {
  const filterButtons = document.querySelectorAll('[data-filter-btn]');
  const filterSelect = document.querySelector('.filter-select');
  const selectValue = document.querySelector('.select-value');
  const selectList = document.querySelector('.select-list');
  const projectItems = document.querySelectorAll('[data-filter-item]');

  // Function to filter projects based on category
  function filterProjects(category) {
    projectItems.forEach(item => {
      const itemCategory = item.getAttribute('data-category').toLowerCase();
      if (category === 'All' || itemCategory === category.toLowerCase()) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  }

  // Event listener for filter buttons
  filterButtons.forEach(button => {
    button.addEventListener('click', function () {
      const category = this.textContent.trim();
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      filterProjects(category);
    });
  });

  // Event listener for select dropdown
  filterSelect.addEventListener('click', function () {
    selectList.classList.toggle('active');
  });

  // Event listener for select items
  selectList.querySelectorAll('[data-select-item]').forEach(item => {
    item.addEventListener('click', function () {
      const category = this.textContent.trim();
      selectValue.textContent = category;
      filterProjects(category);
      selectList.classList.remove('active'); // Close dropdown after selecting an item
    });
  });

  // Close select dropdown when clicking outside
  document.addEventListener('click', function (event) {
    const target = event.target;
    const isSelectBox = target.closest('.filter-select');
    const isSelectItem = target.closest('[data-select-item]');
    if (!isSelectBox && !isSelectItem) {
      selectList.classList.remove('active');
    }
  });

});

document.addEventListener('click', function (event) {
  console.log('Clicked on:', event.target);
  const target = event.target;
  const isSelectBox = target.closest('.filter-select');
  const isSelectItem = target.closest('[data-select-item]');
  if (!isSelectBox && !isSelectItem) {
    selectList.classList.remove('active');
  }
});

