export const testFetch = () => {
    return fetch('http://localhost:8080/api/topics')
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .then(console.log)
        .catch(error => console.error('Fetch error:', error));
};
