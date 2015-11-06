// $(document).ready(function() {
//   $(".loading").show(); //显示loading
//   setTimeout("$('.loading').hide();", 3000); //隐藏loading
// });
$(document).ready(function() {
  var w_height = $(window).height();
  var w_width = $(window).width();
  $('.begin_box').css("height", w_height);
  $('.title').css("padding-top", w_height * 0.381);
  $('.a_box').css("padding-top", w_height * 0.062);
  $('.qaa').css("font-size", (1 / 720) * w_width + "em");
  $('.lv').css("padding-top", w_height * 0.2944);
  $('.lv_hgd').css("padding-top", w_height * 0.0574);
  $('.lv_hgd').css("padding-bottom", w_height * 0.0851);
  $('.again_box').css("padding-bottom", w_height * 0.0370);
  $.ajax({
    type: "POST",
    url: "./js/qaa.json",
    dataType: "json",
    success: function(data) {
      get(data);
    }
  });
});

function begin() {
  $('.begin_box').css({
    "filter":"url(Blur.svg#Blur)",
    "-webkit-filter":"Blur(1em)",
    "-moz-filter":"Blur(1em)",
    "-ms-filter":"Blur(1en)",
    "filter":"Blur(1em)",
    "filter":"progid:DXImageTransform.Microsoft.Blur(PixelRadius=10, MakeShadow=false)"
    });
  json(0);
  $(function() {
      setTimeout(function() {
        $('.begin_box').css("display", "none");
        $('.qaa').css({
          "-webkit-filter":"Blur(0)",
          "-moz-filter":"Blur(0)",
          "-ms-filter":"Blur(0)",
          "filter":"Blur(0)"
          });
      }, 1000);
    })
    /*.Blur { 
      filter: url(Blur.svg#Blur);
      
      -webkit-filter: Blur(10px);
         -moz-filter: Blur(10px);
          -ms-filter: Blur(10px);    
              filter: Blur(10px);
      
      filter: progid:DXImageTransform.Microsoft.Blur(PixelRadius=10, MakeShadow=false);*/
  $(function() {
    setTimeout(function() {
      time();
    }, 1000);
  })
}

function end() {
  $('.qaa').css({
    "-webkit-filter":"Blur(4em)",
    "-moz-filter":"Blur(4em)",
    "-ms-filter":"Blur(4em)",
    "filter":"Blur(4em)"
    });
  //console.log(parseInt($('#grade').html()));
  var grade = parseInt($('#grade').html());
  $('.lv_js').html(grade);
  // $('lv_js').innerHTML = parseInt($('grade').innerHTML);
  $(function() {
      setTimeout(function() {
        $('.end').css({
          "display":"block",
          "-webkit-filter":"Blur(0)",
          "-moz-filter":"Blur(0)",
          "-ms-filter":"Blur(0)",
          "filter":"Blur(0)"
          });
      }, 1000);
    })
    /*.Blur { 
      filter: url(Blur.svg#Blur);
      
      -webkit-filter: Blur(10px);
         -moz-filter: Blur(10px);
          -ms-filter: Blur(10px);    
              filter: Blur(10px);
      
      filter: progid:DXImageTransform.Microsoft.Blur(PixelRadius=10, MakeShadow=false);*/
}
var time_default = 10;
var i = 1;
var count_down = document.getElementById('time').innerHTML;
//console.log(count_down);
function time() {
  if (count_down == 0) {
    document.getElementById('time').innerHTML = time_default;
    count_down = time_default;
    qaa();
    $(function() {
      setTimeout(function() {
        time();
      }, 1000);
      //console.log(count_down);
    });
  } else {
    count_down--;
    document.getElementById('time').innerHTML = count_down;
    $(function() {
      setTimeout(function() {
        time();
      }, 1000);
      //console.log(count_down);
    });
  }
}

function qaa() {
  //console.log(qaa_json.test[1].question);
  //id:time,grade,question,answer1-4 class:lv_js
  //document.getElementById('grade').innerHTML
  //document.getElementsByTagName('lv_js').innerHTML
  //console.log(qaa_json.test.length);
  if (i < qaa_json.test.length) {
    json(i);
    //document.getElementById('question').innerHTML = qaa_json.test[i].question;
    //document.getElementById('answer1').innerHTML = qaa_json.test[i].answer_one;
    //document.getElementById('answer2').innerHTML = qaa_json.test[i].answer_two;
    //document.getElementById('answer3').innerHTML = qaa_json.test[i].answer_three;
    //document.getElementById('answer4').innerHTML = qaa_json.test[i].answer_four;
    i++;
  } else {
    end();
  }
}

function onclick(x) {
  var grade = parseInt(document.getElementById('grade').innerHTML);
  var right = qaa_json.test[i - 1].answer_right;
  if (x == right) {
    document.getElementById('grade').innerHTML = grade + 1;
    awarded(x, 1);
    if (i < qaa_json.test.length) {
      document.getElementById('time').innerHTML = time_default;
      count_down = time_default;
      qaa();
    } else {
      end();
    }
  } else {
    $("." + right).css("color", "red");
    awarded(x, 0);
    if (i < qaa_json.test.length) {
      document.getElementById('time').innerHTML = time_default;
      count_down = time_default;
      $(function() {
        setTimeout(function() {
          $("." + right).css("color", "#39445a");
          qaa();
        }, 1000);
      });
    } else {
      $(function() {
        setTimeout(function() {
          end();
        }, 1000);
      });
    }
  }
}

function refresh() {
  window.location.reload();
}
var qaa_json;

function get(d) {
  qaa_json = d;
}

function json(j) {
  // console.log(qaa_json);
  document.getElementById('question').innerHTML = qaa_json.test[j].question;
  document.getElementById('answer1').innerHTML = qaa_json.test[j].answer_one;
  document.getElementById('answer2').innerHTML = qaa_json.test[j].answer_two;
  document.getElementById('answer3').innerHTML = qaa_json.test[j].answer_three;
  document.getElementById('answer4').innerHTML = qaa_json.test[j].answer_four;
}

function WeiXinShareBtn() {
  if (typeof WeixinJSBridge == "undefined") {
    alert("请先通过微信搜索“湖工大在线”并关注，通过微信分享文章 ");
  } else {
    WeixinJSBridge.invoke('shareTimeline', {
      "title": "关于湖工你知道多少",
      "link": "http://webpage.yangshaobo.cn/qaa"
    });
  }
}

function awarded(a, z) {
  //console.log(a, z);
  $('#awarded').html("+" + z);
  var zhi = a;
  switch(zhi){
    case 'A':
      $('#awarded').css("top", "3em");
      break;
    case 'B':
      $('#awarded').css("top", "8em");
      break;
    case 'C':
      $('#awarded').css("top", "13em");
      break;
    case 'D':
      $('#awarded').css("top", "18em");
      break;
  }
  $('#awarded').css("opacity", "1");
  $('#awarded').animate({
    opacity: '0',
    top: '0'
  }, 1000);
}