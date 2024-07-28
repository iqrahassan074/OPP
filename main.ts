import inquirer from "inquirer";

class Student {
    name: string;
    constructor(n: string) {
        this.name = n;
    }
}

class Person {
    students: Student[] = [];

    addStudent(obj: Student) {
        this.students.push(obj);
    }
}

const persons = new Person();

const programStart = async (persons: Person) => {
    while (true) {
        console.log("Welcome!");
        const mainAns = await inquirer.prompt({
            name: "select",
            type: "list",
            message: "Whom would you like to interact with?",
            choices: ["staff", "student", "exit"]
        });

        if (mainAns.select == "staff") {
            console.log("You approach the staff room. Please feel free to ask any question.");
        } else if (mainAns.select == "student") {
            const studentAns = await inquirer.prompt({
                name: "student",
                type: "input",
                message: "Enter your student's name you wish to engage with:"
            });

            const student = persons.students.find(val => val.name == studentAns.student);
            if (!student) {
                const newStudent = new Student(studentAns.student);
                persons.addStudent(newStudent);
                console.log(`Hello, I am ${newStudent.name}. Nice to meet you!`);
                console.log("New student added.");
                console.log("Current student list:");
                console.log(persons.students);
            } else {
                console.log(`Hello, I am ${student.name}. Nice to meet you!`);
                console.log("Existing student list:");
                console.log(persons.students);
            }
        } else if (mainAns.select == "exit") {
            console.log("Exiting the program...");
            break;
        }
    }
};

programStart(persons);


