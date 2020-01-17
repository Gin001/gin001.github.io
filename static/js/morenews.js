$(function(){

    var btn = $('#moreButton');
    var page = 1;
    var isLoading = false;
    btn.on('click', moreNews)

    function moreNews (event) {
        event.preventDefault();
        if (isLoading) return;
        isLoading = true;
        btn.html('Загрузка...');

        var xhr = new XMLHttpRequest();
        var data = new FormData();
        data.append('page', page);
        xhr.open('POST', '/morenews', true);

        // CSRF-ключик
        xhr.setRequestHeader("X-CSRFToken", document.getElementById('csrf_token').value);
        xhr.onload = function () {

            if (xhr.readyState == 4 || xhr.readyState == "complete") {
                var server_reply = JSON.parse(xhr.responseText);
                console.log(server_reply)

                // Если сообщение успешно отправлено, форму можно очистить
                if(server_reply.status == 0) {
                    btn.html('Показать еще');
                    $('#newsBlock').append(server_reply.message);
                    page++;
                    if(server_reply.last == 1 ){
                        btn.css('display','none')
                    };

                }
                else
                {
                    btn.css('display','none')
                }
                isLoading = false;

            }
        };
        xhr.send(data);
    }

})
