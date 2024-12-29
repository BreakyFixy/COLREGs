
function updateLabel(sliderId, value, labels) {
  const label = document.getElementById(`${sliderId}Label`);
  label.textContent = labels[value - 1];
}

function generateScenario() {
  const terrain = document.getElementById('terrain').value;
  const vessels = document.getElementById('vessels').value;
  const visibility = document.getElementById('visibility').value;
  const timeOfDay = document.getElementById('timeOfDay').value;
  const weather = document.getElementById('weather').value;

  const terrainOptions = [
    "open seas with no significant hazards",
    "a wide channel with gentle bends",
    "a narrow channel bordered by rocky outcrops",
    "a congested harbor area with sharp turns",
    "treacherous waters littered with sandbanks and reefs"
  ];

  const visibilityOptions = [
    "perfect visibility with clear skies",
    "slightly reduced visibility due to haze",
    "moderate fog obscuring the horizon",
    "dense fog reducing visibility to a few meters",
    "almost no visibility due to a thick sea mist"
  ];

  const timeOptions = [
    "in broad daylight",
    "at dusk with fading light",
    "under the light of a full moon",
    "in total darkness with no moonlight",
    "at night under stormy skies"
  ];

  const weatherOptions = [
    "calm seas with light breezes",
    "a steady wind causing gentle waves",
    "choppy seas with moderate swells",
    "rough seas with high winds",
    "a full storm with heavy rain and strong gusts"
  ];

  const vesselOptions = [
    "a single fishing boat operating nearby",
    "a mix of 2 vessels, including a cargo ship and a small yacht",
    "a group of 3 vessels maneuvering in the area",
    "a fleet of 5 vessels, including tankers and fishing boats",
    "a dense traffic zone with over 10 vessels moving in various directions"
  ];

  const terrainText = terrainOptions[terrain - 1];
  const visibilityText = visibilityOptions[visibility - 1];
  const timeText = timeOptions[timeOfDay - 1];
  const weatherText = weatherOptions[weather - 1];
  const vesselText = vesselOptions[Math.min(vessels - 1, vesselOptions.length - 1)];

  const description = `You are navigating ${terrainText} ${timeText}, experiencing ${visibilityText} and ${weatherText}. Nearby, there are ${vesselText}. Your mission is to safely navigate and avoid collisions, adhering to COLREG rules.`;

  document.getElementById('scenarioDescription').style.display = 'block';
  document.getElementById('scenarioText').textContent = description;

  document.getElementById('scenarioSetup').style.display = 'none';
}

function startGame() {
  document.getElementById('scenarioDescription').style.display = 'none';
  document.getElementById('gameCanvas').style.display = 'block';

  // Initialize the game canvas
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw sea background
  ctx.fillStyle = '#87CEEB'; // Light blue for the sea
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw player vessel (blue rectangle)
  ctx.fillStyle = 'blue';
  ctx.fillRect(380, 500, 40, 60);
  ctx.fillStyle = 'white';
  ctx.fillText('Player Ship', 385, 495);

  // Draw other vessels dynamically
  const vessels = document.getElementById('vessels').value;
  for (let i = 0; i < vessels; i++) {
    const x = Math.random() * (canvas.width - 40); // Random x position
    const y = Math.random() * 300; // Random y position in upper half
    ctx.fillStyle = 'red';
    ctx.fillRect(x, y, 40, 60);
    ctx.fillStyle = 'white';
    ctx.fillText('Other Vessel', x + 5, y - 5);
  }

  // Optionally, add buoys or obstacles
  ctx.fillStyle = 'green';
  ctx.fillRect(200, 300, 20, 20); // Example buoy
  ctx.fillText('Buoy', 205, 295);
}
