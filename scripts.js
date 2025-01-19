// Fetch the downtime.json file
fetch('downtime.json')
  .then(response => response.json())
  .then(edata => {
    // Get the container for incident reports
    const data = edata["incidents"];
    const incidentList = document.getElementById('incident-list');

    // Check if there are any incidents
    if (data.length > 0) {
      // Get the latest incident (the last one in the array)
      const latestIncident = data[data.length - 1];

      // Create the incident item for the latest incident
      const incidentItem = document.createElement('div');
      incidentItem.classList.add('incident-item');

      // Check if the latest incident has no endTime (i.e., still ongoing)
      if (!latestIncident.endTime) {
        incidentItem.innerHTML = `
          <h3>${latestIncident.title}</h3>
          <p>${latestIncident.description}</p>
          <p><span class="status" style="color: red;">Service is down</span></p>
          <p class="date">Start Time: ${new Date(latestIncident.startTime).toLocaleString()}</p>
        `;
      } else {
        incidentItem.innerHTML = `
          <h3>${latestIncident.title}</h3>
          <p>${latestIncident.description}</p>
          <p><span class="status">${latestIncident.status}</span></p>
          <p class="date">Start Time: ${new Date(latestIncident.startTime).toLocaleString()}</p>
          <p class="date">End Time: ${new Date(latestIncident.endTime).toLocaleString()}</p>
        `;
      }

      // Append the new incident to the list
      incidentList.appendChild(incidentItem);

      // Loop through the rest of the incidents (if any)
      data.slice(0, -1).forEach(incident => {
        const incidentItem = document.createElement('div');
        incidentItem.classList.add('incident-item');

        incidentItem.innerHTML = `
          <h3>${incident.title}</h3>
          <p>${incident.description}</p>
          <p><span class="status">${incident.status}</span></p>
          <p class="date">Start Time: ${new Date(incident.startTime).toLocaleString()}</p>
          <p class="date">End Time: ${new Date(incident.endTime).toLocaleString()}</p>
        `;
        incidentList.appendChild(incidentItem);
      });
    } else {
      incidentList.innerHTML = "<p>No incidents found.</p>";
    }
  })
  .catch(error => console.error('Error loading downtime.json:', error));
