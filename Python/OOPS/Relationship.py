# # Has_A_Relation
# class Engine:
#     def start(self):
#         print("Engine starts")


# class Car:
#     def __init__(self):
#         self.engine = Engine()

#     def start(self):
#         self.engine.start()


# car = Car()
# car.start()




class Employee:
    def __init__(self, name):
        self.name = name


class Company:
    def __init__(self, employee):
        self.employee = employee


e = Employee("Satyam")
company = Company(e)
print(e.name)

print(company.employee.name)
