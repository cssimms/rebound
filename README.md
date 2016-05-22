# Rebound

figure out background styling - picture? it's already in assets.

player movement should be tighter

continue refactoring



#### Players falling
Player#fall overwrites that instances draw function to continually decrease the radius of the drawn circle until it doesn't have a radius. Then the Player#draw will simply return early. This creates the animation of a player falling off the platform.
