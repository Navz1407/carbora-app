// Global user data (simulated)
let userData = {
    points: 1247,
    totalPlastic: 5.2,
    deposits: []
};

// Update display
function updateDisplay() {
    document.querySelectorAll('#points').forEach(el => el.textContent = userData.points);
    document.querySelectorAll('#totalPlastic').forEach(el => el.textContent = userData.totalPlastic.toFixed(1));
}

// Deposit flow
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('depositBtn').addEventListener('click', showDepositModal);
});

function showDepositModal() {
    document.getElementById('depositModal').classList.remove('hidden');
    document.getElementById('plasticWeight').focus();
}

function closeModal() {
    document.getElementById('depositModal').classList.add('hidden');
    document.getElementById('plasticWeight').value = '';
}

async function confirmDeposit() {
    const weight = parseFloat(document.getElementById('plasticWeight').value);
    
    if (!weight || weight < 0.1 || weight > 50) {
        alert('❌ Enter valid weight (0.1 - 50kg)');
        return;
    }
    
    // Calculate points (10 points per kg)
    const pointsEarned = Math.round(weight * 10);
    
    // Show processing
    const depositBtn = document.querySelector('.deposit-btn');
    const originalText = depositBtn.textContent;
    depositBtn.textContent = '⏳ Processing...';
    depositBtn.disabled = true;
    
    // Simulate network delay
    setTimeout(() => {
        // Update user data
        userData.totalPlastic += weight;
        userData.points += pointsEarned;
        userData.deposits.push({
            id: Date.now(),
            weight: weight,
            points: pointsEarned,
            date: new Date().toLocaleString(),
            bin: 'KTR001'
        });
        
        // Update display
        updateDisplay();
        
        // Success feedback
        depositBtn.textContent = '✅ Deposited!';
        depositBtn.style.background = '#4CAF50';
        
        // Close modal & reset
        closeModal();
        setTimeout(() => {
            depositBtn.textContent = originalText;
            depositBtn.disabled = false;
            depositBtn.style.background = '';
        }, 2000);
        
        // Show success popup
        showSuccessPopup(weight, pointsEarned);
        
    }, 1500);
}

function showSuccessPopup(weight, points) {
    const popup = document.createElement('div');
    popup.innerHTML = `
        <div style="
            position: fixed;
            top: 20%;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(135deg, #4CAF50, #2E7D32);
            color: white;
            padding: 2rem 3rem;
            border-radius: 25px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            z-index: 2000;
            text-align: center;
            font-weight: 700;
            font-size: 1.2rem;
        ">
            ✅ Deposit Successful!<br>
            <small style="font-size: 1rem; opacity: 0.9;">
                ${weight}kg → +${points} points<br>
                <a href="/journey" style="color: #FFF; text-decoration: underline;">View Journey →</a>
            </small>
        </div>
    `;
    document.body.appendChild(popup);
    
    setTimeout(() => {
        popup.remove();
    }, 4000);
}

// Redeem function (for store)
async function redeemProduct(id, points) {
    if (userData.points < points) {
        alert(`❌ Need ${points} points. You have ${userData.points}`);
        return;
    }
    
    userData.points -= points;
    updateDisplay();
    alert(`✅ Redeemed! ${userData.points} points remaining`);
}

// Animate counters on load
function animateCounters() {
    const counters = document.querySelectorAll('[id="points"], [id="totalPlastic"]');
    counters.forEach(counter => {
        const target = parseFloat(counter.textContent);
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target.toLocaleString();
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current * 10) / 10;
            }
        }, 20);
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', animateCounters);
} else {
    animateCounters();
}
