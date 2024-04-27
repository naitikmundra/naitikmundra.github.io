// Function to set a cookie
function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
// Function to get a cookie by name
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) == 0) {
            return c.substring(nameEQ.length, c.length);
        }
    }
    return null;
}
function checkCookie(cookieName) {
  return document.cookie.split(';').some((cookie) => cookie.trim().startsWith(`${cookieName}=`));
}
if (window.location.pathname !== '/index.html' && window.location.pathname !== '/login.html' && window.location.pathname !== '/register.html' && window.location.pathname !== '/url-scan.html' && window.location.pathname !== '/login.html' && !checkCookie('uname')) {
  window.location.href = 'login.html';
}
function extractFrontPart(email) {
    // Split the email address at the "@" symbol
    var parts = email.split("@");
    
    // Return the front part (first element of the array)
    return parts[0];
}


    fetch('https://naitikmundra.github.io/navbar.html')
    // fetch('http://127.0.0.1:5501/navbar.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('navbar-placeholder').innerHTML = html;
            document.getElementById('navbar-placeholder').style.backgroundColor = '#252422';
            document.getElementById("uname").textContent = getCookie("uname");
            if (getCookie("uname") != null) {
              document.getElementById("logout").style.display = "block";
              document.getElementById("login").style.display = "none";
              document.getElementById("register").style.display = "none";
          } else {
              document.getElementById("login").style.display = "block";
              document.getElementById("logout").style.display = "none";
              document.getElementById("register").style.display = "block";
          }
          document.getElementById('logout').addEventListener('click', function() {
            setCookie('uname', '', -1); // Set "uname" cookie to nil
            location.reload(); // Reload the page after logout
        });
        })
        .catch(error => console.error('Error fetching navbar:', error));
    console.log("got navbar");
    fetch('https://naitikmundra.github.io/footer.html')
    // fetch('http://127.0.0.1:5501/footer.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('footer-placeholder').innerHTML = html;
            // document.getElementById('navbar-placeholder').style.backgroundColor = '#252422';
        })
        .catch(error => console.error('Error fetching footer:', error));
    console.log("got footer");
  (function ($) {
  
  "use strict";

    // MENU
    $('.navbar-collapse a').on('click',function(){
      $(".navbar-collapse").collapse('hide');
    });
    
    // CUSTOM LINK
    $('.smoothscroll').click(function(){
      var el = $(this).attr('href');
      var elWrapped = $(el);
      var header_height = $('.navbar').height();
  
      scrollToDiv(elWrapped,header_height);
      return false;
  
      function scrollToDiv(element,navheight){
        var offset = element.offset();
        var offsetTop = offset.top;
        var totalScroll = offsetTop-navheight;
  
        $('body,html').animate({
        scrollTop: totalScroll
        }, 300);
      }
    });

    $(window).on('scroll', function(){
      function isScrollIntoView(elem, index) {
        var docViewTop = $(window).scrollTop();
        var docViewBottom = docViewTop + $(window).height();
        var elemTop = $(elem).offset().top;
        var elemBottom = elemTop + $(window).height()*.5;
        if(elemBottom <= docViewBottom && elemTop >= docViewTop) {
          $(elem).addClass('active');
        }
        if(!(elemBottom <= docViewBottom)) {
          $(elem).removeClass('active');
        }
        var MainTimelineContainer = $('#vertical-scrollable-timeline')[0];
        var MainTimelineContainerBottom = MainTimelineContainer.getBoundingClientRect().bottom - $(window).height()*.5;
        $(MainTimelineContainer).find('.inner').css('height',MainTimelineContainerBottom+'px');
      }
      var timeline = $('#vertical-scrollable-timeline li');
      Array.from(timeline).forEach(isScrollIntoView);
    });
  })(window.jQuery);