let dataInput = document.querySelector('input');
dataInput.focus();

document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault();
    value = dataInput.value;
    data = { value };
    await fetch('/api', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    dataInput.value = '';
});
