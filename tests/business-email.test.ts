import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  BLOCKED_EMAIL_DOMAINS,
  WORK_EMAIL_HELP_TEXT,
  normalizeEmail,
  getEmailDomain,
  isBlockedEmailDomain,
  isValidEmailFormat,
  validateBusinessEmail,
} from "../src/lib/business-email.ts";

describe("Business Email Validation", () => {
  const EXPECTED_BLOCKED_DOMAINS = [
    "gmail.com",
    "googlemail.com",
    "outlook.com",
    "hotmail.com",
    "live.com",
    "msn.com",
    "yahoo.com",
    "ymail.com",
    "icloud.com",
    "me.com",
    "mac.com",
    "aol.com",
    "proton.me",
    "protonmail.com",
    "mail.com",
    "gmx.com",
    "gmx.net",
    "fastmail.com",
    "hey.com",
    "tutanota.com",
    "tuta.com",
  ];

  it("contains all 21 blocked personal email provider domains", () => {
    assert.equal(BLOCKED_EMAIL_DOMAINS.size, EXPECTED_BLOCKED_DOMAINS.length);
    for (const domain of EXPECTED_BLOCKED_DOMAINS) {
      assert.ok(
        BLOCKED_EMAIL_DOMAINS.has(domain),
        `Domain ${domain} should be present in BLOCKED_EMAIL_DOMAINS`
      );
    }
  });

  describe("Blocked Domains", () => {
    for (const domain of EXPECTED_BLOCKED_DOMAINS) {
      it(`rejects ${domain} with exact helpful work email message`, () => {
        const email = `testuser@${domain}`;
        assert.equal(isBlockedEmailDomain(email), true);

        const result = validateBusinessEmail(email);
        assert.equal(result.valid, false);
        assert.equal(result.error, WORK_EMAIL_HELP_TEXT);
        assert.equal(result.domain, domain);
      });
    }
  });

  describe("Accepted Business Domains", () => {
    const businessEmails = [
      "engineer@ambient.ai",
      "procurement@acmecorp.com",
      "cto@enterprise.org",
      "lead@hardware-startup.io",
      "developer@chipsets.tech",
      "contact@partner-agency.de",
      "director@university.edu",
      "support@deeplearning.net",
    ];

    for (const email of businessEmails) {
      it(`accepts business email: ${email}`, () => {
        assert.equal(isBlockedEmailDomain(email), false);

        const result = validateBusinessEmail(email);
        assert.equal(result.valid, true);
        assert.equal(result.error, undefined);
        assert.equal(result.normalized, email);
      });
    }
  });

  describe("Case and Whitespace Normalization", () => {
    it("normalizes uppercase and surrounding whitespace for blocked email", () => {
      const input = "   TestUser@GMAIL.COM   ";
      const normalized = normalizeEmail(input);
      assert.equal(normalized, "testuser@gmail.com");
      assert.equal(getEmailDomain(input), "gmail.com");
      assert.equal(isBlockedEmailDomain(input), true);

      const result = validateBusinessEmail(input);
      assert.equal(result.valid, false);
      assert.equal(result.normalized, "testuser@gmail.com");
      assert.equal(result.domain, "gmail.com");
      assert.equal(result.error, WORK_EMAIL_HELP_TEXT);
    });

    it("normalizes uppercase and tabs/newlines for business email", () => {
      const input = "\t Jane.Doe@AcmeCorp.COM \n";
      const normalized = normalizeEmail(input);
      assert.equal(normalized, "jane.doe@acmecorp.com");
      assert.equal(getEmailDomain(input), "acmecorp.com");
      assert.equal(isBlockedEmailDomain(input), false);

      const result = validateBusinessEmail(input);
      assert.equal(result.valid, true);
      assert.equal(result.normalized, "jane.doe@acmecorp.com");
      assert.equal(result.domain, "acmecorp.com");
      assert.equal(result.error, undefined);
    });

    it("handles mixed case across all blocked domains", () => {
      assert.equal(isBlockedEmailDomain("User@HotMail.COM"), true);
      assert.equal(isBlockedEmailDomain("USER@OUTLOOK.COM"), true);
      assert.equal(isBlockedEmailDomain("USER@Proton.ME"), true);
      assert.equal(isBlockedEmailDomain("User@YAHOO.COM"), true);
    });
  });

  describe("Lookalike Domains (Must NOT Be Rejected)", () => {
    const lookalikeEmails = [
      "john@gmail.example.com",
      "mary@notgmail.com",
      "dev@gmailcorp.com",
      "info@sub.outlook.com",
      "admin@outlook-cloud.com",
      "team@yahoo.consulting",
      "support@myyahoo.com",
      "test@fake-proton.me",
      "user@protonmail.company",
      "corp@icloud.network",
      "contact@live.ca",
      "contact@msn.co.uk",
      "person@aol.tech",
    ];

    for (const email of lookalikeEmails) {
      it(`does not reject lookalike domain: ${email}`, () => {
        assert.equal(
          isBlockedEmailDomain(email),
          false,
          `${email} should not be flagged as blocked`
        );

        const result = validateBusinessEmail(email);
        assert.equal(
          result.valid,
          true,
          `${email} should be accepted as a valid business email`
        );
        assert.equal(result.error, undefined);
      });
    }
  });

  describe("Email Format Validation", () => {
    const invalidEmails = [
      "",
      "   ",
      "plainaddress",
      "@missinguser.com",
      "missingdomain@",
      "missingdot@domain",
      "two@@domain.com",
      "spaces in@domain.com",
    ];

    for (const email of invalidEmails) {
      it(`flags invalid email format: "${email}"`, () => {
        assert.equal(isValidEmailFormat(email), false);

        const result = validateBusinessEmail(email);
        assert.equal(result.valid, false);
        assert.equal(result.error, "Please enter a valid email address.");
      });
    }
  });
});
