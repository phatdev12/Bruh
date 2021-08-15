const span = document.getElementById("span");

span.onclick = function() {
  document.execCommand("copy");
}

span.addEventListener("copy", function(event) {
  event.preventDefault();
  if (event.clipboardData) {
    event.clipboardData.setData("text/plain", span.textContent);
    console.log(event.clipboardData.getData("text"))
  }
});
const help = document.getElementById("help");

help.onclick = function() {
  document.execCommand("copy");
}

help.addEventListener("copy", function(event) {
  event.preventDefault();
  if (event.clipboardData) {
    event.clipboardData.setData("text/plain", help.textContent);
    console.log(event.clipboardData.getData("text"))
  }
});
window.addEventListener("scroll", function() {showFunction(), showFunction1(), showFunction2(), showFunction3(), showFunction4()});

function showFunction() {
    if (document.body.scrollTop > 350 || document.documentElement.scrollTop > 350) {
        document.getElementById("card").style.opacity = 1;
    } else {
        document.getElementById("card").style.opacity = 0;
    }
}
function showFunction2() {
  if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
      document.getElementById("text_info").style.opacity = 1;
  } else {
      document.getElementById("text_info").style.opacity = 0;
  }
}
function showFunction1() {
  if (document.body.scrollTop > 770 || document.documentElement.scrollTop > 770) {
      document.getElementById("card1").style.opacity = 1;
  } else {
      document.getElementById("card1").style.opacity = 0;
  }
}
function showFunction3() {
  if (document.body.scrollTop > 700 || document.documentElement.scrollTop > 700) {
      document.getElementById("text_info1").style.opacity = 1;
  } else {
      document.getElementById("text_info1").style.opacity = 0;
  }
}
function showFunction4() {
  if (document.body.scrollTop > 1400 || document.documentElement.scrollTop > 1400) {
      document.getElementById("text_info2").style.opacity = 1;
  } else {
      document.getElementById("text_info2").style.opacity = 0;
  }
}
const cookieBox = document.querySelector(".cookie"),
acceptBtn = cookieBox.querySelector("button");
acceptBtn.onclick = ()=>{
  console.log('clicked')
  //setting cookie for 1 month, after one month it'll be expired automatically
  document.cookie = "CookieBy=CodingNepal; max-age="+60*60*24*30;
  if(document.cookie){ //if cookie is set
    cookieBox.classList.add("hide"); //hide cookie box
  }else{ //if cookie not set then alert an error
    alert("Cookie can't be set! Please unblock this site from the cookie setting of your browser.");
  }
}
let checkCookie = document.cookie.indexOf("CookieBy=CodingNepal"); //checking our cookie
//if cookie is set then hide the cookie box else show it
checkCookie != -1 ? cookieBox.classList.add("hide") : cookieBox.classList.remove("hide");
