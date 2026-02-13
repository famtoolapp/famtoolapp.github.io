// version-check.js
// This script checks for new updates on GitHub Pages and automatically reloads the page.

(function() {
    // How often to check for updates (in milliseconds)
    // 30 seconds = 30000 ms
    const CHECK_INTERVAL = 30000; 

    // Get the current version from the script tag's query parameter (e.g., ?v=4)
    // This assumes you include this script like: <script src="version-check.js?v=4"></script>
    const currentScript = document.currentScript;
    const currentVersionMatch = currentScript.src.match(/v=(\d+)/);
    const currentVersion = currentVersionMatch ? parseInt(currentVersionMatch[1]) : null;

    if (!currentVersion) {
        console.warn("Version Check: Could not determine current version from script tag.");
        return;
    }

    console.log(`Version Check: Current version is ${currentVersion}. Monitoring for updates...`);

    async function checkForUpdates() {
        try {
            // Fetch version.json with a timestamp to bypass browser cache
            // This forces the browser to specificially ask GitHub: "What is the file right now?"
            const response = await fetch(`version.json?t=${new Date().getTime()}`);
            
            if (!response.ok) {
                console.warn("Version Check: Could not fetch version.json");
                return;
            }

            const data = await response.json();
            const latestVersion = parseInt(data.version);

            console.log(`Version Check: Latest version on server is ${latestVersion}`);

            if (latestVersion > currentVersion) {
                console.log("Version Check: New version found! Reloading...");
                
                // Optional: Notify user before reloading
                // if (confirm("A new version of the app is available. Reload now?")) {
                //    window.location.reload(true); 
                // }
                
                // Force reload from server (ignoring cache)
                window.location.reload(true);
            }
        } catch (error) {
            console.error("Version Check: Error checking for updates:", error);
        }
    }

    // Check immediately on load
    checkForUpdates();

    // Then check periodically
    setInterval(checkForUpdates, CHECK_INTERVAL);

    // Also check when the user comes back to the tab
    document.addEventListener("visibilitychange", () => {
        if (!document.hidden) {
            checkForUpdates();
        }
    });

})();