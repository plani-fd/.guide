/*-------------------------------------------------
Author : ㅈㅁㅈ
Create date : 2020-07-10
-------------------------------------------------*/

$(function()
{
    // 사이트 제목
    var project = $('html, body').find('title').text();

    //
    function page(i)
    {
        // 초기화
        $('#guide header .menu a').removeClass('active');
        $('#guide .btn').remove();
        $('#guide').find('nav li').remove();

        // 페이지가 로드됩니다
        $('#guide > main > .page').load('page/page' + i + '.html', function()
        {   
            // 소스 넣기
            $(this).find('> .section > .group > .item').each(function()
            {
                if ( $(this).find('> pre').text() == '' )
                {
                    $(this).find('> pre').text( $(this).find('> .cont').html() );
                }
            });

            // 소스닫기 추가
            if ( $('#guide > main > .page > .section > .group > .item > pre').length > 0 )
            {
                $(this).find('> h1').after('<a href="" class="btn">소스닫기</a>');
            }

            // 상단 메뉴 활성화
            $('#guide header .menu a').each(function()
            {
                if ( $(this).text() == $('#guide > main > .page > h1').text() )
                {
                    $(this).addClass('active');
                }
            });

            // 왼쪽 메뉴 생성
            $('#guide > main > .page > .section').each(function(j)
            {
                // 아이디값 넣기
                $(this).attr('id', 'section' + (j + 1));

                // 메뉴 리스트 생성
                $('#guide').find('nav ul').append('<li><a href="#' + $(this).attr('id') + '">' + $(this).find('> h2').text() + '</a></li>');
                $('#guide').find('nav li:first').addClass('active');

                // 하위 메뉴 생성
                $('#guide > main > .page > .section').eq(j).find('> .group').each(function(k)
                {
                    if ( $(this).find('> h3').length > 0 )
                    {
                        // 아이디값 넣기
                        $(this).attr('id', 'group' + (j + 1) + '_' + (k + 1));
                        
                        // 하위 메뉴 감쌀 요소 추가
                        if ( $('#guide').find('nav li').eq(j).find('a').next('p').length == 0 )
                        {
                            $('#guide').find('nav li').eq(j).find('a').after('<p></p>');
                        }

                        // 메뉴 리스트 생성
                        $('#guide').find('nav li').eq(j).find('p').append('<a href="#' + $(this).attr('id') + '">' + $(this).find('> h3 > a').html() + '</a>');
                    }
                });

                btnPosition = null;

                // 스크롤 될 때 
                $(window).on('load scroll', function()
                {
                    // 소스닫기 위치
                    if ( $('#guide').find('.btn').length > 0 && btnPosition == null )
                    {
                        btnPosition = $('#guide').find('.btn').offset().top;
                    }

                    // 왼쪽 메뉴 고정
                    if ( $('html, body').scrollTop() >= $('#guide header').height() )
                    {
                        $('#guide').find('nav').addClass('active');
                    }
                    else
                    {
                        $('#guide').find('nav').removeClass('active');
                    }

                    var sectionPosition = ($('#guide > main > .page > .section').eq(j).offset() || { 'top': NaN }).top;

                    if ( $('html, body').scrollTop() >= sectionPosition - 30 )
                    {
                        if ( $('#guide').find('nav li').eq(j).hasClass('active') == false )
                        {
                            $('#guide').find('nav li').removeClass('active');
                            $('#guide').find('nav li').eq(j).addClass('active');
                        }
                    }

                    // 소스닫기 고정
                    if ( $('html, body').scrollTop() >= btnPosition )
                    {
                        $('#guide').find('.btn').addClass('fixed');
                    }
                    else
                    {
                        $('#guide').find('.btn').removeClass('fixed');
                    }
                });
            });

            SyntaxHighlighter.highlight();
        });
    }

    page(1);

    // 상단 메뉴
    $('#guide > header .menu a').on('click', function()
    {
        page( ($(this).index() + 1) );

        return false;
    });

    // 왼쪽 메뉴
    $('#guide').find('nav').on('click', 'a', function()
    {
        if ( $(this).parent('p').length > 0 )
        {
            $('html, body').animate({scrollTop: ($(this.hash).offset().top - 28)});
        }
        else
        {
            $('html, body').animate({scrollTop: $(this.hash).offset().top});
        }

        return false;
    });

    // 소스닫기
    $('#guide').on('click', '.btn', function()
    {
        if ( $(this).hasClass('active') == false )
        {
            $(this).text('소스열기');
            $(this).addClass('active');
            
            $('#guide > main > .page > .section > .group > .item > .cont').next('div').addClass('disable');
        }
        else
        {
            $(this).text('소스닫기');
            $(this).removeClass('active');
            
            $('#guide > main > .page > .section > .group > .item > .cont').next('div').removeClass('disable');
        }

        return false;
    });

    // 위로가기
    $('#guide > main > .btn_top').on('click', function()
    {
        $('html, body').animate({scrollTop: 0});

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
});