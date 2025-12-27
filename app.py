from flask import Flask, render_template, jsonify, request
app = Flask(__name__)

# Mock data for prototype (no database needed)
user_data = {
    "points": 1247,
    "total_plastic": 5.2,
    "deposits": [
        {
            "id": 1,
            "date": "Dec 27, 2025, 6:51PM",
            "bin": "KTR001",
            "location": "Thrissur",
            "weight": 1.2,
            "points": 120,
            "journey": {
                "deposited": True,
                "collected": True,
                "processing": True,
                "manufacturing": True,
                "product_live": True
            }
        }
    ]
}

products = [
    {"id": 1, "name": "Plastic Brick", "points": 250, "image": "image1.jpg"},  # Your image1
    {"id": 2, "name": "Eco Planter", "points": 180, "image": "image2.jpg"},    # Your image2
    {"id": 3, "name": "Plastic Tile", "points": 1200, "image": "image3.jpg"}     # Your image3
]


@app.route('/')
def home():
    return render_template('index.html', user=user_data)

@app.route('/journey')
def journey():
    return render_template('journey.html', user=user_data)

@app.route('/store')
def store():
    return render_template('store.html', products=products, user=user_data)

@app.route('/transparency')
def transparency():
    return render_template('transparency.html')

@app.route('/learn')
def learn():
    return render_template('learn.html')

@app.route('/profile')
def profile():
    return render_template('profile.html', user=user_data)

@app.route('/api/redeem', methods=['POST'])
def redeem():
    data = request.json
    # Simulate redemption
    user_data["points"] -= data['points']
    return jsonify({"success": True, "remaining": user_data["points"]})

if __name__ == '__main__':
    app.run(debug=True)
