document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
  

document.getElementById('searchButton').addEventListener('click', function() {
  var searchInput = document.getElementById('searchInput').value;
  var prompt = `I'm looking for YouTube channels that focus on ${searchInput}. Can you recommend some channels that have content on this topic?`;

  // Call server-side endpoint
  fetch('/get-channel-recommendations', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: prompt }),
  })
  .then(response => response.json())
  .then(data => {
      // Extract and process the recommendations from the response
      var recommendations = data.choices[0].text.trim().split('\n');
      console.log('Recommendations:', recommendations);
      // Display the recommendations to the user here
  })
  .catch((error) => {
      console.error('Error:', error);
  });
});

  