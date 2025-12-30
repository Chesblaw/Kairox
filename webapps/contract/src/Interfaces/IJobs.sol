// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { Types } from "../base/types.sol";

interface IJobs {
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
    ) external returns (uint256);

    function applyForJob(uint256 jobId, string calldata proposal)
        external
        returns (uint256);

    function assignJob(uint256 jobId, uint256 applicantId) external;

    function submitJob(uint256 jobId, uint256 applicantId) external;

    function approveSubmission(
        address token,
        uint256 jobId,
        uint256 applicantId
    ) external;

    function rejectSubmission(uint256 jobId, uint256 applicantId) external;

    function requestChanges(uint256 jobId, uint256 applicantId) external;

    function cancelJob(address token, uint256 jobId) external;

    function getJob(uint256 jobId)
        external
        view
        returns (Types.Job memory);

    function getApplicant(uint256 jobId, uint256 applicantId)
        external
        view
        returns (Types.Applicant memory);

    function searchJobs(
        Types.JobCategory category,
        bool useCategory
    ) external view returns (Types.Job[] memory);
}
