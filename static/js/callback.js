$(function(){


    var btn = $('#callback-btn');
    var isLoading = false;

    var phoneElement = $('#CallbackPhone');
    var timeElement = $('#CallbackTime');
    var resultElement = document.getElementById('callbackResult');

    var callbackForm = document.getElementById('callbackForm');
    callbackForm.onsubmit = callback;


    function callback () {
        if (isLoading) return false;
        if(!phoneElement.val()){
          resultElement.innerHTML = '<div class="alert alert-dismissable alert-danger fadeInUp2 animated"><button type="button" class="close" data-dismiss="alert">×</button><strong>Ошибка! </strong>Не заполнено поле номера</div>';
          return false;
        }
        isLoading = true;
        var btnText = btn.val();
        btn.val('Отправка...');
        btn.addClass('btn-loading');

        var xhr = new XMLHttpRequest();
        var data = new FormData();


        data.append('phone', phoneElement.val());
        data.append('time', timeElement.val() || 'Сейчас');


        xhr.open('POST', '/callback', true);

        // CSRF-ключик
        xhr.setRequestHeader("X-CSRFToken", document.getElementById('csrf_token').value);
        xhr.onload = function () {

            if (xhr.readyState == 4 || xhr.readyState == "complete") {


                var server_reply = JSON.parse(xhr.responseText);
                btn.val(btnText);
                btn.removeClass('btn-loading');

                // Если сообщение успешно отправлено, форму можно очистить
                if(server_reply.status == 0) {
                  resultElement.innerHTML = '<div class="alert alert-dismissable alert-success fadeInUp2 animated"><button type="button" class="close" data-dismiss="alert">×</button><strong>Отлично! </strong>'+server_reply.message+'</div>';
                }
                else
                {
                  resultElement.innerHTML = '<div class="alert alert-dismissable alert-danger fadeInUp2 animated"><button type="button" class="close" data-dismiss="alert">×</button><strong>Ошибка! </strong>'+server_reply.message+'</div>';
                }
                isLoading = false;

            }
        };
        xhr.send(data);

        return false;
    }

})
