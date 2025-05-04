import bcrypt from 'bcryptjs'
import {IUser, User} from '../models/user'
import {IEmployee, Employee} from '../models/employee'

async function loadUsers() {
    const plainPassword = "12345678"
    const hashedPassword = await bcrypt.hash(plainPassword, 10)
    console.log("Hashed password:", hashedPassword)

    const users = [
        { email: "ron@gmail.com", isManager: true },
        { email: "david@gmail.com", isManager: true },
        { email: "shir@gmail.com", isManager: true },
        { email: "oren@gmail.com", isManager: false },
        { email: "nadav@gmail.com", isManager: false },
        { email: "sara@gmail.com", isManager: false },
        { email: "shimon@gmail.com", isManager: false },
        { email: "dvir@gmail.com", isManager: false },
        { email: "eva@gmail.com", isManager: false },
        { email: "ronit@gmail.com", isManager: false },
    ]

    const createdUsers: IUser[] = await Promise.all(
        users.map(user => User.create({
            email: user.email,
            password: hashedPassword,
            isManager: user.isManager,
        }))
    )

    const employee1: IEmployee = await Employee.create({ firstName: "Ron", lastName: "Levi", role: "VP R&D", managerId: null, userId: createdUsers[0]._id })
    const employee2: IEmployee = await Employee.create({ firstName: "David", lastName: "Saban", role: "Developer", managerId: employee1._id, userId: createdUsers[1]._id })
    const employee3: IEmployee = await Employee.create({ firstName: "Shir", lastName: "Solomon", role: "QA", managerId: employee1._id, userId: createdUsers[2]._id })
    const employee4: IEmployee = await Employee.create({ firstName: "Oren", lastName: "Shapiro", role: "Developer", managerId: employee2._id, userId: createdUsers[3]._id })
    const employee5: IEmployee = await Employee.create({ firstName: "Nadav", lastName: "Friedman", role: "Developer", managerId: employee2._id, userId: createdUsers[4]._id })
    const employee6: IEmployee = await Employee.create({ firstName: "Sara", lastName: "Rosenstein", role: "Developer", managerId: employee2._id, userId: createdUsers[5]._id })
    const employee7: IEmployee = await Employee.create({ firstName: "Shimon", lastName: "Peri", role: "Developer", managerId: employee2._id, userId: createdUsers[6]._id })
    const employee8: IEmployee = await Employee.create({ firstName: "Dvir", lastName: "Cohen", role: "QA", managerId: employee3._id, userId: createdUsers[7]._id })
    const employee9: IEmployee = await Employee.create({ firstName: "Eva", lastName: "Friedman", role: "QA", managerId: employee3._id, userId: createdUsers[8]._id })
    const employee10: IEmployee= await Employee.create({ firstName: "Ronit", lastName: "Silverman", role: "QA", managerId: employee3._id, userId: createdUsers[9]._id })

    await employee1.save()
    await employee2.save()
    await employee3.save()
    await employee4.save()
    await employee5.save()
    await employee6.save()
    await employee7.save()
    await employee8.save()
    await employee9.save()
    await employee10.save()

    console.log("Users created successfully!")
}

export default loadUsers
