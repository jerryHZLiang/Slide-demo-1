let $buttons = $('#buttonWrapper>button')
let $slides = $('#slides')
let $images = $slides.children('img')
let current = 0

makeFakeSlides()
$slides.css({transform: 'translateX(-920px)'})
bindEvents()

$(next).on('click', function(){
    goToSlides(current+1)
})

$(prev).on('click',function(){
    goToSlides(current-1)
})

let timer = setInterval(function(){
    goToSlides(current+1)
},2000)

$('.container').on('mouseenter',function(){
    window.clearInterval(timer)
}).on('mouseleave',function(){
    timer = setInterval(function(){
        goToSlides(current+1)
    },2000)
})

function bindEvents(){

    $('#buttonWrapper').on('click', 'button',function(e){
        let $button = $(e.currentTarget)
        let index = $button.index()
        goToSlides(index)
    })
}



function goToSlides(index){
    if(index > $buttons.length - 1){
        index = 0
    }else if(index<0){
        index = $buttons.length - 1
    }
    console.log('current', 'index')
    console.log(current, index)
    if(current === $buttons.length - 1 && index === 0){
        //最后一张到第一张
        $slides.css({transform: `translateX(${-($buttons.length+1)* 920}px)`})
        .one('transitionend', function(){
            $slides.hide()
                .offset()
            $slides.css({transform: `translateX(${-(index+1)* 920}px)`})
                .show()
        })
    }else if(current === 0 && index === $buttons.length - 1 ){
        //第一张到最后一张
        $slides.css({transform: `translateX(0px)`})
        .one('transitionend', function(){
            $slides.hide()
                .offset()
            $slides.css({transform: `translateX(${-(index+1)* 920}px)`})
                .show()
        })
    }else{
        $slides.css({transform: `translateX(${-(index+1)* 920}px)`})
    }  
    current = index
}



function makeFakeSlides(){
    //第一张复制到最后面
    let $firstCopy = $images.eq(0).clone(true)
    //最后面复制到第一张
    let $lastCopy = $images.eq($images.length - 1).clone(true)
    
    $slides.append($firstCopy)
    $slides.prepend($lastCopy)
    }
    