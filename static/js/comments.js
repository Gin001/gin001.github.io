$(function(){


    var btn = $('#commentButton');
    var isLoading = false;

    var phoneElement = $('#pPhone');
    var nameElement = $('#pName');
    var textElement = $('#pText');

    var resultElement = document.getElementById('feedbackResult');
    var commentsBlock = document.getElementById('commentsBlock');

    var requestForm = document.getElementById('feedbackFrom');
    requestForm.onsubmit = sendRequest;

    function sendRequest (event) {
        event.preventDefault();
        if (isLoading) return false;
        if(!phoneElement.val()){
          resultElement.innerHTML = '<div class="alert alert-dismissable alert-danger fadeInUp2 animated"><button type="button" class="close" data-dismiss="alert">×</button><strong>Ошибка! </strong>Не заполнено поле номера</div>';
          return false;
        }
        isLoading = true;
        var btnText = btn.text();
        btn.text('Отправка...');
        btn.addClass('btn-loading');

        var xhr = new XMLHttpRequest();
        var data = new FormData();

        var recaptcha = requestForm.querySelector("[name='g-recaptcha-response']").value;
        data.append('phone', phoneElement.val());
        data.append('name', nameElement.val() || 'Не указано');
        data.append('text', textElement.val());
        data.append('g-recaptcha-response', recaptcha);
        console.log(data);


        xhr.open('POST', '/new_comment', true);

        // CSRF-ключик
        xhr.setRequestHeader("X-CSRFToken", document.getElementById('csrf_token').value);
        xhr.onload = function () {

            if (xhr.readyState == 4 || xhr.readyState == "complete") {


                var server_reply = JSON.parse(xhr.responseText);
                btn.text(btnText);
                btn.removeClass('btn-loading');

                // Если сообщение успешно отправлено, форму можно очистить
                if(server_reply.status == 0) {
                  commentsBlock.innerHTML = server_reply.content + commentsBlock.innerHTML;
                  resultElement.innerHTML = '<div class="alert alert-dismissable alert-success fadeInUp2 animated"><button type="button" class="close" data-dismiss="alert">×</button><strong>Отлично! </strong>'+server_reply.message+'</div>';
                  requestForm.reset();
                  grecaptcha.reset();
                }
                else
                {
                  resultElement.innerHTML = '<div class="alert alert-dismissable alert-danger fadeInUp2 animated"><button type="button" class="close" data-dismiss="alert">×</button><strong>Ошибка! </strong>'+server_reply.message+'</div>';
                }
                isLoading = false;

            }
        };
        xhr.send(data);

    }

})
