
  // Check for saved mode in localStorage
  const savedMode = localStorage.getItem("theme");

  // Apply dark-mode class if it was saved
  if (savedMode === "dark") {
    document.body.classList.add("dark-mode");
  }

  // Only run toggle logic if button exists (on homepage)
  const toggleButton = document.getElementById("toggle-dark");
  if (toggleButton) {
    // Set initial emoji correctly
    toggleButton.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";

    toggleButton.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");

      // Update emoji after toggle
      const isDark = document.body.classList.contains("dark-mode");
      toggleButton.textContent = isDark ? "☀️" : "🌙";

      // Save to localStorage
      localStorage.setItem("theme", isDark ? "dark" : "light");
    });
  }


  const speakerBtn = document.getElementById("speaker-toggle");
  const audio = document.getElementById("rule-audio");

  // Ensure audio is muted by default
  audio.muted = true;

  // Toggle audio and icon on click
  speakerBtn.addEventListener("click", () => {
    audio.muted = !audio.muted;

    if (!audio.muted) {
      audio.play();  // Start playing if unmuted
      speakerBtn.textContent = "🔊";
    } else {
      speakerBtn.textContent = "🔇";
    }
  });
 
