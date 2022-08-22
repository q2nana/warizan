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
  const btnbox = document.getElementById('btnbox');
  const countp = document.getElementById('countp');
  const count = document.getElementById('count');
  const yamerubtn = document.getElementById('yamerubtn');
  const yamerubtn2 = document.getElementById('yamerubtn2');
  const topbtn = document.getElementById('topbtn');
  const symbol = ['+','-','×','÷'];
  const moudame = document.getElementById('moudame');
  const moudamebox = document.getElementById('moudamebox');

  yamerubtn2.classList.add('hidden');


  const num = [];
  let numnum = 10;
  const bububu = [];

  let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

window.addEventListener('resize', () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});

  // tenbtn.classList.add('push');
  // tenbtn.addEventListener('click',()=>{
  //   console.log('abj');
  // });

  tenbtn.classList.add('push');

  ////////////////////////////////////////////////////////////
  //タイマー
  const timetimer = document.getElementById('timetimer');
  const timetimer2 = document.getElementById('timetimer2');
  // const startTimer = document.getElementById('startTimer');
  // const stopTimer = document.getElementById('stopTimer');
  // const recetTimer = document.getElementById('recetTimer');
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
  });

  twentybtn.addEventListener('click',()=>{
    numnum = 20;
    console.log(numnum);
    twentybtn.classList.add('push');
    tenbtn.classList.remove('push');
    thirtybtn.classList.remove('push');
  });

  thirtybtn.addEventListener('click',()=>{
    numnum = 30;
    console.log(numnum);
    thirtybtn.classList.add('push');
    tenbtn.classList.remove('push');
    twentybtn.classList.remove('push');
  });
  

  /////////////////////////////////////////////////
  //問題のセット

  
  function questionRandom(){
    answerinput.focus();
    countp.textContent = `あと${numnum - num.length}問！`;
    let left = (Math.floor(Math.random() * 51 + 1));
    let right = (Math.floor(Math.random() * 10 + 1));
    leftbox.textContent = left * right;
    symbolbox.textContent = '÷';
    equalbox.textContent = '=';
    rightbox.textContent = right;
  }
  

  function display2() {
    topbtn.classList.add('hidden');
    btnbox.classList.add('hidden');
    answerbox.classList.add('display');
    count.classList.add('display');
    moudamebox.classList.add('display');
    numdate.classList.add('display');
    yamerubtn.classList.add('display');
  }


  function btnRemove(){
   if(equalbox.textContent == '=') {
    yamerubtn.classList.add('display');
    yamerubtn.textContent = 'やめる';
    topbtn.classList.add('hidden');
    }
  }



  randombtn.addEventListener('click',questionRandom);
  randombtn.addEventListener('click',btnRemove);
  randombtn.addEventListener('click',display2);
  randombtn.addEventListener('click',timerStart);


    ////////////////////////////////////////
  //やめるボタン

  function stop(){
    leftbox.textContent = '';
    symbolbox.textContent = '';
    rightbox.textContent = '';
    equalbox.textContent = '';
  }

  function reload(){
    num.length = 0;
    countStop();
    recet();
    nothidden();
    stop();
  }

  function display2remove(){
    topbtn.classList.remove('hidden');
    btnbox.classList.remove('hidden');
    answerbox.classList.remove('display');
    count.classList.remove('display');
    moudamebox.classList.remove('display');
    numdate.classList.remove('display');
    yamerubtn.classList.remove('display');
    countp.textContent = '';
  }

  yamerubtn.addEventListener('click',reload);
  yamerubtn.addEventListener('click',display2remove);



    //正誤判定

    function seikai() {
      // console.log('正解！');
      answerbox.textContent = '正解！';
      let timer2 = window.setTimeout(doukana,1000);
      let timer = window.setTimeout(questionRandom,1000);
      window.setTimeout(remove,1000);
      answerinput.focus();
      pinpon();
      num.push('正解');
      bububu.length = 0;
      // console.log(num);
      moudame.classList.remove('display');
      countp.textContent = `あと${numnum - num.length}問！`;
    // if(num.length == numnum){
    //   window.clearTimeout(timer);
    //   window.clearTimeout(timer2);
    //   console.log('2回だよ');
    //   window.setTimeout(stop,1000);
    //   window.setTimeout(remove2,1000);
    // }
    }
  
    function fuseikai() {
      console.log('ブッブー');
      answerbox.textContent = 'ブッブー';
      window.setTimeout(doukana,1000);
      answerinput.focus();
      remove();
      bubu();
      bububu.push('不正解');
    }

    function judge2(answer){
      if(answerinput.value == answer) {
       seikai();
    }else {
       fuseikai();
      }     
    }

    function moudamee(answer) {
      answerbox2.textContent = answer;
      window.setTimeout(questionRandom,1000);
      window.setTimeout(remove,1000);
      answerinput.focus();
      moudame.classList.remove('display');
    }

    function judge3(answer){
      // console.log(bububu);
      if(bububu.length == 3) {
        moudame.classList.add('display');
        bububu.length = 0;
      }

      moudame.addEventListener('click',() => {
        moudamee(answer);
        window.setTimeout(remove2,1000);
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

   
      //たすひくかけるわるそれぞれの計算

      function judge(){
        let answer = Number(leftbox.textContent) / Number(rightbox.textContent);
        judge2(answer);
        judge3(answer);
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
  const soundicon = document.getElementById('soundicon');
  const soundicon2 = document.getElementById('soundicon2');

  soundicon2.addEventListener('click',()=>{
    soundicon2.classList.add('hidden');
  });

  soundicon.addEventListener('click',()=>{
    soundicon2.classList.remove('hidden');
  })
 
  function pinpon(){
    if(soundicon2.classList.contains('hidden')){
      music.play();
    }
  }

  function bubu(){
    if(soundicon2.classList.contains('hidden')){
      music2.play();
    }
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
    stop();
  }

  function enter2(event){
    if(event.key === 'Enter'){
      owari();
    }
  }
  document.body.addEventListener('keydown',enter2);





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

  
  btnnext.addEventListener('click',reload);
  btnnext.addEventListener('click',display2remove);
  

  function nothidden(){
    mask.classList.remove('display');
    mordal.classList.remove('display');
    btncontain.classList.remove('display');
    // document.body.removeEventListener('keydown',enter);
  }

  btnstop.addEventListener('click',nothidden);
  btnstop.addEventListener('click',()=>{
    yamerubtn.classList.remove('display');
    topbtn.classList.remove('hidden');
  })

///////////////////////////////////////////////////////////
    // レスポンシブ
    const numdate = document.getElementById('numdate');
    const answerbox2 = document.getElementById('answerbox2');
    const maru = document.getElementById('maru');
    const batu = document.getElementById('batu');

    function btnRemove2() {
      if(equalbox.textContent == '=') {
        timetimer2.classList.remove('hidden');
        topbtn.classList.add('hidden');
        yamerubtn.classList.add('hidden');
        yamerubtn2.classList.add('display');
        }
    }


    if (window.matchMedia('(max-width: 770px)').matches) {
      //スマホ処理
      answerinput.remove();
      timetimer2.classList.add('hidden');
      randombtn.addEventListener('click',btnRemove2);
      randombtn.addEventListener('click',createtable,{once:true});

      yamerubtn2.classList.remove('hidden');
      yamerubtn2.addEventListener('click',display2remove);
      yamerubtn2.addEventListener('click',reload);
      yamerubtn2.addEventListener('click',()=>{
        timetimer2.classList.add('hidden');
        topbtn.classList.remove('hidden');
        countp.textContent = '';
        answerbox2.textContent = '';
        yamerubtn2.classList.remove('display');
      });


      btnnext.addEventListener('click',()=> {
        timetimer2.classList.add('hidden');
      });

      btnstop.addEventListener('click',()=>{
        stop();
        numdate.classList.remove('display');
       });

      

      
      
      function responsiveJudge2(answer){
        if(answerbox2.textContent == answer) {
          seikai();
          answerbox.textContent = '';
          maru.classList.add('display');
          window.setTimeout(() => {
            answerbox2.textContent = '';
            maru.classList.remove('display');
          },1010);
        } else {
          fuseikai();
          answerbox.textContent = '';
          batu.classList.add('display');
          window.setTimeout(() => {
            answerbox2.textContent = '';
            batu.classList.remove('display');
          },1010);
        }     
      }

      function responsiveJudge3(answer){
        // console.log(bububu);
        if(bububu.length == 3) {
          moudame.classList.add('display');
          bububu.length = 0;
        }
  
        moudame.addEventListener('click',() => {
          moudamee(answer);
          window.setTimeout(remove3,1000);
        });
      }
      
      function responsivejudge(){
        let answer = Number(leftbox.textContent) / Number(rightbox.textContent);
        responsiveJudge2(answer);
        responsiveJudge3(answer);
      }

      function remove3() {
        answerbox2.textContent = '';
      }
      
      
      
      function createtable(){
        
        const table = [];
        const numtable = [1,2,3,4,5,6,7,8,9,'C',0,'Enter'];
        // const threetable= numtable.length / 3;
        for(let n = 0; n < 4; n++) {
          const tableadd = numtable.splice(0,3);
          table.push(tableadd);
          console.log(tableadd);
        }
        // console.log(table);
        
        while(numdate.firstChild){
          numdate.removeChild(numdate.firstChild);
        }
            table.forEach((table) => {
              const tr2 = document.createElement('tr');
              // console.log('tr2')
              table.forEach((table) => {
                const td2 = document.createElement('td');
                // console.log(td2);
                td2.textContent = table;
                tr2.appendChild(td2)
              });
              numdate.appendChild(tr2);
            })
              
              for(let i = 0; i <= 3; i++) {
                for(let n = 0; n <=2; n++){
                  let tablenum = numdate.rows[i].cells[n];
                  // console.log(tablenum);
                }
              }
              
              
              function click(e){
                // console.log(e.target);
                if(e.target.textContent == 'C') {
                  answerbox2.textContent = '';
                } else if(e.target.textContent =='Enter'){
                  responsivejudge();
                  owari();
                } else {
                  // console.log(e.target.textContent);
                  answerbox2.textContent = answerbox2.textContent + e.target.textContent
                }
              }
              
                numdate.addEventListener('click',click);
              
            

               
            }
          }
            



}




      