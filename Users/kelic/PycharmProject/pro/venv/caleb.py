name = input('enter your name')
print("hello " + name)
x = 0
y = 3
secret_number = name
age = str(input('enter your age'))
school = str(input('enter the name of your school'))
answer = input('do you wish to calculate your bmi yes or no')
while x < y:
    password = input('enter password')
    x += 1
    break
    if answer == 'yes':
        if password == secret_number:
            height = float(input('enter your height please '))
            weight = int(input('enter your weight please'))
            bmi = weight / (height ** 2)
            print('this is your bmi ' + bmi)
            if bmi > 25:
                print('patient is overweight')
            elif bmi < 19:
                print('patience is underweight')
            else:
                print('wrong password')
    else:
        print('thanks for your time')

a = {}
a['details'] = age, school, bmi
print(a['details'])

