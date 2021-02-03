import { superstructResolver } from '..';
import { invalidData, schema, validData, fields } from './__fixtures__/data';

describe('superstructResolver', () => {
  it('should return values from superstructResolver when validation pass', async () => {
    const result = await superstructResolver(schema)(validData, undefined, {
      fields,
    });

    expect(result).toEqual({ errors: {}, values: validData });
  });

  it('should return a single error from superstructResolver when validation fails', async () => {
    const result = await superstructResolver(schema)(invalidData, undefined, {
      fields,
    });

    expect(result).toMatchSnapshot();
  });

  it('should return all the errors from superstructResolver when validation fails with `validateAllFieldCriteria` set to true', async () => {
    const result = await superstructResolver(schema)(invalidData, undefined, {
      fields,
      criteriaMode: 'all',
    });

    expect(result).toMatchSnapshot();
  });
});
