// Data object mapping food types to their carbon footprints
/* Vegan

Vegetarian

Pescatarian

Low meat

Lots of meat

Medium meat

2.89 kg >
3.81 kg >
3.91 kg >
4.67 kg >
7.19 kg >
5.63 kg > */
const foodData = {
  Vegan: 2.89,
  Vegetarian: 3.81,
  Pescatarian: 3.91,
  'Low meat': 4.67,
  'Lots of meat': 7.19,
  'Medium meat': 5.63,
}

// Get all food buttons
const foodButtons = document.querySelectorAll('.food-button')

// Get all count buttons
let countButtons = document.querySelectorAll('.count-button')

// Get the reset button
const resetButton = document.querySelector('.reset-button')

// Get the table
const calculationTable = document.querySelector('.calculation-table')

// Variable to store the selected foods
let selectedFoods = []

let count = 1

// Add event listeners to the count buttons
countButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Store the selected count
    count = parseInt(button.textContent)

    // Update the count buttons
    countButtons.forEach(button => {
      button.classList.remove('selected')
    })
    button.classList.add('selected')
  })
})

// Add event listeners to the food buttons
foodButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Store the selected food
    const food = button.textContent

    // Calculate the footprint
    const footprint = foodData[food] * count

    // Add the selected food, count, and footprint to the array
    for (let i = 0; i < count; i++) {
      selectedFoods.push({ food, footprint })
    }

    // Update the table
    updateTable()
  })
})

// Add event listener to the reset button
resetButton.addEventListener('click', () => {
  // Clear the selected foods
  selectedFoods = []

  // Update the table
  updateTable()
})

// Function to update the table
const totalDisplay = document.querySelector('.total-display')

function updateTable() {
  // Clear the table
  while (calculationTable.rows.length > 1) {
    calculationTable.deleteRow(1)
  }

  // Add a new row to the table for each selected food
  selectedFoods.forEach(({ food, footprint }) => {
    const row = calculationTable.insertRow()
    const cell1 = row.insertCell()
    const cell2 = row.insertCell()
    cell1.textContent = food
    cell2.textContent = footprint
  })

  // Calculate the total footprint
  const total = selectedFoods.reduce((acc, { footprint }) => acc + footprint, 0)
  totalDisplay.textContent = total.toFixed(2) + ' kg CO2e'
}
