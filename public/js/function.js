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
