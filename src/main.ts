/*
Dependency Inversion Principle:
Módulos de alto nível não devem depender de módulos de baixo nível. Ambos devem depender de abstrações.
Dependa de abstrações, não de implementações.
Abstrações não devem depender de detalhes. Detalhes devem depender de abstrações.

Classes de baixo nível são classes que executam tarefas (os detalhes)
Classes de alto nível são classes que gerenciam as classes de baixo nível.
*/

import { Order } from "./classes/order";
import { Persistency } from "./services/persistency";
import { Product } from "./classes/product";
import { ShoppingCart } from "./classes/shoppingCart";
import { FiftyPercentDiscount, NoDiscount, TenPercentDiscount } from "./classes/discount";
import { EnterpriseCustomer, IndividualCustomer } from "./classes/customer";
import { Messaging } from "./services/messaging";
import { MessagingProtocol } from "./classes/interfaces/messagingProtocol";


const fiftyPercentDiscount = new FiftyPercentDiscount();
const tenPercentDiscount = new TenPercentDiscount();
const noDiscount = new NoDiscount();
const individualCustomer = new IndividualCustomer('Pedro', 'Coni', '333.333.333-33')
const enterpriseCustomer = new EnterpriseCustomer('Empresa Legal', '888.888.888-88')
const messaging = new Messaging();

/*
classe mock que finge enviar emails:
class MessagingMock implements MessagingProtocol {

  sendMessage(msg: string): void {
      console.log("A mensagem foi enviada com o mock sucesso!")
  }
}
const messaging = new MessagingMock();
*/


const cart = new ShoppingCart(noDiscount);
const persistency = new Persistency();
const order = new Order(cart, messaging, persistency, enterpriseCustomer)
console.log(order.orderStatus);

cart.addItem(new Product('Shirt', 19.90));
cart.addItem(new Product('Toy', 9.90));
cart.addItem(new Product('Milk', 30.12));

console.log(cart.items);
 console.log(cart.total());
 console.log(cart.totalWithDiscount());
order.checkout();

console.log(cart.items);
console.log(cart.total());
//cart.clear();
