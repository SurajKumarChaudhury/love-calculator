from gtts import gTTS

# Love Calculator rules with added pauses using punctuation and newlines
script = """
Love Calculator Rules.

Rule 1

One Name, One Fate: The first result is sacred. Do not try the same names again — true love speaks once.

Rule 2

No Repeats, No Cheats: Trying the same name combinations again and again won’t change destiny. Let the first reading guide your heart.

Rule 3

Use Real Names Only: This calculator works with your real feelings. Nicknames, emojis, or fake names weaken the magic.

Rule 4

No Spamming: Repeating different names for fun may break the love algorithm. Respect the energy of this sacred space.

Rule 5

Honest Intent Only: Enter names only when you truly want to know the connection — not just for curiosity. The calculator knows when you're serious.

Rule 6

Respect the Result: Whether it’s 35 percent or 98 percent, every number tells a story. Love is not a score — it’s a journey.

Remember 
This is just a guide: The Love Calculator is magical but symbolic. Your choices and love matter more than any number.
"""

# Create TTS object
tts = gTTS(text=script, lang='en', slow=False)

# Save to file
tts.save("love_calculator_rules.mp3")

print("✅ Audio file 'love_calculator_rules.mp3' has been created successfully.")
