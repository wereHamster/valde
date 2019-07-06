/*
 * Hopefully we can get rid of this module soon.
 *
 * https://github.com/facebook/jest/pull/7571#issuecomment-498634094
 */

declare const jest: any;
export default jest;
export const { expect, test } = global as any;
