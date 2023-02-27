$( document ).ready(function() {
    $('.header-nav__block-list a').click(function(e){
        e.preventDefault();
        var country=$(this).attr('data-name');
        $('.header-nav__block-list a').removeClass('active');
        $(this).addClass('active');
        $('#currentcountry').text(country);
        $('.header-nav').removeClass('opened');
		var link=$(this).attr('href');
        var data = {
            'action': 'changecountry',
            'country': country,
        };
        $.ajax({
            url:ajaxurl, // обработчик
            data:data, // данные
            type:'POST', // тип запроса
            success:function(data){
				window.location.href=link;
            }
        });


    });


    $('#btnsubmit').click(function(e){
        e.preventDefault();
       $(this).closest('.contacts-grid').find('form #formbutton').click();
    });


    $('#fertilizer').val($('h1').text());

});