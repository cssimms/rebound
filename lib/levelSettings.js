var levelSettings = function (level) {
  switch (level){

    case 1:
      return {
        opponent: {
          x: 250,
          y: 20,
          width: 100,
          height: 100,
        },
        player: {
          x: 170,
          y: 380,
          width: 260,
          height: 200,
        },
        north: {
          x: 150,
          y: 0,
          width: 300,
          height: 10,
        },
        south: {
          x: 150,
          y: 590,
          width: 300,
          height: 10,
        },
        west: {
          x: 150,
          y: 0,
          width: 10,
          height: 600,
        },
        east: {
          x: 440,
          y: 0,
          width: 10,
          height: 600,
        }
      };

  case 2:
    return {
      opponent: {
        x: 170,
        y: 20,
        width: 260,
        height: 100,
      },
      player: {
        x: 20,
        y: 380,
        width: 560,
        height: 200,
      },
      north: {
        x: 0,
        y: 0,
        width: 600,
        height: 10,
      },
      south: {
        x: 0,
        y: 590,
        width: 600,
        height: 10,
      },
      west: {
        x: 0,
        y: 0,
        width: 10,
        height: 600,
      },
      east: {
        x: 590,
        y: 0,
        width: 10,
        height: 600,
      }
    };

  case 3:
    return {
      opponent: {
        x: 200,
        y: 20,
        width: 200,
        height: 200,
      },
      player: {
        x: 250,
        y: 480,
        width: 100,
        height: 100,
      },
      north: {
        x: 150,
        y: 0,
        width: 300,
        height: 10,
      },
      south: {
        x: 150,
        y: 590,
        width: 300,
        height: 10,
      },
      west: {
        x: 150,
        y: 0,
        width: 10,
        height: 600,
      },
      east: {
        x: 440,
        y: 0,
        width: 10,
        height: 600,
      }
    };
  }
};
module.exports = levelSettings;
