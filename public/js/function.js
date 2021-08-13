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
window.addEventListener("scroll", function() {showFunction()});

function showFunction() {
    if (document.body.scrollTop > 350 || document.documentElement.scrollTop > 350) {
        document.getElementById("card").style.opacity = 1;
    } else {
        document.getElementById("card").style.opacity = 0;
    }
}
