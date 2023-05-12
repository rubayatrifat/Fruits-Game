const useAbleFruit = document.querySelectorAll('.single-fruits.usable')
const lockedFruit = document.querySelectorAll('.single-fruits.locked')
const useAbleFruitAudio = document.getElementById('usable-fruit-click')
const lokedFruitAudio = document.getElementById('loked-fruit-click')
const balance = document.querySelector('')

useAbleFruit.forEach(sound => {
    sound.addEventListener('click', () => {
        useAbleFruitAudio.play();
    });
});

lockedFruit.forEach(sound => {
    sound.addEventListener('click', () => {
        lokedFruitAudio.play();
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: "You haven't enough money to buy it!",
          })
    });
});
