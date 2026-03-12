document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("genre-overlay");
  const overlayContent = overlay.querySelector(".overlay-content");
  
  // Stack to keep track of overlay history
  let overlayHistory = [];

  // Function to close the overlay
  window.closeOverlay = function() {
    if (overlayHistory.length > 0) {
      // Go back to previous state
      const previousContent = overlayHistory.pop();
      overlayContent.innerHTML = "";
      overlayContent.append(...previousContent);
      // Re-attach handlers to the restored content
      attachGenreHandlers(overlayContent);
    } else {
      // No history, close overlay completely
      overlay.classList.add("hidden");
    }
  };

  // Function to attach click handlers to genres
  function attachGenreHandlers(container) {
    const genres = container.querySelectorAll(".genres");
    
    genres.forEach(genre => {
      genre.addEventListener("click", (e) => {
        e.stopPropagation(); // Prevent event bubbling
        
        const artists = genre.querySelector(".genre-artists");
        if (artists) {
          // Save current content to history before replacing (only if overlay is already open)
          if (!overlay.classList.contains("hidden") && overlayContent.children.length > 0) {
            const currentContent = Array.from(overlayContent.children);
            overlayHistory.push(currentContent);
          }
          
          const clonedArtists = artists.cloneNode(true);
          
          // Check if this genre has subgenres or direct artists
          const hasSubgenres = clonedArtists.querySelector(".genres");
          
          overlayContent.innerHTML = "";
          
          // Add back button for genres without subgenres (direct artists), but only if not already present
          if (!hasSubgenres && !clonedArtists.querySelector("button")) {
            const backButton = document.createElement("button");
            backButton.textContent = "Go Back";
            backButton.onclick = closeOverlay;
            backButton.style.marginBottom = "20px";
            overlayContent.appendChild(backButton);
          }
          
          overlayContent.append(...clonedArtists.children);
          
          // Attach handlers to any nested genres in the cloned content
          attachGenreHandlers(overlayContent);
          
          overlay.classList.remove("hidden");
        }
      });
    });
  }

  // Initial attachment to page genres
  attachGenreHandlers(document);

  // Close overlay when clicking outside or pressing ESC
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      overlayHistory = []; // Clear history when closing via outside click
      overlay.classList.add("hidden");
    }
  });
  
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      overlayHistory = []; // Clear history when closing via ESC
      overlay.classList.add("hidden");
    }
  });
});