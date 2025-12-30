// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

library Types {
    // ---------------- Dispute ----------------
    enum DisputeStatus {
        Open,
        Voting,
        Resolved,
        Appealed,
        Closed
    }

    struct Dispute {
        uint256 disputeId;
        uint256 jobId;
        address claimant;
        address respondent;
        DisputeStatus status;
        uint64 votingDeadline;
        uint64 createdAt;
    }

    struct Evidence {
        uint256 disputeId;
        uint256 evidenceId;
        address submitter;
        bytes data;
        uint64 submittedAt;
    }

    struct VoteInfo {
        uint256 disputeId;
        address arbitrator;
        bool support;
        uint256 weight;
        uint64 submittedAt;
    }

    struct ArbitratorInfo {
        address arbitrator;
        uint256 reputation;
    }
}
