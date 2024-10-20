import { OrderStatus } from "./interfaces/orderStatus";
import { CustomerOrder } from "./interfaces/customerProtocol";
import { ShoppingCartProtocol } from "./interfaces/shoppingCartProtocol";
import { MessagingProtocol } from "./interfaces/messagingProtocol";
import { PersistencyProtocol } from "./interfaces/persistencyProtocol";

export class Order {
  private _orderStatus: OrderStatus = 'open';

  constructor(
    private readonly cart: ShoppingCartProtocol,
    private readonly messaging: MessagingProtocol,
    private readonly persistency: PersistencyProtocol,
    private readonly customer: CustomerOrder,
  ) {}

  get orderStatus(): Readonly<OrderStatus> {
    return this._orderStatus;
  }

  //
  checkout(): void {
    if (this.cart.isEmpty()) {
      console.log('Your cart is empty');
      return;
    }

    this.messaging.sendMessage(`Your order cost ${this.cart.totalWithDiscount()} and was recieved`);
    this.persistency.saveOrder();
    this.cart.clear();
    this._orderStatus = 'closed';
    console.log(this.customer.getName(), this.customer.getIDN())
  }

}
