!function(){var e=document.querySelector("[data-start]"),t=document.querySelector("[data-stop]"),d=document.querySelector("body");t.setAttribute("disabled","disabled");var a=null;e.addEventListener("click",(function(){a=setInterval((function(){d.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16)),e.setAttribute("disabled","disabled"),t.removeAttribute("disabled","disabled")}),1e3)})),t.addEventListener("click",(function(){e.removeAttribute("disabled","disabled"),t.setAttribute("disabled","disabled"),clearInterval(a)}))}();
//# sourceMappingURL=01-color-switcher.e711261a.js.map
