// R6 Operator Wheel
// This script handles the functionality of the R6 Operator Wheel.

const toggle = document.getElementById('modeToggle');
const setDefenders = document.getElementById('setDefenders');
const setAttackers = document.getElementById('setAttackers');

const iconWrappers = document.querySelectorAll('.icon-wrapper');
const activeAttackers = new Set();
const activeDefenders = new Set();


toggle.addEventListener("change", () => {
    if (toggle.checked) {
        setAttackers.classList.remove('hidden');
        setDefenders.classList.add('hidden');
    }
    else {
        setDefenders.classList.remove('hidden');
        setAttackers.classList.add('hidden');
    }
})

// Add event listeners to each icon to toggle
// the 'excluded' class and update the active sets
iconWrappers.forEach(iconWrapper => {
    // Add initially as included
    const parentId = iconWrapper.parentElement.id;
    const icon = iconWrapper.querySelector('img');
    if (parentId === 'setAttackers') {
        activeAttackers.add(icon);
    }
    else if (parentId === 'setDefenders') {
        activeDefenders.add(icon);
    }

    iconWrapper.addEventListener('click', () => {
        iconWrapper.classList.toggle('excluded');

        if (iconWrapper.classList.contains('excluded')) {
            if (parentId === 'setAttackers') activeAttackers.delete(icon);
            else if (parentId === 'setDefenders') activeDefenders.delete(icon);
        }
        else {
            if (parentId === 'setAttackers') activeAttackers.add(icon);
            else if (parentId === 'setDefenders') activeDefenders.add(icon);
        }
    });
});

function spinWheel() {
    const resultField = document.getElementById('result');
    const selectionSet = toggle.checked ? activeAttackers : activeDefenders;
    const iconsArray = Array.from(selectionSet);

    if (iconsArray.length === 0) {
        resultField.textContent = "No operators selected!";
        return;
    }

    const randomIndex = Math.floor(Math.random() * iconsArray.length);
    const selectedIcon = iconsArray[randomIndex];
    resultField.textContent = "You got: " + selectedIcon.alt;
}

function resetOps() {
    iconWrappers.forEach(iconWrapper => {
        if (iconWrapper.classList.contains('excluded')) {
            iconWrapper.classList.remove('excluded');
            const parentId = iconWrapper.parentElement.id;
            const icon = iconWrapper.querySelector('img');

            if (parentId === 'setAttackers') activeAttackers.add(icon);
            else if (parentId === 'setDefenders') activeDefenders.add(icon);
        }
    })
}

toggle.dispatchEvent(new Event('change'));