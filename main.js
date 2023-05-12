const useAbleFruit = document.querySelectorAll('.single-fruits.usable');
const lockedFruit = document.querySelectorAll('.single-fruits.locked');
const useAbleFruitAudio = document.getElementById('usable-fruit-click');
const lokedFruitAudio = document.getElementById('loked-fruit-click');
const BuyFruitAudio = document.getElementById('buy-fruit-click');
const balance = document.querySelector('.main-money');
const fruitsPrize = Array.from(document.querySelectorAll('#prize span'));
const prices = fruitsPrize.map((price) => Number(price.textContent));
const changeIcon = document.querySelectorAll('.name i');
const infoBtn = document.querySelector('.info-come');
const mainInfo = document.querySelector('.ingo')


// To come info
infoBtn.addEventListener('click', () => {
    mainInfo.classList.add('come')
})

// Load data from localStorage
const storedBalance = localStorage.getItem('balance');
if (storedBalance) {
  balance.textContent = storedBalance;
}

const storedFruit = localStorage.getItem('fruit');
if (storedFruit) {
  const selectedFruitIndex = Number(storedFruit);
  const selectedFruit = lockedFruit[selectedFruitIndex];
  const icon = selectedFruit.querySelector('.name i');
  selectedFruit.classList.remove('locked');
  selectedFruit.classList.add('usable');
  selectedFruit.removeEventListener('click', isCanBuy);
  icon.classList.remove('fa-lock');
  icon.classList.add('fa-check');
}

useAbleFruit.forEach((sound) => {
  sound.addEventListener('click', () => {
    useAbleFruitAudio.play();
  });
});

lockedFruit.forEach((selectedItem) => {
  selectedItem.addEventListener('click', () => {
    isCanBuy(selectedItem);
  });
});

function isCanBuy(selectedFruit) {
  const selectedFruitIndex = Array.from(lockedFruit).indexOf(selectedFruit);
  const selectedFruitPrice = Number(prices[selectedFruitIndex]);
  const icon = selectedFruit.querySelector('.name i');

  if (selectedFruit.classList.contains('usable')) {
    useAbleFruitAudio.play();
    return;
  }

  if (Number(balance.textContent) < selectedFruitPrice) {
    lokedFruitAudio.play();
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: "You haven't enough money to buy it!",
    });
  } else {
    BuyFruitAudio.play()
    Swal.fire({
      icon: 'success',
      title: 'Wow!',
      text: "You bought the food item successfully",
    });
    selectedFruit.classList.remove('locked');
    selectedFruit.classList.add('usable');
    selectedFruit.removeEventListener('click', isCanBuy);
    icon.classList.remove('fa-lock');
    icon.classList.add('fa-check');

    // Update balance and store it in localStorage
    const newBalance = Number(balance.textContent) - selectedFruitPrice;
    balance.textContent = newBalance;
    localStorage.setItem('balance', newBalance);

    // Store selected fruit index in localStorage
    localStorage.setItem('fruit', selectedFruitIndex);
  }
}
