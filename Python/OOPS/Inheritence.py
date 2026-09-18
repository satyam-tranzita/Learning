# class Employee:

#     company = "Tranzita"

#     def __init__(self, name):
#         self.name = name

#     def display(self):
#         print("Employee:", self.name)


# class Manager(Employee):

#     def __init__(self, name, department):
#         super().__init__(name)
#         self.department = department

#     def display(self):
#         super().display()
#         print("Department:", self.department)


# manager = Manager("Satyam", "Engineering")

# manager.display()





class A:
    def show(self):
        print("A")


class B(A):
    def show(self):
        print("B")


class C(A):
    def show(self):
        print("C")


class D(B, C):
    pass


obj = D()

# obj.show()

print(D.mro())