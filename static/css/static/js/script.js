async function downloadReel() {
    const reelUrl = document.getElementById("reelUrl").value.trim();
    const preview = document.getElementById("preview");

    if (!reelUrl) {
        preview.innerHTML = "<p style='color: red;'>⚠️ Please paste a valid Instagram Reels URL.</p>";
        return;
    }

    preview.innerHTML = "<p>⏳ Fetching video... please wait.</p>";

    try {
        const response = await fetch("/download", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url: reelUrl })
        });

        const result = await response.json();

        if (result.success) {
            preview.innerHTML = `
                <h3>✅ Video Preview:</h3>
                <video src="${result.video_url}" controls width="100%" style="max-width: 360px; border-radius: 8px;"></video>
                <br><br>
                <a href="${result.video_url}" download class="download-btn">⬇️ Click here to download</a>
            `;
        } else {
            preview.innerHTML = `<p style="color: red;">❌ ${result.message}</p>`;
        }
    } catch (error) {
        console.error("Download error:", error);
        preview.innerHTML = "<p style='color: red;'>🚫 Something went wrong. Please try again later.</p>";
    }
}
