# Rebound

figure out background styling - picture? it's already in assets.

continue refactoring

Rebound is an overhead 2D arcade-style game based on the spirit of the 1983 Bally Midway arcade game Discs of Tron.  


#### Players falling
Player#fall overwrites that instances draw function to continually decrease the radius of the drawn circle until it doesn't have a radius. Then the Player#draw will simply return early. This creates the animation of a player falling off the platform.



#### Future Goals
- [ ] rework player movement
- [ ] add more levels and Boss Battles?
- [ ] light trails for discs
- [ ] sprites(platforms and players)
- [ ] score counter
- [ ] available disc display
- [ ] disc return animation
- [ ] walls electric arc animation
