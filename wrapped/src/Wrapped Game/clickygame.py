#clicking game, should be split duo screen (two health bars ??)
#user uses W, player uses the up arrow key
#whoever wins get +2 points (yippee!)

import turtle

clickgame = turtle.Screen()
clickgame.title("Battle of the Jedi and the Sith!")
clickgame.bgcolor('black')

clickgame.register_shape("robby.png")
robby = turtle.Turtle()
robby.shape("robby.png")
robby.speed(0)

jediClicks = 0;
sithClicks = 0;

pen = turtle.Turtle()
pen.hideturtle()
pen.color('white')
pen.penup()
pen.goto(0,400) #xy coordinates
pen.write(f"Clicks: {jediClicks}", align = "center", font = ("Arial", 20, "normal"))

clickgame.mainloop()

