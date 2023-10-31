import PianoRoll from './pianoroll.js';


  // Initialize the variables To get the elements from the DOM(id)
  const pianoRollContainer = document.getElementById('pianoRollContainer');
  const displayContainer = document.getElementById('displayContainer');
  const currentPianoContainer = document.getElementById('currentPianoContainer');

class PianoRollDisplay {
  constructor(csvURL) {
    this.csvURL = csvURL;
    this.data = null;
  }

  async loadPianoRollData() {
    try {
      const response = await fetch('https://pianoroll.ai/random_notes');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      this.data = await response.json();
    } catch (error) {
      console.error('Error loading data:', error);
    }
  }

  preparePianoRollCard(rollId) {
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('piano-roll-card');
    cardDiv.setAttribute('pianoIndex', rollId);
    cardDiv.addEventListener('click', getCurrentPainRoll);
    cardDiv.addEventListener('click', changeDisplay);
    

    // Create and append other elements to the card container as needed
    const descriptionDiv = document.createElement('div');
    descriptionDiv.classList.add('description');
    descriptionDiv.textContent = `This is a piano roll number ${rollId}`;
    cardDiv.appendChild(descriptionDiv);
    

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('piano-roll-svg');
    svg.setAttribute('width', '80%');
    svg.setAttribute('height', '150');

    // Append the SVG to the card container
    cardDiv.appendChild(svg);

    return { cardDiv, svg }
  }

  async generateSVGs() {
    if (!this.data) await this.loadPianoRollData();
    if (!this.data) return;
    
    const pianoRollContainer = document.getElementById('pianoRollContainer');
    pianoRollContainer.innerHTML = '';
    for (let it = 0; it < 20; it++) {
      const start = it * 60;
      const end = start + 60;
      const partData = this.data.slice(start, end);

      const { cardDiv, svg } = this.preparePianoRollCard(it)

      pianoRollContainer.appendChild(cardDiv);
      const roll = new PianoRoll(svg, partData);
    }
  }
}

document.getElementById('loadCSV').addEventListener('click', async () => {
  const csvToSVG = new PianoRollDisplay();
  await csvToSVG.generateSVGs();
});

// This Function To get the current piano roll(index)
function showCurrentPianoRoll() {
  const currentPianoContainer = document.getElementById('currentPianoContainer');
  currentPianoContainer.innerHTML = '';
  const { cardDiv, svg } = this.preparePianoRollCard(it)

  currentPianoContainer.appendChild(cardDiv);
  const roll = new PianoRoll(svg, partData);
}

function getCurrentPainRoll(id) {
  id = this.getAttribute('pianoIndex');


  console.log(element);
}


// style , add classes to change to main display 
function changeDisplay() {
  pianoRollContainer.classList.add('painRollMainState');
  displayContainer.classList.add('displayContainerMainState');
  currentPianoContainer.classList.add('currentPianoMainState');
}



// I need Function to get the current piano roll and display it in the main display

