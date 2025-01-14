document.addEventListener("DOMContentLoaded", () => {
    const dragItem = document.querySelector(".drag");
    const emojis = document.querySelectorAll(".emoji");
    const resultText = document.querySelector("#result");
  
    // Reaction counts
    const reactionCounts = {
      "🔥": 0,
      "👌": 0,
      "🗑️": 0,
    };
  
    // Dragging logic
    dragItem.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text", "dragging");
      dragItem.style.opacity = "0.5";
    });
  
    dragItem.addEventListener("dragend", () => {
      dragItem.style.opacity = "1";
    });
  
    // Emoji drop zones
    emojis.forEach((emoji) => {
      emoji.addEventListener("dragover", (e) => {
        e.preventDefault();
        emoji.classList.add("drop-target");
      });
  
      emoji.addEventListener("dragleave", () => {
        emoji.classList.remove("drop-target");
      });
  
      emoji.addEventListener("drop", (e) => {
        e.preventDefault();
        emoji.classList.remove("drop-target");
  
        const emojiReaction = emoji.dataset.emoji;
  
        // Increment the reaction count
        reactionCounts[emojiReaction]++;
        emoji.querySelector(".count-display").innerText = reactionCounts[emojiReaction];
  
        // Display feedback
        resultText.innerText = `You reacted with: ${emojiReaction}`;
        resultText.style.color = "#007bff";
  
        // Add animation
        emoji.classList.add("active");
        setTimeout(() => emoji.classList.remove("active"), 300);
      });
    });
  });
  