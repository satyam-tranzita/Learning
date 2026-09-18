class Employee:
    def __init__(self, name):
        self.name = name

    def __str__(self):
        return f"Employee: {self.name}"


e = Employee("Satyam")

print(e)