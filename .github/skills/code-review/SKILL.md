
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
- Verify Todo ownership for read, update, and delete operations.
- Check token forwarding across Next.js and NestJS.

## 2. BFF Architecture
- Check server/client boundaries.
- Prevent direct exposure of internal backend endpoints or credentials.
- Validate and sanitize external inputs.
- Check HTTP status and error propagation.
- Detect missing timeout handling and unsafe retries.
- Check unauthorized response caching.

## 3. NestJS
- Verify Guards, Pipes, DTO validation, and exception handling.
- Check dependency injection and service boundaries.
- Detect unsafe request handling and async failures.
- Check that authorization cannot be bypassed.

## 4. Prisma and PostgreSQL
- Detect incorrect query filters and missing ownership constraints.
- Check unique constraints and transaction boundaries.
- Identify race conditions and non-atomic updates.
- Detect significant N+1 queries and unbounded reads.
- Check migration compatibility when schemas change.

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
