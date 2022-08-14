'use strict';
{
  const leftbox = document.getElementById('leftbox');
  const rightbox = document.getElementById('rightbox');
  const symbolbox = document.getElementById('symbolbox');
  const equalbox = document.getElementById('equalbox');
  const answerbox = document.getElementById('answerbox');
  const answerinput = document.getElementById('answerinput');
  const randombtn = document.getElementById('randombtn');
  const tenbtn = document.getElementById('tenbtn');
  const twentybtn = document.getElementById('twentybtn');
  const thirtybtn = document.getElementById('thirtybtn');
  const yamerubtn = document.getElementById('yamerubtn');
  const countp = document.getElementById('countp');
  // const play = document.getElementById('play');
  const symbol = ['+','-','×','÷'];
  const moudame = document.getElementById('moudame');
  const topbtn = document.getElementById('topbtn');

  const num = [];
  let numnum = 10;

  const bububu = [];

  tenbtn.classList.add('push');

  ////////////////////////////////////////////////////////////
  //タイマー
  const timetimer = document.getElementById('timetimer');
  const reslutminutes = document.getElementById('resultminutes');

  let startTime;
  let timeoutId;

  function countUp(){
    const d = new Date(Date.now() - startTime);
    const m = String(d.getMinutes()).padStart(2,'0');
    const s = String(d.getSeconds()).padStart(2,'0');
    const ms = String(d.getMilliseconds()).padStart(3,'0');
    timetimer.textContent = `${m}:${s}.${ms}`
    reslutminutes.textContent = `${m}:${s}.${ms}`

    timeoutId = setTimeout(() => {
      countUp();
    },10);
  }

  function countStop(){
    clearTimeout(timeoutId);
    // timetimer.textContent = '00:00:000'
  }

  function recet(){
    timetimer.textContent = '00:00.000'
  }

  
  randombtn.addEventListener('click',timerStart);

  function timerStart(){
    startTime = Date.now();
    countUp();
  }

   /////////////////////////////////////////////////
  //何問ゲームするか
  tenbtn.addEventListener('click',()=>{
    numnum = 10;
    console.log(numnum);
    tenbtn.classList.add('push');
    twentybtn.classList.remove('push');
    thirtybtn.classList.remove('push');
  })

  twentybtn.addEventListener('click',()=>{
    numnum = 20;
    console.log(numnum);
    twentybtn.classList.add('push');
    tenbtn.classList.remove('push');
    thirtybtn.classList.remove('push');
  })

  thirtybtn.addEventListener('click',()=>{
    numnum = 30;
    console.log(numnum);
    thirtybtn.classList.add('push');
    tenbtn.classList.remove('push');
    twentybtn.classList.remove('push');
  })


  /////////////////////////////////////////////////
  //問題のセット


  // 割るボタン押したとき用
  function divideSet(){
    let xright = (Math.floor(Math.random() * 20 + 1 ));
    let right = (Math.floor(Math.random() * 10 + 1 ));
    let left = (right * xright); 
    leftbox.textContent = left;
    symbolbox.textContent = symbol[3];
    rightbox.textContent = right;
  }

  
  function questionRandom(){
    answerinput.focus();
    countp.textContent = `あと${numnum - num.length}問！`;
    symbolbox.textContent = '÷';
    equalbox.textContent = '=';
      divideSet();
  }

  function btnRemove(){
   if(equalbox.textContent == '=') {
    randombtn.classList.add('hidden');
    tenbtn.classList.add('hidden');
    twentybtn.classList.add('hidden');
    thirtybtn.classList.add('hidden');
    yamerubtn.classList.add('display');
    yamerubtn.textContent = 'やめる';
    topbtn.classList.add('hidden');
    }
  }

  randombtn.addEventListener('click',questionRandom);
  randombtn.addEventListener('click',btnRemove);


  //たすひくかけるわるそれぞれの計算

    function judge(){
            let answer = Number(leftbox.textContent) / Number(rightbox.textContent)
            judge2(answer);
            judge3(answer);
        } 

        //正誤判定
   
      
        function judge2(answer){
            if(answerinput.value == answer) {
              console.log('正解！');
              answerbox.textContent = '正解！';
              let timer2 = window.setTimeout(doukana,1000);
              let timer = window.setTimeout(questionRandom,1000);
              window.setTimeout(remove,1000);
              answerinput.focus();
              pinpon();
              num.push('正解');
              bububu.length = 0;
              console.log(num);
              countp.textContent = `あと${numnum - num.length}問！`;
              if(num.length == numnum){
                window.clearTimeout(timer);
                window.clearTimeout(timer2);
                console.log('2回だよ');
                window.setTimeout(stop,1000);
                window.setTimeout(remove2,1000);
              }
            }else {
              console.log('ブッブー');
              answerbox.textContent = 'ブッブー';
              window.setTimeout(doukana,1000);
              answerinput.focus();
              remove();
              bubu();
              bububu.push('不正解');
            }     
        }

       function judge3(answer){
          console.log(bububu);
          if(bububu.length == 3) {
            moudame.classList.add('display');
          }
          moudame.addEventListener('click',() => {
            answerbox.textContent = answer;
            window.setTimeout(questionRandom,1000);
            window.setTimeout(remove,1000);
            window.setTimeout(remove2,1000);
            answerinput.focus();
            moudame.classList.remove('display');
          });
        }

        function doukana() {
          answerbox.textContent = '';
        }
        
        function remove(){
          answerinput.value = '';
        }

        function remove2(){
          answerbox.textContent = '';
        }

        function stop(){
          leftbox.textContent = '';
          symbolbox.textContent = '';
          rightbox.textContent = '';
          equalbox.textContent = '';
        }
        
        // answerbtn.addEventListener('click',judge);
        
        function enter(event){
          if(event.key === 'Enter'){
            judge();
          }
        }
        document.body.addEventListener('keydown',enter);
        
  
/////////////////////////////////////////////////////////
    //半角数字のみの入力

    function filter(e){
      let v = e.target.value
          .replace(/[０-９]/g, 
          function(x){ return String.fromCharCode(x.charCodeAt(0) - 0xFEE0) })
          .replace(/[ー]/g,'-')
          .replace(/[^0-9-]/g, '');
      e.target.value = v;
      // console.log(v);
  };
  document.addEventListener('input', filter);

///////////////////////////////////////////////////////////////
  //音を鳴らす


  const music = new Audio('./クイズ正解1.mp3');
  const music2 = new Audio('./クイズ不正解1.mp3');
 
  function pinpon(){
    music.play();
  }

  function bubu(){
    music2.play();
  }



  ////////////////////////////////////
  //10回正解したら終わり

  function owari(){
    if(num.length == numnum) {
      console.log('おわり');
      window.setTimeout(display,1010);
      countStop();
      countp.textContent = 'おわり！';
      timetimer.textContent = '';
      window.setTimeout(owari2,1010);
    }
  }

  function owari2(){
    countp.textContent = '';
    timetimer.textContent = '';
    yamerubtn.classList.remove('display');
  }

  function enter2(event){
    if(event.key === 'Enter'){
      owari();
    }
  }
  document.body.addEventListener('keydown',enter2);


    ////////////////////////////////////////
  //やめるボタン
  yamerubtn.addEventListener('click',reload);
  yamerubtn.addEventListener('click',()=>{
    yamerubtn.classList.remove('display');
    countp.textContent = '';
    stop();
    topbtn.classList.remove('hidden');
  })


  ////////////////////////////////////////
  //モーダルウィンドウ

  const mask = document.getElementById('mask');
  const mordal = document.getElementById('mordal');
  const btncontain = document.getElementById('btncontain');
  const btnnext = document.getElementById('btnnext');
  const btnstop = document.getElementById('btnstop');
  

  function display(){
    mask.classList.add('display');
    mordal.classList.add('display');
    btncontain.classList.add('display');
  }

  function reload(){
    // console.log(num);
    num.length = 0;
    countStop();
    recet();
    notbtnhidden();
    nothidden();
    yamerubtn.classList.remove('display');
    topbtn.classList.remove('hidden');
  }

  function nothidden(){
    mask.classList.remove('display');
    mordal.classList.remove('display');
    btncontain.classList.remove('display');
    // document.body.removeEventListener('keydown',enter);
  }

  function notbtnhidden(){
    randombtn.classList.remove('hidden');
    tenbtn.classList.remove('hidden');
    twentybtn.classList.remove('hidden');
    thirtybtn.classList.remove('hidden');
  }

  btnnext.addEventListener('click',reload);
  btnstop.addEventListener('click',nothidden);
  btnstop.addEventListener('click',()=>{
    topbtn.classList.remove('hidden');
    yamerubtn.classList.remove('display');
  });






}




      