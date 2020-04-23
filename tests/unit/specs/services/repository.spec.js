import api from '@/services/api';
import {
  getCustomers,
  getAllCustomersLength,
  getSuperadminCompanies,
  getAllSuperadminCompaniesLength,
  getCalls,
  getAllCallsLength,
  getOperatorReview,
  getCallsDuration,
  getCallsFeedback,
  getSuperadminOperators,
  getAllSuperadminOperatorsLength,
  getPayments,
  getAllPaymentsLength,
} from '@/services/repository';

describe('repository', () => {
  describe('getCustomers', () => {
    it('should call api.get and return correct data', async () => {
      const startFrom = 10;
      const count = 20;
      const params = {
        startFrom,
        count,
      };
      const items = [{ id: 123 }, { id: 321 }];
      const data = {
        items,
      };

      api.get = jest.fn(() => Promise.resolve({ data }));

      const response = await getCustomers(startFrom, count);

      expect(response).toEqual(items);
      await expect(api.get).toHaveBeenCalledWith('/customers', { params });
    });
  });

  describe('getAllCustomersLength', () => {
    it('should call api.get and return correct data', async () => {
      const length = 4;
      const data = {
        length,
      };

      api.get = jest.fn(() => Promise.resolve({ data }));

      const response = await getAllCustomersLength();

      expect(response).toEqual(length);
      expect(api.get).toHaveBeenCalledWith('/customers-length');
    });
  });

  describe('getSuperadminCompanies', () => {
    it('should call api.get and return correct data', async () => {
      const startFrom = 10;
      const count = 20;
      const params = {
        startFrom,
        count,
      };
      const items = [{ id: 123 }, { id: 321 }];
      const data = {
        items,
      };

      api.get = jest.fn(() => Promise.resolve({ data }));

      const response = await getSuperadminCompanies(startFrom, count);

      expect(response).toEqual(items);
      expect(api.get).toHaveBeenCalledWith('/superadmin-companies', { params });
    });
  });

  describe('getAllSuperadminCompaniesLength', () => {
    it('should call api.get and return correct data', async () => {
      const length = 4;
      const data = {
        length,
      };

      api.get = jest.fn(() => Promise.resolve({ data }));

      const response = await getAllSuperadminCompaniesLength();

      expect(response).toEqual(length);
      expect(api.get).toHaveBeenCalledWith('/superadmin-companies-length');
    });
  });

  describe('getCalls', () => {
    it('should call api.get and return correct data', async () => {
      const startFrom = 10;
      const count = 20;
      const params = {
        startFrom,
        count,
      };
      const items = [{ id: 123 }, { id: 321 }];
      const data = {
        items,
      };

      api.get = jest.fn(() => Promise.resolve({ data }));

      const response = await getCalls(startFrom, count);

      expect(response).toEqual(items);
      expect(api.get).toHaveBeenCalledWith('/calls', { params });
    });
  });

  describe('getAllCallsLength', () => {
    it('should call api.get and return correct data', async () => {
      const length = 4;
      const data = {
        length,
      };

      api.get = jest.fn(() => Promise.resolve({ data }));

      const response = await getAllCallsLength();

      expect(response).toEqual(length);
      expect(api.get).toHaveBeenCalledWith('/calls-length');
    });
  });

  describe('getOperatorReview', () => {
    it('should call api.get and return correct data', async () => {
      const data = {
        items: [1, 2, 3],
      };

      api.get = jest.fn(() => Promise.resolve({ data }));

      const response = await getOperatorReview();

      expect(response).toEqual(data.items);
      expect(api.get).toHaveBeenCalledWith('/operator-review');
    });
  });
  describe('getCallsDuration', () => {
    it('should call api.get and return correct data', async () => {
      const data = {
        items: [1, 2, 3],
      };

      api.get = jest.fn(() => Promise.resolve({ data }));

      const response = await getCallsDuration();

      expect(response).toEqual(data.items);
      expect(api.get).toHaveBeenCalledWith('/calls-duration');
    });
  });

  describe('getCallsFeedback', () => {
    it('should call api.get and return correct data', async () => {
      const data = {
        items: [1, 2, 3],
      };

      api.get = jest.fn(() => Promise.resolve({ data }));

      const response = await getCallsFeedback();

      expect(response).toEqual(data.items);
      expect(api.get).toHaveBeenCalledWith('/calls-feedback');
    });
  });

  describe('getSuperadminOperators', () => {
    it('should call api.get and return correct data', async () => {
      const startFrom = 10;
      const count = 20;
      const params = {
        startFrom,
        count,
      };
      const items = [{ id: 123 }, { id: 321 }];
      const data = {
        items,
      };

      api.get = jest.fn(() => Promise.resolve({ data }));

      const response = await getSuperadminOperators(startFrom, count);

      expect(response).toEqual(items);
      expect(api.get).toHaveBeenCalledWith('/superadmin/operators', { params });
    });
  });

  describe('getAllSuperadminOperatorsLength', () => {
    it('should call api.get and return correct data', async () => {
      const length = 4;
      const data = {
        length,
      };

      api.get = jest.fn(() => Promise.resolve({ data }));

      const response = await getAllSuperadminOperatorsLength();

      expect(response).toEqual(length);
      expect(api.get).toHaveBeenCalledWith('/superadmin/operators-length');
    });
  });

  describe('getPayments', () => {
    it('should call api.get and return correct data', async () => {
      const startFrom = 10;
      const count = 20;
      const params = {
        startFrom,
        count,
      };
      const items = [{ date: '2019-01-15T12:00:00' }, { date: '2019-02-15T12:00:00' }];
      const data = {
        items,
      };

      api.get = jest.fn(() => Promise.resolve({ data }));

      const response = await getPayments(startFrom, count);

      expect(response).toEqual(items);
      expect(api.get).toHaveBeenCalledWith('/payments', { params });
    });
  });

  describe('getAllPaymentsLength', () => {
    it('should call api.get and return correct data', async () => {
      const length = 5;
      const data = {
        length,
      };

      api.get = jest.fn(() => Promise.resolve({ data }));

      const response = await getAllPaymentsLength();

      expect(response).toEqual(length);
      expect(api.get).toHaveBeenCalledWith('/payments-length');
    });
  });
});
