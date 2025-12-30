// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import { Dispute } from "../src/Dispute.sol";
import { Types } from "../src/base/types.sol";

contract DisputeTest is Test {
    Dispute dispute;

    address claimant = address(0x1);
    address respondent = address(0x2);
    address arbitrator = address(0x3);
    address multisig = address(0x999);

    function setUp() public {
        dispute = new Dispute();
    }

    function testInitiateDispute() public {
        vm.prank(claimant);
        uint256 id = dispute.initiateDispute(1, claimant, respondent);

Types.Dispute memory d = dispute.getDispute(id);
assertEq(uint256(d.status), uint256(Types.DisputeStatus.Open));
assertEq(d.jobId, 1);
    }

    function testFirstVoteChangesStatusToVoting() public {
        vm.prank(claimant);
        uint256 id = dispute.initiateDispute(1, claimant, respondent);

        vm.prank(arbitrator);
        dispute.vote(id, true);
Types.Dispute memory d = dispute.getDispute(id);
assertEq(uint256(d.status), uint256(Types.DisputeStatus.Voting));

    }

    function testPartyCannotVote() public {
        vm.prank(claimant);
        uint256 id = dispute.initiateDispute(1, claimant, respondent);

        vm.prank(claimant);
        vm.expectRevert("party_cannot_vote");
        dispute.vote(id, true);
    }

    function testResolveAfterDeadline() public {
        vm.prank(claimant);
        uint256 id = dispute.initiateDispute(1, claimant, respondent);

        vm.warp(block.timestamp + 4 days);
        dispute.resolveDispute(id);
Types.Dispute memory d = dispute.getDispute(id);
assertEq(uint256(d.status), uint256(Types.DisputeStatus.Resolved));

    }

    function testAppealSuccess() public {
        vm.prank(claimant);
        uint256 id = dispute.initiateDispute(1, claimant, respondent);

        vm.warp(block.timestamp + 4 days);
        dispute.resolveDispute(id);

        vm.prank(respondent);
        dispute.appealDispute(id);

Types.Dispute memory d = dispute.getDispute(id);
assertEq(uint256(d.status), uint256(Types.DisputeStatus.Appealed));

    }

    function testPenaliseOnlyMultisig() public {
        dispute.init(multisig);

        vm.prank(claimant);
        vm.expectRevert("only_multisig");
        dispute.penaliseFalseDispute(1);
    }
}
