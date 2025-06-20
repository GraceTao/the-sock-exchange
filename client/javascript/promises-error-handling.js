// following code will resolve or reject randomly
// const promise = new Promise((resolve, reject) => {
//     const success = Math.random() > 0.5;

//     setTimeout(() => {
//         if (success) {
//             resolve('Promise resolved successfully');
//         } else {
//             reject(new Error('Promise rejected with an error'));
//         }
//     }, 1000);
// });

// promise
//     .then(result => {
//         console.log(result);
//     })
//     .catch(error => {
//         console.error(`Error: ${error.message}`);
//     })

fetch('http://www.example.com/api/data')
    .then(response => response.json())
    .then(data => console.log('Data: ', data))
    .catch(error => console.error('Error: ', error))
    .finally(() => console.log('Fetch attempt completed.'));