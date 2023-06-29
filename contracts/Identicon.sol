// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/Strings.sol";

library Identicon {
    function generateIdenticonSVG(
        bytes32 identifier,
        uint256 rootCellCount,
        uint256 cellSize
    ) external pure returns (string memory) {
        // Identicon 크기
        uint256 size = rootCellCount * cellSize;

        // SVG 문자열 버퍼
        string memory svg;

        // SVG 헤더
        svg = string(
            abi.encodePacked(
                '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="',
                Strings.toString(size),
                '" height="',
                Strings.toString(size),
                '">'
            )
        );

        // Identicon 바디
        for (uint256 i = 0; i < rootCellCount * rootCellCount; i++) {
            uint256 row = i / rootCellCount;
            uint256 col = i % rootCellCount;

            // 셀을 채울지 여부 결정
            bool fillCell = ((identifier >> i) & bytes32(bytes1(uint8(1)))) !=
                bytes32(0);

            // 셀 좌표
            uint256 x = col * cellSize;
            uint256 y = row * cellSize;

            // 셀 색상
            string memory fillColor;
            if (fillCell) {
                fillColor = "#000000"; // 셀을 채우는 경우 검은색
            } else {
                fillColor = "#ffffff"; // 셀을 비우는 경우 흰색
            }

            // 셀을 위한 SVG 직사각형 요소
            svg = string(
                abi.encodePacked(
                    svg,
                    '<rect x="',
                    Strings.toString(x),
                    '" y="',
                    Strings.toString(y),
                    '" width="',
                    Strings.toString(cellSize),
                    '" height="',
                    Strings.toString(cellSize),
                    '" fill="',
                    fillColor,
                    '"/>'
                )
            );
        }

        // SVG 푸터
        svg = string(abi.encodePacked(svg, "</svg>"));

        return svg;
    }
}
