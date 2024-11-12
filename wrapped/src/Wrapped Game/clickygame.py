#clicking game, should be split duo screen (two health bars ??)
#user uses W, player uses the up arrow key
#whoever wins get +2 points (yippee!)

# import turtle
#
# clickgame = turtle.Screen()
# clickgame.title("Battle of the Jedi and the Sith!")
# clickgame.bgcolor('black')
#
# clickgame.register_shape("robby.png")
# robby = turtle.Turtle()
# robby.shape("robby.png")
# robby.speed(0)
#
# jediClicks = 0;
# sithClicks = 0;
#
# pen = turtle.Turtle()
# pen.hideturtle()
# pen.color('white')
# pen.penup()
# pen.goto(0,400) #xy coordinates
# pen.write(f"Clicks: {jediClicks}", align = "center", font = ("Arial", 20, "normal"))
#
# clickgame.mainloop()

import tkinter as tk
from tkinter import messagebox
import threading
import time

window = tk.Tk()
window.title("Jedi vs Sith: Duel of the Force!")

jedi_score = 0
sith_score = 0

def jediClick():
  global jedi_score
  jedi_score += 1
  jedi_label.config(text = f"Jedi SCore: {jedi_score}")

