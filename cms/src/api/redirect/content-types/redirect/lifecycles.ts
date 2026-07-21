import { errors } from '@strapi/utils';

/**
 * cms/src/api/redirect/content-types/redirect/lifecycles.ts
 * ----------------------------------------------------------------------------
 * Validation hooks for the Redirect collection type.
 *
 * Enforces two rules from the spec:
 *   1. Both `old_url` and `new_url` must start with "/".
 *   2. `old_url` and `new_url` cannot be identical (no self-redirects).
 *
 * Runs on every create. On update, only validates fields that are actually
 * present in the partial payload — Strapi's unique constraint on `old_url`
 * and the prior create-time validation cover the rest.
 * ----------------------------------------------------------------------------
 */

type RedirectData = {
  old_url?: unknown;
  new_url?: unknown;
};

type RedirectEvent = {
  params: { data: RedirectData };
};

function assertStartsWithSlash(value: unknown, fieldName: string): void {
  if (typeof value !== 'string' || value.length === 0 || value[0] !== '/') {
    throw new errors.ValidationError(
      `${fieldName} must start with "/" (received "${value}")`
    );
  }
}

function assertDifferent(oldUrl: unknown, newUrl: unknown): void {
  if (typeof oldUrl === 'string' && typeof newUrl === 'string' && oldUrl === newUrl) {
    throw new errors.ValidationError(
      `old_url and new_url cannot be identical (both are "${oldUrl}")`
    );
  }
}

export default {
  async beforeCreate(event: RedirectEvent): Promise<void> {
    const { data } = event.params;
    assertStartsWithSlash(data.old_url, 'old_url');
    assertStartsWithSlash(data.new_url, 'new_url');
    assertDifferent(data.old_url, data.new_url);
  },

  async beforeUpdate(event: RedirectEvent): Promise<void> {
    const { data } = event.params;
    // Partial updates are common — only validate what's actually being set.
    if (data.old_url !== undefined) assertStartsWithSlash(data.old_url, 'old_url');
    if (data.new_url !== undefined) assertStartsWithSlash(data.new_url, 'new_url');
    // The identical-URL check only fires when both are present in this payload.
    assertDifferent(data.old_url, data.new_url);
  },
};
