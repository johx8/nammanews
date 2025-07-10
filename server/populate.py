import random
from faker import Faker
from datetime import datetime, timedelta
from pymongo import MongoClient

# 1. Setup
fake = Faker()

# 2. MongoDB connection setup
mongo_uri = "mongodb+srv://jyothishkj56:aPtEqfTagATQQpBt@cluster0.moxnbus.mongodb.net/"  # Replace this!
client = MongoClient(mongo_uri)

db = client["test"]         # Replace with your DB name
collection = db["events"]   # Replace with your collection name

# 3. Static data
districts = [
    "Bagalkote", "Ballari", "Belagavi", "Bengaluru Rural", "Bengaluru Urban", "Bidar", "Chamarajanagar", "Chikkaballapur", "Chikkamagaluru", "Chitradurga", "Dakshina Kannada", "Davanagere", "Dharwad", "Gadag", "Hassan", "Haveri", "Kalaburagi", "Kodagu", "Kolar", "Koppal", "Mandya", "Mysuru", "Raichur", "Ramanagara", "Shivamogga", "Tumakuru", "Udupi", "Uttara Kannada","Vijayanagara", "Vijayapura", "Yadgiri"
]

categories = [
    "Business", "Dance", "Education", "Health", "Food", "Arts", "Workshop", "Finance", "Advertisements"
]

youtube_video_ids = [
    "dQw4w9WgXcQ", "9bZkp7q19f0", "3JZ_D3ELwOQ", "2Vv-BfVoq4g",
    "eVTXPUF4Oz4", "RgKAFK5djSk", "uelHwf8o7_U", "60ItHLz5WEA"
]

# 4. Helper functions
def random_youtube_link():
    return f"https://www.youtube.com/watch?v={random.choice(youtube_video_ids)}"

def random_date():
    today = datetime.utcnow()
    delta = timedelta(days=random.randint(0, 60), hours=random.randint(0, 23), minutes=random.randint(0, 59))
    future_datetime = today + delta
    return future_datetime.isoformat(timespec='milliseconds') + 'Z'  # ISO 8601 format

def random_time():
    hour = random.randint(0, 23)
    minute = random.choice([0, 15, 30, 45])
    return f"{hour:02d}:{minute:02d}"

# 5. Generate and insert data
data = []
for _ in range(20):
    entry = {
        "title": fake.sentence(nb_words=4).rstrip('.'),
        "description": fake.paragraph(nb_sentences=2),
        "date": random_date(),
        "time": random_time(),
        "youtubeLink": random_youtube_link(),
        "district": random.choice(districts),
        "category": random.choice(categories)
    }
    data.append(entry)

# Insert into MongoDB
result = collection.insert_many(data)
print(f"✅ Inserted {len(result.inserted_ids)} documents into MongoDB.")
