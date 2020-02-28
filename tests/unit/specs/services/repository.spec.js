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

xdescribe('repository', () => {
  xdescribe('getCustomers', () => {
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
      expect(api.get).toHaveBeenCalledWith('/customers', { params });
    });
  });

  xdescribe('getAllCustomersLength', () => {
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

  xdescribe('getSuperadminCompanies', () => {
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

  xdescribe('getAllSuperadminCompaniesLength', () => {
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

  xdescribe('getCalls', () => {
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

  xdescribe('getAllCallsLength', () => {
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

  xdescribe('getOperatorReview', () => {
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
  xdescribe('getCallsDuration', () => {
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

  xdescribe('getCallsFeedback', () => {
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

  xdescribe('getSuperadminOperators', () => {
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

  xdescribe('getAllSuperadminOperatorsLength', () => {
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

  xdescribe('getPayments', () => {
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

  xdescribe('getAllPaymentsLength', () => {
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
