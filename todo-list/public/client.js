let btn = document.getElementById('btn');

const getTodo = async () => {
    const res = await fetch('/gettodo');
    const data = await res.json();
    btn.textContent = data.todo;
    btn.style.visibility = 'visible';
    if (data.completed) {
        btn.style.textDecoration = 'line-through'
    } else {
        btn.style.textDecoration = 'none'
    }
};

const changeStatus = async () => {
    const res = await fetch('/gettodo');
    const data = await res.json();
    if (data.completed) {
        btn.style.textDecoration = 'line-through'
    } else {
        btn.style.textDecoration = 'none'
    }
};


const todoComplete = async () => {
    await fetch('/toggle', {
        method: "POST",
    });
    changeStatus();
};

getTodo();
