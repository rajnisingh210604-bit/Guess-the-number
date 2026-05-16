import random

secret = random.randint(1, 100)
attempts = 0
max_attempts = 7

while attempts < max_attempts:       # loop runs until attempts run out
    guess = int(input("Your guess: "))
    attempts += 1

    if guess < secret:
        print("Too low! ↑")
    elif guess > secret:
        print("Too high! ↓")
    else:
        print(f"🎉 Correct in {attempts} tries!")
        break                         # exit loop on correct guess
else:
    # This runs only if the while loop wasn't broken
    print(f"😢 Game over! It was {secret}")