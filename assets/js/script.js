function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = [
                [1, 2, 3, 4, 5, 6, 7, 8, 9],
                ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
                ['jan', 'feb', 'mar', 'apr', 'may'],
            ];
            resolve(data);
        }, 1000);
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    const arrayContainer = document.getElementById('array-list');

    try {
        const arrays = await fetchData();

        function createArrayElement(array) {
            const li = document.createElement('li');
            li.textContent = JSON.stringify(array);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => handleDelete(array, li));

            li.appendChild(deleteButton);
            arrayContainer.appendChild(li);
        }

        async function handleDelete(array, li) {
            const result = await Swal.fire({
                title: 'Delete Array',
                text: 'Are you sure you want to delete this array?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Delete',
                cancelButtonText: 'Cancel',
            });

            if (result.isConfirmed) {
                arrays.splice(arrays.indexOf(array), 1);
                arrayContainer.removeChild(li);
                Swal.fire('Deleted!', 'The array has been deleted.', 'success');
            } else {
                Swal.fire('Cancelled', 'The array was not deleted.', 'info');
            }
        }

        arrays.forEach(createArrayElement);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});