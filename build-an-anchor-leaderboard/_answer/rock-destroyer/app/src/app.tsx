/* global solana */
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { PublicKey } from '@solana/web3.js';
import { useAnchorWallet, useConnection } from '@solana/wallet-adapter-react';
import {
  Program,
  AnchorProvider,
  setProvider,
  getProvider,
  utils,
  BN
} from '@coral-xyz/anchor';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { RockDestroyer, IDL } from './idl/rock_destroyer';

const PROGRAM_ID = new PublicKey(
  import.meta.env.VITE_PROGRAM_ID ||
    '9LnPqpdzTCgAMUVnAes3DdyK2zBBe8MpU4xv1XanXW8c'
);

const GAME_OWNER_PUBKEY = new PublicKey(
  import.meta.env.VITE_GAME_OWNER_PUBKEY ||
    'CXt9MD4rzPL3vR9QGNyX1Va6RxFkkpkriSQfyLR9hrqh'
);

const ProgramContext = createContext<Program<RockDestroyer> | null>(null);
const ProviderContext = createContext<AnchorProvider | null>(null);

export function App() {
  const [program, setProgram] = useState<Program<RockDestroyer> | null>(null);
  const [prov, setProv] = useState<AnchorProvider | null>(null);
  const connection = useConnection();
  const wallet = useAnchorWallet();

  const [showLeaderboard, setShowLeaderboard] = useState(true);
  const [showUsernameModal, setShowUsernameModal] = useState(false);
  const [showGame, setShowGame] = useState(false);

  useEffect(() => {
    let provider: AnchorProvider;

    try {
      // @ts-ignore - TODO
      provider = getProvider();
    } catch (e) {
      console.warn(e);
      if (!wallet) {
        console.error('Wallet not initialized');
        return;
      }
      provider = new AnchorProvider(connection.connection, wallet, {});
      console.log('Setting provider: ', provider);
      setProvider(provider);
      setProv(provider);
    }

    const program = new Program(IDL, PROGRAM_ID);
    setProgram(program);
  }, [wallet]);

  function handleNewGame() {
    setShowLeaderboard(false);
    setShowGame(false);
    setShowUsernameModal(true);
  }

  function handleShowLeaderboard() {
    setShowGame(false);
    setShowUsernameModal(false);
    setShowLeaderboard(true);
  }

  function handleUsernameInput() {
    setShowUsernameModal(false);
    setShowGame(true);
  }

  function ConnectOrMain() {
    if (!wallet || !program) {
      return <WalletMultiButton />;
    } else {
      return (
        <>
          {showUsernameModal && (
            <UsernameModal handleUsernameInput={handleUsernameInput} />
          )}
          {showLeaderboard && <Leaderboard />}
          {showGame && <Game />}
        </>
      );
    }
  }

  return (
    <>
      <ProviderContext.Provider value={prov}>
        <ProgramContext.Provider value={program}>
          <Navbar {...{ handleNewGame, handleShowLeaderboard }} />
          {ConnectOrMain()}
        </ProgramContext.Provider>
      </ProviderContext.Provider>
    </>
  );
}

type UsernameModalPropsT = {
  handleUsernameInput: () => void;
};

function UsernameModal({ handleUsernameInput }: UsernameModalPropsT) {
  const program = useContext(ProgramContext);

  const usernameInputRef = useRef<HTMLInputElement>(null);

  async function submitUsername() {
    if (usernameInputRef.current) {
      if (!program) {
        throw new Error('Program not initialized');
      }
      const leaderboardPubkey = PublicKey.findProgramAddressSync(
        [utils.bytes.utf8.encode('leaderboard'), GAME_OWNER_PUBKEY.toBuffer()],
        program.programId
      )[0];

      try {
        const _sig = await program.methods
          .newGame(usernameInputRef.current.value)
          .accounts({
            leaderboard: leaderboardPubkey,
            gameOwner: GAME_OWNER_PUBKEY
          })
          .rpc();

        console.log('New game created: ', _sig);
        handleUsernameInput();
      } catch (e) {
        console.error(e);
        alert('Error creating game');
      }
    }
  }

  return (
    <div id='username-form'>
      <h2>Enter Username</h2>
      <input type='text' ref={usernameInputRef} placeholder='username' />
      <h2>Pay to Play</h2>
      <p>Pay 1 SOL to play</p>
      {/* @ts-ignore Phantom wallet adds `solana` to window */}
      <button onClick={submitUsername} disabled={!window.solana}>
        Submit
      </button>
    </div>
  );
}

type NavbarPropsT = {
  handleNewGame: () => void;
  handleShowLeaderboard: () => void;
};

function Navbar({ handleNewGame, handleShowLeaderboard }: NavbarPropsT) {
  return (
    <nav>
      <button onClick={handleNewGame}>New Game</button>
      <button onClick={handleShowLeaderboard}>Leaderboard</button>
    </nav>
  );
}

type LeaderboardPropsT = {
  players: Array<{
    username: string;
    hasPayed: boolean;
    score: BN;
    pubkey: PublicKey;
  }>;
};

function Leaderboard() {
  const [players, setPlayers] = useState<LeaderboardPropsT['players']>([]);
  const program = useContext(ProgramContext);

  async function getPlayersFromSolana() {
    if (!program) {
      console.error('Program not initialized');
      setPlayers([]);
      return;
    }
    const leaderboardPubkey = PublicKey.findProgramAddressSync(
      [utils.bytes.utf8.encode('leaderboard'), GAME_OWNER_PUBKEY.toBuffer()],
      program.programId
    )[0];

    const leaderboard = await program.account.leaderboard.fetch(
      leaderboardPubkey
    );
    console.log('Leaderboard:', leaderboard);
    setPlayers(leaderboard.players);
  }

  useEffect(() => void getPlayersFromSolana(), []);
  return (
    <div id='leaderboard'>
      <h1>Leaderboard</h1>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {players
            .sort(
              ({ score: s1 }, { score: s2 }) => s2.toNumber() - s1.toNumber()
            )
            .map(({ username, score }, i) => {
              return (
                <tr key={i}>
                  <td>{username}</td>
                  <td>{score.toNumber()}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

// An astrocks-like game
function Game() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const program = useContext(ProgramContext);

  async function addPlayerToLeaderboard(score: number) {
    if (!program) {
      throw new Error('Program not initialized');
    }
    const leaderboardPubkey = PublicKey.findProgramAddressSync(
      [utils.bytes.utf8.encode('leaderboard'), GAME_OWNER_PUBKEY.toBuffer()],
      program.programId
    )[0];

    const sig = await program.methods
      .addPlayerToLeaderboard(new BN(score))
      .accounts({
        leaderboard: leaderboardPubkey
      })
      .rpc();

    console.log('Player added to leaderboard: ', sig);
  }

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (canvas.current) {
      const ctx = canvas.current.getContext('2d');
      if (ctx) {
        const parent = canvas.current.parentElement;
        if (parent) {
          ctx.canvas.width = parent.offsetWidth;
          ctx.canvas.height = parent.offsetHeight;
        }

        const FPS = 30; // frames per second
        const friction = 0.5; // friction coefficient of space
        const shipBlinkDuration = 0.1; // in seconds
        const shipExplodeDuration = 0.3;
        const shipInvisibilityDuration = 3; // in seconds
        const shipSize = 30; // height in pixels
        const shipThrust = 5; // acceleration of the ship px per sec
        const shipTurnSpeed = 300; // degrees per second
        const laserDist = 0.4; // max distance laser can travel
        const laserExplodeDuration = 0.1;
        const laserMax = 10; // max num of lasers on screen at once
        const laserSpeed = 500; // px per sec
        const rocksJag = 0.3; //jaggedness of the asterocks
        const rocksNum = 1; // starting nb of asterocks
        const rocksSize = 100; // starting size of asterocks in px
        const rocksSpeed = 50; // max px per second
        const rocksVert = 10; // average nb of vertices on each rock
        const gameLives = 3; //starting num of lives
        const textFadeTime = 3; // in seconds
        const textSize = 40; // in px
        const rocksLargePts = 20; // points scored for large rock
        const rocksMediumPts = 50; // points scored for medium rock
        const rocksSmallPts = 100; // points scored for small rock

        let level = 0,
          rocks: Array<ReturnType<typeof newRock>> = [],
          ship: ReturnType<typeof newShip>,
          lives = 3,
          score = 0,
          highScore = 0,
          text = '',
          textAlpha = 0.3;

        // Background
        ctx.fillStyle = 'rgba(0,0,0,1.00)';
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        // Title
        ctx.fillStyle = 'rgba(193,193,193,1.00)';
        ctx.font = 'normal small-caps 100 ' + (textSize + 30) + 'px VT323';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(
          'Rock Destroyer',
          ctx.canvas.width / 2,
          ctx.canvas.height * 0.48
        );
        // Subtitle
        ctx.font = 'small-caps ' + (textSize - 15) + 'px VT323';
        ctx.fillText(
          'PRESS SPACEBAR TO START',
          ctx.canvas.width / 2,
          ctx.canvas.height * 0.58
        );
        document.addEventListener('keydown', newGame);

        type Rock = {
          x: number;
          y: number;
          xv: number;
          yv: number;
          r: number;
          a: number;
          vert: number;
          offs: number[];
        };

        function newRock(x: number, y: number, r: number) {
          let lvlMultiply = 1 + 0.1 * level;
          let rock: Rock = {
            x: x,
            y: y,
            xv:
              ((Math.random() * rocksSpeed * lvlMultiply) / FPS) *
              (Math.random() < 0.5 ? 1 : -1),
            yv:
              ((Math.random() * rocksSpeed * lvlMultiply) / FPS) *
              (Math.random() < 0.5 ? 1 : -1),
            r: r,
            a: Math.random() * Math.PI * 2, // in radians
            vert: Math.floor(Math.random() * (rocksVert + 1) + rocksVert / 2),
            offs: []
          };

          // Create vertex offets array
          for (let i = 0; i < rock.vert; i++) {
            rock.offs.push(Math.random() * rocksJag * 2 + 1 - rocksJag);
          }

          return rock;
        }

        function createRockBelt() {
          rocks = [];
          let x, y;
          for (let i = 0; i < rocksNum + level; i++) {
            do {
              x = Math.floor(Math.random() * ctx!.canvas.width);
              y = Math.floor(Math.random() * ctx!.canvas.height);
            } while (
              distBetweenPoints(ship.x, ship.y, x, y) <
              rocksSize * 2 + ship.r
            );
            rocks.push(newRock(x, y, Math.ceil(rocksSize / 2)));
          }
        }

        function destroyRock(index: number) {
          let x = rocks[index].x;
          let y = rocks[index].y;
          let r = rocks[index].r;

          // Split rock in 2
          if (r === Math.ceil(rocksSize / 2)) {
            rocks.push(newRock(x, y, Math.ceil(rocksSize / 4)));
            rocks.push(newRock(x, y, Math.ceil(rocksSize / 4)));
            score += rocksLargePts;
          } else if (r == Math.ceil(rocksSize / 4)) {
            rocks.push(newRock(x, y, Math.ceil(rocksSize / 8)));
            rocks.push(newRock(x, y, Math.ceil(rocksSize / 8)));
            score += rocksMediumPts;
          } else {
            score += rocksSmallPts;
          }

          highScore = score;

          // Destroy last rock frag
          rocks.splice(index, 1);

          if (rocks.length === 0) {
            level++;
            newLevel();
          }
        }

        function distBetweenPoints(
          x1: number,
          y1: number,
          x2: number,
          y2: number
        ) {
          return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        }

        type Laser = {
          x: number;
          y: number;
          xv: number;
          yv: number;
          dist: number;
          explodeTime: number;
        };

        type Ship = {
          x: number;
          y: number;
          r: number;
          a: number;
          blinkNumber: number;
          blinkTime: number;
          canShoot: boolean;
          dead: boolean;
          explodeTime: number;
          lasers: Array<Laser>;
          rotation: number;
          thrusting: boolean;
          thrust: {
            x: number;
            y: number;
          };
        };

        function newShip(): Ship {
          return {
            x: ctx!.canvas.width / 2,
            y: ctx!.canvas.height / 2,
            r: shipSize / 2,
            a: (90 / 180) * Math.PI, // radiant
            blinkNumber: Math.ceil(
              shipInvisibilityDuration / shipBlinkDuration
            ),
            blinkTime: Math.ceil(shipBlinkDuration * FPS),
            canShoot: true,
            dead: false,
            explodeTime: 0,
            lasers: [],
            rotation: 0,
            thrusting: false,
            thrust: {
              x: 0,
              y: 0
            }
          };
        }

        function drawShip(x: number, y: number, a: number, color = '#fff') {
          ctx!.strokeStyle = color;
          ctx!.lineWidth = shipSize / 20;
          ctx!.beginPath();
          ctx!.moveTo(
            x + (5 / 3) * ship.r * Math.cos(a),
            y - (5 / 3) * ship.r * Math.sin(a)
          );
          ctx!.lineTo(
            x - ship.r * ((2 / 3) * Math.cos(a) + Math.sin(a)),
            y + ship.r * ((2 / 3) * Math.sin(a) - Math.cos(a))
          );
          ctx!.lineTo(
            x - ship.r * ((2 / 3) * Math.cos(a) - Math.sin(a)),
            y + ship.r * ((2 / 3) * Math.sin(a) + Math.cos(a))
          );
          ctx!.closePath();
          ctx!.stroke();
        }

        function shootLaser() {
          // Create a laser
          if (ship.canShoot && ship.lasers.length < laserMax) {
            ship.lasers.push({
              x: ship.x + (4 / 3) * ship.r * Math.cos(ship.a),
              y: ship.y - (4 / 3) * ship.r * Math.sin(ship.a),
              xv: (laserSpeed * Math.cos(ship.a)) / FPS,
              yv: (-laserSpeed * Math.sin(ship.a)) / FPS,
              dist: 0,
              explodeTime: 0
            });
          }
          // Prevent further shooting
          ship.canShoot = false;
        }

        function explodeShip() {
          ship.explodeTime = Math.ceil(shipExplodeDuration * FPS);
        }

        function drawExplosion(
          ex: number,
          ey: number,
          spikes: number,
          r: number
        ) {
          let rot = (Math.PI / 2) * 3;
          let x = ex;
          let y = ey;
          let step = Math.PI / spikes;
          ctx!.beginPath();
          ctx!.moveTo(ex, ey - r);
          for (let i = 0; i < spikes; i++) {
            x = ex + Math.cos(rot) * r;
            y = ey + Math.sin(rot) * r;
            ctx!.lineTo(x, y);
            rot += step;
            x = ex + Math.cos(rot);
            y = ey + Math.sin(rot);
            ctx!.lineTo(x, y);
            rot += step;
          }
          ctx!.lineTo(ex, ey - r);
          ctx!.closePath();
          ctx!.lineWidth = 3.5;
          ctx!.strokeStyle = 'rgba(179,62,0,1.00)';
          ctx!.stroke();
          ctx!.fillStyle = 'rgba(255,235,0,1.00)';
          ctx!.fill();

          ctx!.fillStyle = 'rgba(198,77,0,1.00)';
          ctx!.beginPath();
          ctx!.arc(ex, ey, r * 0.7, 0, Math.PI * 2, false);
          ctx!.fill();
          ctx!.fillStyle = 'rgba(252,99,0,1.00)';
          ctx!.beginPath();
          ctx!.arc(ex, ey, r * 0.6, 0, Math.PI * 2, false);
          ctx!.fill();
          ctx!.fillStyle = 'rgba(255,140,65,1.00)';
          ctx!.beginPath();
          ctx!.arc(ex, ey, r * 0.5, 0, Math.PI * 2, false);
          ctx!.fill();
          ctx!.fillStyle = 'rgba(255,169,65,1.00)';
          ctx!.beginPath();
          ctx!.arc(ex, ey, r * 0.4, 0, Math.PI * 2, false);
          ctx!.fill();
          ctx!.fillStyle = 'rgba(255,206,65,1.00)';
          ctx!.beginPath();
          ctx!.arc(ex, ey, r * 0.3, 0, Math.PI * 2, false);
          ctx!.fill();
          ctx!.fillStyle = 'rgba(255,233,66,1.00)';
          ctx!.beginPath();
          ctx!.arc(ex, ey, r * 0.2, 0, Math.PI * 2, false);
          ctx!.fill();
        }

        function update() {
          if (!ship) {
            return;
          }
          let blinkOn = ship.blinkNumber % 2 === 0;
          let exploding = ship.explodeTime > 0;

          // Background
          ctx!.fillStyle = 'rgba(0,0,0,1.00)';
          ctx!.fillRect(0, 0, ctx!.canvas.width, ctx!.canvas.height);

          // Draw rocks
          let x, y, r, a, vert, offs;
          for (let i = 0; i < rocks.length; i++) {
            ctx!.strokeStyle = 'rgba(217,241,189,1.00)';
            ctx!.lineWidth = shipSize / 20;

            // Get the rock props
            x = rocks[i].x;
            y = rocks[i].y;
            r = rocks[i].r;
            a = rocks[i].a;
            vert = rocks[i].vert;
            offs = rocks[i].offs;

            // Draw a path
            ctx!.beginPath();
            ctx!.moveTo(
              x + r * offs[0] * Math.cos(a),
              y + r * offs[0] * Math.sin(a)
            );

            // Draw the polygon
            for (let j = 1; j < vert; j++) {
              ctx!.lineTo(
                x + r * offs[j] * Math.cos(a + (j * Math.PI * 2) / vert),
                y + r * offs[j] * Math.sin(a + (j * Math.PI * 2) / vert)
              );
            }
            ctx!.closePath();
            ctx!.stroke();
          }

          // Add force vec to ship
          if (ship.thrusting && !ship.dead) {
            ship.thrust.x += (shipThrust * Math.cos(ship.a)) / FPS;
            ship.thrust.y -= (shipThrust * Math.sin(ship.a)) / FPS;

            // Draw thruster
            if (!exploding && blinkOn) {
              ctx!.fillStyle = 'rgba(255,86,0,1.00)';
              ctx!.strokeStyle = 'rgba(255,169,78,1.00)';
              ctx!.lineWidth = shipSize / 10;
              ctx!.beginPath();
              ctx!.moveTo(
                //left
                ship.x -
                  ship.r *
                    ((2 / 3) * Math.cos(ship.a) + 0.5 * Math.sin(ship.a)),
                ship.y +
                  ship.r * ((2 / 3) * Math.sin(ship.a) - 0.5 * Math.cos(ship.a))
              );
              ctx!.lineTo(
                // Center, behind the ship
                ship.x - ship.r * ((5 / 3) * Math.cos(ship.a)),
                ship.y + ship.r * ((5 / 3) * Math.sin(ship.a))
              );
              ctx!.lineTo(
                // Right
                ship.x -
                  ship.r *
                    ((2 / 3) * Math.cos(ship.a) - 0.5 * Math.sin(ship.a)),
                ship.y +
                  ship.r * ((2 / 3) * Math.sin(ship.a) + 0.5 * Math.cos(ship.a))
              );
              ctx!.closePath();
              ctx!.fill();
              ctx!.stroke();
            }
          } else {
            // Apply friction when not thrusting
            ship.thrust.x -= (friction * ship.thrust.x) / FPS;
            ship.thrust.y -= (friction * ship.thrust.y) / FPS;
          }

          // Draw ship
          if (!exploding) {
            if (blinkOn && !ship.dead) {
              drawShip(ship.x, ship.y, ship.a);
            }
            // Handle blinking
            if (ship.blinkNumber > 0) {
              // Reduce blink time
              ship.blinkTime--;
              // Reduce blink number
              if (ship.blinkTime === 0) {
                ship.blinkTime = Math.ceil(shipBlinkDuration * FPS);
                ship.blinkNumber--;
              }
            }
          } else {
            drawExplosion(ship.x, ship.y, 20, ship.r);
          }

          // Draw lasers
          for (let i = 0; i < ship.lasers.length; i++) {
            if (ship.lasers[i].explodeTime == 0) {
              ctx!.fillStyle = 'rgba(251,143,129,1.00)';
              ctx!.beginPath();
              ctx!.arc(
                ship.lasers[i].x,
                ship.lasers[i].y,
                shipSize / 15,
                0,
                Math.PI * 2,
                false
              );
              ctx!.fill();
            } else {
              drawExplosion(
                ship.lasers[i].x,
                ship.lasers[i].y,
                20,
                shipSize * 0.75
              );
            }
          }

          // Draw game text
          if (textAlpha >= 0) {
            ctx!.fillStyle = 'rgba(255, 255, 255, ' + textAlpha + ')';
            ctx!.font = 'small-caps ' + (textSize + 5) + 'px VT323';
            ctx!.textAlign = 'center';
            ctx!.fillText(
              text,
              ctx!.canvas.width / 2,
              ctx!.canvas.height * 0.7
            );
            if (!ship.dead) {
              textAlpha -= 1.0 / textFadeTime / FPS;
            }
          }

          // Draw lives
          let lifeColors;
          for (let i = 0; i < lives; i++) {
            lifeColors = exploding && i === lives - 1 ? 'red' : '#fff';
            drawShip(
              shipSize + i * shipSize * 1.2,
              shipSize,
              0.5 * Math.PI,
              lifeColors
            );
          }

          // Draw score
          ctx!.fillStyle = '#C9C9C9';
          ctx!.font = textSize + 5 + 'px VT323';
          ctx!.textAlign = 'right';
          ctx!.textBaseline = 'middle';
          ctx!.fillText(
            score.toString(),
            ctx!.canvas.width - shipSize / 2,
            shipSize
          );

          // Detect laser collisions with rocks
          let ax, ay, ar, lx, ly;
          for (let i = rocks.length - 1; i >= 0; i--) {
            // Get rocks props
            ax = rocks[i].x;
            ay = rocks[i].y;
            ar = rocks[i].r;
            for (let j = ship.lasers.length - 1; j >= 0; j--) {
              // Get laser props
              lx = ship.lasers[j].x;
              ly = ship.lasers[j].y;

              // Detect collisions
              if (
                ship.lasers[j].explodeTime === 0 &&
                distBetweenPoints(ax, ay, lx, ly) < ar
              ) {
                //destroy the rock + laser explositoon
                destroyRock(i);
                ship.lasers[j].explodeTime = Math.ceil(
                  laserExplodeDuration * FPS
                );
                break;
              }
            }
          }

          // Detect ship collisions with rocks
          if (!exploding) {
            if (ship.blinkNumber === 0 && !ship.dead) {
              for (let i = 0; i < rocks.length; i++) {
                if (
                  distBetweenPoints(ship.x, ship.y, rocks[i].x, rocks[i].y) <
                  ship.r + rocks[i].r
                ) {
                  explodeShip();
                  destroyRock(i);
                  break;
                }
              }
            }

            // Rotate ship
            ship.a += ship.rotation;

            // Move ship
            ship.x += ship.thrust.x;
            ship.y += ship.thrust.y;
          } else {
            ship.explodeTime--;
            // Reset ship after explosion
            if (ship.explodeTime == 0) {
              lives--;
              if (lives === 0) {
                gameOver();
              } else {
                ship = newShip();
              }
            }
          }

          // Handle screen wrap around
          if (ship.x < 0 - ship.r) {
            ship.x = ctx!.canvas.width + ship.r;
          } else if (ship.x > ctx!.canvas.width + ship.r) {
            ship.x = 0 - ship.r;
          }
          if (ship.y < 0 - ship.r) {
            ship.y = ctx!.canvas.height + ship.r;
          } else if (ship.y > ctx!.canvas.height + ship.r) {
            ship.y = 0 - ship.r;
          }

          // Move lasers
          for (let i = ship.lasers.length - 1; i >= 0; i--) {
            // Checked distance travelled
            if (ship.lasers[i].dist > laserDist * ctx!.canvas.width) {
              ship.lasers.splice(i, 1);
              continue;
            }

            // Handle explosion
            if (ship.lasers[i].explodeTime > 0) {
              ship.lasers[i].explodeTime--;

              // Destroy laser after duration
              if (ship.lasers[i].explodeTime == 0) {
                ship.lasers.splice(i, 1);
                continue;
              }
            } else {
              // Move laser
              ship.lasers[i].x += ship.lasers[i].xv;
              ship.lasers[i].y += ship.lasers[i].yv;

              ship.lasers[i].dist += Math.sqrt(
                Math.pow(ship.lasers[i].xv, 2) + Math.pow(ship.lasers[i].yv, 2)
              );
            }

            // Handle screen wrap around
            if (ship.lasers[i].x < 0) {
              ship.lasers[i].x = ctx!.canvas.width;
            } else if (ship.lasers[i].x > ctx!.canvas.width) {
              ship.lasers[i].x = 0;
            }
            if (ship.lasers[i].y < 0) {
              ship.lasers[i].y = ctx!.canvas.height;
            } else if (ship.lasers[i].y > ctx!.canvas.height) {
              ship.lasers[i].y = 0;
            }
          }

          // Move rocks
          for (let i = 0; i < rocks.length; i++) {
            rocks[i].x += rocks[i].xv;
            rocks[i].y += rocks[i].yv;

            // Handle screen wrap around
            if (rocks[i].x < 0 - rocks[i].r) {
              rocks[i].x = ctx!.canvas.width + rocks[i].r;
            } else if (rocks[i].x > ctx!.canvas.width + rocks[i].r) {
              rocks[i].x = 0 - rocks[i].r;
            }
            if (rocks[i].y < 0 - rocks[i].r) {
              rocks[i].y = ctx!.canvas.height + rocks[i].r;
            } else if (rocks[i].y > ctx!.canvas.height + rocks[i].r) {
              rocks[i].y = 0 - rocks[i].r;
            }
          }
        }

        function newGame(e: KeyboardEvent) {
          // On spacebar press
          if (e.keyCode !== 32) {
            return;
          }
          level = 0;
          score = 0;
          lives = gameLives;
          ship = newShip();

          document.removeEventListener('keydown', newGame);

          highScore = 0;

          newLevel();
        }

        function newLevel() {
          text = 'Level ' + (level + 1);
          textAlpha = 1.0;
          createRockBelt();
        }

        function gameOver() {
          ship.dead = true;
          text = 'Game Over: Add score to leaderboard';
          textAlpha = 1.0;

          // Add score to leaderboard
          addPlayerToLeaderboard(score)
            .then(() => {
              text = 'Game Over: Score added to the leaderboard';
            })
            .catch(e => {
              console.error(e);
              text = 'Error: Failed to add your score to the leaderboard';
            });
        }

        function keyDown(e: KeyboardEvent) {
          if (ship.dead) {
            return;
          }
          switch (e.keyCode) {
            // Spacebar
            case 32:
              shootLaser();
              break;
            // Left Arrow
            case 37:
              ship.rotation = ((shipTurnSpeed / 180) * Math.PI) / FPS;
              break;
            // Up Arrow
            case 38:
              ship.thrusting = true;
              break;
            // Right Arrow
            case 39:
              ship.rotation = ((-shipTurnSpeed / 180) * Math.PI) / FPS;
              break;
          }
        }

        function keyUp(e: KeyboardEvent) {
          switch (e.keyCode) {
            // Spacebar
            case 32:
              ship.canShoot = true;
              break;
            // Left Arrow
            case 37:
              ship.rotation = 0;
              break;
            // Up Arrow
            case 38:
              ship.thrusting = false;
              break;
            // Right Arrow
            case 39:
              ship.rotation = 0;
              break;
          }
        }

        document.addEventListener('keydown', keyDown);
        document.addEventListener('keyup', keyUp);

        interval = setInterval(() => {
          update();
        }, 1000 / FPS);
      }
    }
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <div id='game'>
        <canvas ref={canvas}></canvas>
      </div>
    </>
  );
}
