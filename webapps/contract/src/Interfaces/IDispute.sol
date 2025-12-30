// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { Types } from "../base/types.sol";

interface IDispute {
    function init(address multiSig) external;

    function initiateDispute(
        uint256 jobId,
        address claimant,
        address respondent
    ) external returns (uint256);

    function submitEvidence(
        uint256 disputeId,
        bytes calldata data
    ) external;

    function vote(uint256 disputeId, bool support) external;

    function resolveDispute(uint256 disputeId) external;

    function appealDispute(uint256 disputeId) external;

    function penaliseFalseDispute(uint256 disputeId) external;

    function getDispute(uint256 disputeId)
        external
        view
        returns (Types.Dispute memory);

    function getVote(uint256 disputeId, address arbitrator)
        external
        view
        returns (Types.VoteInfo memory);

    function getArbitrator(address arbitrator)
        external
        view
        returns (Types.ArbitratorInfo memory);
}
