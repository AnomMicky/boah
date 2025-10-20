const boxes = document.querySelectorAll(".box");
const initialPrompt = document.getElementById("initialPrompt");
const messageCard = document.getElementById("messageCard");
const messageTitle = document.getElementById("messageTitle");
const messageText = document.getElementById("messageText");
const stage = document.getElementById("stage");
const frame = document.getElementById("frame");
const folds = document.querySelectorAll(".fold");

const messages = [
  // Existing 7 Compliments (Index 0-6)
  {
    title: "So so Gorgeous",
    text: "If i have to write about your beauty, I would need a whole library worth books to write and they will still not be enough 😍. You are stunning inside and out.",
  },
  {
    title: "Brilliant",
    text: "The way you can think of multiple solutions to a problem is truly impressive and believe me when I say that you are one of the smartest people I know 🥹🤩. You got this my love mwahhhhhhhh mwahhhhhhhhhhh",
  },
  {
    title: "Grr grr",
    text: "I learn so so much from you that I genuinely improve as a person just by being around you. I'm truly grateful about that des 🤭🥹",
  },
  {
    title: "Kind",
    text: "Boo boo makes sure that everyone around you feels valued and loved. Your kindness is the best thing in this whole world 🥹",
  },
  {
    title: "Tease",
    text: "Hehehehehhehe I get one chance to tease you right gehehehehhehehe, eitherways you will tease me so so much anyway 😛😛 so My 21 year old come here come here 😘😘",
  },
  {
    title: "Strong",
    text: "I'm really really amazed by how you can just get back up everytime something happens and I truly admire that about you my love 🥹, just keep going forward and you will do wonderful in life.",
  },
  {
    title: "No matter what",
    text: "Just know that no matter what happens, you will do so so amazing and you are very well capable of achieving anything you set your mind to. I believe in you always 🥹❤️",
  },
  
];

// --- FOLDING ANIMATION CONTROLS ---

const resetFoldingAnimation = () => {
    // 1. Reset all animation classes on the folds and frame
    folds.forEach(fold => fold.classList.remove("unfold-anim"));
    
    // Reset the new sequential reveal classes
    frame.classList.remove("show-content", "title-reveal", "text-reveal");
    
    // 2. Hide the frame content immediately
    frame.style.opacity = 0;
    
    // 3. Reset the message card size/visibility
    messageCard.classList.remove("show");
    stage.classList.remove("unfold");
    
    // 4. Reset the folds to their initial state for the next animation run
    document.querySelector(".fold-2").style.transform = "rotateY(180deg)";
    document.querySelector(".fold-3").style.transform = "rotateX(180deg)";
    document.querySelector(".fold-4").style.transform = "rotateX(180deg)";
}


const startFoldingAnimation = (boxIndex) => {
    const message = messages[boxIndex];
    messageTitle.textContent = message.title;
    messageText.textContent = message.text;
    
    messageTitle.style.color = getComputedStyle(
        boxes[boxIndex].querySelector("div")
    ).backgroundColor;

    // 1. Show the message card container, hide the prompt, and scale up the stage (0.5s CSS transition)
    messageCard.classList.add("show");
    initialPrompt.classList.add("hide");

    setTimeout(() => {
        stage.classList.add("unfold");
    }, 50); 

    // 2. Start the first two folds (Fold 1 and 2) after stage scale-up (at 0.55s)
    setTimeout(() => {
        document.querySelector(".fold-1").classList.add("unfold-anim");
        document.querySelector(".fold-2").classList.add("unfold-anim");
    }, 550); 

    // 3. Start the second two folds (Fold 3 and 4) (at 1.55s)
    setTimeout(() => {
        document.querySelector(".fold-3").classList.add("unfold-anim");
        document.querySelector(".fold-4").classList.add("unfold-anim");
    }, 1550); 

    // 4. Reveal Frame Container: This triggers the background color and box shadow (at 2.0s)
    setTimeout(() => {
        frame.classList.add("show-content");
    }, 2000); 

    // 5. Reveal Title (h2): Starts 0.3s after the container has appeared (at 2.3s)
    setTimeout(() => {
        frame.classList.add("title-reveal");
    }, 2300);

    // 6. Reveal Text (p): Starts 0.7s after the title begins to reveal (at 3.0s),
    // creating a sequential top-to-bottom effect.
    setTimeout(() => {
        frame.classList.add("text-reveal");
    }, 3000);
};

// This function acts as the entry point, ensuring cleanup before starting the new animation
const updateMessage = (boxIndex) => {
    resetFoldingAnimation();
    
    // Introduce a slight delay to allow the reset to fully register before starting the new sequence
    setTimeout(() => {
        startFoldingAnimation(boxIndex);
    }, 100); 
};


// --- AUTOMATIC CYCLING LOGIC ---
let current = 1;

let interval = setInterval(() => {
    if (current > boxes.length) current = 1; // Correctly uses the new count of 14 boxes

    resetFoldingAnimation();
    
    // Delay switching the box and starting the new animation sequence
    setTimeout(() => {
        boxes.forEach((box, index) => {
            if (index + 1 === current) {
                box.classList.add("active");
            } else {
                box.classList.remove("active");
            }
        });
        
        updateMessage(current - 1);
        current++;
    }, 200); 

}, 5000); // 5 seconds interval

// --- USER INTERACTION (CLICK LOGIC) ---
boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    clearInterval(interval); // Stop the automatic cycling

    // Make the clicked box the only active one
    boxes.forEach((cube) => cube.classList.remove("active"));
    box.classList.add("active");

    updateMessage(index); // Start the unfolding process
  });
});
