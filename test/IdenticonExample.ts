import { Signer } from 'ethers';
import { ethers } from 'hardhat';
import { Identicon } from './../typechain-types/Identicon';
import { IdenticonExample } from './../typechain-types/IdenticonExample';
import { expect } from "chai";

describe("IdenticonExample", function () {
  let identicon: Identicon;
  let identiconExample: IdenticonExample;
  let signer: Signer;

  beforeEach(async function () {
    const Identicon = await ethers.getContractFactory("Identicon");
    identicon = await Identicon.deploy();

    const IdenticonExample = await ethers.getContractFactory("IdenticonExample", {
      libraries: {
        Identicon: identicon.target
      },
    });
    identiconExample = await IdenticonExample.deploy();

    [signer] = await ethers.getSigners();
  });

  it('should create Identicon', async () => {
    const message: string = 'wantaekchoi';
    const identifier: string = ethers.keccak256(ethers.toUtf8Bytes(message));
    const rootCellCount: number = 5;
    const cellSize: number = 20;

    await expect(identiconExample.createIdenticon(identifier, rootCellCount, cellSize))
      .to.emit(identiconExample, 'IdenticonCreated')
      .withArgs(await signer.getAddress(), '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="200" height="200"><rect x="0" y="0" width="40" height="40" fill="#ffffff"/><rect x="40" y="0" width="40" height="40" fill="#ffffff"/><rect x="80" y="0" width="40" height="40" fill="#000000"/><rect x="120" y="0" width="40" height="40" fill="#000000"/><rect x="160" y="0" width="40" height="40" fill="#ffffff"/><rect x="0" y="40" width="40" height="40" fill="#000000"/><rect x="40" y="40" width="40" height="40" fill="#ffffff"/><rect x="80" y="40" width="40" height="40" fill="#000000"/><rect x="120" y="40" width="40" height="40" fill="#ffffff"/><rect x="160" y="40" width="40" height="40" fill="#ffffff"/><rect x="0" y="80" width="40" height="40" fill="#ffffff"/><rect x="40" y="80" width="40" height="40" fill="#ffffff"/><rect x="80" y="80" width="40" height="40" fill="#ffffff"/><rect x="120" y="80" width="40" height="40" fill="#ffffff"/><rect x="160" y="80" width="40" height="40" fill="#ffffff"/><rect x="0" y="120" width="40" height="40" fill="#ffffff"/><rect x="40" y="120" width="40" height="40" fill="#ffffff"/><rect x="80" y="120" width="40" height="40" fill="#ffffff"/><rect x="120" y="120" width="40" height="40" fill="#ffffff"/><rect x="160" y="120" width="40" height="40" fill="#ffffff"/><rect x="0" y="160" width="40" height="40" fill="#ffffff"/><rect x="40" y="160" width="40" height="40" fill="#ffffff"/><rect x="80" y="160" width="40" height="40" fill="#ffffff"/><rect x="120" y="160" width="40" height="40" fill="#ffffff"/><rect x="160" y="160" width="40" height="40" fill="#ffffff"/></svg>');
  });
});
