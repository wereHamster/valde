/**
 * DO NOT IMPORT THIS IN NORMAL CODE – THIS IS ONLY FOR USE IN TESTS
 *
 * https://github.com/facebook/jest/pull/7571#issuecomment-498634094
 */
declare module "jest" {
  const jest: any;
  export const expect: any;
  export const test: any;

  export default jest;
}
