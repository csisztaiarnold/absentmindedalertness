$(document).ready(function(){

    $.getJSON('https://ama.idevele.com/api/post', function (result) {
        var root = null;
        var useHash = true; // Defaults to: false
        var hash = '#!'; // Defaults to: '#'
        var router = new Navigo(root, useHash, hash);

        router
            .on(function () {
                var html = '';
                var posts = result['posts'];
                posts.forEach(function(post) {
                    html +=
                        '<h3><a href="/#!/' + post['clean_url'] + '" class="post-title" id="' + post['clean_url'] +'">' +
                        post['title'] +
                        '<div class="datetime">' + post['datetime'] + '</div>' +
                        '</a></h3>';
                });
                $('title').empty().text('Absent Minded Alertness');
                $('#app').hide().html(html).fadeIn('fast');
            })
            .resolve();

        router
            .on('/about', function (params)  {
                var content = $('#about').html();
                $('#app').hide().html(content).fadeIn('fast');
                $('title').empty().text('About');
            })
            .resolve();

        router
            .on('/:clean_url', function (params)  {
                var posts = result['posts'];
                posts.forEach(function(entry) {
                    if(params.clean_url == entry['clean_url']) {
                        post = entry;
                    }
                });
                var html =
                    '<article>' +
                    '<h3>' + post['title'] +
                    '<div class="datetime">written on ' + post['datetime'] + '</div></h3>' +
                    '<div class="content">' + post['content'] + '</div>' +
                    '</article><script>$(\'pre code\').each(function(i, block) { hljs.highlightBlock(block);});</script>';
                $('title').empty().text(post['title']);
                $('#app').hide().html(html).fadeIn('fast');
            })
            .resolve();

        $(document).on('click', '#home', function(e){
            router.navigate('/');
            e.stopPropagation();
            return false;
        });

        $(document).on('click', '.post-title', function(e){
            router.navigate('/' + $(this).attr('id'));
            e.stopPropagation();
            return false;
        });

        $(document).on('click', '.about', function(e){
            router.navigate('/about');
            e.stopPropagation();
            return false;
        });

    });

});




