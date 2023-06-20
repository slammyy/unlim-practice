let content = document.getElementById("content");
let tbody = document.querySelector("tbody");

const getData = async () => {
    const res = await fetch('/api');
    const data = await res.json();

    for (let i = 0; i < data.length; i++) {
        let tr = document.createElement('tr');
        const id = document.createElement('td');
        const firstName = document.createElement('td');
        const secondName = document.createElement('td');
        const place = document.createElement('td');
        const salary = document.createElement('td');

        id.textContent = data[i].id;
        firstName.textContent = data[i].first_name;
        secondName.textContent = data[i].second_name;
        place.textContent = data[i].place;
        salary.textContent = data[i].salary;

        tr.append(id, firstName, secondName, place, salary);
        tbody.append(tr);

    }
    console.log(data);
};

getData();
