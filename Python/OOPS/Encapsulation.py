class Employee:

    def __init__(self, name, salary):
        self.name = name
        self.__salary = salary

    @property
    def salary(self):
        return self.__salary

    @salary.setter
    def salary(self, value):
        if value < 0:
            raise ValueError("Salary cannot be negative")

        self.__salary = value

    def display(self):
        print(self.name, self.salary)


e = Employee("Satyam", 50000)

print(e.salary)

e.salary = 60000

print(e.salary)