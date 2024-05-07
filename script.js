  // iframe carousel
  let currentIndex = 0;
  const totalSlides = document.querySelectorAll('.iframe-wrapper').length;
  const carousel = document.getElementById('carousel');
  function prevSlide() {
    currentIndex = (currentIndex === 0) ? totalSlides - 1 : currentIndex - 1;
    updateCarousel();
  }
  function nextSlide() {
    currentIndex = (currentIndex === totalSlides - 1) ? 0 : currentIndex + 1;
    updateCarousel();
  }
  function updateCarousel() {
    const offset = -currentIndex * 100;
    carousel.style.transform = `translateX(${offset}%)`;
  }

  // Global variable to keep track of the active tab
  let activeTabIndex = null;

  // Function to toggle the display of content based on the tab clicked
  function showContent(tabIndex) {
    // Get the selected tab
    const selectedTab = document.querySelector('.tab:nth-child(' + tabIndex + ')');

    // Check if the selected tab is already active
    if (selectedTab.classList.contains('active')) {
      // If the selected tab is already active, close the corresponding content
      document.getElementById('content' + tabIndex).style.display = 'none';
      selectedTab.classList.remove('active');
      // Reset the activeTabIndex variable
      activeTabIndex = null;
    } else {
      // Hide all content divs
      const contents = document.querySelectorAll('.content');
      contents.forEach(function(content) {
        content.style.display = 'none';
      });
      // Remove active class from all tabs
      const tabs = document.querySelectorAll('.tab');
      tabs.forEach(function(tab) {
        tab.classList.remove('active');
      });
      // Show the selected content and add active class to the tab
      document.getElementById('content' + tabIndex).style.display = 'block';
      selectedTab.classList.add('active');
      // Update the activeTabIndex variable
      activeTabIndex = tabIndex;

      // Specify the offset in viewport height (vh)
      const offsetVH = 32; // Adjust this value as needed

      // Calculate the height of the header
      const headerHeight = document.querySelector('header').offsetHeight;

      // Set a fixed offset value (in pixels) below the header
      const fixedOffset = headerHeight + 11; // Adjust as needed

      // Scroll to just below the header with the fixed offset
      window.scrollTo({
        top: fixedOffset,
        behavior: 'smooth'
      });
    }
  }

  // Function to smoothly scroll back to top
  function scrollToTop() {
    const scrollStep = -window.scrollY / (500 / 15);
    const scrollInterval = setInterval(function() {
      if (window.scrollY != 0) {
        window.scrollBy(0, scrollStep);
      } else clearInterval(scrollInterval);
    }, 15);
  }

  // Show back-to-top button when scrolling down
  window.onscroll = function() {
    scrollFunction()
  };

  function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      document.querySelector('.back-to-top').style.display = "block";
    } else {
      document.querySelector('.back-to-top').style.display = "none";
    }
  }

  // Get the modal
  const modal = document.getElementById('myModal');

  // Get the <span> element that closes the modal
  const span = document.getElementsByClassName('close')[0];

  // When the page loads, open the modal
  window.onload = function() {
    modal.style.display = 'block';
  };

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = 'none';
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  };

  document.addEventListener("DOMContentLoaded", function() {
    const modal = document.getElementById('myModal');
    modal.style.display = 'block';
  });

// Function to remove height: 600px from carousel when window is narrow
function adjustCarouselHeight() {
  const windowWidth = window.innerWidth;
  const carousel = document.getElementById('carousel');
  if (windowWidth <= 1250 && windowWidth > 950) {
    // Remove the height style if window width is less than or equal to 1250px and greater than 768px
    carousel.style.height = '450px';
    document.querySelectorAll('.arrow').forEach(arrow => {
      arrow.style.top = '60%'; // Adjust this value as needed
    });
  } else if (windowWidth <= 950) {
    // Adjust the height for even narrower windows
    carousel.style.height = '270px'; // Set the height to a suitable value for narrow windows
    document.querySelectorAll('.arrow').forEach(arrow => {
      arrow.style.top = '70%'; // Adjust this value as needed
    });
  } else {
    // Set the height to 600px for wider windows
    carousel.style.height = '600px';
    document.querySelectorAll('.arrow').forEach(arrow => {
      arrow.style.top = '60%'; // Adjust this value as needed
    });
  }
}

// Call the function initially
adjustCarouselHeight();

// Listen for window resize events
window.addEventListener('resize', adjustCarouselHeight);

// Function to close the modal and start countdown
window.addEventListener('load', function() {
    const modal = document.getElementById('myModal');
    const modalContent = modal.querySelector('.modal-content');
    const countdownElement = document.createElement('p');
    countdownElement.classList.add('countdown');
    countdownElement.style.color = '#7b7b7b'; // Change the color here
    countdownElement.style.fontSize = '0.9em'; // Change the font size here
    modalContent.appendChild(countdownElement);
    
    let secondsRemaining = 3; // Set the duration of the countdown
    countdownElement.textContent = `This window will automatically close in (${secondsRemaining}) seconds.`;

    const countdownInterval = setInterval(function() {
        secondsRemaining--;
        countdownElement.textContent = `This window will automatically close in (${secondsRemaining}) seconds.`;
        if (secondsRemaining <= 0) {
            clearInterval(countdownInterval);
            modal.style.display = 'none';
        }
    }, 1000);
});

// Function to close the currently open tab content
function closeTabContent() {
    if (activeTabIndex !== null) {
        // Get the currently open tab content
        const openContent = document.getElementById('content' + activeTabIndex);
        // Hide the content
        openContent.style.display = 'none';
        // Remove the 'active' class from the corresponding tab
        const activeTab = document.querySelector('.tab:nth-child(' + activeTabIndex + ')');
        activeTab.classList.remove('active');
        // Reset the activeTabIndex variable
        activeTabIndex = null;
    }
}

// Function to adjust the font size of tab text when window is resized
function adjustTabFontSize() {
    const windowWidth = window.innerWidth;
    const tabs = document.querySelectorAll('.tab p');
    if (windowWidth <= 740) {
      // Adjust the font size for smaller windows
      tabs.forEach(tab => {
        tab.style.fontSize = '1.6vw'; // Adjust the font size as needed
      });
    } else if (windowWidth <= 1250) {
      // Adjust the font size for middle-sized windows
      tabs.forEach(tab => {
        tab.style.fontSize = '1.7vw'; // Adjust the font size as needed
      });
    } else {
      // Reset the font size for wider windows
      tabs.forEach(tab => {
        tab.style.fontSize = '1.8vw'; // Reset to original font size
      });
    }
  }

  // Call the function initially
  adjustTabFontSize();

  // Listen for window resize events
  window.addEventListener('resize', adjustTabFontSize);
