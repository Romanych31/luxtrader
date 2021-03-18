function email_test(input) {
   return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
}

let forms = document.querySelectorAll('.form');

if (forms.length > 0) {
   for (let index = 0; index < forms.length; index++) {
      const form = forms[index];
      let email = form.querySelector('.input-form__email');
      let submit = form.querySelector('button[type="submit"]');
      let dataError = email.getAttribute('data-error');
      let errMessage = null;

      if (dataError) {
         errMessage = errMessageCreate(dataError);
      }

      if (email) {
         email.addEventListener('focus', function (e) {
            this.parentElement.classList.add('_focus');
         });

         email.addEventListener('blur', function (e) {
            this.parentElement.classList.remove('_focus');
            email.parentElement.classList.remove('_err');
            email.classList.remove('_err');
            errMessageRemove(this);
         });

         email.addEventListener('input', function (e) {
            if (!email_test(email)) {
               email.parentElement.classList.remove('_err');
               email.classList.remove('_err');
               errMessageRemove(this);
            }
         });
      }

      if (email.classList.contains('js-req')) {
         form.addEventListener('submit', function (e) {
            e.preventDefault();

            if (email_test(email)) {
               email.parentElement.classList.add('_err');
               email.classList.add('_err');
               if (errMessage) {
                  email.after(errMessage);
               }
               email.focus();
            } else {
               form.submit();
            }
         });
      }
   }
}

function errMessageCreate(dataError) {
   let span = document.createElement('span');
   span.classList.add('_err-message');
   span.innerHTML = dataError;
   return span;
}

function errMessageRemove(elem) {
   let nextElem = elem.nextElementSibling;
   if (nextElem.classList.contains('_err-message')) {
      nextElem.remove();
   }
}