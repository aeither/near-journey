export class HelloNEAR {
  contractId
  wallet

  constructor({ contractId, walletToUse }) {
    this.contractId = contractId
    this.wallet = walletToUse
  }

  async getGreeting() {
    return await this.wallet.viewMethod({
      contractId: this.contractId,
      method: "get_greeting",
    })
  }

  async setGreeting(greeting) {
    return await this.wallet.callMethod({
      contractId: this.contractId,
      method: "set_greeting",
      args: { greeting: greeting },
    })
  }
}
