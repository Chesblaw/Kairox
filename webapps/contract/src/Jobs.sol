// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { IERC20 } from "openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";
import { Types } from "./base/types.sol";
import { IJobs } from "./Interfaces/IJobs.sol";

contract Jobs is IJobs {
    using Types for *;

    // ---------------- Storage ----------------
    uint256 private jobCounter;

    mapping(uint256 => Types.Job) private jobs;
    mapping(uint256 => mapping(uint256 => Types.Applicant)) private applicants;
    mapping(uint256 => mapping(address => bool)) private applied;

    address public oracleManager;
    address public reputationNFT;

    // ---------------- Events ----------------
    event JobCreated(uint256 indexed jobId, address indexed owner);
    event ApplicationSubmitted(uint256 indexed jobId, address applicant);
    event JobAssigned(uint256 indexed jobId, address assignee);
    event JobCancelled(uint256 indexed jobId);

    // ---------------- Admin ----------------
    function setOracleManager(address _oracleManager) external {
        oracleManager = _oracleManager;
    }

    function setReputationNFT(address _reputationNFT) external {
        reputationNFT = _reputationNFT;
    }

    function register() external {}

    // ---------------- Job Logic ----------------
    function createJob(
        address token,
        string calldata title,
        string calldata description,
        uint256 budget,
        uint256 budgetMax,
        uint64 deadline,
        string calldata requirements,
        Types.JobCategory category,
        Types.ExperienceLevel experienceLevel,
        Types.JobDuration duration,
        string calldata location
    ) external returns (uint256) {
        require(budget <= budgetMax, "budget_invalid");
        require(deadline > block.timestamp, "deadline_past");

        uint256 id = ++jobCounter;

        IERC20(token).transferFrom(msg.sender, address(this), budget);

        jobs[id] = Types.Job({
            jobId: id,
            title: title,
            description: description,
            budget: budget,
            budgetMax: budgetMax,
            deadline: deadline,
            requirements: requirements,
            owner: msg.sender,
            status: Types.Status.Open,
            applications: 0,
            assignedApplicant: address(0),
            createdAt: uint64(block.timestamp),
            updatedAt: uint64(block.timestamp),
            category: category,
            experienceLevel: experienceLevel,
            duration: duration,
            location: location,
            usdBudget: budget // oracle placeholder
        });

        emit JobCreated(id, msg.sender);
        return id;
    }

    function applyForJob(uint256 jobId, string calldata proposal)
        external
        returns (uint256)
    {
        require(!applied[jobId][msg.sender], "already_applied");

        Types.Job storage job = jobs[jobId];
        require(job.status == Types.Status.Open, "job_closed");
        require(job.owner != msg.sender, "owner_cannot_apply");

        uint256 applicantId = ++job.applications;

        applicants[jobId][applicantId] = Types.Applicant({
            applicant: msg.sender,
            jobId: jobId,
            applicantId: applicantId,
            qualification: proposal,
            status: Types.ApplicationStatus.Pending,
            appliedAt: uint64(block.timestamp),
            updatedAt: uint64(block.timestamp)
        });

        applied[jobId][msg.sender] = true;

        emit ApplicationSubmitted(jobId, msg.sender);
        return applicantId;
    }

    function assignJob(uint256 jobId, uint256 applicantId) external {
        Types.Job storage job = jobs[jobId];
        require(msg.sender == job.owner, "not_owner");
        require(job.status == Types.Status.Open, "job_not_open");

        Types.Applicant storage app = applicants[jobId][applicantId];
        require(app.applicant != address(0), "invalid_applicant");

        job.assignedApplicant = app.applicant;
        job.status = Types.Status.InProgress;
        app.status = Types.ApplicationStatus.Assigned;

        emit JobAssigned(jobId, app.applicant);
    }

    function cancelJob(address token, uint256 jobId) external {
        Types.Job storage job = jobs[jobId];
        require(msg.sender == job.owner, "not_owner");
        require(job.status == Types.Status.Open, "cannot_cancel");

        job.status = Types.Status.Cancelled;

        IERC20(token).transfer(job.owner, job.budget);

        emit JobCancelled(jobId);
    }

function submitJob(uint256 jobId, uint256 applicantId) external {
    Types.Job storage job = jobs[jobId];
    Types.Applicant storage app = applicants[jobId][applicantId];

    require(job.status == Types.Status.InProgress, "job_not_active");
    require(msg.sender == app.applicant, "not_applicant");
    require(app.status == Types.ApplicationStatus.Assigned, "not_assigned");

    // No Submitted state → revert to Pending
    app.status = Types.ApplicationStatus.Pending;
    app.updatedAt = uint64(block.timestamp);
}

function approveSubmission(
    address token,
    uint256 jobId,
    uint256 applicantId
) external {
    Types.Job storage job = jobs[jobId];
    Types.Applicant storage app = applicants[jobId][applicantId];

    require(msg.sender == job.owner, "not_owner");
    require(app.status == Types.ApplicationStatus.Pending, "not_pending");

    app.status = Types.ApplicationStatus.Accepted;
    job.status = Types.Status.Completed;
    job.updatedAt = uint64(block.timestamp);

    IERC20(token).transfer(app.applicant, job.budget);
}

function rejectSubmission(uint256 jobId, uint256 applicantId) external {
    Types.Job storage job = jobs[jobId];
    Types.Applicant storage app = applicants[jobId][applicantId];

    require(msg.sender == job.owner, "not_owner");
    require(app.status == Types.ApplicationStatus.Pending, "not_pending");

    app.status = Types.ApplicationStatus.Rejected;
    app.updatedAt = uint64(block.timestamp);
}


function requestChanges(uint256 jobId, uint256 applicantId) external {
    Types.Job storage job = jobs[jobId];
    Types.Applicant storage app = applicants[jobId][applicantId];

    require(msg.sender == job.owner, "not_owner");
    require(app.status == Types.ApplicationStatus.Pending, "not_pending");

    // No ChangesRequested → move back to Pending
    app.status = Types.ApplicationStatus.Pending;
    app.updatedAt = uint64(block.timestamp);
}


function searchJobs(
    Types.JobCategory category,
    bool useCategory
) external view returns (Types.Job[] memory) {
    uint256 count;

    for (uint256 i = 1; i <= jobCounter; i++) {
        if (!useCategory || jobs[i].category == category) {
            count++;
        }
    }

    Types.Job[] memory result = new Types.Job[](count);
    uint256 idx;

    for (uint256 i = 1; i <= jobCounter; i++) {
        if (!useCategory || jobs[i].category == category) {
            result[idx++] = jobs[i];
        }
    }

    return result;
}

    // ---------------- Payments ----------------
    function payApplicant(
        address token,
        address receiver,
        uint256 amount
    ) public returns (bool) {
        IERC20(token).transfer(receiver, amount);
        return true;
    }

    function deposit(
        address token,
        address depositor,
        uint256 amount
    ) external returns (bool) {
        IERC20(token).transferFrom(depositor, address(this), amount);
        return true;
    }

    function checkBalance(address token, address user)
        external
        view
        returns (uint256)
    {
        return IERC20(token).balanceOf(user);
    }

    // ---------------- Views ----------------
    function getApplicant(uint256 jobId, uint256 applicantId)
        external
        view
        returns (Types.Applicant memory)
    {
        return applicants[jobId][applicantId];
    }

    function getAllJobApplicants(uint256 jobId)
        external
        view
        returns (Types.Applicant[] memory)
    {
        uint256 count = jobs[jobId].applications;
        Types.Applicant[] memory result = new Types.Applicant[](count);

        for (uint256 i = 1; i <= count; i++) {
            result[i - 1] = applicants[jobId][i];
        }
        return result;
    }

    function getJob(uint256 jobId)
        external
        view
        returns (Types.Job memory)
    {
        return jobs[jobId];
    }
}
