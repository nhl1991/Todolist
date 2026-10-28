---
name: code-review
description: Review PR changes in a Next.js BFF and NestJS backend application using JWT, Prisma, and PostgreSQL. Focus on security, correctness, data consistency, and regressions.
---

# Todolist PR Code Review

Review changed code and the relevant surrounding call chain.

## 1. Authentication and Authorization
- Verify JWT signatures and expiration.
- Check httpOnly cookie handling and cookie security settings.
- Verify authentication at every protected backend entry point.
- Check CSRF exposure when cookie-based authentication is used.
- Never trust client-supplied user IDs.
- Verify Todo ownership and visibility rules across list, detail, update, and delete operations.
- Ensure private Todos are never exposed to unauthorized users.
- Verify trusted authentication and client identity headers cannot be forged by external callers.
- Check that secrets and internal authentication credentials are never exposed to the browser.

## 2. BFF Architecture
- Check server/client boundaries.
- Prevent direct exposure of internal backend endpoints or credentials.
- Validate and sanitize external inputs.
- Check HTTP status and error propagation.
- Check unauthorized response caching.
- Identify requests that may hang indefinitely or retries that could worsen upstream failures.

## 3. NestJS
- Verify Guards, Pipes, DTO validation, and exception handling.
- Check that authorization cannot be bypassed.

## 4. Prisma and PostgreSQL
- Detect incorrect query filters and missing ownership constraints in read operations.
- Check unique constraints and transaction boundaries.
- Report N+1 queries or unbounded reads only when they create a meaningful performance regression.
- Check migration compatibility when schemas change.
- Check that ownership constraints remain enforced during mutations.
- Identify race conditions or non-atomic operations only when they can cause a concrete data integrity issue.

## 5. Next.js and React
- Check data fetching and caching correctness.
- Identify meaningful rendering and performance regressions.
- Check mutations, loading states, and error handling.
- Check client-side type safety.

## Review Rules
- Report only actionable findings related to the PR.
- Prioritize security vulnerabilities and runtime bugs.
- Include severity, file path, line number, and suggested fix.
- Avoid speculative warnings and stylistic preferences.
- Do not modify files.
