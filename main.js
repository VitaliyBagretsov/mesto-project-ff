(()=>{"use strict";var e,t=function(t){t.target.classList.contains("popup")&&a(e)},r=function(t){"Escape"===t.key&&a(e)},n=function(n){e=n,n.classList.add("popup_is-opened"),n.addEventListener("click",t),document.addEventListener("keydown",r)},a=function(n){n.classList.remove("popup_is-opened"),n.removeEventListener("click",t),document.removeEventListener("keydown",r),e=void 0},o={baseUrl:"https://mesto.nomoreparties.co/v1/".concat("wff-cohort-1"),headers:{authorization:"dcb429c9-2d54-4302-8b0d-6aea9121fbd8","Content-Type":"application/json"}},c=function(e){if(e.ok)return e.json();throw"".concat(e.status,": ").concat(e.statusText)},i=document.querySelector("#card-template").content,u=document.querySelector(".places__list"),s=document.querySelector(".popup_type_delete-card"),l=function(e,t,r,n,a){var o=arguments.length>5&&void 0!==arguments[5]?arguments[5]:"down";!function(e,t){"down"===t?u.append(e):u.prepend(e)}(function(e,t,r,n,a){var o=i.querySelector(".card").cloneNode(!0),c=o.querySelector(".card__image"),u=o.querySelector(".card__title"),s=o.querySelector(".card__delete-button"),l=o.querySelector(".card__like-button");return c.addEventListener("click",n),l.addEventListener("click",r),e.owner._id!==a?s.remove():s.addEventListener("click",t),c.src=e.link,c.alt=e.name,u.textContent=e.name,o.dataset._id=e._id,o.dataset.currentUser=a,p(o,e.likes),o}(e,t,r,n,a),o)},d=function(e){s.dataset._id=e.target.closest(".card").dataset._id,n(s)},f=function(e){var t=e.target.closest(".card"),r=e.target.closest(".card").dataset._id;e.target.classList.contains("card__like-button_is-active")?function(e){return fetch("".concat(o.baseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:o.headers}).then(c)}(r).then((function(e){return p(t,e.likes)})):function(e){return fetch("".concat(o.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:o.headers}).then(c)}(r).then((function(e){return p(t,e.likes)}))},p=function(e,t){var r=e.querySelector(".card__like-button");e.querySelector(".card__like-count").textContent=t.length,t.some((function(t){return t._id===e.dataset.currentUser}))?r.classList.add("card__like-button_is-active"):r.classList.remove("card__like-button_is-active")},m=function(e){return Array.from(e.elements).filter((function(e){return!!e.name})).reduce((function(e,t){return e[t.name]=t.value,e}),{})},y=function(e,t,r){var n=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(r.inputErrorClass),n.classList.remove(r.errorClass),n.textContent=""},_=function(e,t){t.disabled=function(e){return e.some((function(e){return!e.validity.valid}))}(e)},v=function(e,t){var r=Array.from(e.querySelectorAll(t.inputSelector));r.forEach((function(r){y(e,r,t)})),_(r,e.querySelector(t.submitButtonSelector))},h=document.querySelector(".profile__image"),b=document.querySelector(".profile__info"),g=b.querySelector(".profile__title"),S=b.querySelector(".profile__description"),q=function(e){e.name&&(g.textContent=e.name),e.about&&(S.textContent=e.about),e.avatar&&(h.style.backgroundImage="url(".concat(e.avatar,")"))},E=function(e){var t=e.querySelector(".popup__button");t.dataset.loading?(t.textContent=t.dataset.text,delete t.dataset.loading,delete t.dataset.text):(t.dataset.loading=!0,t.dataset.text=t.textContent,t.textContent="Сохранение...")};function k(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var L={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inputErrorClass:"popup__input_type_error",errorClass:"popup__input-error_active"},C=document.querySelector(".profile__add-button"),A=document.querySelector(".popup_type_edit"),x=document.querySelector(".popup_type_edit-avatar"),w=document.querySelector(".popup_type_new-card"),U=document.forms["edit-profile"],O=document.forms["edit-avatar"],j=document.forms["new-place"],T=document.forms["delete-card-place"],D=document.querySelector(".popup_type_image"),P=D.querySelector(".popup__image"),I=D.querySelector(".popup__caption"),M=document.querySelector(".profile__edit-button"),N=document.querySelector(".profile__image"),B=document.querySelectorAll(".popup__close");M.addEventListener("click",(function(){var e,t;n(A),e=U,t={name:g.textContent,description:S.textContent,avatar:h.style.backgroundImage},e&&t&&Object.keys(t).length>0&&Object.keys(t).forEach((function(r){e.elements[r]&&(e.elements[r].value=t[r])})),v(U,L)})),N.addEventListener("click",(function(){n(x),O.reset(),v(O,L)})),C.addEventListener("click",(function(){n(w),j.reset(),v(j,L)})),B.forEach((function(e){e.addEventListener("click",(function(e){a(e.target.closest(".popup"))}))}));var J=function(e){P.src=e.target.src,P.alt=e.target.alt,I.textContent=e.target.alt,n(D)};j.addEventListener("submit",(function(e){!function(e,t){e.preventDefault();var r,n=e.target.closest(".popup");E(e.target),(r=m(e.target),fetch("".concat(o.baseUrl,"/cards"),{method:"POST",headers:o.headers,body:JSON.stringify({name:r.name,link:r.link})}).then(c)).then((function(r){l(r,d,f,t,r.owner._id,"up"),a(n),e.target.reset()})).catch((function(e){return alert(e)})).finally((function(){E(e.target)}))}(e,J)})),T.addEventListener("submit",(function(e){e.preventDefault();var t,r=e.target.closest(".popup");(t=r.dataset._id,fetch("".concat(o.baseUrl,"/cards/").concat(t),{method:"DELETE",headers:o.headers})).then((function(){!function(e){Array.from(u.querySelectorAll(".card")).find((function(t){return t.dataset._id===e})).remove()}(r.dataset._id),delete r.dataset._id,a(r)})).catch((function(e){return alert(e)}))})),U.addEventListener("submit",(function(e){e.preventDefault();var t,r,n=e.target.closest(".popup"),i=m(e.target);E(e.target),("me",t=i.name,r=i.description,fetch("".concat(o.baseUrl,"/users/").concat("me"),{method:"PATCH",headers:o.headers,body:JSON.stringify({name:t,about:r})}).then(c)).then((function(t){q({name:t.name,about:t.about}),a(n),e.target.reset()})).catch((function(e){return alert(e)})).finally((function(){E(e.target)}))})),O.addEventListener("submit",(function(e){e.preventDefault();var t,r=e.target.closest(".popup"),n=m(e.target);E(e.target),("me",t=n.link,fetch("".concat(o.baseUrl,"/users/").concat("me","/avatar"),{method:"PATCH",headers:o.headers,body:JSON.stringify({avatar:t})}).then(c)).then((function(t){q({name:t.name,about:t.about,avatar:t.avatar}),a(r),e.target.reset()})).catch((function(e){return alert(e)})).finally((function(){E(e.target)}))}));var H=("me",fetch("".concat(o.baseUrl,"/users/").concat("me"),{headers:o.headers}).then(c)),V=fetch("".concat(o.baseUrl,"/cards"),{headers:o.headers}).then(c);Promise.all([H,V]).then((function(e){var t,r,n=(r=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,a,o,c,i=[],u=!0,s=!1;try{if(o=(r=r.call(e)).next,0===t){if(Object(r)!==r)return;u=!1}else for(;!(u=(n=o.call(r)).done)&&(i.push(n.value),i.length!==t);u=!0);}catch(e){s=!0,a=e}finally{try{if(!u&&null!=r.return&&(c=r.return(),Object(c)!==c))return}finally{if(s)throw a}}return i}}(t,r)||function(e,t){if(e){if("string"==typeof e)return k(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?k(e,t):void 0}}(t,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),a=n[0],o=n[1];q({name:a.name,about:a.about,avatar:a.avatar}),o.forEach((function(e){l(e,d,f,J,a._id)}))})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){var r=Array.from(t.querySelectorAll(e.inputSelector));r.forEach((function(n){n.addEventListener("input",(function(){!function(e,t,r){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorPatternMessage):t.setCustomValidity(""),t.validity.valid?y(e,t,r):function(e,t,r,n){var a=e.querySelector(".".concat(t.id,"-error"));t.classList.add(n.inputErrorClass),a.classList.add(n.errorClass),a.textContent=r}(e,t,t.validationMessage,r)}(t,n,e),_(r,t.querySelector(e.submitButtonSelector))}))}))}))}(L)})();