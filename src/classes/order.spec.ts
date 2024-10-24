import { CartItem } from "./interfaces/cartItem";
import { CustomerOrder } from "./interfaces/customerProtocol";
import { MessagingProtocol } from "./interfaces/messagingProtocol";
import { PersistencyProtocol } from "./interfaces/persistencyProtocol";
import { ShoppingCartProtocol } from "./interfaces/shoppingCartProtocol";
import { Order } from "./order";


class ShoppingCartMock implements ShoppingCartProtocol {
  addItem(item: CartItem): void {}
  removeItem(index: number): void {}
  total(): number {
    return 1;
  }
  totalWithDiscount(): number {
    return 2;
  }
  isEmpty(): boolean {
    return true;
  }
  clear(): void {}
  get items(): Readonly<CartItem>[] {
    return [];
  };
}

class MessagingMock implements MessagingProtocol {
  sendMessage(): void {}
}

class PersistencyMock implements PersistencyProtocol {
  saveOrder(): void {}
}

class CustomerMock implements CustomerOrder {
  getName(): string { return ''};
  getIDN(): string { return ''};
}

const createSut = () => {
  const shoppingCartMock = new ShoppingCartMock();
  const messagingMock = new MessagingMock();
  const persistencyMock = new PersistencyMock();
  const customerMock = new CustomerMock();

  const sut = new Order(shoppingCartMock, messagingMock, persistencyMock, customerMock)

  return {
    sut,
    shoppingCartMock,
    messagingMock,
    persistencyMock,
    customerMock,
  }
}

describe('Order', () => {
  it('should not checkout if cart is empty', () => {
    const { sut, shoppingCartMock } = createSut();
    const shoppingCartMockSpy = jest.spyOn(shoppingCartMock, 'isEmpty');
    sut.checkout();
    expect(shoppingCartMockSpy).toHaveBeenCalledTimes(1);
    expect(sut.orderStatus).toBe('open');
  });

  it('should checkout if cart is not empty', () => {
    const { sut, shoppingCartMock } = createSut();
    const shoppingCartMockSpy = jest.spyOn(shoppingCartMock, 'isEmpty').mockReturnValueOnce(false);
    sut.checkout();
    expect(shoppingCartMockSpy).toHaveBeenCalledTimes(1);
    expect(sut.orderStatus).toBe('closed');
  });

  it('should send an email to customer', () => {
    const { sut, messagingMock, shoppingCartMock } = createSut();
    const shoppingCartMockSpy = jest.spyOn(shoppingCartMock, 'isEmpty').mockReturnValueOnce(false);
    const messaginMockSpy = jest.spyOn(messagingMock, 'sendMessage');
    sut.checkout();
    expect(messaginMockSpy).toHaveBeenCalledTimes(1);
  });

  it('should save order', () => {
    const { sut, persistencyMock, shoppingCartMock } = createSut();
    const shoppingCartMockSpy = jest.spyOn(shoppingCartMock, 'isEmpty').mockReturnValueOnce(false);
    const persistencyMockSpy = jest.spyOn(persistencyMock, 'saveOrder');
    sut.checkout();
    expect(persistencyMockSpy).toHaveBeenCalledTimes(1);
  });

  it('should clear cart', () => {
    const { sut, persistencyMock, shoppingCartMock } = createSut();
    const shoppingCartMockSpyIsEmpty = jest.spyOn(shoppingCartMock, 'isEmpty').mockReturnValueOnce(false);
    const shoppingCartMockSpyClear = jest.spyOn(shoppingCartMock, 'clear');
    sut.checkout();
    expect(shoppingCartMockSpyClear).toHaveBeenCalledTimes(1);
  });
});
