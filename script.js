(function($){

    $(document).ready(function(){





        class App {

            constructor() {
                this.smoothBtn = $('.el-smooth-scroll');
                this.parallaxEl = $('.el-add-parallax');
                this.form = $('form');
                this.leadDetect = $('[data-lead]')
                this.generateID = Date.now();
            }


            leadsDetect(){
                var t = this;

                t.leadDetect.bind('click', function(e){

                    e.preventDefault();

                    var href = $(this).attr('href');
                    var btnType =  $(this).attr('data-btn');
                    var id = t.generateID;


                    var network = 'Organic';


                    if(window.location.search.length > 0){
                        var detectNetwork = window.location.search.split('=')[0].split('?')[1];

                        if(detectNetwork === 'fbclid'){
                            network = 'Facebook';
                        }else if(detectNetwork === 'gtrack'){
                            network = 'Google';
                        }else{
                            network = 'Organic';
                        }

                    }




                    var message = 'Client ' + id + ' from ' + network + ' click btn ' + btnType;



                    fbq('track', 'Lead');
                    $.post('lead.php', { type: 'detect',  message: message} , function(res){}, 'json');



                    setTimeout(function(){
                        window.location.href = href;
                    }, 1000);



                })

            }

            detectUserAction(){

                var id = this.generateID;
                var network = 'Organic';


                if(window.location.search.length > 0){
                    var detectNetwork = window.location.search.split('=')[0].split('?')[1];

                    if(detectNetwork === 'fbclid'){
                        network = 'Facebook';
                    }else if(detectNetwork === 'gtrack'){
                        network = 'Google';
                    }else{
                        network = 'Organic';
                    }

                }


                var message = 'Client ' + id + ' from ' + network + ' visit site. User data' + navigator.userAgent;

                $.post('lead.php', { type: 'detect',  message: message} , function(res){}, 'json');


            }

            smoothScroll(){

                this.smoothBtn.bind('click', function(){
                    event.preventDefault();

                    $('html, body').animate({
                        scrollTop: $($.attr(this, 'href')).offset().top
                    }, 500);
                })

            }


            parallax(){
                $(document).bind('load scroll', function(){

                    var st = $(window).scrollTop();
                    $('.el-add-parallax').each( function(a,b){

                        if(  st > ($(b).offset().top- $(window).height())  ){
                            $(b).css({
                                'transform' : 'translateY(' + (st ) + 'px)'
                            })
                            //console.log($(b));
                        }


                    })
                });

            }


            lead(){

                var obj = this;

                this.form.submit(function(e){
                    e.preventDefault();

                    var t = $(this);
                    obj.form.find('button').attr('disabled', true)

                    $('.el-alert-message').remove();

                    $.post('lead.php', $(this).serialize(), function(res){

                        var data = {};

                        if(res.ok){
                            data = {
                                message : 'Выши данные успешно отправленны',
                                status : 'success'
                            }
                        }else{
                            data = {
                                message : 'При отправке данных возникла ошибка',
                                status : 'fail'
                            }
                        }


                        if(data.status === 'fail'){
                            $('form').prepend('<div class="el-alert-message" data-status="'+ data.status +'">'+ data.message +'</div>')
                        }else{

                            fbq('track', 'Lead');

                            $('form').prepend('<div class="el-alert-message" data-status="'+ data.status +'">'+ data.message +'</div>')
                            $("form").trigger("reset");
                        }


                        obj.form.find('button').attr('disabled', false)


                        setTimeout(function(){
                            $('.el-alert-message').remove();
                        }, 5000);



                    }, 'json');


                })
            }

            init(){
                this.smoothScroll();
                this.lead();
                this.leadsDetect();
                //this.detectUserAction();
                //this.parallax();
            }

        }

        var app =  new App();
        app.init();





    })


})(jQuery)