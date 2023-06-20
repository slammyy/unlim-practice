let dataInput = document.querySelector('input');

document.querySelector('form').addEventListener('submit', async (e) => {
    value = dataInput.value;
    e.preventDefault();
    console.log(value);
    data = { value };
    await fetch('/api', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
});
