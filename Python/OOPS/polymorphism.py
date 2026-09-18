# class A:
#     def sound(self):
#         print('A')

# class B(A):
#     # pass
#     def sound(self):
#         print('B')


# a=B()
# a.sound()


class Number:
    def __init__(self, value):
        self.value = value

    def __add__(self, other):
        return Number(self.value + other.value)


a = Number(10)
b = Number(20)

c = a + b

print(c.value)