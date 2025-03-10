//your JS code here. If required.
document.addEventListener("DOMContentLoaded", () => {
  const output = document.getElementById("output");

  // Initially add the loading row
  output.innerHTML = `<tr><td colspan="2">Loading...</td></tr>`;

  // Function to create a promise that resolves after a random delay (1-3 seconds)
  function createPromise(index) {
    const time = (Math.random() * 2 + 1).toFixed(3); // Random time between 1 and 3 seconds
    return new Promise((resolve) => {
      setTimeout(() => resolve({ index, time }), time * 1000);
    });
  }

  // Create an array of three promises
  const promises = [createPromise(1), createPromise(2), createPromise(3)];

  // Wait for all promises to resolve
  Promise.all(promises).then((results) => {
    // Remove the loading row
    output.innerHTML = "";

    // Populate the table with resolved results
    results.forEach(({ index, time }) => {
      const row = document.createElement("tr");
      row.innerHTML = `<td>Promise ${index}</td><td>${time}</td>`;
      output.appendChild(row);
    });

    // Calculate total time (max of all times)
    const totalTime = Math.max(...results.map((r) => parseFloat(r.time))).toFixed(3);
    const totalRow = document.createElement("tr");
    totalRow.innerHTML = `<td>Total</td><td>${totalTime}</td>`;
    output.appendChild(totalRow);
  });
});
