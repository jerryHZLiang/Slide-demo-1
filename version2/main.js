
let n
初始化()
let timer = setInterval(() => {

    makeLeave(getImage(n))

     .one('transitionend', (e) => {
         makeEnter($(e.currentTarget))
     })
    makeCurrent(getImage(n+1))
    n += 1
},3000)


document.addEventListener('visibilitychange',function(e){
    if(document.hidden){
        window.clearInterval(timer)
    }else{
        timer = setInterval(() => {

            makeLeave(getImage(n))
             .one('transitionend', (e) => {
                 makeEnter($(e.currentTarget))
             })
            makeCurrent(getImage(n+1))
            n += 1
        },3000)
    }
})










function x(n){
    if(n>3){
        n = n%3
        if(n===0){
            n=3
        }
    }
    return n
}

function getImage(n){
   return $(`.images > img:nth-child(${x(n)})`)
}

function 初始化(){
    n = 1
    $(`.images > img:nth-child(${n})`).addClass('current')
    .siblings().addClass('enter')
}

function makeCurrent($node){
    return $node.removeClass('leave enter').addClass('current')
}

function makeLeave($node){
    return $node.removeClass('current enter').addClass('leave')
}

function makeEnter($node){
    return $node.removeClass('leave current').addClass('enter')
}