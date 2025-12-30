// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IDispute} from "./Interfaces/IDispute.sol";
import { Types } from "./base/types.sol";

contract Dispute is IDispute {
    using Types for *;

    // ---------------- Storage ----------------
    mapping(uint256 => Types.Dispute) private disputes;
    uint256 private disputeCounter;

    mapping(uint256 => uint256) private evidenceCounter;
    mapping(uint256 => mapping(uint256 => Types.Evidence)) private evidences;

    mapping(uint256 => mapping(address => Types.VoteInfo)) private votes;
    mapping(address => Types.ArbitratorInfo) private arbitrators;

    address public multiSig;

    // ---------------- Events ----------------
    event DisputeInitiated(
        uint256 indexed disputeId,
        uint256 jobId,
        address claimant,
        address respondent
    );

    event EvidenceSubmitted(
        uint256 indexed disputeId,
        uint256 evidenceId,
        address submitter
    );

    event Voted(
        uint256 indexed disputeId,
        address arbitrator,
        bool support,
        uint256 weight
    );

    event DisputeResolved(uint256 indexed disputeId, address winner);
    event DisputeAppealed(uint256 indexed disputeId);
    event FalseDisputePenalised(uint256 indexed disputeId, address claimant);

    // ---------------- Modifiers ----------------
modifier onlyMultisig() {
    _onlyMultisig();
    _;
}

function _onlyMultisig() internal view {
    require(msg.sender == multiSig, "only_multisig");
}


    // ---------------- Logic ----------------
    function init(address _multiSig) external {
        require(multiSig == address(0), "only_multisig");
        multiSig = _multiSig;
    }

    function initiateDispute(
        uint256 jobId,
        address claimant,
        address respondent
    ) external returns (uint256) {
        require(msg.sender == claimant, "only_claimant");

        uint256 disputeId = ++disputeCounter;
        uint64 nowTs = uint64(block.timestamp);
        uint64 votingPeriod = 3 days;

        disputes[disputeId] = Types.Dispute({
            disputeId: disputeId,
            jobId: jobId,
            claimant: claimant,
            respondent: respondent,
            status: Types.DisputeStatus.Open,
            votingDeadline: nowTs + votingPeriod,
            createdAt: nowTs
        });

        emit DisputeInitiated(disputeId, jobId, claimant, respondent);
        return disputeId;
    }

    function submitEvidence(uint256 disputeId, bytes calldata data) external {
        Types.Dispute memory dispute = disputes[disputeId];
        require(
            dispute.status == Types.DisputeStatus.Open ||
                dispute.status == Types.DisputeStatus.Voting,
            "wrong_status"
        );

        uint256 nextId = ++evidenceCounter[disputeId];

        evidences[disputeId][nextId] = Types.Evidence({
            disputeId: disputeId,
            evidenceId: nextId,
            submitter: msg.sender,
            data: data,
            submittedAt: uint64(block.timestamp)
        });

        emit EvidenceSubmitted(disputeId, nextId, msg.sender);
    }

    function vote(uint256 disputeId, bool support) external {
        Types.Dispute storage dispute = disputes[disputeId];

        require(block.timestamp < dispute.votingDeadline, "voting_closed");
        require(
            msg.sender != dispute.claimant &&
                msg.sender != dispute.respondent,
            "party_cannot_vote"
        );

        require(votes[disputeId][msg.sender].disputeId == 0, "already_voted");

        uint256 weight = 1;

        votes[disputeId][msg.sender] = Types.VoteInfo({
            disputeId: disputeId,
            arbitrator: msg.sender,
            support: support,
            weight: weight,
            submittedAt: uint64(block.timestamp)
        });

        if (dispute.status == Types.DisputeStatus.Open) {
            dispute.status = Types.DisputeStatus.Voting;
        }

        emit Voted(disputeId, msg.sender, support, weight);
    }

    function resolveDispute(uint256 disputeId) external {
        Types.Dispute storage dispute = disputes[disputeId];

        require(block.timestamp >= dispute.votingDeadline, "too_early");
        require(
            dispute.status == Types.DisputeStatus.Open ||
                dispute.status == Types.DisputeStatus.Voting,
            "wrong_status"
        );

        dispute.status = Types.DisputeStatus.Resolved;
        emit DisputeResolved(disputeId, dispute.claimant);
    }

    function appealDispute(uint256 disputeId) external {
        Types.Dispute storage dispute = disputes[disputeId];

        require(dispute.status == Types.DisputeStatus.Resolved, "not_resolved");
        require(
            msg.sender == dispute.claimant ||
                msg.sender == dispute.respondent,
            "only_party"
        );

        dispute.status = Types.DisputeStatus.Appealed;
        dispute.votingDeadline = uint64(block.timestamp + 2 days);

        emit DisputeAppealed(disputeId);
    }

    function penaliseFalseDispute(uint256 disputeId) external onlyMultisig {
        emit FalseDisputePenalised(
            disputeId,
            disputes[disputeId].claimant
        );
    }

    // ---------------- Views ----------------
    function getDispute(uint256 disputeId)
        external
        view
        returns (Types.Dispute memory)
    {
        return disputes[disputeId];
    }

    function getVote(uint256 disputeId, address arbitrator)
        external
        view
        returns (Types.VoteInfo memory)
    {
        return votes[disputeId][arbitrator];
    }

    function getArbitrator(address arbitrator)
        external
        view
        returns (Types.ArbitratorInfo memory)
    {
        return arbitrators[arbitrator];
    }
}
