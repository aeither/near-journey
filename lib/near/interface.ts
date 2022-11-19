export class HelloNEAR {
  contractId
  wallet

  constructor({ contractId, walletToUse }) {
    this.contractId = contractId
    this.wallet = walletToUse
  }

  async viewNFT(tokenId) {
    return await this.wallet.viewMethod({
      contractId: this.contractId,
      method: "nft_token",
      args: {
        token_id: tokenId,
      },
    })
  }

  async initialize(ownerId) {
    return await this.wallet.callMethod({
      contractId: this.contractId,
      method: "new_default_meta",
      args: {
        owner_id: ownerId,
      },
    })
  }

  async nftMint(receiver, tokenId, metadata) {
    return await this.wallet.callMethod({
      contractId: this.contractId,
      method: "nft_mint",
      args: {
        token_id: tokenId,
        receiver_id: receiver,
        token_metadata: metadata,
      },
    })
  }

  async nftTransfer(receiver, tokenId, memo) {
    return await this.wallet.callMethod({
      contractId: this.contractId,
      method: "nft_transfer",
      args: { receiver_id: receiver, token_id: tokenId, memo: memo },
    })
  }
}
