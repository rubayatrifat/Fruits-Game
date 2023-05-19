const gameInterFace = document.querySelector('.game-face')
const fruitsMenu = document.querySelector('.first-slide')
const useAbleFruit = document.querySelectorAll('.single-fruits.usable');
const lockedFruit = document.querySelectorAll('.single-fruits.locked');
const useAbleFruitAudio = document.getElementById('usable-fruit-click');
const lokedFruitAudio = document.getElementById('loked-fruit-click');
const BuyFruitAudio = document.getElementById('buy-fruit-click');
const timeUpAudio = document.getElementById('time-up');
const balance = document.querySelector('.main-money');
const fruitsPrize = Array.from(document.querySelectorAll('#prize span'));
const prices = fruitsPrize.map((price) => Number(price.textContent));
const changeIcon = document.querySelectorAll('.name i');
const infoBtn = document.querySelector('.info-come');
const mainInfo = document.querySelector('.ingo')
const body = document.querySelector('.body')
const timerElement = document.getElementById('timer');


// To come info


infoBtn.addEventListener('click', () => {
    mainInfo.classList.toggle('come')
    infoBtn.classList.toggle('fa-circle-info')
    infoBtn.classList.toggle('fa-times')
})

// Load data from localStorage
const storedBalance = localStorage.getItem('balance');
if (storedBalance) {
  balance.textContent = storedBalance;
}

const storedFruit = localStorage.getItem('fruit');
if (storedFruit) {
  const selectedFruitIndex = Number(storedFruit);
  unlockFruits(selectedFruitIndex);
} else {
  lockAllFruits();
}

// Function to unlock fruits up to the given index
function unlockFruits(index) {
  for (let i = 0; i <= index; i++) {
    const selectedFruit = lockedFruit[i];
    const icon = selectedFruit.querySelector('.name i');
    selectedFruit.classList.remove('locked');
    selectedFruit.classList.add('usable');
    selectedFruit.removeEventListener('click', isCanBuy);
    selectedFruit.addEventListener('click', useAbleFruitClick);
    icon.classList.remove('fa-lock');
    icon.classList.add('fa-check');
  }
}

// Function to lock all fruits
function lockAllFruits() {
  lockedFruit.forEach((selectedFruit) => {
    const icon = selectedFruit.querySelector('.name i');
    selectedFruit.classList.add('locked');
    selectedFruit.classList.remove('usable');
    selectedFruit.removeEventListener('click', useAbleFruitClick);
    selectedFruit.addEventListener('click', isCanBuy);
    icon.classList.remove('fa-check');
    icon.classList.add('fa-lock');
  });
}




useAbleFruit.forEach((sound) => {
  sound.addEventListener('click', useAbleFruitClick);
});

function useAbleFruitClick() {
  useAbleFruitAudio.play();
  goAnotherSide();
  timeIsOn();
}

function goAnotherSide() {
  setTimeout(() => {
    fruitsMenu.classList.add('go');
  }, 1000);
  gameInterFace.classList.add('back')
  body.style.overflow = "hidden"

}

function timeIsOn() {
  let timeInSeconds = 5;
    
  function updateTimer() {
    const formattedTime = timeInSeconds < 10 ? `0${timeInSeconds}` : timeInSeconds;

    timerElement.textContent = `Time:${formattedTime}`;

    if (timeInSeconds === 0) {
      clearInterval(timerInterval);
      timeUpAudio.play()
      Swal.fire({
        icon: 'info',
        title: 'Your Time is Over',
        text: 'You earned 50 game Doller $. Press Back to go back',
        confirmButtonText: 'Go Back'
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          comeBackSide()
        }
      })

    } else {
      timeInSeconds--; // Decrease the time by 1 second
    }
  }

  // Update the timer every second
  const timerInterval = setInterval(updateTimer, 1000);
}

function comeBackSide() {
  fruitsMenu.classList.remove('go')
  gameInterFace.classList.remove('back')
  body.style.overflowY = "scroll"
  body.scrollTop
  useAbleFruitAudio.play()
}

lockedFruit.forEach((selectedItem) => {
  selectedItem.addEventListener('click', isCanBuy);
});

function isCanBuy(event) {
  const selectedFruit = event.currentTarget;
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
    selectedFruit.addEventListener('click', useAbleFruitClick);
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



// let timeoutDuration = 1000;
// const minTimeoutDuration = 270;

// function generateRandomNumber() {
//   // Generate a random number between 0 and 100
//   const randomNumber = Math.floor(Math.random() * 101);
  
//   // Output the random number to the console
//   console.log(randomNumber);
  
//   // Decrease the timeout duration by 50ms, but not below the minimum value
//   if (timeoutDuration > minTimeoutDuration) {
//     timeoutDuration -= 50;
//   }
  
//   // Wait for the updated timeout duration before generating the next number
//   setTimeout(generateRandomNumber, timeoutDuration);
// }

// // Start generating random numbers
// generateRandomNumber();





