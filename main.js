const useAbleFruit = document.querySelectorAll('.single-fruits.usable');
const lockedFruit = document.querySelectorAll('.single-fruits.locked');
const useAbleFruitAudio = document.getElementById('usable-fruit-click');
const lokedFruitAudio = document.getElementById('loked-fruit-click');
const BuyFruitAudio = document.getElementById('buy-fruit-click');
const balance = document.querySelector('.main-money');
const fruitsPrize = Array.from(document.querySelectorAll('#prize span'));
const prices = fruitsPrize.map((price) => Number(price.textContent));

useAbleFruit.forEach((sound) => {
  sound.addEventListener('click', () => {
    useAbleFruitAudio.play();
  });
});

lockedFruit.forEach((sound) => {
  sound.addEventListener('click', () => {
    isCanBuy();
  });
});

function isCanBuy() {
  const selectedFruitIndex = Array.from(lockedFruit).indexOf(event.currentTarget);
  const selectedFruitPrice = Number(prices[selectedFruitIndex]);
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
        text: "You buyed the food item Successfully",
    });
  }
}
