// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {Jobs} from "../src/Jobs.sol";
import { Types } from "../src/base/types.sol";
import { MockERC20 } from "./mocks/MockERC20.sol";

contract JobsTest is Test {
    Jobs jobs;
    MockERC20 token;

    address owner = address(0x1);
    address applicant1 = address(0x2);
    address applicant2 = address(0x3);

    function setUp() public {
        jobs = new Jobs();
        token = new MockERC20();

        token.mint(owner, 1_000 ether);
        token.mint(applicant1, 1_000 ether);
        token.mint(applicant2, 1_000 ether);

        vm.prank(owner);
        token.approve(address(jobs), type(uint256).max);
    }

    // --------------------------------------------------
    // CREATE JOB
    // --------------------------------------------------

    function testCreateJob() public {
        vm.prank(owner);
        uint256 jobId = jobs.createJob(
            address(token),
            "Backend Developer",
            "Build APIs",
            100 ether,
            200 ether,
            uint64(block.timestamp + 7 days),
            "Solidity experience",
            Types.JobCategory.Technology,
            Types.ExperienceLevel.Mid,
            Types.JobDuration.ShortTerm,
            "Remote"
        );

        Types.Job memory job = jobs.getJob(jobId);

        assertEq(job.jobId, jobId);
        assertEq(job.owner, owner);
        assertEq(uint256(job.status), uint256(Types.Status.Open));
        assertEq(job.budget, 100 ether);
    }

    function testCreateJobFailsIfBudgetInvalid() public {
        vm.prank(owner);
        vm.expectRevert("budget_invalid");
        jobs.createJob(
            address(token),
            "Invalid Job",
            "Fail",
            300 ether,
            100 ether,
            uint64(block.timestamp + 1 days),
            "None",
            Types.JobCategory.Other,
            Types.ExperienceLevel.Entry,
            Types.JobDuration.OneTime,
            "Remote"
        );
    }

    // --------------------------------------------------
    // APPLY FOR JOB
    // --------------------------------------------------

    function _createJob() internal returns (uint256) {
        vm.prank(owner);
        return jobs.createJob(
            address(token),
            "Solidity Dev",
            "Smart contracts",
            100 ether,
            150 ether,
            uint64(block.timestamp + 7 days),
            "Solidity",
            Types.JobCategory.Technology,
            Types.ExperienceLevel.Junior,
            Types.JobDuration.ShortTerm,
            "Remote"
        );
    }

    function testApplyForJob() public {
        uint256 jobId = _createJob();

        vm.prank(applicant1);
        uint256 applicantId = jobs.applyForJob(jobId, "I am qualified");

        Types.Applicant memory app = jobs.getApplicant(jobId, applicantId);

        assertEq(app.applicant, applicant1);
        assertEq(uint256(app.status), uint256(Types.ApplicationStatus.Pending));
    }

    function testCannotApplyTwice() public {
        uint256 jobId = _createJob();

        vm.prank(applicant1);
        jobs.applyForJob(jobId, "First");

        vm.prank(applicant1);
        vm.expectRevert("already_applied");
        jobs.applyForJob(jobId, "Second");
    }

    function testOwnerCannotApply() public {
        uint256 jobId = _createJob();

        vm.prank(owner);
        vm.expectRevert("owner_cannot_apply");
        jobs.applyForJob(jobId, "Owner applying");
    }

    // --------------------------------------------------
    // ASSIGN JOB
    // --------------------------------------------------

    function testAssignJob() public {
        uint256 jobId = _createJob();

        vm.prank(applicant1);
        uint256 applicantId = jobs.applyForJob(jobId, "Hire me");

        vm.prank(owner);
        jobs.assignJob(jobId, applicantId);

        Types.Job memory job = jobs.getJob(jobId);
        Types.Applicant memory app = jobs.getApplicant(jobId, applicantId);

        assertEq(job.assignedApplicant, applicant1);
        assertEq(uint256(job.status), uint256(Types.Status.InProgress));
        assertEq(uint256(app.status), uint256(Types.ApplicationStatus.Assigned));
    }

    function testOnlyOwnerCanAssign() public {
        uint256 jobId = _createJob();

        vm.prank(applicant1);
        uint256 applicantId = jobs.applyForJob(jobId, "Hire me");

        vm.prank(applicant2);
        vm.expectRevert("not_owner");
        jobs.assignJob(jobId, applicantId);
    }

    // --------------------------------------------------
    // CANCEL JOB
    // --------------------------------------------------

    function testCancelJobRefundsOwner() public {
        uint256 jobId = _createJob();
        uint256 balanceBefore = token.balanceOf(owner);

        vm.prank(owner);
        jobs.cancelJob(address(token), jobId);

        uint256 balanceAfter = token.balanceOf(owner);
        Types.Job memory job = jobs.getJob(jobId);

        assertEq(balanceAfter, balanceBefore + 100 ether);
        assertEq(uint256(job.status), uint256(Types.Status.Cancelled));
    }

    function testCannotCancelAfterAssignment() public {
        uint256 jobId = _createJob();

        vm.prank(applicant1);
        uint256 applicantId = jobs.applyForJob(jobId, "Hire me");

        vm.prank(owner);
        jobs.assignJob(jobId, applicantId);

        vm.prank(owner);
        vm.expectRevert("cannot_cancel");
        jobs.cancelJob(address(token), jobId);
    }
}
