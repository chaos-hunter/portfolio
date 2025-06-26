document.addEventListener("DOMContentLoaded", () => {
    const about = document.getElementById("about-me");
    const text  = about.textContent.trim();
    const words = text.split(/\s+/);
  
    // replace text with spans
    about.innerHTML = "";
    words.forEach(w => {
      const span = document.createElement("span");
      span.className = "word";
      span.textContent = w;              
      about.appendChild(span);
      about.appendChild(document.createTextNode(" ")); 
    });
    
  
    const spans     = about.querySelectorAll(".word");
    const fadeDelay = 400;   // ms between each word
    const pause     = 900;  // ms to wait once full sentence is shown
  
    function animate() {
      spans.forEach((span, i) => {
        setTimeout(() => span.classList.add("visible"), i * fadeDelay);
      });
  
      const totalTime = spans.length * fadeDelay + pause;
  
      // after full show, hide all and restart
      setTimeout(() => {
        spans.forEach(span => span.classList.remove("visible"));
      }, totalTime);
  
      setTimeout(animate, totalTime + fadeDelay);
    }
  
    animate();
  });
  