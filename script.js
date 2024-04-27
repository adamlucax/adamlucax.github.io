function loadPage(pageUrl) {
    fetch(pageUrl)
        .then(response => response.text())
        .then(html => {
            document.getElementById('subpage-container').innerHTML = html;
        })
        .catch(error => console.error('Error loading page:', error));
}

// Function to load subpage based on hash fragment
function loadSubpageFromHash() {
    var hash = window.location.hash.substring(1); // Remove '#' from hash
    var subpage = hash + '.html';
    var defaultPage = 'about.html'; // Default page
    
    // Check if the specified subpage exists
    var xhr = new XMLHttpRequest();
    xhr.open('HEAD', subpage, true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            // Subpage exists, load it
            loadPage(subpage);
        } else {
            // Subpage does not exist, load default page
            loadPage(defaultPage);
        }
    };
    xhr.onerror = function() {
        // Error occurred while checking subpage existence, load default page
        loadPage(defaultPage);
    };
    xhr.send();
}