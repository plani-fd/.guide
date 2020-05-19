/*-------------------------------------------------
Author : ㅈㅁㅈ
Create date : 2020-04-03
-------------------------------------------------*/

$(function()
{
    var project = $('html,body').find('title').text();
    
    // 타이틀
    $('html,body').find('title').text( project + $('#guide > main > .page > h1').text() );

    // 상단
    $('#guide > header').load('header.html');

    // 위로가기
    $('#guide > main > .btn_top').on('click', function()
    {
        $('html, body').animate({scrollTop: 0});

        return false;
    });

    // 소스 한 번 넣어도 두 번 다 들어가게
    $('#guide > main > .page > .section > .group').find('> .item').each(function(i)
    {
        if ( $(this).find('> pre').text() == '' )
        {
            $(this).find('> pre').text( $(this).find('> .cont').html() );
        }

        if ( $(this).find('> pre').length > 0 )
        {
            $(this).find('> pre').after('<a href="" class="btn">소스보기</a>');
        }
    });

    // 소스 코드처럼 보이게
    if ( $('#guide > main > .page > .section > .group > .item > pre').length > 0 )
    {
        SyntaxHighlighter.all();
    };

    // 소스보기
    $('#guide > main > .page > .section > .group > .item > .btn').on('click', function()
    {
        if ( $(this).text() == '소스보기' )
        {
            $(this).text('소스닫기');
            $(this).addClass('active');

            $(this).prev('div').addClass('active');
        }
        else
        {
            $(this).text('소스보기');
            $(this).removeClass('active');

            $(this).prev('div').removeClass('active');
        }

        return false;
    });

    setTimeout(function()
    {
        // 데이트피커
        $.datepicker.setDefaults
        ({
            showOn          : 'both',
            buttonImage     : '/ecms_resource/jquery/ico_calendar.gif',
            buttonImageOnly : true
        });

        $('#view_sdate, #view_edate').datepicker();

    }, 600);

    // 첨부파일
    $('.form_file').find('input').on('change', function()
	{
		if ( $(this).val() != '' )
		{
			$(this).next('.txt').addClass('active');
			$(this).next('.txt').text('' + $(this).val() + '');
		}
	});

    // 아이템 펼치기
    $('#guide > main > .page > .section > .group > h3 > a').on('click', function()
    {
        // if ( $(this).parents('.group').hasClass('active') == false )
        // {
        //     $(this).parents('.group').addClass('active');
        // }
        // else
        // {
        //     $(this).parents('.group').removeClass('active');
        // }

        return false;
    });
});