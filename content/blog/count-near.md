---
id: count-near
title: Count on NEAR
date: "2023-04-09"
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {CodeTabs, Language, Github} from "@site/components/codetabs"

Our counter example is a friendly decentralized app that stores a number and exposes methods to `increment`,
`decrement`, and `reset` it.

---

## Starting the Counter
You have two options to start the Counter:
1. **Recommended:** use the app through Gitpod (a web-based interactive environment)
2. Clone the project locally .

If you choose Gitpod, a new browser window will open automatically with the code. Give it a minute, and the frontend will pop up (ensure the pop-up window is not blocked).

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
Go ahead and login with your NEAR account. If you don't have one, you will be able to create one in the moment. Once logged in, use the `+` and `-` buttons to increase and decrease the counter. Then, use the Gameboy buttons to reset it and make the counter blink an eye!

*Frontend of the Counter*

---

## Structure of a dApp

Now that you understand what the dApp does, let us take a closer look to its structure:

1. The frontend code lives in the `/frontend` folder.
2. The smart contract code is in the `/contract` folder.

### Contract
The contract presents 4 methods: `get_num`, `increment`, `decrement`, and `reset`. The method `get_num` retrieves the current value, and the rest modify it.

```ts
@NearBindgen({})
class Counter {
  val: number = 0;

  @view({}) // Public read-only method: Returns the counter value.
  get_num(): number {
    return this.val
  }

  @call({}) // Public method: Increment the counter.
  increment() {
    this.val += 1;
    near.log(`Increased number to ${this.val}`)
  }

  @call({}) // Public method: Decrement the counter.
  decrement() {
    this.val -= 1;
    near.log(`Decreased number to ${this.val}`)
  }

  @call({}) // Public method - Reset to zero.
  reset() {
    this.val = 0;
    near.log(`Reset counter to zero`)
  }
}
```

### Frontend
The frontend is composed by a single HTML file (`/index.html`). This file defines the components displayed in the screen.

The website's logic lives in `/assets/js/index.js`, which communicates with the contract through `/near-interface.js`. You will notice in `/assets/js/index.js` the following code:

```ts
// Setup on page load
window.onload = async () => {
  const isSignedIn = await wallet.startUp();

  if (isSignedIn){
    signedInFlow()
  }else{
    signedOutFlow()
  }

  updateUI()
}
```

It indicates our app, when it starts, to check if the user is already logged in and execute either `signedInFlow()` or `signedOutFlow()`.

---

## Testing

When writing smart contracts it is very important to test all methods exhaustively. In this
project you have two types of tests: unit and integration. Before digging in them,
go ahead and perform the tests present in the dApp through the command `yarn test`.

### Integration test

Integration tests are generally written in javascript. They automatically deploy a new
contract and execute methods on it. In this way, integration tests simulate interactions
from users in a realistic scenario. You will find the integration tests for the `counter`
in `tests/integration-tests`.

```ts
test("can be incremented", async (t) => {
  const { alice, contract } = t.context.accounts;
  const startCounter: number = await contract.view("get_num", {});
  await alice.call(contract, "increment", {});
  const endCounter = await contract.view("get_num", {});
  t.is(endCounter, startCounter + 1);
});

test("can be decremented", async (t) => {
  const { alice, contract } = t.context.accounts;
  await alice.call(contract, "increment", {});
  const startCounter: number = await contract.view("get_num", {});
  await alice.call(contract, "decrement", {});
  const endCounter = await contract.view("get_num", {});
  t.is(endCounter, startCounter - 1);
});

test("can be reset", async (t) => {
  const { alice, contract } = t.context.accounts;
  await alice.call(contract, "increment", {});
  await alice.call(contract, "increment", {});
  await alice.call(contract, "reset", {});
  const endCounter = await contract.view("get_num", {});
  t.is(endCounter, 0);
});
```

---

## Moving Forward

A nice way to learn is by trying to expand the contract. Modify it by adding a parameter to `increment` and `decrement`,
so the user can choose by how much to change the value. For this, you will need to use knowledge from the [anatomy](../../2.develop/contracts/anatomy.md)
and [storage](../../2.develop/contracts/storage.md) sections.
