const e=document.querySelector("[data-start]"),t=document.querySelector("[data-stop]"),d=document.querySelector("body");let r=null;e.addEventListener("click",(function(){r=setInterval((()=>{d.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`,e.setAttribute("disabled","disabled"),t.removeAttribute("disabled","disabled")}),1e3)})),t.addEventListener("click",(function(){e.removeAttribute("disabled","disabled"),t.setAttribute("disabled","disabled"),clearInterval(r)}));
//# sourceMappingURL=01-color-switcher.28993088.js.map