function syncFunc() {
    console.log('This is a synchronous function');
}

async function asyncFunc() {
    // Simulate a delay using Promise and setTimeout
    const result = await new Promise((resolve, _reject) => {
        setTimeout(() => {
            resolve('This is an asynchronous function');
        }, 2000);
    });
    console.log(result);
}

syncFunc();
asyncFunc();
console.log('End of script');

// Fetch data from an API using .then
fetch('http://localhost:9000/api/socks/1/3')
    .then(response => response.json())
    .then(data => {
        console.log('Data received:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });

// Fetch data from an API using async/await
async function fetchData() {
    try {
        const response = await fetch('http://localhost:9000/api/socks/1/3');
        const data = await response.json();
        console.log('Data received:', data);
    } catch (error) {
        console.error('Error:', error);
    }
}
fetchData();