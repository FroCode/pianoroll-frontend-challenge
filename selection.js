export function attachSelectionListeners() {
    let isSelecting = false;
    let selectionStartX = 0;
    let selectionEndX = 0;
    let selectedRange;

    const largeSvgContainer = document.getElementById('large-svg-container');
    const cardDescription = document.getElementById('currentPianoContainer');

    // Create "Start Point" and "End Point" elements
    const rangeContainer = document.createElement('div');
    const startPointLabel = document.createElement('div');
    startPointLabel.textContent = 'Start Point: ';
    const startPointSpan = document.createElement('span');
    startPointLabel.appendChild(startPointSpan);

    const endPointLabel = document.createElement('div');
    endPointLabel.textContent = 'End Point: ';
    const endPointSpan = document.createElement('span');
    endPointLabel.appendChild(endPointSpan);
    rangeContainer.classList.add('range-container');

    // Append the labels to cardDescription
    rangeContainer.appendChild(startPointLabel);
    rangeContainer.appendChild(endPointLabel);
    cardDescription.appendChild(rangeContainer);

    largeSvgContainer.addEventListener('mousedown', (e) => {
        isSelecting = true;
        selectionStartX = e.clientX - largeSvgContainer.getBoundingClientRect().left;
        updateSelection();
    });

    largeSvgContainer.addEventListener('mousemove', (e) => {
        if (isSelecting) {
            selectionEndX = e.clientX - largeSvgContainer.getBoundingClientRect().left;
            updateSelection();
        }
    });

    largeSvgContainer.addEventListener('mouseup', () => {
        isSelecting = false;
    });

    function updateSelection() {
        const startX = Math.min(selectionStartX, selectionEndX);
        const endX = Math.max(selectionStartX, selectionEndX);

        if (!selectedRange) {
            const rect = document.createElement('div');
            rect.classList.add('selected-range');
            largeSvgContainer.appendChild(rect);
            selectedRange = rect;

            // Create a reset button
            const resetButton = document.createElement('div');
            resetButton.textContent = 'click to reset';
            rect.addEventListener('click', () => {
                resetSelection();
                resetButton.textContent = '';
            });
            // Append the reset button inside the selected range
            selectedRange.appendChild(resetButton);
        }

        selectedRange.style.left = startX + 'px';
        selectedRange.style.width = endX - startX + 'px';

        // Update the start and end points
        startPointSpan.textContent = `${startX}px`;
        endPointSpan.textContent = `${endX}px`;
    }

    function resetSelection() {
        // Reset the selection by removing the selected range
        if (selectedRange) {
            largeSvgContainer.removeChild(selectedRange);
            selectedRange = null;
            startPointSpan.textContent = ''; // Clear the start point text
            endPointSpan.textContent = ''; // Clear the end point text
        }
    }
}