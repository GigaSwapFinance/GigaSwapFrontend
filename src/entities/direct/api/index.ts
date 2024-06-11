import { NULL_ADDRESS } from '@/shared/const/tokens'
import Contract from '@/shared/lib/contract'
import { CONTRACTS } from '@/shared/const/contracts'
import type { IDirectAsset, IDirectCreateProps } from '@/shared/types/direct'

function mapAssets(assets: IDirectAsset[]) {
  const ethAssets = []
  const erc20Assets = []
  const erc721Assets = []
  const erc721CountAssets = []

  for (let asset of assets) {
    const type = asset.type
    const withdrawTimer = 0

    if (type === 1) {
      ethAssets.push([asset.fromAddress, asset.toAddress, asset.amount, withdrawTimer])
    }
    else if (type === 2) {
      erc20Assets.push([asset.fromAddress, asset.toAddress, asset.tokenAddress, asset.amount, withdrawTimer])
    }
    else if (type === 3) {
      erc721Assets.push([asset.fromAddress, asset.toAddress, asset.tokenAddress, asset.tokenId, withdrawTimer])
    }
    else if (type === 4) {
      erc721CountAssets.push([asset.fromAddress, asset.toAddress, asset.tokenAddress, asset.amount, withdrawTimer])
    }
  }

  return {
    ethAssets,
    erc20Assets,
    erc721Assets,
    erc721CountAssets,
  }
}

export async function createDirect({ assets, partnerAddress }: IDirectCreateProps) {
  const contract = new Contract(CONTRACTS.direct.address, CONTRACTS.direct.abi)

  if (!partnerAddress) {
    partnerAddress = NULL_ADDRESS
  }

  const {
    ethAssets,
    erc20Assets,
    erc721Assets,
    erc721CountAssets,
  } = mapAssets(assets)

  console.log({
    partnerAddress,
    ethAssets,
    erc20Assets,
    erc721Assets,
    erc721CountAssets,
  })

  return contract.send(
    'createDeal',
    [
      [
        partnerAddress,
        ethAssets,
        erc20Assets,
        erc721Assets,
        erc721CountAssets,
      ]
    ],
  )
}

export async function executeDirect(tradeBlockchainId: number) {
  const contract = new Contract(CONTRACTS.directController.address, CONTRACTS.directController.abi)

  return contract.send(
    'execute',
    [tradeBlockchainId],
    // '10000000000000000'
  )
}

export async function withdrawDirectTrade(tradeBlockchainId: string, isOwner: boolean = false) {
  const contract = new Contract(CONTRACTS.directController.address, CONTRACTS.directController.abi)

  const ethFee = await getDirectWithdrawalFee(
    tradeBlockchainId,
    isOwner ? 1 : 2,
  )

  const { transactionHash } = await contract.send('withdraw', [tradeBlockchainId], ethFee)

  return {
    transactionHash,
  }
}

export async function executeDirectTrade(tradeBlockchainId: string | number, ethAmount = null) {
  const ethValue = ethAmount || null
  const contract = new Contract(CONTRACTS.directController.address, CONTRACTS.directController.abi)
  return contract.send('execute', [tradeBlockchainId], ethValue)
}

export async function swapDirectTrade(tradeBlockchainId: string | number) {
  const contract = new Contract(CONTRACTS.directController.address, CONTRACTS.directController.abi)
  return contract.send('swap', [tradeBlockchainId])
}

export async function getDirectWithdrawalFee(tradeBlockchainId: string, ownerIndex: number) {
  const contract = new Contract(CONTRACTS.directController.address, CONTRACTS.directController.abi)
  return contract.call('feeEthOnWithdraw', [tradeBlockchainId, ownerIndex])
}