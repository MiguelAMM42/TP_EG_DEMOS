import psycopg2

def login(username, password):
    conn = psycopg2.connect(database="mydb", user="myuser", password="mypassword", host="localhost", port="5432")
    cur = conn.cursor()
    query = f"SELECT * FROM users WHERE username='{username}' AND password='{password}'"
    cur.execute(query)
    result = cur.fetchone()
    conn.close()
    return result

username = input("Enter your username: ")
password = input("Enter your password: ")

result = login(username, password)

if result:
    print("Login successful!")
else:
    print("Invalid username or password.")