// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./Identicon.sol";

contract IdenticonExample {
    event IdenticonCreated(address owner, string svg);

    function createIdenticon(
        bytes32 identifier,
        uint256 rootCellCount,
        uint256 cellSize
    ) external {
        string memory svg = Identicon.generateIdenticonSVG(
            identifier,
            rootCellCount,
            cellSize
        );
        emit IdenticonCreated(msg.sender, svg);
    }
}
