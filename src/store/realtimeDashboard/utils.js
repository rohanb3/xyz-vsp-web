export const mapCallInfo = (call, currentTenantUsers, currentTenantCompanies, allDevices) => {
  const salesRep = currentTenantUsers[call.salesRepId] || {};

  const company = currentTenantCompanies[salesRep.companyId] || {};
  const device = allDevices[call.deviceId] || {};

  return {
    ...call,
    deviceName: device.deviceName || 'N/A',
    companyName: company.companyName || 'N/A',
    salesRepName: salesRep.userName || call.salesRepId,
  };
};

export default mapCallInfo;
