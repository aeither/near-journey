---
id: guest-book
title: Guest Book
date: "2023-04-09"
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {CodeTabs, Language, Github} from "@site/components/codetabs"

Our Guest Book example is a simple app composed by two main components:
  1. A smart contract that stores messages from users, allowing to attach money to them.
  2. A simple web-based frontend that displays the last 10 messages posted.

![img](/docs/assets/examples/guest-book.png)

---

## Starting the Project

You have two options to start using the project. The first and recommended is to use the app through Gitpod, which will open a web-based interactive environment. The second option is to clone the repository locally, for which you will need to install all the [Prerequisites](../../2.develop/prerequisites.md).

<Tabs className="language-tabs" groupId="code-tabs">
  <TabItem value="🌐 JavaScript" >

  | Gitpod                                                                                                                                                          | Clone locally                                   |
  | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
  | <a href="https://gitpod.io/#https://github.com/near-examples/guest-book-js.git"><img src="https://gitpod.io/button/open-in-gitpod.svg" alt="Open in Gitpod" /></a> | 🌐 `https://github.com/near-examples/guest-book-js` |

  </TabItem>
  <TabItem value="🦀 Rust">

  | Gitpod              | Clone locally         |
  | ------------------- | --------------------- |
  | <a href="https://gitpod.io/#https://github.com/near-examples/guest-book-rust.git"><img src="https://gitpod.io/button/open-in-gitpod.svg" alt="Open in Gitpod" /></a>  | 🦀 `https://github.com/near-examples/guest-book-rust` |

  </TabItem>
  <TabItem value="🚀 AssemblyScript" >

  | Gitpod                                                                                                                                                          | Clone locally                                   |
  | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
  | <a href="https://gitpod.io/#https://github.com/near-examples/guest-book.git"><img src="https://gitpod.io/button/open-in-gitpod.svg" alt="Open in Gitpod" /></a> | 🚀 `https://github.com/near-examples/guest-book` |

  </TabItem>
</Tabs>


If you choose Gitpod a new browser window will open automatically with the code, give it a minute and the frontend will pop-up (make sure the pop-up window is not blocked).

If you are running the app locally, enter the directory where you cloned it and use `yarn` to install dependencies, and `yarn start` to start it.

```bash
cd guest-book
yarn
yarn deploy
yarn start
```
Your contract will then be **compiled** and **deployed** to an **account** in the `testnet` network. When done, a browser window should open.

---

## Interacting With the Guest Book

![img](/docs/assets/examples/guest-book.png)
*Frontend of the Guest Book app*

Go ahead and login with your NEAR account. If you don't have one, you will be able to create one in the moment. Once logged in,
you will be able to sign a message in the guest book. You can further send some money alongside your message. If you attach
more than 0.01Ⓝ then your message will be marked as "premium".

---

## Structure of a dApp

Now that you understand what the dApp does, let us take a closer look to its structure:

1. The frontend code lives in the `/frontend` folder.
2. The smart contract code is in the `/contract` folder.

### Contract
The contract presents 2 methods: `add_message` and `get_message`.

```rust
#[near_bindgen]
impl GuestBook {

  #[payable]
  pub fn add_message(&mut self, text: String) {
    // If the user attaches more than 0.01N the message is premium
    let premium = env::attached_deposit() >= POINT_ONE;
    let sender = env::predecessor_account_id();

    let message = PostedMessage{premium, sender, text};
    self.messages.push(&message);
  }

  pub fn get_messages(&self, from_index:Option<U128>, limit:Option<u64>) -> Vec<PostedMessage>{
    let from = u128::from(from_index.unwrap_or(U128(0)));

    self.messages.iter()
    .skip(from as usize)
    .take(limit.unwrap_or(10) as usize)
    .collect()
  }
}
```

### Frontend
The frontend is composed by a single HTML file (`/index.html`) and uses REACT. Check `/App.js` and `/index.js` to understand how
components are displayed in the screen.

You will notice in `/assets/js/index.js` the following code:

```js
const guestBook = new GuestBook({ contractId: process.env.CONTRACT_NAME, walletToUse: wallet });

// Setup on page load
window.onload = async () => {
  const isSignedIn = await wallet.startUp()
 
  ReactDOM.render(
    <App isSignedIn={isSignedIn} guestBook={guestBook} wallet={wallet} />,
    document.getElementById('root')
  );
}
```

It setups the necessary variables and starts the app.


---

## Testing

When writing smart contracts it is very important to test all methods exhaustively. In this
project you have two types of tests: unit and integration. Before digging in them,
go ahead and perform the tests present in the dApp through the command `yarn test`.

### Unit test

Unit tests check individual functions in the smart contract. Right now only rust implements unit testing. 

```rust
#[test]
fn add_message() {
  let mut contract = GuestBook::default();
  contract.add_message("A message".to_string());

  let posted_message = &contract.get_messages(None, None)[0];
  assert_eq!(posted_message.premium, false);
  assert_eq!(posted_message.text, "A message".to_string());
}

#[test]
fn iters_messages() {
  let mut contract = GuestBook::default();
  contract.add_message("1st message".to_string());
  contract.add_message("2nd message".to_string());
  contract.add_message("3rd message".to_string());
  
  let messages = &contract.get_messages(None, None);
  assert!(messages.len() == 3);

  let last_message = &contract.get_messages(Some(U128::from(1)), Some(2))[1];
  assert_eq!(last_message.premium, false);
  assert_eq!(last_message.text, "3rd message".to_string());
}
```

