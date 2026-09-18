# from abc import ABC, abstractmethod
# class Payment(ABC):

#     def validate(self):
#         print("Validating Payment")

    
#     @abstractmethod
#     def pay(self):
#         pass


# class CreditCard(Payment):

#     def pay(self):
#         print("Paid using Credit Card")


# class UPI(Payment):

#     def pay(self):
#         print("Paid using UPI")



# p1=CreditCard()
# p1.validate()
# p1.pay()


# p2=UPI()
# p2.validate()
# p2.pay()




from abc import ABC, abstractmethod


class Payment(ABC):

    @abstractmethod
    def pay(self):
        pass


class UPI(Payment):

    def pay(self):
        print("UPI payment")


class Card(Payment):

    def pay(self):
        print("Card payment")


def process_payment(payment):
    payment.pay()


process_payment(UPI())
process_payment(Card())


