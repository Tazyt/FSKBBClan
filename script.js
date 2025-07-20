// Page transition functionality
function showSection(sectionName) {
    // Get all page sections
    const sections = document.querySelectorAll('.page-section');
    const targetSection = document.getElementById(sectionName + '-section');
    
    if (!targetSection) return;
    
    // First, fade out all sections
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // After a brief delay, show the target section
    setTimeout(() => {
        targetSection.classList.add('active');
    }, 100);
}

// Slider functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check if members section should be shown
    const membersSection = document.getElementById('members-section');
    if (typeof SHOW_MEMBERS_SECTION !== 'undefined' && !SHOW_MEMBERS_SECTION) {
        if (membersSection) {
            membersSection.style.display = 'none';
        }
        return; // Exit early if members section is hidden
    }

    const slider = document.querySelector('.slider');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const memberCards = document.querySelectorAll('.member-card');

    if (!slider || !prevBtn || !nextBtn || memberCards.length === 0) {
        console.error("Slider elements not found.");
        return;
    }

    let currentIndex = 0;
    const cardWidth = memberCards[0].offsetWidth + 20; // card width + gap

    function updateSliderPosition() {
        slider.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }

    nextBtn.addEventListener('click', () => {
        const sliderContainerWidth = slider.parentElement.offsetWidth;
        const visibleCards = Math.floor(sliderContainerWidth / cardWidth);
        const maxIndex = memberCards.length - visibleCards;
        
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateSliderPosition();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSliderPosition();
        }
    });

    // Recalculate on window resize
    window.addEventListener('resize', () => {
        // Reset to start on resize to avoid layout issues
        currentIndex = 0; 
        updateSliderPosition();
    });
});
