---
id: coin-flip
title: Coin Flip
date: "2023-04-09"
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {CodeTabs, Language, Github} from "@site/components/codetabs"

Coin Flip is a game where the player tries to guess the outcome of a coin flip. It is one of the simplest contracts implementing random numbers.

![img](/docs/assets/examples/coin-flip.png)

---

## Starting the Game
You have two options to start the example:
1. **Recommended:** use the app through Gitpod (a web-based interactive environment)
2. Clone the project locally .


<Tabs className="language-tabs" groupId="code-tabs">
  <TabItem value="🌐 JavaScript">

| Gitpod                                                                                                                                                            | Clone locally                                          |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | -----------------------------------------------------  |
| <a href="https://gitpod.io/#https://github.com/near-examples/coin-flip-js.git"><img src="https://gitpod.io/button/open-in-gitpod.svg" alt="Open in Gitpod" /></a> | 🌐 `https://github.com/near-examples/coin-flip-js.git` |

  </TabItem>

</Tabs>

If you choose Gitpod, a new browser window will open automatically with the code. Give it a minute, and the front-end will pop up (ensure the pop-up window is not blocked).

If you are running the app locally, enter the directory where you cloned it and use `yarn` to install dependencies, and `yarn start` to start it.

```bash
cd counter
yarn
yarn deploy
yarn start
```
Your contract will then be **compiled** and **deployed** to an **account** in the `testnet` network. When done, a browser window should open.

---

## Interacting With the Counter
Go ahead and log in with your NEAR account. If you don't have one, you can create one on the fly. Once logged in, use the `tails` and `heads` buttons to try to guess the next coin flip outcome.

![img](/docs/assets/examples/coin-flip.png)
*Frontend of the Game*

---

## Structure of a dApp

Now that you understand what the dApp does, let us take a closer look to its structure:

1. The frontend code lives in the `/frontend` folder.
2. The smart contract code is in the `/contract` folder.

### Contract
The contract presents 2 methods: `flip_coin`, and `points_of`.

```js
@call({})
flip_coin({ player_guess }: { player_guess: Side }): Side {
  // Check who called the method
  const player: AccountId = near.predecessorAccountId();
  near.log(`${player} chose ${player_guess}`);

  // Simulate a Coin Flip
  const outcome = simulateCoinFlip();

  // Get the current player points
  let player_points: number = this.points.get(player, { defaultValue: 0 })

  // Check if their guess was right and modify the points accordingly
  if (player_guess == outcome) {
    near.log(`The result was ${outcome}, you get a point!`);
    player_points += 1;
  } else {
    near.log(`The result was ${outcome}, you lost a point`);
    player_points = player_points ? player_points - 1 : 0;
  }

  // Store the new points
  this.points.set(player, player_points)

  return outcome
}

// View how many points a specific player has
@view({})
points_of({ player }: { player: AccountId }): number {
  const points = this.points.get(player, {defaultValue: 0})
  near.log(`Points for ${player}: ${points}`)
  return points
}
```

### Frontend
The frontend is composed by a single HTML file (`/index.html`). This file defines the components displayed in the screen.

The website's logic lives in `/assets/js/index.js`, which communicates with the contract through a `wallet`. You will notice in `/assets/js/index.js` the following code:

```js
window.onload = async () => {
  let isSignedIn = await wallet.startUp();

  if (isSignedIn) {
    signedInFlow();
  } else {
    signedOutFlow();
  }
};
```

It indicates our app, when it starts, to check if the user is already logged in and execute either `signedInFlow()` or `signedOutFlow()`.

---

## Testing

When writing smart contracts, it is very important to test all methods exhaustively. In this
project, you have two types: unit and integration tests. Before digging into them,
go ahead and perform the tests present in the dApp through the command `yarn test`.

### Integration test

Integration tests are generally written in JavaScript. They automatically deploy a new
contract and execute methods on it. In this way, integration tests simulate interactions
from users in a realistic scenario. You will find the integration tests for the `counter`
in `tests/integration-tests`.

```js
test('by default the user has no points', async (t) => {
  const { root, contract } = t.context.accounts;
  const points: number = await contract.view('points_of', { player: root.accountId });
  t.is(points, 0);
});

test('the points are correctly computed', async (t) => {
  const { root, contract } = t.context.accounts;

  let counter: {[key:string]:number} = { 'heads': 0, 'tails': 0 }
  let expected_points = 0;

  for(let i=0; i<10; i++){
    const res = await root.call(contract, 'flip_coin', { 'player_guess': 'heads' })
    counter[res as string] += 1;
    expected_points += res == 'heads' ? 1 : -1;
    expected_points = Math.max(expected_points, 0);
  }

  // A binomial(10, 1/2) has a P(x>2) ~ 0.98%
  t.true(counter['heads'] >= 2);

  const points: number = await contract.view('points_of', { 'player': root.accountId });
  t.is(points, expected_points);
});
```

---

## A Note On Randomness

Randomness in the blockchain is a complex subject. We recommend you to read and investigate about it.
You can start with our [security page on it](../../2.develop/contracts/security/random.md).