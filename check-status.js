async function checkStatus() {
      const response = await fetch("status.html");

      if (!response.ok) {
        throw new Error(
          "Failed to fetch the following URL: " +
            url +
            "<hr>" +
            "Error status: " +
            response.status +
            "<hr>" +
            "Error message: " +
            response.statusText
        );
      }

      const statusHtml = await response.text();
      document.getElementById("mt-status").innerHTML = statusHtml;
}

checkStatus();