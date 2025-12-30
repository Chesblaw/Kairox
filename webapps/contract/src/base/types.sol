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
    enum Status {
        Open,
        InProgress,
        Reviewing,
        Completed,
        Cancelled,
        Rejected,
        Disputed
    }

    enum ApplicationStatus {
        Pending,
        Assigned,
        Reviewing,
        Accepted,
        Rejected
    }

    enum ExperienceLevel {
        Entry,
        Junior,
        Mid,
        Senior,
        Expert
    }

    enum JobCategory {
        Technology,
        Design,
        Marketing,
        Writing,
        Business,
        Finance,
        Other
    }

    enum JobDuration {
        OneTime,
        ShortTerm,
        MediumTerm,
        LongTerm,
        Ongoing
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

        struct Applicant {
        address applicant;
        uint256 jobId;
        uint256 applicantId;
        string qualification;
        ApplicationStatus status;
        uint64 appliedAt;
        uint64 updatedAt;
    }

    struct Job {
        uint256 jobId;
        string title;
        string description;
        uint256 budget;
        uint256 budgetMax;
        uint64 deadline;
        string requirements;
        address owner;
        Status status;
        uint256 applications;
        address assignedApplicant;
        uint64 createdAt;
        uint64 updatedAt;
        JobCategory category;
        ExperienceLevel experienceLevel;
        JobDuration duration;
        string location;
        uint256 usdBudget;
    }
}
