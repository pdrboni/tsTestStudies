import { IndividualCustomer, EnterpriseCustomer } from "./customer";

const createIndividualCustomer = (firstName: string, lastName: string, cpf: string): IndividualCustomer => {
  return new IndividualCustomer(firstName, lastName, cpf);
}

const createEnterpriseCustomer = (name: string, cnpj: string): EnterpriseCustomer => {
  return new EnterpriseCustomer(name, cnpj);
}

afterEach(() => jest.clearAllMocks());

describe('IndividualCustomer', () => {

  it('should have the respective properties', () => {
    const sut = createIndividualCustomer('Peedro', 'Coni', '111');
    expect(sut).toHaveProperty('firstName', 'Peedro');
    expect(sut).toHaveProperty('lastName', 'Coni');
    expect(sut).toHaveProperty('cpf', '111');
  });

  it('should return full name', () => {
    const sut = createIndividualCustomer('Peedro', 'Coni', '111');
    expect(sut.getName()).toBe('Peedro Coni');
  })

  it('should return IDN', () => {
    const sut = createIndividualCustomer('Peedro', 'Coni', '111');
    expect(sut.getIDN()).toBe('111');
  })
});

describe('EnterpriseCustomer', () => {

  it('should have the respective properties', () => {
    const sut = createEnterpriseCustomer('Empresa','111');
    expect(sut).toHaveProperty('name', 'Empresa');
    expect(sut).toHaveProperty('cnpj', '111');
  });

  it('should return name', () => {
    const sut = createEnterpriseCustomer('Empresa','111');
    expect(sut.getName()).toBe('Empresa');
  })

  it('should return IDN', () => {
    const sut = createEnterpriseCustomer('Empresa','111');
    expect(sut.getIDN()).toBe('111');
  })
});
