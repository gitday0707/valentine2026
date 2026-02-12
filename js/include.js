// function includeHTML(callback) {
//   const includes = document.querySelectorAll("[data-include]");
//   let loaded = 0;

//   includes.forEach(el => {
//     fetch(el.getAttribute("data-include"))
//       .then(res => res.text())
//       .then(html => {
//         el.innerHTML = html;
//         loaded++;
//         if (loaded === includes.length && callback) callback();
//       });
//   });
// }
