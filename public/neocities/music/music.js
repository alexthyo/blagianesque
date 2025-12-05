document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("genre-overlay");
  const overlayContent = overlay.querySelector(".overlay-content");

  // Function to attach click handlers to genres
  function attachGenreHandlers(container) {
    const genres = container.querySelectorAll(".genres");
    
    genres.forEach(genre => {
      genre.addEventListener("click", (e) => {
        e.stopPropagation(); // Prevent event bubbling
        
        const artists = genre.querySelector(".genre-artists");
        if (artists) {
          const clonedArtists = artists.cloneNode(true);
          overlayContent.innerHTML = "";
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
    if (e.target === overlay) overlay.classList.add("hidden");
  });
  
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") overlay.classList.add("hidden");
  });
});