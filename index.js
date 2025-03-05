let userInput;
let submitBtn;
let paycheckOptions;
let parsedInput;
let selectedOption;
let savedIn3Months, savedIn6Months, savedIn12Months;
let savedIn3MonthsBiWeekly, savedIn6MonthsBiWeekly, savedIn12MonthsBiWeekly;

function initialize() {
    userInput = document.getElementById('tskInput');
    submitBtn = document.getElementById('submitBtn');
    paycheckOptions = document.getElementById('paycheckOptions');
}

function getData(){
    let inputValue = userInput.value;
    parsedInput = parseInt(inputValue);
    selectedOption = paycheckOptions.value;

    if(Number.isInteger(parsedInput)) {
        console.log("valid int: ", parsedInput)
        console.log(selectedOption)
    } else {
        console.log('invalid input')
        // console.log(typeof(parsedInput))
    }

    // if(selectedOption === 'Weekly') {
    //     console.log(parsedInput*3, 'will be saved in three monthly with a weekly check')
    // }

    useParsedInput(parsedInput);
}

function useParsedInput(amount) {
    if(selectedOption === 'Weekly') {
        savedIn3Months = amount * 3;
        savedIn6Months = amount * 6;
        savedIn12Months = amount * 12;
        console.log(' weekly 3,6,12 months: ',savedIn3Months, savedIn6Months, savedIn12Months)
    } else if(selectedOption === 'Bi-weekly') {
        savedIn3MonthsBiWeekly = amount * 6;
        savedIn6MonthsBiWeekly = amount * 13;
        savedIn12MonthsBiWeekly = amount * 26;
        console.log('bi weekly 3,6,12', savedIn3MonthsBiWeekly, savedIn6MonthsBiWeekly, savedIn12MonthsBiWeekly )
    }
    generateDoughnutChart(amount);
    updateBarChart();
}


function handleSubmit() {
    getData();
    // useParsedInput(parsedInput);
}

function generateDoughnutChart(amount) {
    // Budget breakdown
    const needs = amount * 0.50;
    const wants = amount * 0.30;
    const savings = amount * 0.20;

    // If a chart already exists, destroy it to prevent multiple charts
    // if (doughnutChart) {
    //     doughnutChart.destroy();
    // }

    // Get the canvas context for rendering the chart
    const ctx = document.getElementById('dChart').getContext('2d');

    // Create a new doughnut chart
    doughnutChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Needs', 'Wants', 'Savings'],
            datasets: [{
                label: 'Budget Allocation',
                data: [needs, wants, savings],
                backgroundColor: ['#ff9999', '#66b3ff', '#99ff99'], // Color for each section
                hoverOffset: 4,
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            const percentage = Math.round((tooltipItem.raw / amount) * 100);
                            return `${tooltipItem.label}: $${tooltipItem.raw} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
}

function updateBarChart() {
    // Get canvas context
    const ctx = document.getElementById('barChart').getContext('2d');

    // Destroy previous chart if it exists
    // if (window.barChart) {
    //     window.barChart.destroy();
    // }

    // Create a new bar chart
    window.barChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['3 Months', '6 Months', '12 Months'],
            datasets: [{
                label: 'Amount Saved ($)',
                data: selectedOption === 'Weekly' ?
                    [savedIn3Months, savedIn6Months, savedIn12Months] :
                    [savedIn3MonthsBiWeekly, savedIn6MonthsBiWeekly, savedIn12MonthsBiWeekly],
                backgroundColor: ['#ff9999', '#66b3ff', '#99ff99'],
                borderColor: ['#ff6666', '#3399ff', '#66cc66'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                legend: {
                    position: 'top'
                }
            }
        }
    });
}

initialize();
submitBtn.addEventListener('click', handleSubmit);


