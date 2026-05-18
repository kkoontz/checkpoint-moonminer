let cheese = 0;
const BASE_CLICK = 1;

let clickUpgrades = [
  { id: 'knife', name: 'Knife', price: 50, quantity: 0, bonus: 1, priceIncrement: 25 },
  { id: 'cart', name: 'Cheese Cart', price: 250, quantity: 0, bonus: 4, priceIncrement: 100 },
];

let automaticUpgrades = [
  { id: 'mousetronaut', name: 'Mousetronaut', price: 1000, quantity: 0, bonus: 10, priceIncrement: 500 },
  { id: 'rover', name: 'Lunar Rover', price: 5000, quantity: 0, bonus: 25, priceIncrement: 2000 },
];

function calculateClickYield() {
  let total = BASE_CLICK;
  for (const upgrade of clickUpgrades) {
    total += upgrade.quantity * upgrade.bonus;
  }
  return total;
}

function calculateAutoYield() {
  let total = 0;
  for (const upgrade of automaticUpgrades) {
    total += upgrade.quantity * upgrade.bonus;
  }
  return total;
}

function canAfford(price) {
  return cheese >= price;
}

function formatNumber(value) {
  return value.toLocaleString('en-US');
}

function formatPrice(value) {
  if (value >= 1000) {
    const compact = value / 1000;
    return Number.isInteger(compact) ? `${compact}k` : `${compact.toFixed(1)}k`;
  }
  return String(value);
}

function mine(event) {
  const yieldAmount = calculateClickYield();
  cheese += yieldAmount;
  showFloatingText(yieldAmount, event);
  drawAll();
}

function collectAutoUpgrades() {
  const yieldAmount = calculateAutoYield();
  if (yieldAmount > 0) {
    cheese += yieldAmount;
    drawAll();
  }
  resetProgressBar();
}

function buyClickUpgrade(index) {
  const upgrade = clickUpgrades[index];
  if (!upgrade || !canAfford(upgrade.price)) return;
  cheese -= upgrade.price;
  upgrade.quantity += 1;
  upgrade.price += upgrade.priceIncrement;
  drawAll();
}

function buyAutomaticUpgrade(index) {
  const upgrade = automaticUpgrades[index];
  if (!upgrade || !canAfford(upgrade.price)) return;
  cheese -= upgrade.price;
  upgrade.quantity += 1;
  upgrade.price += upgrade.priceIncrement;
  drawAll();
}

function drawCheese() {
  const display = document.querySelector('#cheese-display');
  if (display) display.textContent = formatNumber(cheese);
}

function drawRates() {
  const clickRate = document.querySelector('#click-rate');
  const autoRate = document.querySelector('#auto-rate');
  if (clickRate) clickRate.textContent = `+${formatNumber(calculateClickYield())}`;
  if (autoRate) autoRate.textContent = `+${formatNumber(calculateAutoYield())}`;
}

function createUpgradeButton(upgrade, type, index) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = `btn upgrade-btn upgrade-btn-${type}`;
  button.disabled = !canAfford(upgrade.price);
  const bonusLabel = type === 'click' ? `+${upgrade.bonus}` : `+${upgrade.bonus} / 3s`;
  button.innerHTML = `<span class="upgrade-price">${formatPrice(upgrade.price)}</span> <span class="upgrade-name">${upgrade.name}</span> <span class="upgrade-bonus">${bonusLabel}</span>`;
  button.addEventListener('click', () => {
    if (type === 'click') buyClickUpgrade(index);
    else buyAutomaticUpgrade(index);
  });
  return button;
}

function drawUpgradeButtons() {
  const clickContainer = document.querySelector('#click-upgrade-buttons');
  const autoContainer = document.querySelector('#auto-upgrade-buttons');
  if (clickContainer) {
    clickContainer.innerHTML = '';
    clickUpgrades.forEach((u, i) => clickContainer.appendChild(createUpgradeButton(u, 'click', i)));
  }
  if (autoContainer) {
    autoContainer.innerHTML = '';
    automaticUpgrades.forEach((u, i) => autoContainer.appendChild(createUpgradeButton(u, 'auto', i)));
  }
}

function createStatRow(upgrade, type) {
  const row = document.createElement('div');
  row.className = 'stat-row';
  const contribution = upgrade.quantity * upgrade.bonus;
  const unitLabel = upgrade.quantity === 1 ? upgrade.name : `${upgrade.name}s`;
  row.innerHTML = `<span class="stat-qty">${upgrade.quantity} ${unitLabel}</span><span class="stat-arrow" aria-hidden="true">→</span><span class="stat-total">${type === 'auto' ? '⏱ ' : ''}${formatNumber(contribution)}</span>`;
  return row;
}

function drawUpgradeStats() {
  const clickStats = document.querySelector('#click-stats');
  const autoStats = document.querySelector('#auto-stats');
  if (clickStats) {
    clickStats.innerHTML = '';
    clickUpgrades.forEach((u) => clickStats.appendChild(createStatRow(u, 'click')));
  }
  if (autoStats) {
    autoStats.innerHTML = '';
    automaticUpgrades.forEach((u) => autoStats.appendChild(createStatRow(u, 'auto')));
  }
}

function drawAll() {
  drawCheese();
  drawRates();
  drawUpgradeButtons();
  drawUpgradeStats();
}

function showFloatingText(amount, event) {
  const container = document.querySelector('#float-container');
  const moon = document.querySelector('#moon');
  if (!container || !moon) return;
  const float = document.createElement('span');
  float.className = 'float-text';
  float.textContent = `+${formatNumber(amount)}`;
  const moonRect = moon.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();
  let x = moonRect.width / 2;
  let y = moonRect.height / 3;
  if (event && event.clientX) {
    x = event.clientX - containerRect.left;
    y = event.clientY - containerRect.top;
  }
  float.style.left = `${x}px`;
  float.style.top = `${y}px`;
  container.appendChild(float);
  float.addEventListener('animationend', () => float.remove());
}

function resetProgressBar() {
  const bar = document.querySelector('#auto-progress');
  if (!bar) return;
  bar.classList.remove('animate');
  void bar.offsetWidth;
  bar.classList.add('animate');
}

document.querySelector('#moon')?.addEventListener('click', mine);
drawAll();
resetProgressBar();
setInterval(collectAutoUpgrades, 3000);
